
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Initialize storage buckets if they don't exist
export async function initializeStorage() {
  try {
    // Check if buckets exist
    const { data: buckets, error: getBucketsError } = await supabase
      .storage
      .listBuckets();
    
    if (getBucketsError) {
      console.error('Error checking storage buckets:', getBucketsError);
      toast({
        title: "Storage Error",
        description: "Could not verify storage buckets. Some features might not work properly.",
        variant: "destructive",
      });
      return false;
    }
    
    const mediaBucketExists = buckets?.some(bucket => bucket.name === 'media');
    const assetsBucketExists = buckets?.some(bucket => bucket.name === 'assets');
    
    if (!mediaBucketExists || !assetsBucketExists) {
      console.log('Some required buckets do not exist');
      toast({
        title: "Storage Notice",
        description: "Required storage buckets not found. Please contact an administrator.",
        variant: "destructive",
      });
      return false;
    } else {
      console.log('All required storage buckets exist');
      return true;
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
    toast({
      title: "Storage Error",
      description: "Failed to initialize storage system.",
      variant: "destructive",
    });
    return false;
  }
}

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
