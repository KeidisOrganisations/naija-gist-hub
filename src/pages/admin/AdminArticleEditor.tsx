
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save, Upload, Eye } from 'lucide-react';
import { fetchCategories } from '@/services/articles';

const AdminArticleEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isNew = id === 'new';
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('draft');
  const [categoryId, setCategoryId] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
  
  // Fetch article if editing
  const { data: article, isLoading: isArticleLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      if (isNew) return null;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !isNew && !!id
  });
  
  // Set form data when article is loaded
  useEffect(() => {
    if (article) {
      setTitle(article.title || '');
      setContent(article.content || '');
      setExcerpt(article.excerpt || '');
      setSlug(article.slug || '');
      setStatus(article.status || 'draft');
      setCategoryId(article.category_id || '');
      setFeaturedImage(article.featured_image || '');
    }
  }, [article]);
  
  // Auto-generate slug from title
  useEffect(() => {
    if (isNew && title) {
      setSlug(title.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-'));
    }
  }, [isNew, title]);
  
  // Save article mutation
  const saveMutation = useMutation({
    mutationFn: async (articleData: any) => {
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
          .eq('id', id)
          .select();
          
        if (error) throw error;
        return data[0];
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', id] });
      
      toast({
        title: isNew ? "Article created" : "Article updated",
        description: `"${title}" has been successfully ${isNew ? 'created' : 'updated'}.`,
        duration: 3000,
      });
      
      if (isNew) {
        navigate(`/admin/articles/edit/${data.id}`);
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to save article: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });
  
  const handleSave = (publishAfter = false) => {
    if (!title || !content || !slug || !categoryId) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const articleData = {
      title,
      content,
      excerpt,
      slug,
      status: publishAfter ? 'published' : status,
      category_id: categoryId,
      featured_image: featuredImage,
      published_at: publishAfter ? new Date().toISOString() : null
    };
    
    saveMutation.mutate(articleData);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/admin/articles')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Articles
              </Button>
              <h1 className="text-xl font-bold ml-2">
                {isNew ? 'Create New Article' : 'Edit Article'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => handleSave(false)}
                disabled={saveMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              
              <Button 
                variant="default" 
                className="bg-naija-green hover:bg-naija-green/90"
                onClick={() => handleSave(true)}
                disabled={saveMutation.isPending}
              >
                <Eye className="mr-2 h-4 w-4" />
                {status === 'published' ? 'Update' : 'Publish'}
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {isArticleLoading ? (
            <div className="flex justify-center py-12">
              <p>Loading article...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-md border shadow-sm">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-base font-medium">
                        Title *
                      </Label>
                      <Input 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter article title"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content" className="text-base font-medium">
                        Content *
                      </Label>
                      <Textarea 
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your article content here..."
                        className="mt-1 min-h-[400px]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="excerpt" className="text-base font-medium">
                        Excerpt
                      </Label>
                      <Textarea 
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Brief summary of the article"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-md border shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Article Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="status" className="text-sm font-medium">
                        Status
                      </Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger id="status" className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category *
                      </Label>
                      <Select value={categoryId} onValueChange={setCategoryId}>
                        <SelectTrigger id="category" className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="slug" className="text-sm font-medium">
                        Slug *
                      </Label>
                      <Input 
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="article-url-slug"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="featured-image" className="text-sm font-medium">
                        Featured Image URL
                      </Label>
                      <Input 
                        id="featured-image"
                        value={featuredImage}
                        onChange={(e) => setFeaturedImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1"
                      />
                      
                      {featuredImage && (
                        <div className="mt-2">
                          <img 
                            src={featuredImage} 
                            alt="Featured Preview" 
                            className="max-h-40 rounded-md object-cover border"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://placehold.co/600x400/9AE19D/FFFFFF?text=Invalid+Image';
                            }}
                          />
                        </div>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={() => navigate('/admin/media')}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Select from Media Library
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminArticleEditor;
