
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import SEOHead from '@/components/SEOHead';
import ArticleContainer from '@/components/article/ArticleContainer';
import ArticleNotFound from '@/components/article/ArticleNotFound';
import { toast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  published_at?: string;
  view_count: number;
  featured_image?: string;
  category_id?: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

// Function to fetch article by slug or id
const fetchArticle = async (params: { id?: string; slug?: string }) => {
  const { id, slug } = params;
  
  if (!id && !slug) {
    throw new Error('Article identifier is missing');
  }
  
  let query = supabase
    .from('articles')
    .select(`
      *,
      categories (
        id, name, slug
      )
    `)
    .eq('status', 'published');
    
  // Apply the appropriate filter based on what we have
  if (id) {
    console.log(`Fetching article with ID: ${id}`);
    query = query.eq('id', id);
  } else if (slug) {
    console.log(`Fetching article with slug: ${slug}`);
    query = query.eq('slug', slug);
  }
  
  const { data, error } = await query.single();
  
  if (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
  
  if (!data) {
    throw new Error('Article not found');
  }
  
  console.log('Article found:', data);
  
  // Increment view count in the background
  incrementViewCount(data.id, data.view_count);
  
  return data;
};

// Function to increment view count in the background
const incrementViewCount = async (articleId: string, currentViewCount: number) => {
  try {
    const { error } = await supabase
      .from('articles')
      .update({ view_count: currentViewCount + 1 })
      .eq('id', articleId);
    
    if (error) console.error('Error updating view count:', error);
  } catch (err) {
    console.error('Failed to update view count:', err);
  }
};

const ArticlePage = () => {
  // Get both potential parameters
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const navigate = useNavigate();
  
  // Use React Query for data fetching with automatic caching
  const { 
    data: article, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['article', id || slug],
    queryFn: () => fetchArticle({ id, slug }),
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    meta: {
      errorToast: true
    }
  });
  
  // Handle errors separately instead of using onSettled
  useEffect(() => {
    if (error) {
      console.error('Error in article query:', error);
      toast({
        title: "Article Error",
        description: (error as Error).message || "Could not load the article",
        variant: "destructive",
      });
    }
  }, [error]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <LoadingSpinner size="lg" text="Loading article..." />
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <ArticleNotFound error={(error as Error)?.message || null} onRetry={refetch} />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${article.title} | Naija Times`}
        description={article.excerpt || `Read about ${article.title}`}
        keywords={[article.categories?.name || 'news', 'article', 'Nigeria']}
        ogImage={article.featured_image}
      />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <ArticleContainer article={article} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
