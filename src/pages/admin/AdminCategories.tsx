
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Mock data
const mockCategories = [
  {
    id: 1,
    name: "Tech",
    description: "Technology tips, gadget reviews, and digital skills for Nigerians.",
    articleCount: 45,
    slug: "tech",
  },
  {
    id: 2,
    name: "Money",
    description: "Personal finance, investing, and money management in Nigeria.",
    articleCount: 37,
    slug: "money",
  },
  {
    id: 3,
    name: "Life",
    description: "Everyday life hacks, health tips, and personal development.",
    articleCount: 52,
    slug: "life",
  },
  {
    id: 4,
    name: "Relationships",
    description: "Dating, marriage, family, and friendship advice for Nigerians.",
    articleCount: 29,
    slug: "relationships",
  },
  {
    id: 5,
    name: "News",
    description: "Latest Nigerian news and current events with practical analysis.",
    articleCount: 41,
    slug: "news",
  },
  {
    id: 6,
    name: "Education",
    description: "Study tips, school hacks, and educational resources for students.",
    articleCount: 18,
    slug: "education",
  },
  {
    id: 7,
    name: "Business",
    description: "Entrepreneurship, business tips, and career advice for Nigerians.",
    articleCount: 33,
    slug: "business",
  },
  {
    id: 8,
    name: "Travel",
    description: "Travel guides, local destinations, and tourism tips in Nigeria.",
    articleCount: 15,
    slug: "travel",
  },
];

const AdminCategories = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [editCategory, setEditCategory] = useState<any>(null);
  const navigate = useNavigate();

  // Filter categories based on search
  const filteredCategories = mockCategories.filter(category => 
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

    // In a real app, you would send a request to your backend
    toast({
      title: "Category created",
      description: `Category "${newCategoryName}" has been successfully created.`,
      duration: 3000,
    });

    setNewCategoryName('');
    setNewCategoryDescription('');
  };

  const handleUpdateCategory = () => {
    if (!editCategory.name.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a name for the category.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // In a real app, you would send a request to your backend
    toast({
      title: "Category updated",
      description: `Category "${editCategory.name}" has been successfully updated.`,
      duration: 3000,
    });

    setEditCategory(null);
  };

  const handleDeleteCategory = (categoryId: number, categoryName: string) => {
    // In a real app, you would send a request to your backend
    toast({
      title: "Category deleted",
      description: `Category "${categoryName}" has been successfully deleted.`,
      duration: 3000,
    });
  };

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
                  <DialogClose asChild>
                    <Button onClick={handleAddCategory}>Add Category</Button>
                  </DialogClose>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map(category => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">{category.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{category.articleCount} Articles</span>
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
                        <DialogClose asChild>
                          <Button onClick={handleUpdateCategory}>Save Changes</Button>
                        </DialogClose>
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
                        <DialogClose asChild>
                          <Button 
                            variant="destructive" 
                            onClick={() => handleDeleteCategory(category.id, category.name)}
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredCategories.length === 0 && (
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
