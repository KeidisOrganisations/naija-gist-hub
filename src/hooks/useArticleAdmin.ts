
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  fetchArticles, 
  deleteArticle, 
  updateArticleStatus, 
  deleteArticles,
  Article
} from '@/services/article-service';

export function useArticleAdmin() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch articles
  const {
    data: articles = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['admin-articles'],
    queryFn: fetchArticles
  });

  // Delete article mutation
  const deleteMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      setSelectedArticles([]);
    }
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: (params: { ids: string[], status: string }) => 
      updateArticleStatus(params.ids, params.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      setSelectedArticles([]);
    }
  });

  // Bulk delete mutation
  const bulkDeleteMutation = useMutation({
    mutationFn: deleteArticles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      setSelectedArticles([]);
    }
  });

  // Filter articles based on search, status, and category
  const filteredArticles = (articles as Article[]).filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || 
      article.status?.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesCategory = selectedCategory === 'All' || 
      (article.category?.name === selectedCategory);
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedCategory]);

  // Handle article selection
  const handleSelectAll = () => {
    if (selectedArticles.length === paginatedArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(paginatedArticles.map(article => article.id as string));
    }
  };

  const handleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter(articleId => articleId !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  // Handle article actions
  const handleDeleteArticle = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleDeleteSelected = () => {
    if (selectedArticles.length > 0) {
      bulkDeleteMutation.mutate(selectedArticles);
    }
  };

  const handlePublishSelected = () => {
    if (selectedArticles.length > 0) {
      updateStatusMutation.mutate({
        ids: selectedArticles,
        status: 'published'
      });
    }
  };

  // Extract unique categories from articles
  const categories = Array.from(
    new Set((articles as Article[]).map((article) => article.category?.name).filter(Boolean))
  ).map(name => ({ name }));

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
    
    // Data
    articles,
    filteredArticles,
    paginatedArticles,
    categories,
    totalPages,
    
    // Loading states
    isLoading,
    isError,
    error,
    
    // Actions
    handleSelectAll,
    handleSelectArticle,
    handleDeleteArticle,
    handleDeleteSelected,
    handlePublishSelected,
    navigate
  };
}
