
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ArticleNotFoundProps {
  error?: string | null;
}

const ArticleNotFound = ({ error }: ArticleNotFoundProps) => {
  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="pt-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          {error || 'Article not found'}
        </h1>
        <p className="text-center mb-6 text-gray-600">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex justify-center">
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleNotFound;
