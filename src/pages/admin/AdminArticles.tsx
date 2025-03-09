
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

// Mock data
const mockArticles = [
  {
    id: 1,
    title: "How to Make Money with AI Tools in Nigeria",
    category: "Tech",
    status: "Published",
    date: "2023-10-15",
    author: "John Doe",
    views: 12453,
  },
  {
    id: 2,
    title: "Top 5 Apps Every Nigerian Student Should Have",
    category: "Tech",
    status: "Published",
    date: "2023-10-10",
    author: "Jane Smith",
    views: 8932,
  },
  {
    id: 3,
    title: "Getting Your International Passport Without Stress",
    category: "Life",
    status: "Published",
    date: "2023-10-05",
    author: "Michael Johnson",
    views: 7845,
  },
  {
    id: 4,
    title: "How to Open a Dollar Account in Nigeria",
    category: "Money",
    status: "Draft",
    date: "2023-10-01",
    author: "Sarah Brown",
    views: 0,
  },
  {
    id: 5,
    title: "Dating in Lagos: Finding Genuine Connections",
    category: "Relationships",
    status: "Published",
    date: "2023-09-28",
    author: "David Wilson",
    views: 5421,
  },
  {
    id: 6,
    title: "Best Ways to Save Money in Nigeria's Economy",
    category: "Money",
    status: "Pending",
    date: "2023-09-25",
    author: "Lisa Anderson",
    views: 0,
  },
  {
    id: 7,
    title: "Nigerian Wedding Planning on a Budget",
    category: "Life",
    status: "Published",
    date: "2023-09-20",
    author: "Robert Taylor",
    views: 4532,
  },
  {
    id: 8,
    title: "How to Start a Tech Career in Nigeria",
    category: "Tech",
    status: "Published",
    date: "2023-09-15",
    author: "Emma Davis",
    views: 6789,
  },
];

const AdminArticles = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const navigate = useNavigate();

  // Filter articles based on search and filters
  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || article.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectAll = () => {
    if (selectedArticles.length === filteredArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(filteredArticles.map(article => article.id));
    }
  };

  const handleSelectArticle = (id: number) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter(articleId => articleId !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedArticles.length === 0) return;
    
    // In a real app, you would send a request to your backend
    toast({
      title: `${selectedArticles.length} articles deleted`,
      description: "The selected articles have been successfully deleted.",
      duration: 3000,
    });
    
    setSelectedArticles([]);
  };

  const handlePublishSelected = () => {
    if (selectedArticles.length === 0) return;
    
    // In a real app, you would send a request to your backend
    toast({
      title: `${selectedArticles.length} articles published`,
      description: "The selected articles have been successfully published.",
      duration: 3000,
    });
    
    setSelectedArticles([]);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Articles</h1>
            <Button variant="default" className="bg-naija-green hover:bg-naija-green/90">
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </div>
        </header>
        
        <main className="p-6">
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Tech">Tech</SelectItem>
                  <SelectItem value="Life">Life</SelectItem>
                  <SelectItem value="Money">Money</SelectItem>
                  <SelectItem value="Relationships">Relationships</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              {selectedArticles.length > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={handlePublishSelected}>
                    Publish Selected
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                    Delete Selected
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Articles Table */}
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all articles"
                    />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No articles found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredArticles.map(article => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedArticles.includes(article.id)}
                          onCheckedChange={() => handleSelectArticle(article.id)}
                          aria-label={`Select article ${article.title}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${article.status === 'Published' ? 'bg-green-100 text-green-800' : 
                              article.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                              'bg-yellow-100 text-yellow-800'}`
                          }
                        >
                          {article.status}
                        </span>
                      </TableCell>
                      <TableCell>{article.date}</TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>{article.views.toLocaleString()}</TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {filteredArticles.length} of {mockArticles.length} articles
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminArticles;
