
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
