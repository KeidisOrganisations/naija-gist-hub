
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { Article } from '../articles';

/**
 * Batch upload articles to the database
 * @param articles Array of article objects
 * @returns Result object with success status and details
 */
export async function batchAddArticles(articles: Array<Partial<Article> & { title: string; content: string; slug: string }>) {
  try {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Process articles in batches of 10 to avoid overloading the database
    const batchSize = 10;
    for (let i = 0; i < articles.length; i += batchSize) {
      const batch = articles.slice(i, i + batchSize);
      
      // Process each article in the current batch
      const { data, error } = await supabase
        .from('articles')
        .insert(batch.map(article => ({
          title: article.title,
          content: article.content,
          slug: article.slug,
          status: article.status || 'draft',
          category_id: article.category_id,
          excerpt: article.excerpt,
          featured_image: article.featured_image,
          author_id: article.author_id,
          published_at: article.status === 'published' ? new Date().toISOString() : null
        })))
        .select();
        
      if (error) {
        console.error('Batch upload error:', error);
        results.failed += batch.length;
        results.errors.push(error.message);
      } else {
        results.success += data.length;
      }
    }

    // Show toast message with results
    if (results.success > 0) {
      toast({
        title: "Articles imported",
        description: `Successfully imported ${results.success} articles. ${results.failed > 0 ? `Failed: ${results.failed}` : ''}`,
        variant: results.failed > 0 ? "warning" : "default",
      });
    } else {
      toast({
        title: "Import failed",
        description: `Failed to import articles: ${results.errors.join(', ')}`,
        variant: "destructive",
      });
    }

    return {
      success: results.success > 0,
      details: results
    };
  } catch (error: any) {
    console.error('Error in batch upload:', error);
    toast({
      title: "Import failed",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    });
    
    return {
      success: false,
      details: {
        success: 0,
        failed: articles.length,
        errors: [error.message]
      }
    };
  }
}

/**
 * Batch add media items to the database
 * @param mediaItems Array of media item data
 * @returns Result object with success status and details
 */
export async function batchAddMedia(mediaItems: Array<{ 
  name: string; 
  file_path: string; 
  file_type: string; 
  file_size: number; 
  folder_id?: string | null;
}>) {
  try {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Process media items in batches of 10
    const batchSize = 10;
    for (let i = 0; i < mediaItems.length; i += batchSize) {
      const batch = mediaItems.slice(i, i + batchSize);
      
      // Insert the current batch into the media table
      const { data, error } = await supabase
        .from('media')
        .insert(batch.map(item => ({
          name: item.name,
          file_path: item.file_path,
          file_type: item.file_type,
          file_size: item.file_size,
          folder_id: item.folder_id || null
        })))
        .select();
        
      if (error) {
        console.error('Media batch upload error:', error);
        results.failed += batch.length;
        results.errors.push(error.message);
      } else {
        results.success += data.length;
      }
    }

    // Show toast message with results
    if (results.success > 0) {
      toast({
        title: "Media imported",
        description: `Successfully imported ${results.success} media items. ${results.failed > 0 ? `Failed: ${results.failed}` : ''}`,
        variant: results.failed > 0 ? "warning" : "default",
      });
    } else {
      toast({
        title: "Import failed",
        description: `Failed to import media items: ${results.errors.join(', ')}`,
        variant: "destructive",
      });
    }

    return {
      success: results.success > 0,
      details: results
    };
  } catch (error: any) {
    console.error('Error in media batch upload:', error);
    toast({
      title: "Media import failed",
      description: error.message || "An unexpected error occurred",
      variant: "destructive",
    });
    
    return {
      success: false,
      details: {
        success: 0,
        failed: mediaItems.length,
        errors: [error.message]
      }
    };
  }
}

/**
 * Parse JSON or CSV data for batch import
 * @param content String content to parse (JSON or CSV format)
 * @param type Type of content to import ('articles' or 'media')
 * @returns Parsed array of items
 */
export function parseImportContent(content: string, type: 'articles' | 'media') {
  try {
    // Try parsing as JSON first
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      } else if (typeof parsed === 'object' && parsed !== null) {
        // If it's a single object, wrap in array
        return [parsed];
      }
    } catch (e) {
      // Not valid JSON, try CSV
      if (!content.includes(',')) {
        throw new Error('Content is not in a valid JSON or CSV format');
      }
      
      // Basic CSV parsing (this is simplified - consider using a CSV library for production)
      const lines = content.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        return headers.reduce((obj, header, i) => {
          obj[header] = values[i] || '';
          return obj;
        }, {} as Record<string, any>);
      });
    }
    
    throw new Error('Content is not in a valid format');
  } catch (error: any) {
    console.error('Error parsing import content:', error);
    toast({
      title: "Parse error",
      description: error.message || "Failed to parse import content",
      variant: "destructive",
    });
    return [];
  }
}
