
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, Pencil, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';

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
      <Button variant="outline" size="sm" onClick={onPublish} className="flex items-center">
        <Eye className="mr-2 h-4 w-4" />
        Publish {selectedArticles.length > 1 ? `(${selectedArticles.length})` : ''}
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="flex items-center">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete {selectedArticles.length > 1 ? `(${selectedArticles.length})` : ''}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedArticles.length === 1 
                ? 'the selected article' 
                : `${selectedArticles.length} selected articles`} 
              from the database. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticleBulkActions;
