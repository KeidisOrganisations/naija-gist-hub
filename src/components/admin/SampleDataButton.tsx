
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { addSampleData, checkSampleData } from '@/scripts/sampleArticles';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const SampleDataButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  const queryClient = useQueryClient();
  
  // Check if data already exists
  useEffect(() => {
    const checkData = async () => {
      const exists = await checkSampleData();
      setHasData(exists);
    };
    
    checkData();
  }, []);
  
  const handleAddSampleData = async () => {
    try {
      setIsLoading(true);
      
      const result = await addSampleData();
      
      if (result.success) {
        toast({
          title: "Sample data added successfully!",
          description: `Added ${result.categories} categories and ${result.articles} articles.`,
        });
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        queryClient.invalidateQueries({ queryKey: ['trending-articles'] });
        
        setHasData(true);
      } else if (result.message === 'Sample data already exists') {
        toast({
          title: "Sample data already exists",
          description: "Your database already contains categories and articles.",
        });
      } else {
        throw new Error(result.error?.message || 'Unknown error');
      }
    } catch (error: any) {
      toast({
        title: "Error adding sample data",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={handleAddSampleData}
      disabled={isLoading || hasData}
      className="bg-naija-green hover:bg-naija-green/90"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding Sample Data...
        </>
      ) : hasData ? (
        'Sample Data Already Added'
      ) : (
        'Add Sample Articles & Categories'
      )}
    </Button>
  );
};

export default SampleDataButton;
