
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Clock, Eye, Check, Star, Smile } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import SEOHead from '@/components/SEOHead';
import { fetchArticlesByCategory } from '@/services/articles';

const SelfImprovementPage = () => {
  // We're using a fixed slug for this specific category page
  const categorySlug = 'self-improvement';
  const categoryName = 'Self-improvement & Life Hacks';

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
        description={`Simple life hacks, productivity tips, and self-improvement strategies to help you live your best life.`}
        keywords={[categoryName, 'productivity', 'motivation', 'life hacks', 'self-help', 'personal growth']}
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
            Simple strategies, clever hacks, and practical tips to improve your daily life and reach your potential.
          </p>
        </div>

        {/* Quick Tips Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Smile className="mr-2 text-purple-500" />
            Quick Tips for Today
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-white p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Morning Routine</h3>
                <p className="text-sm text-gray-600">Start your day with 5 minutes of meditation for improved focus.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Productivity Hack</h3>
                <p className="text-sm text-gray-600">Use the 2-minute rule: if it takes less than 2 minutes, do it now.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-white p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Evening Wind-down</h3>
                <p className="text-sm text-gray-600">Write three things you're grateful for before bed to boost happiness.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <Card className="mb-12 overflow-hidden border-2 border-purple-200">
          <div className="md:flex">
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1565022536102-f7645c84354a?q=80&w=2073"
                alt="Productivity setup with journal and coffee"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 p-6">
              <Badge className="mb-2 bg-purple-100 text-purple-800">Featured Article</Badge>
              <h3 className="text-2xl font-bold mb-2">7 Life Hacks to Boost Productivity Every Day</h3>
              <p className="text-gray-600 mb-4">
                Simple yet effective strategies to optimize your daily routine and accomplish more without burning out.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">10 min read</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">2.4k views</span>
                </div>
              </div>
              <Link to="/article/7-life-hacks-to-boost-productivity-every-day" className="text-naija-green font-medium hover:underline">
                Read Article →
              </Link>
            </div>
          </div>
        </Card>

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
                      src={article.featured_image || 'https://placehold.co/600x400/E5DEFF/333333?text=Self+Improvement'} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="default" className="bg-purple-500">Self-improvement</Badge>
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

        {/* Focus Areas Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Star className="mr-2" />
            Focus Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link to="/tag/productivity" className="group">
              <Card className="text-center h-full group-hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Productivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Work smarter, not harder with these effective techniques.</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/tag/mindfulness" className="group">
              <Card className="text-center h-full group-hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Mindfulness</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Practices for mental clarity and emotional well-being.</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/tag/habits" className="group">
              <Card className="text-center h-full group-hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Habit Building</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Create lasting positive habits that transform your life.</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/tag/organization" className="group">
              <Card className="text-center h-full group-hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Organization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Systems and hacks to declutter your space and mind.</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/tag/learning" className="group">
              <Card className="text-center h-full group-hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Accelerate your learning and master new skills faster.</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/tag/relationships" className="group">
              <Card className="text-center h-full group-hover:border-purple-300 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">Relationships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Build stronger connections with effective communication.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelfImprovementPage;
