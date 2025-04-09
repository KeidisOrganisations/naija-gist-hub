
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, Eye, GraduationCap } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import SEOHead from '@/components/SEOHead';
import { fetchArticlesByCategory } from '@/services/articles';

const CareerDevelopmentPage = () => {
  // We're using a fixed slug for this specific category page
  const categorySlug = 'career-development';
  const categoryName = 'Career Development';

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
        description={`Expert career advice, CV tips, interview preparation, and professional development strategies.`}
        keywords={[categoryName, 'career', 'jobs', 'CV', 'interview', 'professional']}
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
            Advance your professional journey with expert advice on resumes, interviews, networking, and career growth.
          </p>
        </div>

        {/* Featured Career Resources */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <GraduationCap className="mr-2" />
            Featured Career Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <Badge variant="outline" className="mb-2 w-fit">Most Popular</Badge>
                <CardTitle>How to Write a CV That Gets You Noticed</CardTitle>
                <CardDescription>
                  Learn the essential elements of a standout CV that will impress employers and land you interviews.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/article/how-to-write-a-cv-that-gets-you-noticed" className="text-naija-green font-medium hover:underline">
                  Read Guide →
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <Badge variant="outline" className="mb-2 w-fit">New Guide</Badge>
                <CardTitle>Ace Your Next Job Interview</CardTitle>
                <CardDescription>
                  Proven strategies to prepare for common questions and make a lasting impression on potential employers.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/article/ace-your-next-job-interview" className="text-naija-green font-medium hover:underline">
                  Read Guide →
                </Link>
              </CardFooter>
            </Card>
          </div>
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
                      src={article.featured_image || 'https://placehold.co/600x400/D3E4FD/333333?text=Career+Development'} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge>Career Development</Badge>
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

        {/* Career Stages Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Briefcase className="mr-2" />
            Career Stages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Entry Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Starting your professional journey? Find resources for new graduates.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/tag/entry-level" className="text-naija-green text-sm hover:underline">
                  Browse Articles
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Mid-Career</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Ready to level up? Discover strategies for career advancement.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/tag/mid-career" className="text-naija-green text-sm hover:underline">
                  Browse Articles
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Tips for new and experienced managers to lead effectively.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/tag/management" className="text-naija-green text-sm hover:underline">
                  Browse Articles
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Executive</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Resources for C-suite leaders and senior management.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/tag/executive" className="text-naija-green text-sm hover:underline">
                  Browse Articles
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerDevelopmentPage;
