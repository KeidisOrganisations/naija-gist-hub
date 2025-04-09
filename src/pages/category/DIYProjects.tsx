
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Clock, Eye, Hammer, Lightbulb, Wrench } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import SEOHead from '@/components/SEOHead';
import { fetchArticlesByCategory } from '@/services/articles';

const DIYProjectsPage = () => {
  // We're using a fixed slug for this specific category page
  const categorySlug = 'diy-projects';
  const categoryName = 'DIY Projects';

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
        description={`Creative DIY projects, home improvement ideas, and craft tutorials for beginners and experts.`}
        keywords={[categoryName, 'DIY', 'crafts', 'projects', 'home improvement', 'tutorials']}
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
            Discover creative and practical DIY projects for your home, garden, and personal spaces.
          </p>
        </div>

        {/* DIY Project Difficulty Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link to="/category/diy-projects?difficulty=beginner" className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200">
            Beginner Projects
          </Link>
          <Link to="/category/diy-projects?difficulty=intermediate" className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200">
            Intermediate Projects
          </Link>
          <Link to="/category/diy-projects?difficulty=advanced" className="px-4 py-2 bg-red-100 text-red-800 rounded-full hover:bg-red-200">
            Advanced Projects
          </Link>
          <Link to="/category/diy-projects?budget=low" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200">
            Budget-Friendly
          </Link>
        </div>

        {/* Featured Project */}
        <Card className="mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1974"
                alt="Wooden shelf with tools"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 p-6">
              <Badge variant="warning" className="mb-2">Featured Project</Badge>
              <h3 className="text-2xl font-bold mb-2">How to Build a Wooden Shelf With Simple Tools</h3>
              <p className="text-gray-600 mb-4">
                Transform your space with this beginner-friendly wooden shelf project that requires minimal tools and basic woodworking skills.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Wrench className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">Beginner</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">3-4 hours</span>
                </div>
              </div>
              <Link to="/article/how-to-build-a-wooden-shelf-with-simple-tools" className="text-naija-green font-medium hover:underline">
                View Project →
              </Link>
            </div>
          </div>
        </Card>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" text="Loading projects..." />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">Failed to load projects. Please try again later.</p>
          </div>
        ) : !articles || articles.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No projects found</h3>
            <p className="text-gray-500">
              Check back soon for new DIY project guides.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link to={`/article/${article.slug}`} key={article.id}>
                <Card className="h-full transition-transform hover:scale-105 hover:shadow-lg">
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={article.featured_image || 'https://placehold.co/600x400/FDE1D3/333333?text=DIY+Projects'} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="warning">DIY Projects</Badge>
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

        {/* Project Ideas Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Lightbulb className="mr-2" />
            Project Ideas By Room
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center bg-amber-50">
              <CardHeader>
                <CardTitle className="text-lg">Kitchen</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://placehold.co/300x200/FFDEE2/333333?text=Kitchen" 
                  alt="Kitchen projects"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm">10 projects</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/category/diy-projects/kitchen" className="text-naija-green text-sm hover:underline">
                  View Projects
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="text-center bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Living Room</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://placehold.co/300x200/D3E4FD/333333?text=Living+Room" 
                  alt="Living Room projects"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm">8 projects</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/category/diy-projects/living-room" className="text-naija-green text-sm hover:underline">
                  View Projects
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="text-center bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg">Bedroom</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://placehold.co/300x200/F2FCE2/333333?text=Bedroom" 
                  alt="Bedroom projects"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm">12 projects</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/category/diy-projects/bedroom" className="text-naija-green text-sm hover:underline">
                  View Projects
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="text-center bg-purple-50">
              <CardHeader>
                <CardTitle className="text-lg">Garden</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://placehold.co/300x200/E5DEFF/333333?text=Garden" 
                  alt="Garden projects"
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm">15 projects</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to="/category/diy-projects/garden" className="text-naija-green text-sm hover:underline">
                  View Projects
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

export default DIYProjectsPage;
