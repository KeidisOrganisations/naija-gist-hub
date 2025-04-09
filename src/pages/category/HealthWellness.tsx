
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import SEOHead from '@/components/SEOHead';
import { fetchArticlesByCategory } from '@/services/articles';

const HealthWellnessPage = () => {
  // We're using a fixed slug for this specific category page
  const categorySlug = 'health-wellness';
  const categoryName = 'Health & Wellness';

  const {
    data: articles,
    isLoading,
    error
  } = useQuery({
    queryKey: ['articles', categorySlug],
    queryFn: () => fetchArticlesByCategory(categorySlug),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${categoryName} | Naija Times`}
        description={`Explore our collection of ${categoryName} articles, tips, and guides.`}
        keywords={[categoryName, 'health', 'wellness', 'lifestyle', 'fitness', 'mental health']}
      />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/category">Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoryName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover practical tips for better physical health, mindful living, and balanced wellness.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" text="Loading articles..." />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">Failed to load articles. Please try again later.</p>
          </div>
        ) : !articles || articles.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-gray-500">
              Check back soon for new content in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link to={`/article/${article.slug}`} key={article.id}>
                <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg">
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={article.featured_image || 'https://placehold.co/600x400/9AE19D/FFFFFF?text=Health+%26+Wellness'} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="success">Health & Wellness</Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{article.view_count || 0}</span>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt || article.content.substring(0, 120) + '...'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {article.published_at 
                          ? new Date(article.published_at).toLocaleDateString() 
                          : new Date(article.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Featured Article Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <span className="mr-2">📝</span>
            Featured Article
          </h2>
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070"
                  alt="Woman doing yoga at home"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <Badge variant="success" className="mb-2">Featured</Badge>
                <h3 className="text-2xl font-bold mb-2">How to Create a Simple Home Workout Routine</h3>
                <p className="text-gray-600 mb-4">
                  Discover how to create an effective home workout routine that fits your schedule, space constraints, and fitness goals—no fancy equipment required.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>April 8, 2025</span>
                </div>
                <Link to="/article/how-to-create-a-simple-home-workout-routine" className="text-naija-green font-medium hover:underline">
                  Read More →
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HealthWellnessPage;
