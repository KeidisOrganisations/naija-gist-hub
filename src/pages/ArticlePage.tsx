
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialShareButtons from '@/components/SocialShareButtons';
import EnhancedCommentSection from '@/components/EnhancedCommentSection';
import { fetchArticleById } from '@/services/articles';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import SEOHead from '@/components/SEOHead';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await fetchArticleById(id);
        setArticle(data);
        setError(null);
      } catch (err: any) {
        console.error('Error loading article:', err);
        setError(err.message || 'Failed to load article');
      } finally {
        setIsLoading(false);
      }

      // Scroll to top when article loads
      window.scrollTo(0, 0);
    };

    loadArticle();
  }, [id]);

  // Format the publishing date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  // Get author initials for avatar
  const getAuthorInitials = () => {
    if (!article?.author?.first_name && !article?.author?.last_name) return '??';
    
    const first = article.author.first_name ? article.author.first_name[0] : '';
    const last = article.author.last_name ? article.author.last_name[0] : '';
    
    return (first + last).toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={article ? `${article.title} | Naija Times` : 'Loading Article | Naija Times'}
        description={article?.excerpt || 'Read this article on Naija Times.'}
        keywords={article?.category?.name ? [article.category.name] : []}
        ogImage={article?.featured_image || undefined}
        ogType="article"
      />
      <Navbar />
      
      <main className="flex-grow pb-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner text="Loading article..." />
          </div>
        ) : error ? (
          <div className="container mx-auto px-4 py-12">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
              <p className="mb-6">{error}</p>
              <Button onClick={() => window.history.back()}>
                Go Back
              </Button>
            </Card>
          </div>
        ) : article ? (
          <>
            {/* Hero section with image */}
            {article.featured_image && (
              <div className="w-full h-[40vh] md:h-[50vh] relative">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="container px-4 mx-auto absolute inset-0 flex items-end pb-8 z-20">
                  <div className="max-w-3xl">
                    {article.category && (
                      <Badge className="mb-4 bg-naija-green hover:bg-naija-green">
                        {article.category.name}
                      </Badge>
                    )}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                      {article.title}
                    </h1>
                    <div className="flex items-center text-white/80">
                      <span>
                        {article.published_at
                          ? formatDate(article.published_at)
                          : formatDate(article.created_at)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{article.view_count} views</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Main content */}
            <div className="container px-4 mx-auto py-8">
              <div className="max-w-3xl mx-auto">
                {/* If no featured image, display title here */}
                {!article.featured_image && (
                  <div className="mb-8">
                    {article.category && (
                      <Badge className="mb-4 bg-naija-green hover:bg-naija-green">
                        {article.category.name}
                      </Badge>
                    )}
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {article.title}
                    </h1>
                    <div className="flex items-center text-gray-600">
                      <span>
                        {article.published_at
                          ? formatDate(article.published_at)
                          : formatDate(article.created_at)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{article.view_count} views</span>
                    </div>
                  </div>
                )}
                
                {/* Author info */}
                <div className="flex items-center mb-8 border-b pb-4">
                  <Avatar className="mr-3">
                    <AvatarFallback>{getAuthorInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {article.author?.first_name && article.author?.last_name
                        ? `${article.author.first_name} ${article.author.last_name}`
                        : 'Anonymous Author'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Naija Times Contributor
                    </div>
                  </div>
                </div>
                
                {/* Social share buttons */}
                <div className="mb-8">
                  <SocialShareButtons
                    url={window.location.href}
                    title={article.title}
                    media={article.featured_image}
                  />
                </div>
                
                {/* Article content */}
                <div 
                  className="prose prose-lg max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
                
                {/* Tags and sharing */}
                <div className="flex flex-wrap justify-between items-center mb-12 pt-6 border-t">
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                    <Badge variant="outline">Nigeria</Badge>
                    <Badge variant="outline">How-To</Badge>
                    <Badge variant="outline">{article.category?.name || 'General'}</Badge>
                  </div>
                  
                  <SocialShareButtons
                    url={window.location.href}
                    title={article.title}
                    media={article.featured_image}
                  />
                </div>
                
                {/* Comments section */}
                <EnhancedCommentSection articleId={article.id} />
              </div>
            </div>
          </>
        ) : null}
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticlePage;
