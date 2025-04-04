
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface SearchResult {
  id: string;
  title: string;
  excerpt?: string | null;
  slug: string;
  published_at?: string | null;
  category_name?: string | null;
  featured_image?: string | null;
}

// Search articles in Supabase
export async function searchArticles(query: string): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(`
        id, 
        title, 
        excerpt, 
        slug, 
        published_at, 
        featured_image,
        categories!inner(name)
      `)
      .eq('status', 'published')
      .ilike('title', `%${query}%`)
      .order('published_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      slug: article.slug,
      published_at: article.published_at,
      category_name: article.categories?.name || null,
      featured_image: article.featured_image,
    }));
  } catch (error: any) {
    console.error('Error searching articles:', error);
    toast({
      title: "Search error",
      description: error.message || "Failed to search articles",
      variant: "destructive"
    });
    return [];
  }
}

// Search in specific category
export async function searchArticlesByCategory(query: string, categorySlug: string): Promise<SearchResult[]> {
  if (!query.trim() || !categorySlug.trim()) {
    return [];
  }

  try {
    // First get the category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id, name')
      .eq('slug', categorySlug)
      .single();

    if (categoryError) {
      throw categoryError;
    }

    const { data, error } = await supabase
      .from('articles')
      .select(`
        id, 
        title, 
        excerpt, 
        slug, 
        published_at, 
        featured_image
      `)
      .eq('status', 'published')
      .eq('category_id', categoryData.id)
      .ilike('title', `%${query}%`)
      .order('published_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(article => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt,
      slug: article.slug,
      published_at: article.published_at,
      category_name: categoryData.name,
      featured_image: article.featured_image,
    }));
  } catch (error: any) {
    console.error('Error searching articles by category:', error);
    toast({
      title: "Search error",
      description: error.message || "Failed to search articles in category",
      variant: "destructive"
    });
    return [];
  }
}
