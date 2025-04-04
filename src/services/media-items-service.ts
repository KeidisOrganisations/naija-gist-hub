import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface MediaItem {
  id: string;
  name: string;
  file_name?: string;
  file_path: string;
  file_type: string;
  file_size: number;
  folder_id: string | null;
  uploaded_at: string;
  created_at?: string;
  uploaded_by?: string | null;
}

// Fetch media items
export async function fetchMediaItems() {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .order('uploaded_at', { ascending: false });

  if (error) {
    toast({
      title: "Error fetching media",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  return data || [];
}

// Upload a media file
export async function uploadMediaFile(file: File) {
  // Generate a unique file path
  const filePath = `media/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  
  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('assets')
    .upload(filePath, file);

  if (uploadError) {
    toast({
      title: "Error uploading file",
      description: uploadError.message,
      variant: "destructive",
    });
    throw uploadError;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('assets')
    .getPublicUrl(filePath);

  // Add record to media table
  const { data, error } = await supabase
    .from('media')
    .insert([{
      name: file.name,
      file_path: publicUrl,
      file_type: file.type,
      file_size: file.size,
    }])
    .select();

  if (error) {
    toast({
      title: "Error saving media record",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  return data[0];
}

// Delete a media item
export async function deleteMediaItem(id: string) {
  // First get the file path to delete from storage
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

  // Parse the URL to get the storage path
  const url = new URL(mediaItem.file_path);
  const pathWithoutHost = url.pathname;
  const storagePath = pathWithoutHost.split('/').slice(2).join('/');
  
  if (storagePath) {
    // Delete from storage
    const { error: storageError } = await supabase
      .storage
      .from('assets')
      .remove([storagePath]);

    if (storageError) {
      console.error("Error deleting file from storage:", storageError);
    }
  }

  // Delete database record
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
  
  return true;
}
