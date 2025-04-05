
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Upload a file to a storage bucket
export async function uploadFile(file: File, bucket: string, path: string = '') {
  try {
    const filePath = path ? `${path}/${file.name}` : file.name;
    
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (error) {
      throw error;
    }
    
    // Get public URL for the uploaded file
    const { data: publicURL } = supabase
      .storage
      .from(bucket)
      .getPublicUrl(data.path);
      
    return {
      success: true,
      path: data.path,
      url: publicURL.publicUrl
    };
  } catch (error: any) {
    console.error('Error uploading file:', error);
    toast({
      title: "Upload Failed",
      description: error.message || "Failed to upload file",
      variant: "destructive",
    });
    
    return {
      success: false,
      error
    };
  }
}

// List files in a storage bucket
export async function listFiles(bucket: string, path: string = '') {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .list(path);
      
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      files: data
    };
  } catch (error: any) {
    console.error('Error listing files:', error);
    toast({
      title: "File Listing Failed",
      description: error.message || "Failed to list files",
      variant: "destructive",
    });
    
    return {
      success: false,
      error
    };
  }
}

// Delete a file from a storage bucket
export async function deleteFile(bucket: string, path: string) {
  try {
    const { error } = await supabase
      .storage
      .from(bucket)
      .remove([path]);
      
    if (error) {
      throw error;
    }
    
    return {
      success: true
    };
  } catch (error: any) {
    console.error('Error deleting file:', error);
    toast({
      title: "Deletion Failed",
      description: error.message || "Failed to delete file",
      variant: "destructive",
    });
    
    return {
      success: false,
      error
    };
  }
}
