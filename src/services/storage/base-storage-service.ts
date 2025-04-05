
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
