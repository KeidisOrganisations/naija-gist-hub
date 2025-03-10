
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Type for the category data from Supabase
interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

// Fetch categories from Supabase
const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Fetch article count by category
const fetchArticleCounts = async () => {
  const { data, error } = await supabase
    .from('articles')
    .select('category_id, count')
    .group('category_id');

  if (error) {
    throw new Error(error.message);
  }

  const counts: Record<string, number> = {};
  data?.forEach(item => {
    counts[item.category_id] = parseInt(item.count);
  });
  
  return counts;
};

// Add a new category
const addCategory = async (category: Omit<Category, 'id'>) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

// Update a category
const updateCategory = async (category: Category) => {
  const { data, error } = await supabase
    .from('categories')
    .update({
      name: category.name,
      description: category.description,
      slug: category.slug
    })
    .eq('id', category.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

// Delete a category
const deleteCategory = async (id: string) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

// Generate a slug from a name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
};

const AdminCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  
  const queryClient = useQueryClient();

  // Fetch categories with React Query
  const {
    data: categories = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Fetch article counts with React Query
  const {
    data: articleCounts = {},
    isLoading: isCountsLoading
  } = useQuery({
    queryKey: ['articleCounts'],
    queryFn: fetchArticleCounts
  });

  // Add category mutation
  const addMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Category created",
        description: `Category "${newCategoryName}" has been successfully created.`,
        duration: 3000,
      });
      setNewCategoryName('');
      setNewCategoryDescription('');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create category: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Update category mutation
  const updateMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Category updated",
        description: `Category has been successfully updated.`,
        duration: 3000,
      });
      setEditCategory(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update category: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Delete category mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Category deleted",
        description: `Category has been successfully deleted.`,
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete category: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Filter categories based on search
  const filteredCategories = categories.filter((category: Category) => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a name for the category.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const slug = generateSlug(newCategoryName);

    addMutation.mutate({
      name: newCategoryName,
      description: newCategoryDescription,
      slug
    });
  };

  const handleUpdateCategory = () => {
    if (!editCategory || !editCategory.name.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a name for the category.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Only regenerate slug if name changed
    let slug = editCategory.slug;
    const existingCategory = categories.find((c: Category) => c.id === editCategory.id);
    if (existingCategory && existingCategory.name !== editCategory.name) {
      slug = generateSlug(editCategory.name);
    }

    updateMutation.mutate({
      ...editCategory,
      slug
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    deleteMutation.mutate(categoryId);
  };

  if (isError) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error loading categories: {(error as Error).message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Categories</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="bg-naija-green hover:bg-naija-green/90">
                  <Plus className="mr-2 h-4 w-4" />
                  New Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Create a new category for organizing your articles.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      id="name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="e.g., Health"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCategoryDescription}
                      onChange={(e) => setNewCategoryDescription(e.target.value)}
                      placeholder="Brief description of the category..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddCategory}>Add Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        
        <main className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search categories..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Categories Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading categories...</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category: Category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>
                        {articleCounts[category.id] || 0} Articles
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditCategory({...category})}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Category</DialogTitle>
                          <DialogDescription>
                            Make changes to the "{category.name}" category.
                          </DialogDescription>
                        </DialogHeader>
                        {editCategory && (
                          <div className="grid gap-4 py-4">
                            <div>
                              <Label htmlFor="edit-name">Category Name</Label>
                              <Input
                                id="edit-name"
                                value={editCategory.name}
                                onChange={(e) => setEditCategory({...editCategory, name: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={editCategory.description}
                                onChange={(e) => setEditCategory({...editCategory, description: e.target.value})}
                              />
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={handleUpdateCategory}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          size="sm"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Category</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete the "{category.name}" category? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button 
                            variant="destructive" 
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {!isLoading && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No categories found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminCategories;
