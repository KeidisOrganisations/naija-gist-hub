
import { toast } from '@/hooks/use-toast';
import { 
  fetchMediaItems as fetchMedia, 
  uploadMediaFile, 
  deleteMediaItem 
} from '../media-service';
import type { MediaItem } from '../media-service';

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

// Export types and functions
export type { MediaItem };
export { uploadMediaFile, deleteMediaItem };
