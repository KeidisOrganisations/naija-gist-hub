
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface ArticleNotFoundProps {
  error?: string | null;
}

const ArticleNotFound = ({ error }: ArticleNotFoundProps) => {
  return (
    <Card className="w-full max-w-3xl">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
          
          <h1 className="text-2xl font-bold text-center">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleNotFound;
