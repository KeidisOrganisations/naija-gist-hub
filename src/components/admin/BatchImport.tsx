
import { useState } from 'react';
import { parseImportContent, batchAddArticles, batchAddMedia } from '@/services/storage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const BatchImport = () => {
  const [importType, setImportType] = useState<'articles' | 'media'>('articles');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleImport = async () => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    try {
      const parsedContent = parseImportContent(content, importType);
      
      if (parsedContent.length === 0) {
        console.error('No valid content to import');
        return;
      }
      
      if (importType === 'articles') {
        await batchAddArticles(parsedContent as any);
      } else {
        await batchAddMedia(parsedContent as any);
      }
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadExample = () => {
    if (importType === 'articles') {
      setContent(JSON.stringify([
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
      ], null, 2));
    } else {
      setContent(JSON.stringify([
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
      ], null, 2));
    }
  };
  
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Batch Import</CardTitle>
        <CardDescription>
          Import multiple items at once using JSON or CSV format
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Select
            value={importType}
            onValueChange={(value) => setImportType(value as 'articles' | 'media')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select import type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="articles">Articles</SelectItem>
              <SelectItem value="media">Media</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={loadExample}
          >
            Load Example
          </Button>
        </div>
        
        <Textarea
          placeholder={`Paste your ${importType === 'articles' ? 'articles' : 'media'} data in JSON or CSV format`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleImport}
          disabled={isLoading || !content.trim()}
        >
          {isLoading ? 'Importing...' : `Import ${importType}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BatchImport;
