
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Clock, DollarSign, Eye, PiggyBank, Wallet } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import SEOHead from '@/components/SEOHead';
import { fetchArticlesByCategory } from '@/services/articles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PersonalFinancePage = () => {
  // We're using a fixed slug for this specific category page
  const categorySlug = 'personal-finance';
  const categoryName = 'Personal Finance';

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
        description={`Expert financial advice, budgeting tips, and money management strategies for Nigerians.`}
        keywords={[categoryName, 'money', 'finance', 'budgeting', 'investing', 'savings']}
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
            Master your money with practical tips on budgeting, saving, investing, and building financial independence.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="all">All Topics</TabsTrigger>
            <TabsTrigger value="budgeting">Budgeting</TabsTrigger>
            <TabsTrigger value="investing">Investing</TabsTrigger>
            <TabsTrigger value="saving">Saving</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {/* All articles will be shown here */}
          </TabsContent>
          <TabsContent value="budgeting">
            {/* Budgeting articles would be filtered here */}
          </TabsContent>
          <TabsContent value="investing">
            {/* Investing articles would be filtered here */}
          </TabsContent>
          <TabsContent value="saving">
            {/* Saving articles would be filtered here */}
          </TabsContent>
        </Tabs>

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
                      src={article.featured_image || 'https://placehold.co/600x400/E5DEFF/333333?text=Personal+Finance'} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">Personal Finance</Badge>
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

        {/* Finance Highlights Section */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <DollarSign className="mr-2" />
            Finance Essentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <PiggyBank className="h-12 w-12 text-purple-500" />
                </div>
                <CardTitle className="text-center">Budget Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Learn how to create a budget that works for your lifestyle and financial goals.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/article/how-to-start-budgeting-for-your-first-job" className="text-naija-green font-medium hover:underline">
                  Read Guide →
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Wallet className="h-12 w-12 text-purple-500" />
                </div>
                <CardTitle className="text-center">Saving Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Discover practical ways to build your savings consistently, even on a tight budget.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/article/simple-saving-strategies" className="text-naija-green font-medium hover:underline">
                  Read Guide →
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <DollarSign className="h-12 w-12 text-purple-500" />
                </div>
                <CardTitle className="text-center">Investment Basics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Start your investment journey with these beginner-friendly tips and strategies.</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/article/investing-for-beginners" className="text-naija-green font-medium hover:underline">
                  Read Guide →
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

export default PersonalFinancePage;
