
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ArticleNotFoundProps {
  error?: string | null;
  onRetry?: () => void;
}

const ArticleNotFound = ({ error, onRetry }: ArticleNotFoundProps) => {
  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-center">
            {error || 'Article not found'}
          </h1>
          
          <p className="text-center mb-6 text-gray-600">
            {error && error.includes('network') ? 
              'There was a problem connecting to the server. Please check your internet connection.' :
              'The article you\'re looking for doesn\'t exist or has been removed.'}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="default">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return to Homepage
              </Link>
            </Button>
            
            {onRetry && (
              <Button 
                variant="outline" 
                onClick={onRetry}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleNotFound;
