
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArticleHeader from './ArticleHeader';
import ArticleContent from './ArticleContent';
import EnhancedCommentSection from '@/components/EnhancedCommentSection';
import RelatedArticles from '@/components/RelatedArticles';

interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  published_at?: string;
  view_count: number;
  featured_image?: string;
  category_id?: string;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ArticleContainerProps {
  article: Article;
}

const ArticleContainer = ({ article }: ArticleContainerProps) => {
  const articleUrl = window.location.href;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/" className="flex items-center">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      
      {/* Article header */}
      <ArticleHeader 
        title={article.title}
        publishedAt={article.published_at}
        viewCount={article.view_count}
        categoryName={article.categories?.name}
        categorySlug={article.categories?.slug}
        url={articleUrl}
      />
      
      {/* Article content */}
      <ArticleContent 
        content={article.content}
        featuredImage={article.featured_image}
        title={article.title}
        url={articleUrl}
      />
      
      {/* Comments section */}
      <EnhancedCommentSection articleId={article.id} />
      
      {/* Related articles */}
      {article.category_id && (
        <RelatedArticles 
          categoryId={article.category_id} 
          currentArticleId={article.id} 
        />
      )}
    </div>
  );
};

export default ArticleContainer;
