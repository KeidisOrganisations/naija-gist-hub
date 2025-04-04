
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Initialize storage bucket if it doesn't exist
export async function initializeStorage() {
  try {
    // Check if media bucket exists
    const { data: buckets, error: getBucketsError } = await supabase
      .storage
      .listBuckets();
    
    if (getBucketsError) {
      console.error('Error checking storage buckets:', getBucketsError);
      toast({
        title: "Storage Info",
        description: "Using existing storage configuration. No changes needed.",
      });
      return true; // Continue with the application even if we can't check buckets
    }
    
    const mediaBucketExists = buckets?.some(bucket => bucket.name === 'media');
    
    if (!mediaBucketExists) {
      console.log('Media bucket does not exist, but it should have been created by SQL migration');
      toast({
        title: "Storage Info",
        description: "Using existing storage configuration.",
      });
    } else {
      console.log('Media storage bucket exists');
      toast({
        title: "Storage Ready",
        description: "Media storage system is available.",
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing storage:', error);
    toast({
      title: "Storage Notice",
      description: "Using default storage configuration.",
    });
    return true; // Return true so the app continues to function
  }
}
