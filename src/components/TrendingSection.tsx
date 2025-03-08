
import { Link } from 'react-router-dom';
import { Clock, Eye, MessageSquare } from 'lucide-react';

// Sample trending articles data
const trendingArticles = [
  {
    id: 1,
    title: "How to Save Money for House Rent in Lagos Without Killing Yourself",
    category: "Finance",
    readTime: "5 min read",
    views: "2.5K",
    comments: 48,
    image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=2340&auto=format&fit=crop",
    slug: "save-money-house-rent-lagos"
  },
  {
    id: 2,
    title: "NYSC Survival Guide: From Camp to PPA Without Tears",
    category: "Life",
    readTime: "8 min read",
    views: "4.2K",
    comments: 120,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2340&auto=format&fit=crop",
    slug: "nysc-survival-guide"
  },
  {
    id: 3,
    title: "How to Start a Small Business with Just ₦50,000",
    category: "Business",
    readTime: "6 min read",
    views: "3.8K",
    comments: 85,
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935d5?q=80&w=2340&auto=format&fit=crop",
    slug: "start-small-business-50000-naira"
  },
  {
    id: 4,
    title: "How to Apply for Canadian Study Visa from Nigeria",
    category: "Education",
    readTime: "10 min read",
    views: "5.1K",
    comments: 132,
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=2334&auto=format&fit=crop",
    slug: "apply-canadian-study-visa-nigeria"
  },
  {
    id: 5,
    title: "Best Affordable Android Phones Under ₦100,000 in 2023",
    category: "Tech",
    readTime: "7 min read",
    views: "3.5K",
    comments: 62,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2340&auto=format&fit=crop",
    slug: "affordable-android-phones-under-100000"
  },
  {
    id: 6,
    title: "How to Make the Perfect Jollof Rice That Will Shame Ghanaians",
    category: "Life",
    readTime: "8 min read",
    views: "6.2K",
    comments: 215,
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=2340&auto=format&fit=crop",
    slug: "perfect-jollof-rice-recipe"
  }
];

const TrendingSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-4">Trending How-Tos</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out what other Nigerians are learning right now!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingArticles.map((article) => (
            <Link 
              key={article.id}
              to={`/article/${article.slug}`}
              className="group block overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-sm font-medium bg-white/90 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-naija-green transition-colors">
                  {article.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    <span>{article.comments}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
