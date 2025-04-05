
import SocialShareButtons from '@/components/SocialShareButtons';
import { Tag } from 'lucide-react';

interface ArticleContentProps {
  content: string;
  featuredImage?: string | null;
  title: string;
  url: string;
}

const ArticleContent = ({ content, featuredImage, title, url }: ArticleContentProps) => {
  // Create HTML from content
  const createMarkup = () => {
    return { __html: content };
  };

  return (
    <div className="article-content">
      {/* Featured image */}
      {featuredImage && (
        <div className="mb-8">
          <img 
            src={featuredImage} 
            alt={title}
            className="w-full h-auto rounded-lg object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/placeholder.svg';
            }}
          />
        </div>
      )}
      
      {/* Article content */}
      <div 
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={createMarkup()}
      />
      
      {/* Social share buttons (mobile) */}
      <div className="block md:hidden mb-6">
        <SocialShareButtons url={url} title={title} />
      </div>
      
      {/* Tags section */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="flex items-center text-gray-700 font-medium">
          <Tag className="mr-1 h-4 w-4" />
          Tags:
        </span>
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Nigeria</span>
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">How-to</span>
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Guide</span>
      </div>
    </div>
  );
};

export default ArticleContent;
