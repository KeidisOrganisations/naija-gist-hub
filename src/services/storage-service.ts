
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
        title: "Storage Error",
        description: "Could not access storage buckets. Some features may be limited.",
        variant: "destructive",
      });
      return false;
    }
    
    const mediaBucketExists = buckets?.some(bucket => bucket.name === 'media');
    
    if (!mediaBucketExists) {
      try {
        // Create media bucket with public access
        const { error: createBucketError } = await supabase
          .storage
          .createBucket('media', {
            public: true,
            fileSizeLimit: 10485760, // 10MB
          });
        
        if (createBucketError) {
          console.error('Error creating media bucket:', createBucketError);
          toast({
            title: "Storage Setup Error",
            description: "Could not create storage bucket. Media uploads may not work.",
            variant: "destructive",
          });
          return false;
        }
        
        console.log('Media storage bucket created successfully');
        toast({
          title: "Storage Ready",
          description: "Storage system has been initialized successfully.",
        });
      } catch (error) {
        console.error('Bucket creation error:', error);
        return false;
      }
    }
    
    return true;
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
