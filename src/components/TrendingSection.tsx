
import { Link } from 'react-router-dom';
import { Clock, Eye, MessageSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchTrendingArticles } from '@/services/articles';

const TrendingSection = () => {
  const { data: trendingArticles = [], isLoading } = useQuery({
    queryKey: ['trending-articles'],
    queryFn: () => fetchTrendingArticles(6)
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Trending How-Tos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Loading trending articles...
            </p>
          </div>
        </div>
      </section>
    );
  }

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
                  src={article.featured_image || 'https://placehold.co/600x400/9AE19D/FFFFFF?text=No+Image'} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-sm font-medium bg-white/90 rounded-full">
                    {article.category?.name || 'Uncategorized'}
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
                    <span>5 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{article.view_count || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    <span>0</span>
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
