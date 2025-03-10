
import { Button } from '@/components/ui/button';

interface ArticleBulkActionsProps {
  selectedArticles: string[];
  onPublish: () => void;
  onDelete: () => void;
}

const ArticleBulkActions = ({ 
  selectedArticles, 
  onPublish, 
  onDelete 
}: ArticleBulkActionsProps) => {
  if (selectedArticles.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onPublish}>
        Publish Selected
      </Button>
      <Button variant="destructive" size="sm" onClick={onDelete}>
        Delete Selected
      </Button>
    </div>
  );
};

export default ArticleBulkActions;
