
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticlesPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  itemCount: number;
  totalCount: number;
}

const ArticlesPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  itemCount,
  totalCount
}: ArticlesPaginationProps) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing {itemCount} of {totalCount} articles
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ArticlesPagination;
