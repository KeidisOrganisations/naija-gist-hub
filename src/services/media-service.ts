
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface MediaItem {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  file_path: string;
  uploaded_by?: string | null;
  created_at: string;
}

// Fetch media items
export async function fetchMediaItems() {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    toast({
      title: "Error fetching media",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  return data as MediaItem[] || [];
}

// Upload a media file
export async function uploadMediaFile(file: File) {
  // First, upload the file to Supabase Storage
  const filePath = `media/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  
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

  // Get the public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('assets')
    .getPublicUrl(filePath);

  // Then, add a record to the media table
  const { data, error } = await supabase
    .from('media')
    .insert([{
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      file_path: publicUrl,
    }])
    .select()
    .single();

  if (error) {
    toast({
      title: "Error saving media record",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  return data;
}

// Delete a media item
export async function deleteMediaItem(id: string) {
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

  // Extract the path from the URL
  const path = mediaItem.file_path.split('/').pop();
  if (path) {
    // Delete from storage
    const { error: storageError } = await supabase
      .storage
      .from('assets')
      .remove([`media/${path}`]);

    if (storageError) {
      console.error("Error deleting file from storage:", storageError);
      // We'll still try to delete the database record
    }
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
  
  return true;
}
