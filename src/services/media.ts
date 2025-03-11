
import { supabase } from '@/integrations/supabase/client';

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
  const { data, error } = await supabase
    .from('media_items')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Fetch media folders from Supabase
export const fetchMediaFolders = async () => {
  const { data, error } = await supabase
    .from('media_folders')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Upload a media file to Supabase
export const uploadMediaFile = async (file: File, folder_id: string | null = null) => {
  try {
    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
    
    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);
      
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
      
    if (insertError) throw insertError;
    
    return data[0];
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Delete a media item
export const deleteMediaItem = async (id: string) => {
  // Get the file path first
  const { data: mediaItem, error: fetchError } = await supabase
    .from('media_items')
    .select('file_path')
    .eq('id', id)
    .single();
    
  if (fetchError) throw fetchError;
  
  // Extract the storage path from the public URL
  const storagePath = mediaItem.file_path.split('/').pop();
  const path = `uploads/${storagePath}`;
  
  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('media')
    .remove([path]);
    
  if (storageError) throw storageError;
  
  // Delete from database
  const { error: deleteError } = await supabase
    .from('media_items')
    .delete()
    .eq('id', id);
    
  if (deleteError) throw deleteError;
  
  return true;
};

// Create a new folder
export const createMediaFolder = async (name: string, parent_id: string | null = null) => {
  const { data, error } = await supabase
    .from('media_folders')
    .insert([
      { name, parent_id }
    ])
    .select();
    
  if (error) throw error;
  
  return data[0];
};
