
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

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const fetchArticle = async () => {
    if (!slug) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
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
      
      if (data) {
        console.log('Article found:', data);
        setArticle(data);
        
        // Increment view count
        const { error: updateError } = await supabase
          .from('articles')
          .update({ view_count: data.view_count + 1 })
          .eq('id', data.id);
        
        if (updateError) console.error('Error updating view count:', updateError);
      }
    } catch (err: any) {
      console.error('Error in fetchArticle:', err);
      setError(err.message || 'Failed to load article');
      
      toast({
        title: "Article Error",
        description: err.message || "Could not load the article",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchArticle();
  }, [slug]);
  
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
          <ArticleNotFound error={error} onRetry={fetchArticle} />
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
