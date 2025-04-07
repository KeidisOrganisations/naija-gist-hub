
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface MediaItem {
  id: string;
  file_name: string;
  name: string;
  file_size: number;
  file_type: string;
  file_path: string;
  folder_id?: string | null;
  uploaded_by?: string | null;
  created_at?: string;
  uploaded_at: string;
}

// Interface for MediaFolder (for future implementation)
export interface MediaFolder {
  id: string;
  name: string;
  parent_id?: string | null;
  created_at: string;
}

// Fetch media items
export async function fetchMediaItems() {
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error("Error fetching media items:", error);
      toast({
        title: "Error fetching media",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    // Transform the data to match our MediaItem interface
    const mediaItems = (data || []).map(item => ({
      id: item.id,
      file_name: item.name,
      name: item.name,
      file_size: item.file_size,
      file_type: item.file_type,
      file_path: item.file_path,
      folder_id: item.folder_id,
      uploaded_by: null,
      created_at: item.uploaded_at,
      uploaded_at: item.uploaded_at
    }));
    
    return mediaItems as MediaItem[];
  } catch (error: any) {
    console.error('Error in fetchMediaItems:', error);
    return [];
  }
}

// Upload a media file
export async function uploadMediaFile(file: File) {
  try {
    // Generate a unique file name to avoid conflicts
    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
    const filePath = `uploads/${uniqueFileName}`;
    
    // First, upload the file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      toast({
        title: "Upload Failed",
        description: uploadError.message,
        variant: "destructive",
      });
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('media')
      .getPublicUrl(filePath);

    // Add record to the media table
    const { data, error } = await supabase
      .from('media')
      .insert([{
        name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_path: publicUrl,
      }])
      .select();

    if (error) {
      console.error('Error saving media record:', error);
      toast({
        title: "Media Record Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    toast({
      title: "Upload Successful",
      description: "Your file has been uploaded successfully.",
    });
    
    // Transform the data to match our MediaItem interface
    const mediaItem = {
      id: data[0].id,
      file_name: data[0].name,
      name: data[0].name,
      file_size: data[0].file_size,
      file_type: data[0].file_type,
      file_path: data[0].file_path,
      folder_id: data[0].folder_id,
      uploaded_by: null,
      created_at: data[0].uploaded_at,
      uploaded_at: data[0].uploaded_at
    };
    
    return mediaItem;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw error;
  }
}

// Delete a media item
export async function deleteMediaItem(id: string) {
  try {
    // First, get the file path
    const { data: mediaItem, error: fetchError } = await supabase
      .from('media')
      .select('file_path')
      .eq('id', id)
      .single();

    if (fetchError) {
      toast({
        title: "Error fetching media item",
        description: fetchError.message,
        variant: "destructive",
      });
      throw fetchError;
    }

    // Try to extract the path from the URL for deletion from storage
    try {
      const url = new URL(mediaItem.file_path);
      const pathParts = url.pathname.split('/');
      // The expected format is /storage/v1/object/public/media/path/to/file
      // We need to extract just the path/to/file part
      const bucketIndex = pathParts.findIndex(part => part === 'media');
      if (bucketIndex !== -1 && bucketIndex < pathParts.length - 1) {
        const storagePath = pathParts.slice(bucketIndex + 1).join('/');
        
        // Delete from storage
        const { error: storageError } = await supabase
          .storage
          .from('media')
          .remove([storagePath]);

        if (storageError) {
          console.error("Error deleting file from storage:", storageError);
          // We'll still try to delete the database record even if storage deletion fails
        } else {
          console.log("File successfully deleted from storage:", storagePath);
        }
      }
    } catch (pathError) {
      console.error("Error parsing file path:", pathError);
      // Continue with deleting the database record even if parsing fails
    }

    // Delete the database record
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting media record",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    toast({
      title: "File Deleted",
      description: "The file has been deleted successfully.",
    });
    
    return true;
  } catch (error: any) {
    console.error('Delete error:', error);
    throw error;
  }
}

// Fetch media folders (placeholder since media_folders doesn't exist in our schema yet)
export async function fetchMediaFolders() {
  try {
    // Since we don't have a media_folders table yet in the schema, 
    // we'll just return an empty array
    return [];
  } catch (error: any) {
    console.error('Error in fetchMediaFolders:', error);
    toast({
      title: "Error loading folders",
      description: error.message || "Could not load media folders",
      variant: "destructive",
    });
    return [];
  }
}

// Create a new folder (placeholder function since folders aren't implemented yet)
export async function createMediaFolder(name: string, parent_id: string | null = null) {
  try {
    // Since we don't have media_folders table yet in the schema,
    // we'll just return a mock response
    return {
      id: "mock-folder-id",
      name,
      parent_id,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
}
