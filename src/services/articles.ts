
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Article {
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
export const fetchArticles = async () => {
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
export const fetchCategories = async () => {
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
export const deleteArticle = async (id: string) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

// Delete multiple articles
export const deleteMultipleArticles = async (ids: string[]) => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .in('id', ids);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

// Update article status
export const updateArticleStatus = async ({ ids, status }: { ids: string[], status: string }) => {
  const { error } = await supabase
    .from('articles')
    .update({ status })
    .in('id', ids);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

// Fetch a single article by ID
export const fetchArticleById = async (id: string) => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

// Create or update an article
export const saveArticle = async (articleData: any, isNew: boolean) => {
  if (isNew) {
    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select();
      
    if (error) throw error;
    return data[0];
  } else {
    const { data, error } = await supabase
      .from('articles')
      .update(articleData)
      .eq('id', articleData.id)
      .select();
      
    if (error) throw error;
    return data[0];
  }
};
