import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Smartphone, Heart, DollarSign, Users, Newspaper } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

// Category data matching the data in CategorySection
const categories = {
  tech: {
    title: "Tech",
    description: "AI tools, online money-making, trending apps",
    icon: Smartphone,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  life: {
    title: "Life",
    description: "Travel tips, government documents, street smarts",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  money: {
    title: "Money",
    description: "Banking, savings, loans, investments, side hustles",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  relationships: {
    title: "Relationships",
    description: "Dating, friendships, family, networking tips",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  news: {
    title: "News",
    description: "Trending Nigerian news, social media buzz, viral stories",
    icon: Newspaper,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  }
};

// Placeholder article data
const articles = [
  {
    id: "1",
    title: "How to Start Making Money with AI Tools in Nigeria",
    category: "tech",
    excerpt: "Discover the best AI tools that can help you earn income online without coding skills.",
    image: "https://placehold.co/600x400/9AE19D/FFFFFF?text=AI+Tools",
    date: "June 12, 2023",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Top 5 Apps Every Nigerian Student Should Have in 2023",
    category: "tech",
    excerpt: "These essential apps will help you study better, save money, and stay organized.",
    image: "https://placehold.co/600x400/9AE19D/FFFFFF?text=Student+Apps",
    date: "May 28, 2023",
    readTime: "4 min read"
  },
  {
    id: "3",
    title: "How to Create a Side Hustle with Just Your Smartphone",
    category: "tech",
    excerpt: "Turn your smartphone into a money-making machine with these simple strategies.",
    image: "https://placehold.co/600x400/9AE19D/FFFFFF?text=Smartphone+Hustle",
    date: "April 15, 2023",
    readTime: "7 min read"
  },
  // Life articles
  {
    id: "4",
    title: "Getting Your International Passport in Nigeria Without Stress",
    category: "life",
    excerpt: "A step-by-step guide to obtaining your passport without the usual headaches.",
    image: "https://placehold.co/600x400/FFDA79/FFFFFF?text=Passport+Guide",
    date: "June 5, 2023",
    readTime: "8 min read"
  },
  {
    id: "5",
    title: "Budget-Friendly Weekend Getaways Near Lagos",
    category: "life",
    excerpt: "Discover amazing places to relax without breaking the bank.",
    image: "https://placehold.co/600x400/FFDA79/FFFFFF?text=Weekend+Getaways",
    date: "May 20, 2023",
    readTime: "6 min read"
  },
  // Money articles
  {
    id: "6",
    title: "How to Open a Dollar Account in Nigeria: Complete Guide",
    category: "money",
    excerpt: "Protect your savings from naira depreciation with this step-by-step guide.",
    image: "https://placehold.co/600x400/9AE19D/FFFFFF?text=Dollar+Account",
    date: "June 10, 2023", 
    readTime: "6 min read"
  },
  {
    id: "7",
    title: "5 Investment Apps Every Nigerian Should Be Using",
    category: "money",
    excerpt: "Start growing your wealth with these easy-to-use investment platforms.",
    image: "https://placehold.co/600x400/9AE19D/FFFFFF?text=Investment+Apps",
    date: "May 25, 2023",
    readTime: "5 min read"
  },
  // Relationships articles
  {
    id: "8",
    title: "How to Network Effectively at Nigerian Events",
    category: "relationships",
    excerpt: "Build valuable connections without awkwardness using these proven strategies.",
    image: "https://placehold.co/600x400/9AE19D/FFFFFF?text=Networking",
    date: "June 8, 2023",
    readTime: "5 min read"
  },
  {
    id: "9",
    title: "Dating in Lagos: How to Find Genuine Connections",
    category: "relationships",
    excerpt: "Navigate the Lagos dating scene with these practical tips.",
    image: "https://placehold.co/600x400/9AE19D/FFFFFF?text=Dating+Tips",
    date: "May 30, 2023",
    readTime: "7 min read"
  },
  // News articles
  {
    id: "10",
    title: "What You Need to Know About the New CBN Policies",
    category: "news",
    excerpt: "Breaking down the latest CBN policies and how they affect you.",
    image: "https://placehold.co/600x400/FFDA79/FFFFFF?text=CBN+News",
    date: "June 11, 2023",
    readTime: "4 min read"
  },
  {
    id: "11",
    title: "Trending Social Media Challenges in Nigeria This Month",
    category: "news",
    excerpt: "Stay updated on the viral challenges taking over Nigerian social media.",
    image: "https://placehold.co/600x400/FFDA79/FFFFFF?text=Social+Media",
    date: "June 1, 2023",
    readTime: "3 min read"
  }
];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? categories[slug as keyof typeof categories] : null;
  
  useEffect(() => {
    if (category) {
      toast({
        title: `${category.title} Category`,
        description: `Browse the latest ${category.title.toLowerCase()} content`,
        duration: 3000,
      });
    }
  }, [slug]);

  // Filter articles by category
  const categoryArticles = articles.filter(article => article.category === slug);

  if (!category) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`py-16 ${category.bgColor}`}>
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full ${category.color} mb-6`}>
                <category.icon size={40} />
              </div>
              <h1 className="text-4xl font-bold font-heading mb-4">{category.title}</h1>
              <p className="text-xl text-gray-700 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold font-heading mb-8">Latest {category.title} Articles</h2>
            
            {categoryArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No articles yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryArticles.map(article => (
                  <Link 
                    key={article.id} 
                    to={`/article/${article.id}`}
                    className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 font-heading hover:text-naija-green transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
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
