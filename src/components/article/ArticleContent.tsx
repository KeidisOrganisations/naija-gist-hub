
import { useEffect } from 'react';
import SocialShareButtons from '@/components/SocialShareButtons';
import { Tag } from 'lucide-react';

interface ArticleContentProps {
  content: string;
  featuredImage?: string | null;
  title: string;
  url: string;
  tags?: string[];
}

const ArticleContent = ({ content, featuredImage, title, url, tags = [] }: ArticleContentProps) => {
  // Create HTML from content
  const createMarkup = () => {
    return { __html: content };
  };

  // Scroll to top when article content changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [content]);

  // Extract tags from content if not provided
  const derivedTags = tags.length > 0 ? tags : ['Nigeria', 'How-to', 'Guide'];

  return (
    <div className="article-content">
      {/* Featured image */}
      {featuredImage && (
        <div className="mb-8">
          <img 
            src={featuredImage} 
            alt={title}
            className="w-full h-auto rounded-lg object-cover shadow-md"
            style={{ maxHeight: '500px' }}
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
        className="prose prose-lg max-w-none mb-8 prose-headings:text-naija-green prose-a:text-blue-600"
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
        {derivedTags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleContent;
