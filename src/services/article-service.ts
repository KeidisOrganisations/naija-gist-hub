
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Article {
  id?: string;
  title: string;
  content: string;
  slug: string;
  category_id?: string | null;
  status?: string;
  author_id?: string | null;
  featured_image?: string | null;
  excerpt?: string | null;
  published_at?: string | null;
  view_count?: number;
  created_at?: string;
  updated_at?: string;
  category?: {
    name: string;
  } | null;
  author?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

// Fetch all articles with related data
export async function fetchArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(name),
      author:profiles(first_name, last_name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    toast({
      title: "Error fetching articles",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  return data || [];
}

// Fetch a single article by ID
export async function fetchArticleById(id: string) {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(name),
      author:profiles(first_name, last_name)
    `)
    .eq('id', id)
    .single();
    
  if (error) {
    toast({
      title: "Error fetching article",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  // Increment view count
  await supabase
    .from('articles')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', id);
  
  return data;
}

// Create a new article
export async function createArticle(article: Omit<Article, 'id'>) {
  const { data, error } = await supabase
    .from('articles')
    .insert([article])
    .select();

  if (error) {
    toast({
      title: "Error creating article",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  toast({
    title: "Article created",
    description: "Your article has been created successfully.",
  });
  
  return data[0];
}

// Update an existing article
export async function updateArticle(id: string, article: Partial<Article>) {
  const { data, error } = await supabase
    .from('articles')
    .update(article)
    .eq('id', id)
    .select();

  if (error) {
    toast({
      title: "Error updating article",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  toast({
    title: "Article updated",
    description: "Your article has been updated successfully.",
  });
  
  return data[0];
}

// Delete an article
export async function deleteArticle(id: string) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    toast({
      title: "Error deleting article",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  toast({
    title: "Article deleted",
    description: "The article has been deleted successfully.",
  });
  
  return true;
}

// Fetch categories
export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    toast({
      title: "Error fetching categories",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  return data || [];
}

// Create a new category
export async function createCategory(category: { name: string; slug: string; description?: string }) {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select();
    
  if (error) {
    toast({
      title: "Error creating category",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  toast({
    title: "Category created",
    description: "Your category has been created successfully.",
  });
  
  return data[0];
}

// Bulk update article status
export async function updateArticleStatus(ids: string[], status: string) {
  const { error } = await supabase
    .from('articles')
    .update({ status })
    .in('id', ids);

  if (error) {
    toast({
      title: "Error updating articles",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  toast({
    title: "Articles updated",
    description: `${ids.length} articles have been updated.`,
  });
  
  return true;
}

// Bulk delete articles
export async function deleteArticles(ids: string[]) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .in('id', ids);

  if (error) {
    toast({
      title: "Error deleting articles",
      description: error.message,
      variant: "destructive",
    });
    throw error;
  }
  
  toast({
    title: "Articles deleted",
    description: `${ids.length} articles have been deleted.`,
  });
  
  return true;
}
