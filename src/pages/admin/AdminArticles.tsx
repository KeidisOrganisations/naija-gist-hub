
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

// Type for the article data from Supabase
interface Article {
  id: string;
  title: string;
  category_id: string;
  status: string;
  created_at: string;
  author_id: string | null;
  view_count: number;
  category?: {
    name: string;
  };
  author?: {
    first_name: string;
    last_name: string;
  };
}

// Fetch articles from Supabase
const fetchArticles = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Fetch categories from Supabase
const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Delete an article
const deleteArticle = async (id: string) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

// Update article status
const updateArticleStatus = async ({ ids, status }: { ids: string[], status: string }) => {
  const { error } = await supabase
    .from('articles')
    .update({ status })
    .in('id', ids);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

const AdminArticles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch articles with React Query
  const {
    data: articles = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles
  });

  // Fetch categories with React Query
  const {
    data: categories = [],
    isLoading: isCategoriesLoading
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Delete article mutation
  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({
        title: "Article deleted",
        description: "The article has been successfully deleted.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete article: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: updateArticleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({
        title: "Status updated",
        description: `Articles have been ${selectedArticles.length > 1 ? 'updated' : 'published'}.`,
        duration: 3000,
      });
      setSelectedArticles([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update status: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Filter articles based on search and filters
  const filteredArticles = articles.filter((article: Article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || article.status === selectedStatus.toLowerCase();
    const matchesCategory = selectedCategory === 'All' || 
      (article.category && article.category.name === selectedCategory);
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / pageSize);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectAll = () => {
    if (selectedArticles.length === paginatedArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(paginatedArticles.map(article => article.id));
    }
  };

  const handleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter(articleId => articleId !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedArticles.length === 0) return;
    
    // Delete each selected article
    Promise.all(selectedArticles.map(id => deleteMutation.mutateAsync(id)))
      .then(() => {
        toast({
          title: `${selectedArticles.length} articles deleted`,
          description: "The selected articles have been successfully deleted.",
          duration: 3000,
        });
        setSelectedArticles([]);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: `Failed to delete articles: ${error.message}`,
          variant: "destructive",
          duration: 5000,
        });
      });
  };

  const handlePublishSelected = () => {
    if (selectedArticles.length === 0) return;
    
    updateStatusMutation.mutate({
      ids: selectedArticles,
      status: 'published'
    });
  };

  const handleDeleteArticle = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleCreateArticle = () => {
    navigate('/admin/articles/new');
  };

  const handleEditArticle = (id: string) => {
    navigate(`/admin/articles/edit/${id}`);
  };

  const handleViewArticle = (id: string) => {
    // Get the article's slug
    const article = articles.find((a: Article) => a.id === id);
    if (article) {
      // Open in a new tab
      window.open(`/article/${id}`, '_blank');
    }
  };

  if (isError) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error loading articles: {(error as Error).message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Articles</h1>
            <Button 
              variant="default" 
              className="bg-naija-green hover:bg-naija-green/90"
              onClick={handleCreateArticle}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </div>
        </header>
        
        <main className="p-6">
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              {selectedArticles.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={handlePublishSelected}>
                    Publish Selected
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                    Delete Selected
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Articles Table */}
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedArticles.length === paginatedArticles.length && paginatedArticles.length > 0}
                      onCheckedChange={handleSelectAll}
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Loading articles...
                    </TableCell>
                  </TableRow>
                ) : paginatedArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No articles found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedArticles.map((article: Article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedArticles.includes(article.id)}
                          onCheckedChange={() => handleSelectArticle(article.id)}
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
                                onClick={() => handleDeleteArticle(article.id)}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {paginatedArticles.length} of {filteredArticles.length} articles
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminArticles;
