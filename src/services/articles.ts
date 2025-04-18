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
  } | null;
  author?: {
    first_name: string | null;
    last_name: string | null;
  } | null;
  content: string;
  excerpt?: string | null;
  slug: string;
  featured_image?: string | null;
  published_at?: string | null;
  updated_at: string;
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

// Fetch articles by category slug
export const fetchArticlesByCategory = async (categorySlug: string) => {
  // First, get the category ID from the slug
  const { data: categoryData, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();

  if (categoryError) {
    throw new Error(`Category not found: ${categoryError.message}`);
  }

  // Then fetch articles for that category
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(name)
    `)
    .eq('category_id', categoryData.id)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Fetch latest articles with limit
export const fetchLatestArticles = async (limit = 5) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(name)
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Fetch trending articles based on view count
export const fetchTrendingArticles = async (limit = 5) => {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(name)
    `)
    .eq('status', 'published')
    .order('view_count', { ascending: false })
    .limit(limit);

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
  console.log('Fetching article by ID:', id);
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(name)
    `)
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching article:', error);
    throw new Error(error.message);
  }
  
  console.log('Article fetched successfully:', data);
  
  // Increment view count
  await supabase
    .from('articles')
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq('id', id);
  
  return data;
};

// Create or update an article
export const saveArticle = async (articleData: Partial<Article> & { title: string; content: string; slug: string }, isNew: boolean) => {
  console.log('======== SAVE ARTICLE FUNCTION ========');
  console.log('isNew flag:', isNew);
  console.log('Article data:', JSON.stringify(articleData, null, 2));
  
  try {
    // Get current user ID for author_id if not provided
    if (!articleData.author_id) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        articleData.author_id = user.id;
      }
    }

    // Handle empty category_id
    if (articleData.category_id === undefined || articleData.category_id === '') {
      articleData.category_id = null;
    }

    if (isNew) {
      console.log('Creating new article (INSERT operation)');
      
      // For new articles, create a new object without ID
      const newArticleData = {
        title: articleData.title,
        content: articleData.content,
        slug: articleData.slug,
        status: articleData.status || 'draft',
        category_id: articleData.category_id,
        author_id: articleData.author_id,
        featured_image: articleData.featured_image,
        excerpt: articleData.excerpt,
        published_at: articleData.published_at
      };
      
      console.log('INSERT data:', JSON.stringify(newArticleData, null, 2));
      
      const { data, error } = await supabase
        .from('articles')
        .insert([newArticleData])
        .select();
        
      if (error) {
        console.error('Error during INSERT:', error);
        throw error;
      }
      
      console.log('INSERT successful, returned data:', data);
      if (data && data.length > 0) {
        return data[0];
      } else {
        throw new Error('No data returned from insert operation');
      }
    } else {
      // For updates, we need the ID
      if (!articleData.id) {
        console.error('Article ID missing for update operation');
        throw new Error('Article ID is required for updates');
      }
      
      console.log('Updating article with ID:', articleData.id);
      
      // Make sure we have a valid ID before proceeding
      const articleId = articleData.id;
      const updateData = { ...articleData };
      
      const { data, error } = await supabase
        .from('articles')
        .update(updateData)
        .eq('id', articleId)
        .select();
        
      if (error) {
        console.error('Error during UPDATE:', error);
        throw error;
      }
      
      console.log('UPDATE successful, returned data:', data);
      if (data && data.length > 0) {
        return data[0];
      } else {
        throw new Error('No data returned from update operation');
      }
    }
  } catch (error: any) {
    console.error('Error saving article:', error);
    toast({
      title: "Error saving article",
      description: error.message || "An unknown error occurred",
      variant: "destructive",
      duration: 5000,
    });
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData: { name: string; slug: string; description?: string }) => {
  const { data, error } = await supabase
    .from('categories')
    .insert([categoryData])
    .select();
    
  if (error) {
    throw new Error(error.message);
  }
  
  return data[0];
};
