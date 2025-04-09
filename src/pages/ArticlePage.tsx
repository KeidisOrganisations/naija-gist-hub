
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

// Function to fetch article by slug
const fetchArticleBySlug = async (slug: string | undefined) => {
  if (!slug) throw new Error('Article slug is missing');
  
  console.log(`Fetching article with slug: ${slug}`);
  
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        id, name, slug
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  
  if (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
  
  if (!data) {
    throw new Error('Article not found');
  }
  
  console.log('Article found:', data);
  
  // Instead of immediately incrementing view count, we'll do it in the background
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
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Use React Query for data fetching with automatic caching
  const { 
    data: article, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => fetchArticleBySlug(slug),
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    onError: (err: any) => {
      console.error('Error in article query:', err);
      toast({
        title: "Article Error",
        description: err.message || "Could not load the article",
        variant: "destructive",
      });
    }
  });
  
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
