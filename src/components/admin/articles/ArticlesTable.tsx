
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Article } from '@/services/articles';

interface ArticlesTableProps {
  articles: Article[];
  isLoading: boolean;
  selectedArticles: string[];
  onSelectAll: () => void;
  onSelectArticle: (id: string) => void;
  onDeleteArticle: (id: string) => void;
}

const ArticlesTable = ({
  articles,
  isLoading,
  selectedArticles,
  onSelectAll,
  onSelectArticle,
  onDeleteArticle
}: ArticlesTableProps) => {
  const navigate = useNavigate();

  const handleEditArticle = (id: string) => {
    navigate(`/admin/articles/edit/${id}`);
  };

  const handleViewArticle = (id: string) => {
    // Open in a new tab
    window.open(`/article/${id}`, '_blank');
  };

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="h-24 text-center">
          Loading articles...
        </TableCell>
      </TableRow>
    );
  }

  if (articles.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="h-24 text-center">
          No articles found.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">
            <Checkbox 
              checked={selectedArticles.length === articles.length && articles.length > 0}
              onCheckedChange={onSelectAll}
              aria-label="Select all articles"
            />
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Views</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article: Article) => (
          <TableRow key={article.id}>
            <TableCell>
              <Checkbox
                checked={selectedArticles.includes(article.id)}
                onCheckedChange={() => onSelectArticle(article.id)}
                aria-label={`Select article ${article.title}`}
              />
            </TableCell>
            <TableCell className="font-medium">{article.title}</TableCell>
            <TableCell>{article.category ? article.category.name : 'Uncategorized'}</TableCell>
            <TableCell>
              <span 
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${article.status === 'published' ? 'bg-green-100 text-green-800' : 
                    article.status === 'draft' ? 'bg-gray-100 text-gray-800' : 
                    'bg-yellow-100 text-yellow-800'}`
                }
              >
                {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>
              {format(new Date(article.created_at), 'yyyy-MM-dd')}
            </TableCell>
            <TableCell>{article.view_count.toLocaleString()}</TableCell>
            <TableCell className="flex justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => handleViewArticle(article.id)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => handleEditArticle(article.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Article</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete "{article.title}"? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button 
                      variant="destructive" 
                      onClick={() => onDeleteArticle(article.id)}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArticlesTable;
