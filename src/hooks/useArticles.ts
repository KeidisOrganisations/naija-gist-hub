import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { 
  Article, 
  fetchArticles, 
  fetchCategories,
  deleteArticle,
  deleteMultipleArticles,
  updateArticleStatus 
} from '@/services/articles';

export function useArticles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
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

  // Delete multiple articles mutation
  const deleteMultipleMutation = useMutation({
    mutationFn: deleteMultipleArticles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      toast({
        title: "Articles deleted",
        description: `${selectedArticles.length} articles have been successfully deleted.`,
        duration: 3000,
      });
      setSelectedArticles([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete articles: ${error.message}`,
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

  // Filter articles based on search and filters - with proper type handling
  const filteredArticles = (articles as Article[]).filter((article) => {
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
    
    // Use the bulk delete mutation
    deleteMultipleMutation.mutate(selectedArticles);
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

  return {
    // State
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    selectedArticles,
    currentPage,
    setCurrentPage,
    pageSize,
    
    // Data
    articles,
    categories,
    filteredArticles,
    paginatedArticles,
    totalPages,
    
    // Loading states
    isLoading,
    isCategoriesLoading,
    isError,
    error,
    
    // Actions
    handleSelectAll,
    handleSelectArticle,
    handleDeleteSelected,
    handlePublishSelected,
    handleDeleteArticle
  };
}
