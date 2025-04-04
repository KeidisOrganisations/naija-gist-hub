
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, EyeIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  published_at?: string;
  view_count: number;
  featured_image?: string;
}

interface RelatedArticlesProps {
  categoryId: string;
  currentArticleId: string;
}

const RelatedArticles = ({ categoryId, currentArticleId }: RelatedArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, slug, excerpt, published_at, view_count, featured_image')
          .eq('category_id', categoryId)
          .eq('status', 'published')
          .neq('id', currentArticleId)
          .order('published_at', { ascending: false })
          .limit(3);
          
        if (error) throw error;
        
        setArticles(data || []);
      } catch (err: any) {
        console.error('Error fetching related articles:', err);
        setError(err.message || 'Failed to load related articles');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRelatedArticles();
  }, [categoryId, currentArticleId]);

  if (isLoading) {
    return (
      <div className="py-6 flex justify-center">
        <LoadingSpinner text="Loading related articles..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card key={article.id} className="h-full flex flex-col">
            <Link to={`/article/${article.slug}`} className="flex-grow">
              {article.featured_image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              )}
              
              <CardContent className="pt-4 flex-grow">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-naija-green transition-colors">
                  {article.title}
                </h3>
                
                {article.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {article.excerpt}
                  </p>
                )}
                
                <div className="flex items-center text-gray-500 text-xs mt-auto">
                  {article.published_at && (
                    <span className="flex items-center mr-4">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  )}
                  
                  <span className="flex items-center">
                    <EyeIcon className="mr-1 h-3 w-3" />
                    {article.view_count} views
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
