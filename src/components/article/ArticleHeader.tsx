
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Eye } from 'lucide-react';
import SocialShareButtons from '@/components/SocialShareButtons';

interface ArticleHeaderProps {
  title: string;
  publishedAt?: string;
  viewCount: number;
  categoryName?: string;
  categorySlug?: string;
  url: string;
}

const ArticleHeader = ({ 
  title, 
  publishedAt, 
  viewCount, 
  categoryName, 
  categorySlug,
  url 
}: ArticleHeaderProps) => {
  return (
    <header className="mb-8">
      {categoryName && categorySlug && (
        <Link 
          to={`/category/${categorySlug}`}
          className="inline-block px-3 py-1 bg-naija-green text-white text-sm rounded-full mb-4"
        >
          {categoryName}
        </Link>
      )}
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h1>
      
      <div className="flex flex-wrap items-center text-gray-500 mb-6">
        {publishedAt && (
          <span className="flex items-center mr-6 mb-2">
            <Calendar className="mr-1 h-4 w-4" />
            {new Date(publishedAt).toLocaleDateString()} 
            ({formatDistanceToNow(new Date(publishedAt), { addSuffix: true })})
          </span>
        )}
        
        <span className="flex items-center mb-2">
          <Eye className="mr-1 h-4 w-4" />
          {viewCount} {viewCount === 1 ? 'view' : 'views'}
        </span>
      </div>
      
      {/* Social share buttons (desktop) */}
      <div className="hidden md:block mb-6">
        <SocialShareButtons url={url} title={title} />
      </div>
    </header>
  );
};

export default ArticleHeader;
