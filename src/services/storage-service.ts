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
    
    // Log available buckets for debugging
    console.log('Available buckets:', buckets);
    
    const mediaBucketExists = buckets?.some(bucket => bucket.name === 'media');
    const assetsBucketExists = buckets?.some(bucket => bucket.name === 'assets');
    
    if (!mediaBucketExists || !assetsBucketExists) {
      console.log('Some required buckets not found, but we can still use external images');
      console.log(`Media bucket exists: ${mediaBucketExists}, Assets bucket exists: ${assetsBucketExists}`);
      return true; // Return true anyway since we have fallbacks
    } else {
      console.log('All required storage buckets exist');
      return true;
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
    toast({
      title: "Storage Notice",
      description: "Using external image sources as fallback.",
    });
    return true; // Return true anyway to allow app to function
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

// This file re-exports from media-service.ts for backward compatibility
import { 
  fetchMediaItems as fetchMedia, 
  uploadMediaFile, 
  deleteMediaItem 
} from './media-service';
import type { MediaItem } from './media-service';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type { MediaItem };
export { uploadMediaFile, deleteMediaItem };

// Fetch media items from Supabase - wrapper for backward compatibility
export const fetchMediaItems = async () => {
  try {
    return await fetchMedia();
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

// Fetch media folders (placeholder since media_folders doesn't exist in our schema yet)
export const fetchMediaFolders = async () => {
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
};

// Create a new folder (placeholder function since folders aren't implemented yet)
export const createMediaFolder = async (name: string, parent_id: string | null = null) => {
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
};
