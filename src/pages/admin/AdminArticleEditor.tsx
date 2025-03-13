
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
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
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useArticleEditor } from '@/hooks/useArticleEditor';
import { toast } from '@/hooks/use-toast';
import MediaSelector from '@/components/admin/media/MediaSelector';

const AdminArticleEditor = () => {
  const {
    article,
    handleChange,
    saveArticle,
    isNew,
    isArticleLoading,
    categories,
    isSaving,
    navigate
  } = useArticleEditor();
  
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);

  const handleSave = async (publishAfterSave = false) => {
    try {
      // Basic validation
      if (!article.title) {
        return toast({
          title: "Title required",
          description: "Please provide a title for your article",
          variant: "destructive",
        });
      }
      
      if (!article.content) {
        return toast({
          title: "Content required",
          description: "Please add some content to your article",
          variant: "destructive",
        });
      }
      
      if (!article.slug) {
        return toast({
          title: "Slug required",
          description: "Please provide a URL slug for your article",
          variant: "destructive",
        });
      }
      
      await saveArticle(publishAfterSave);
      
      toast({
        title: isNew ? "Article created" : "Article updated",
        description: `Your article has been successfully ${isNew ? 'created' : 'updated'}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error saving article",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleMediaSelect = (url: string) => {
    handleChange('featured_image', url);
    setIsMediaSelectorOpen(false);
  };

  if (isArticleLoading) {
    return (
      <AdminLayout title="Loading Article...">
        <div className="flex justify-center py-12">
          <p>Loading article data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title={isNew ? 'Create New Article' : 'Edit Article'}
      breadcrumbs={[
        { label: 'Articles', href: '/admin/articles' },
        { label: isNew ? 'New Article' : 'Edit Article' }
      ]}
      action={
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleSave(false)}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          
          <Button 
            variant="default" 
            className="bg-naija-green hover:bg-naija-green/90"
            onClick={() => handleSave(true)}
            disabled={isSaving}
          >
            <Eye className="mr-2 h-4 w-4" />
            {article.status === 'published' ? 'Update' : 'Publish'}
          </Button>
        </div>
      }
    >
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
                  value={article.title || ''}
                  onChange={(e) => handleChange('title', e.target.value)}
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
                  value={article.content || ''}
                  onChange={(e) => handleChange('content', e.target.value)}
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
                  value={article.excerpt || ''}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
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
                <Select 
                  value={article.status || 'draft'} 
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger id="status" className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <Select 
                  value={article.category_id || ''} 
                  onValueChange={(value) => handleChange('category_id', value)}
                >
                  <SelectTrigger id="category" className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Uncategorized</SelectItem>
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
                  value={article.slug || ''}
                  onChange={(e) => handleChange('slug', e.target.value)}
                  placeholder="article-url-slug"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used in the URL: /article/{article.slug || 'your-article-slug'}
                </p>
              </div>
              
              <div>
                <Label htmlFor="featured-image" className="text-sm font-medium">
                  Featured Image
                </Label>
                <div className="mt-1 flex">
                  <Input 
                    id="featured-image"
                    value={article.featured_image || ''}
                    onChange={(e) => handleChange('featured_image', e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Button 
                    variant="outline"
                    className="ml-2"
                    onClick={() => setIsMediaSelectorOpen(true)}
                  >
                    Browse
                  </Button>
                </div>
                
                {article.featured_image && (
                  <div className="mt-2">
                    <img 
                      src={article.featured_image} 
                      alt="Featured Preview" 
                      className="max-h-40 rounded-md object-cover border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400/9AE19D/FFFFFF?text=Invalid+Image';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Media selector dialog */}
      {isMediaSelectorOpen && (
        <MediaSelector
          onSelect={handleMediaSelect}
          onClose={() => setIsMediaSelectorOpen(false)}
        />
      )}
    </AdminLayout>
  );
};

export default AdminArticleEditor;
