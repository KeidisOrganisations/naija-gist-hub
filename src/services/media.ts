
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface MediaItem {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  folder_id: string | null;
  uploaded_at: string;
}

// Fetch media items from Supabase
export const fetchMediaItems = async () => {
  try {
    const { data, error } = await supabase
      .from('media_items')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching media items:', error);
      throw new Error(error.message);
    }
    
    return data || [];
  } catch (error: any) {
    console.error('Error in fetchMediaItems:', error);
    toast({
      title: "Error loading media",
      description: error.message || "Could not load media items",
      variant: "destructive",
    });
    return [];
  }
};

// Fetch media folders from Supabase
export const fetchMediaFolders = async () => {
  try {
    const { data, error } = await supabase
      .from('media_folders')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(error.message);
    }
    
    return data || [];
  } catch (error: any) {
    console.error('Error in fetchMediaFolders:', error);
    toast({
      title: "Error loading folders",
      description: error.message || "Could not load media folders",
      variant: "destructive",
    });
    return [];
  }
};

// Upload a media file to Supabase
export const uploadMediaFile = async (file: File, folder_id: string | null = null) => {
  try {
    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
    
    console.log('Uploading file to storage:', filePath);
    
    // Upload the file to Supabase Storage
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }
    
    console.log('File uploaded successfully, getting public URL');
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
      
    console.log('Public URL:', publicUrl);
      
    // Insert the file info into the media_items table
    const { data, error: insertError } = await supabase
      .from('media_items')
      .insert([
        {
          name: file.name,
          file_type: file.type,
          file_size: file.size,
          file_path: publicUrl,
          folder_id: folder_id
        }
      ])
      .select();
      
    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }
    
    console.log('Media item created in database:', data);
    
    return data[0];
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Delete a media item
export const deleteMediaItem = async (id: string) => {
  try {
    // Get the file path first
    const { data: mediaItem, error: fetchError } = await supabase
      .from('media_items')
      .select('file_path')
      .eq('id', id)
      .single();
      
    if (fetchError) throw fetchError;
    
    // Extract the storage path from the public URL
    const urlParts = mediaItem.file_path.split('/');
    const storagePath = `uploads/${urlParts[urlParts.length - 1]}`;
    
    console.log('Deleting file from storage:', storagePath);
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([storagePath]);
      
    if (storageError) {
      console.error('Storage delete error:', storageError);
      throw storageError;
    }
    
    // Delete from database
    const { error: deleteError } = await supabase
      .from('media_items')
      .delete()
      .eq('id', id);
      
    if (deleteError) {
      console.error('Database delete error:', deleteError);
      throw deleteError;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting media item:', error);
    throw error;
  }
};

// Create a new folder
export const createMediaFolder = async (name: string, parent_id: string | null = null) => {
  try {
    const { data, error } = await supabase
      .from('media_folders')
      .insert([
        { name, parent_id }
      ])
      .select();
      
    if (error) throw error;
    
    return data[0];
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};
