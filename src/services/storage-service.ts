
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
      toast({
        title: "Storage Ready",
        description: "Media storage system is initialized and available.",
      });
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
