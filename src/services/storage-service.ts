
import { supabase } from '@/integrations/supabase/client';

// Initialize storage bucket if it doesn't exist
export async function initializeStorage() {
  try {
    // Check if assets bucket exists
    const { data: buckets, error: getBucketsError } = await supabase
      .storage
      .listBuckets();
    
    if (getBucketsError) {
      console.error('Error checking storage buckets:', getBucketsError);
      return false;
    }
    
    const assetsBucketExists = buckets.some(bucket => bucket.name === 'assets');
    
    if (!assetsBucketExists) {
      // Create assets bucket with public access
      const { error: createBucketError } = await supabase
        .storage
        .createBucket('assets', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
      
      if (createBucketError) {
        console.error('Error creating assets bucket:', createBucketError);
        return false;
      }
      
      console.log('Assets storage bucket created successfully');
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing storage:', error);
    return false;
  }
}
