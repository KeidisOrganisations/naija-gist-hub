
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { MediaItem } from '@/types/media';
import { formatFileSize } from './media-utils';

// Fetch media items
export async function fetchMediaItems() {
  try {
    // Get current user session
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;

    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching media:', error);
      toast({
        title: "Error loading media",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }

    // Map the database fields to match the MediaItem interface
    const mediaItems: MediaItem[] = data.map(item => ({
      id: item.id,
      file_name: item.name, // Map name to file_name for backward compatibility
      name: item.name,
      file_type: item.file_type,
      file_size: item.file_size,
      file_path: item.file_path,
      folder_id: item.folder_id,
      uploaded_at: item.uploaded_at,
      uploaded_by: item.uploaded_by,
      created_at: item.uploaded_at, // Use uploaded_at as created_at since it serves the same purpose
    }));

    return mediaItems;
  } catch (error: any) {
    console.error('Error in fetchMediaItems:', error);
    return [];
  }
}

// Upload a media file
export async function uploadMediaFile(file: File) {
  try {
    // Check if user is authenticated
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;
    
    if (!session?.user?.id) {
      throw new Error('Authentication required to upload files');
    }
    
    // Generate a unique filename to avoid collisions
    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const filePath = `uploads/${timestamp}-${file.name}`;
    
    // Upload to Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);
      
    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
      
    const publicUrl = publicUrlData?.publicUrl;
    
    // Store metadata in the media table
    const { data: mediaData, error: mediaError } = await supabase
      .from('media')
      .insert([
        {
          name: file.name,
          file_path: publicUrl,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: session.user.id // Always set user ID for RLS
        }
      ])
      .select()
      .single();
      
    if (mediaError) {
      console.error('Media metadata error:', mediaError);
      throw mediaError;
    }
    
    console.log('Media file uploaded successfully:', mediaData);
    
    // Map the result to match the MediaItem interface
    const mediaItem: MediaItem = {
      id: mediaData.id,
      file_name: mediaData.name,
      name: mediaData.name,
      file_type: mediaData.file_type,
      file_size: mediaData.file_size,
      file_path: mediaData.file_path,
      folder_id: mediaData.folder_id,
      uploaded_at: mediaData.uploaded_at,
      uploaded_by: mediaData.uploaded_by,
      created_at: mediaData.uploaded_at
    };
    
    return mediaItem;
  } catch (error: any) {
    console.error('Error in uploadMediaFile:', error);
    toast({
      title: "Upload failed",
      description: error.message || "An error occurred during file upload",
      variant: "destructive",
    });
    throw error;
  }
}

// Delete a media item
export async function deleteMediaItem(id: string) {
  try {
    // Check user authentication
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;
    
    if (!session?.user?.id) {
      throw new Error('Authentication required to delete files');
    }
    
    // Get the file path first so we can delete it from storage
    const { data: mediaItem, error: fetchError } = await supabase
      .from('media')
      .select('file_path')
      .eq('id', id)
      .single();
      
    if (fetchError) {
      console.error('Error fetching media item:', fetchError);
      throw fetchError;
    }
    
    // Delete from DB - RLS will ensure only owners can delete
    const { error: deleteError } = await supabase
      .from('media')
      .delete()
      .eq('id', id);
      
    if (deleteError) {
      console.error('Error deleting media item:', deleteError);
      throw deleteError;
    }
    
    console.log('Media item deleted successfully');
    return true;
  } catch (error: any) {
    console.error('Error in deleteMediaItem:', error);
    toast({
      title: "Delete failed",
      description: error.message || "An error occurred while deleting the file",
      variant: "destructive",
    });
    throw error;
  }
}
