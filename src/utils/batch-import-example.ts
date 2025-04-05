
import { batchAddArticles, batchAddMedia, parseImportContent } from '@/services/storage';

/**
 * Example function showing how to use batch import functionality
 */
export async function importArticlesFromJSON(jsonContent: string) {
  // Parse the JSON content into an array of articles
  const parsedArticles = parseImportContent(jsonContent, 'articles');
  
  if (parsedArticles.length === 0) {
    console.error('No articles found in the provided content');
    return;
  }
  
  // Validate required fields
  const validArticles = parsedArticles.filter(article => 
    article.title && 
    article.content && 
    article.slug
  );
  
  if (validArticles.length < parsedArticles.length) {
    console.warn(`${parsedArticles.length - validArticles.length} articles are missing required fields (title, content, slug)`);
  }
  
  if (validArticles.length === 0) {
    console.error('No valid articles found. Each article must have title, content, and slug.');
    return;
  }
  
  // Import the articles
  return await batchAddArticles(validArticles);
}

/**
 * Example function showing how to import media from JSON
 */
export async function importMediaFromJSON(jsonContent: string) {
  // Parse the JSON content into an array of media items
  const parsedMedia = parseImportContent(jsonContent, 'media');
  
  if (parsedMedia.length === 0) {
    console.error('No media items found in the provided content');
    return;
  }
  
  // Validate required fields
  const validMediaItems = parsedMedia.filter(item => 
    item.name && 
    item.file_path && 
    item.file_type &&
    item.file_size
  );
  
  if (validMediaItems.length < parsedMedia.length) {
    console.warn(`${parsedMedia.length - validMediaItems.length} media items are missing required fields`);
  }
  
  if (validMediaItems.length === 0) {
    console.error('No valid media items found. Each media item must have name, file_path, file_type, and file_size.');
    return;
  }
  
  // Import the media items
  return await batchAddMedia(validMediaItems);
}

/**
 * Example JSON format for batch article import
 */
export const EXAMPLE_ARTICLES_JSON = JSON.stringify([
  {
    "title": "Example Article 1",
    "content": "This is the content of article 1",
    "slug": "example-article-1",
    "status": "draft",
    "excerpt": "Short excerpt for article 1",
    "featured_image": "https://example.com/images/article1.jpg"
  },
  {
    "title": "Example Article 2",
    "content": "This is the content of article 2",
    "slug": "example-article-2",
    "status": "published",
    "excerpt": "Short excerpt for article 2"
  }
], null, 2);

/**
 * Example JSON format for batch media import
 */
export const EXAMPLE_MEDIA_JSON = JSON.stringify([
  {
    "name": "image1.jpg",
    "file_path": "https://example.com/images/image1.jpg",
    "file_type": "image/jpeg",
    "file_size": 12345
  },
  {
    "name": "document1.pdf",
    "file_path": "https://example.com/docs/document1.pdf",
    "file_type": "application/pdf",
    "file_size": 67890
  }
], null, 2);
