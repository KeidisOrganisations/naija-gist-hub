
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Smartphone, Heart, DollarSign, Users, Newspaper } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

// Icons for different categories
const categoryIcons = {
  tech: { icon: Smartphone, color: "text-purple-600", bgColor: "bg-purple-100" },
  life: { icon: Heart, color: "text-red-600", bgColor: "bg-red-100" },
  money: { icon: DollarSign, color: "text-green-600", bgColor: "bg-green-100" },
  relationships: { icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
  news: { icon: Newspaper, color: "text-orange-600", bgColor: "bg-orange-100" },
};

// Types
interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  created_at: string;
  category_id: string;
}

// Fetch category by slug
const fetchCategoryBySlug = async (slug: string | undefined) => {
  if (!slug) return null;
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }
  
  return data;
};

// Fetch articles by category ID
const fetchArticlesByCategory = async (categoryId: string | undefined) => {
  if (!categoryId) return [];
  
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
  
  return data;
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Estimate read time
const calculateReadTime = (content?: string) => {
  if (!content) return '3 min read'; // Default
  
  // Average reading speed: 200 words per minute
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Fetch category data
  const { 
    data: category,
    isLoading: isCategoryLoading,
    isError: isCategoryError
  } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => fetchCategoryBySlug(slug)
  });

  // Fetch articles for this category
  const {
    data: articles = [],
    isLoading: isArticlesLoading,
    isError: isArticlesError
  } = useQuery({
    queryKey: ['categoryArticles', category?.id],
    queryFn: () => fetchArticlesByCategory(category?.id),
    enabled: !!category?.id
  });
  
  // Get icon for the category
  const getCategoryStyle = (slug: string) => {
    if (categoryIcons[slug as keyof typeof categoryIcons]) {
      return categoryIcons[slug as keyof typeof categoryIcons];
    }
    // Default if not found
    return { icon: Newspaper, color: "text-gray-600", bgColor: "bg-gray-100" };
  };
  
  useEffect(() => {
    if (category) {
      toast({
        title: `${category.name} Category`,
        description: `Browse the latest ${category.name.toLowerCase()} content`,
        duration: 3000,
      });
    }
  }, [category]);

  const isLoading = isCategoryLoading || isArticlesLoading;
  const isError = isCategoryError || isArticlesError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-6">Sorry, the category you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { icon: Icon, color, bgColor } = getCategoryStyle(slug || '');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`py-16 ${bgColor}`}>
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full ${color} mb-6`}>
                <Icon size={40} />
              </div>
              <h1 className="text-4xl font-bold font-heading mb-4">{category.name}</h1>
              <p className="text-xl text-gray-700 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-8">Latest {category.name} Articles</h2>
            
            {articles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No articles yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article: Article) => (
                  <Link 
                    key={article.id} 
                    to={`/article/${article.id}`}
                    className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <img 
                      src={article.featured_image || "https://placehold.co/600x400/9AE19D/FFFFFF?text=Article+Image"} 
                      alt={article.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 font-heading hover:text-naija-green transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt || article.title}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{formatDate(article.created_at)}</span>
                        <span>{calculateReadTime(article.excerpt)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
