
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchArticleById, 
  createArticle, 
  updateArticle, 
  fetchCategories,
  Article
} from '@/services/article-service';

export function useArticleEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const isNew = !id || id === 'new';
  
  const [article, setArticle] = useState<Partial<Article>>({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    status: 'draft',
    category_id: '',
    featured_image: ''
  });
  
  // Fetch article if editing
  const { 
    data: fetchedArticle, 
    isLoading: isArticleLoading 
  } = useQuery({
    queryKey: ['article', id],
    queryFn: () => (isNew ? null : fetchArticleById(id as string)),
    enabled: !isNew
  });
  
  // Fetch categories
  const { 
    data: categories = [] 
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
  
  // Set article data when fetched
  useEffect(() => {
    if (fetchedArticle) {
      setArticle(fetchedArticle);
    }
  }, [fetchedArticle]);
  
  // Generate slug from title for new articles
  useEffect(() => {
    if (isNew && article.title && (!article.slug || article.slug === '')) {
      setArticle(prev => ({
        ...prev,
        slug: article.title.toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-')
      }));
    }
  }, [isNew, article.title]);
  
  // Handle field changes
  const handleChange = (field: keyof Article, value: any) => {
    setArticle(prev => ({ ...prev, [field]: value }));
  };
  
  // Create article mutation
  const createMutation = useMutation({
    mutationFn: createArticle,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      navigate(`/admin/articles/edit/${data.id}`);
    }
  });
  
  // Update article mutation
  const updateMutation = useMutation({
    mutationFn: (data: Partial<Article>) => {
      if (!id || isNew) throw new Error("Cannot update without ID");
      return updateArticle(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', id] });
    }
  });
  
  // Save article
  const saveArticle = async (publishAfterSave = false) => {
    // Validation
    if (!article.title || !article.content || !article.slug) {
      throw new Error("Title, content and slug are required");
    }
    
    const saveData = { 
      ...article,
      status: publishAfterSave ? 'published' : article.status
    };
    
    if (publishAfterSave && !article.published_at) {
      saveData.published_at = new Date().toISOString();
    }
    
    if (isNew) {
      createMutation.mutate(saveData as Required<Pick<Article, 'title' | 'content' | 'slug'>> & Omit<Article, 'id'>);
    } else {
      updateMutation.mutate(saveData);
    }
  };
  
  return {
    article,
    setArticle,
    handleChange,
    saveArticle,
    isNew,
    isArticleLoading,
    categories,
    isSaving: createMutation.isPending || updateMutation.isPending,
    navigate
  };
}
