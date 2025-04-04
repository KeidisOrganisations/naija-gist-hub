
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ChevronLeft, Calendar, Eye, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnhancedCommentSection from '@/components/EnhancedCommentSection';
import RelatedArticles from '@/components/RelatedArticles';
import SocialShareButtons from '@/components/SocialShareButtons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';
import { toast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

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
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
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
        
        if (error) throw error;
        
        if (data) {
          setArticle(data);
          
          // Increment view count
          const { error: updateError } = await supabase
            .from('articles')
            .update({ view_count: data.view_count + 1 })
            .eq('id', data.id);
          
          if (updateError) console.error('Error updating view count:', updateError);
        }
      } catch (err: any) {
        console.error('Error fetching article:', err);
        setError(err.message || 'Failed to load article');
      } finally {
        setIsLoading(false);
      }
    };
    
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
          <Card className="w-full max-w-3xl">
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold text-center mb-4">
                {error || 'Article not found'}
              </h1>
              <p className="text-center mb-6 text-gray-600">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <div className="flex justify-center">
                <Button asChild>
                  <Link to="/">Return to Homepage</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Create HTML from markdown content
  const createMarkup = () => {
    return { __html: article.content };
  };
  
  const articleUrl = window.location.href;
  
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
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/" className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          {/* Article header */}
          <header className="mb-8">
            {article.categories && (
              <Link 
                to={`/category/${article.categories.slug}`}
                className="inline-block px-3 py-1 bg-naija-green text-white text-sm rounded-full mb-4"
              >
                {article.categories.name}
              </Link>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-500 mb-6">
              {article.published_at && (
                <span className="flex items-center mr-6 mb-2">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(article.published_at).toLocaleDateString()} 
                  ({formatDistanceToNow(new Date(article.published_at), { addSuffix: true })})
                </span>
              )}
              
              <span className="flex items-center mb-2">
                <Eye className="mr-1 h-4 w-4" />
                {article.view_count} {article.view_count === 1 ? 'view' : 'views'}
              </span>
            </div>
            
            {/* Social share buttons (desktop) */}
            <div className="hidden md:block mb-6">
              <SocialShareButtons url={articleUrl} title={article.title} />
            </div>
          </header>
          
          {/* Featured image */}
          {article.featured_image && (
            <div className="mb-8">
              <img 
                src={article.featured_image} 
                alt={article.title}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
          
          {/* Article content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={createMarkup()}
          />
          
          {/* Social share buttons (mobile) */}
          <div className="block md:hidden mb-6">
            <SocialShareButtons url={articleUrl} title={article.title} />
          </div>
          
          {/* Tags section placeholder */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="flex items-center text-gray-700 font-medium">
              <Tag className="mr-1 h-4 w-4" />
              Tags:
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Nigeria</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">How-to</span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Guide</span>
          </div>
          
          {/* Comments section */}
          <EnhancedCommentSection articleId={article.id} />
          
          {/* Related articles */}
          {article.category_id && (
            <RelatedArticles categoryId={article.category_id} currentArticleId={article.id} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
