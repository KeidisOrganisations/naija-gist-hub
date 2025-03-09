
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Plus,
  Trash2,
  Download,
  Copy,
  Image as ImageIcon,
  File,
  Video,
  FileText,
  Grid,
  List,
  UploadCloud,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data
const mockMedia = [
  {
    id: 1,
    name: "lagos-skyline.jpg",
    type: "image",
    size: "1.2 MB",
    dimensions: "1920 x 1080",
    uploadDate: "2023-10-15",
    url: "https://images.unsplash.com/photo-1577172249844-189130681fbc",
  },
  {
    id: 2,
    name: "nigeria-economy-report.pdf",
    type: "document",
    size: "3.5 MB",
    dimensions: "-",
    uploadDate: "2023-10-10",
    url: "#",
  },
  {
    id: 3,
    name: "tech-conference.mp4",
    type: "video",
    size: "25.7 MB",
    dimensions: "1280 x 720",
    uploadDate: "2023-10-05",
    url: "#",
  },
  {
    id: 4,
    name: "abuja-market.jpg",
    type: "image",
    size: "2.1 MB",
    dimensions: "2048 x 1365",
    uploadDate: "2023-10-01",
    url: "https://images.unsplash.com/photo-1604997009068-38fa0b4df7c7",
  },
  {
    id: 5,
    name: "budget-template.xlsx",
    type: "document",
    size: "0.8 MB",
    dimensions: "-",
    uploadDate: "2023-09-28",
    url: "#",
  },
  {
    id: 6,
    name: "drone-footage.mp4",
    type: "video",
    size: "42.3 MB",
    dimensions: "3840 x 2160",
    uploadDate: "2023-09-25",
    url: "#",
  },
  {
    id: 7,
    name: "naija-food.jpg",
    type: "image",
    size: "1.8 MB",
    dimensions: "2200 x 1467",
    uploadDate: "2023-09-20",
    url: "https://images.unsplash.com/photo-1565889673110-f540267578a7",
  },
  {
    id: 8,
    name: "tech-tutorial.mp4",
    type: "video",
    size: "18.5 MB",
    dimensions: "1920 x 1080",
    uploadDate: "2023-09-15",
    url: "#",
  },
];

const AdminMedia = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  // Filter media based on search and filters
  const filteredMedia = mockMedia.filter(media => {
    const matchesSearch = media.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || media.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleSelectAll = () => {
    if (selectedMedia.length === filteredMedia.length) {
      setSelectedMedia([]);
    } else {
      setSelectedMedia(filteredMedia.map(media => media.id));
    }
  };

  const handleSelectMedia = (id: number) => {
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter(mediaId => mediaId !== id));
    } else {
      setSelectedMedia([...selectedMedia, id]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedMedia.length === 0) return;
    
    // In a real app, you would send a request to your backend
    toast({
      title: `${selectedMedia.length} items deleted`,
      description: "The selected media files have been successfully deleted.",
      duration: 3000,
    });
    
    setSelectedMedia([]);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copied",
      description: "Media URL has been copied to clipboard.",
      duration: 3000,
    });
  };

  const getMediaIcon = (type: string) => {
    switch(type) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const renderImagePreview = (media: typeof mockMedia[0]) => {
    if (media.type === 'image' && media.url !== '#') {
      return (
        <img 
          src={media.url} 
          alt={media.name} 
          className="object-cover h-full w-full rounded-t-md"
        />
      );
    }
    
    return (
      <div className="flex items-center justify-center bg-gray-100 h-full w-full rounded-t-md">
        {media.type === 'image' && <ImageIcon className="h-8 w-8 text-gray-400" />}
        {media.type === 'video' && <Video className="h-8 w-8 text-gray-400" />}
        {media.type === 'document' && <FileText className="h-8 w-8 text-gray-400" />}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Media Library</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" className="bg-naija-green hover:bg-naija-green/90">
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload Media
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Media</DialogTitle>
                  <DialogDescription>
                    Upload images, videos, or documents to your media library.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 text-center mb-2">
                      Drag and drop files here, or click to select files
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                      Supports: JPG, PNG, GIF, MP4, PDF, DOCX (up to 50MB)
                    </p>
                    <Button variant="outline" className="mt-4">
                      Select Files
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  placeholder="Search media..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`p-1 rounded-none ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`p-1 rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              {selectedMedia.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              )}
            </div>
          </div>
          
          {/* Media Grid/List View */}
          {viewMode === 'grid' ? (
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredMedia.map(media => (
                <div 
                  key={media.id} 
                  className="bg-white rounded-md shadow-sm overflow-hidden border"
                >
                  <div className="relative h-36">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedMedia.includes(media.id)}
                        onCheckedChange={() => handleSelectMedia(media.id)}
                        aria-label={`Select ${media.name}`}
                        className="rounded-md"
                      />
                    </div>
                    {renderImagePreview(media)}
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate" title={media.name}>{media.name}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.5 1.5C1.5 1.91421 1.16421 2.25 0.75 2.25C0.335786 2.25 0 1.91421 0 1.5C0 1.08579 0.335786 0.75 0.75 0.75C1.16421 0.75 1.5 1.08579 1.5 1.5Z" fill="currentColor"/>
                              <path d="M8 1.5C8 1.91421 7.66421 2.25 7.25 2.25C6.83579 2.25 6.5 1.91421 6.5 1.5C6.5 1.08579 6.83579 0.75 7.25 0.75C7.66421 0.75 8 1.08579 8 1.5Z" fill="currentColor"/>
                              <path d="M14.5 1.5C14.5 1.91421 14.1642 2.25 13.75 2.25C13.3358 2.25 13 1.91421 13 1.5C13 1.08579 13.3358 0.75 13.75 0.75C14.1642 0.75 14.5 1.08579 14.5 1.5Z" fill="currentColor"/>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleCopyUrl(media.url)}>
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy URL</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      {getMediaIcon(media.type)}
                      <span className="ml-1">{media.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-md border">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left w-10">
                      <Checkbox 
                        checked={selectedMedia.length === filteredMedia.length && filteredMedia.length > 0}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all media"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">File</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Dimensions</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Uploaded</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map(media => (
                    <tr key={media.id} className="border-b">
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={selectedMedia.includes(media.id)}
                          onCheckedChange={() => handleSelectMedia(media.id)}
                          aria-label={`Select ${media.name}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 mr-3 bg-gray-100 rounded flex items-center justify-center">
                            {getMediaIcon(media.type)}
                          </div>
                          <span className="text-sm font-medium">{media.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{media.type}</td>
                      <td className="px-4 py-3 text-sm">{media.size}</td>
                      <td className="px-4 py-3 text-sm">{media.dimensions}</td>
                      <td className="px-4 py-3 text-sm">{media.uploadDate}</td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <svg width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 1.5C1.5 1.91421 1.16421 2.25 0.75 2.25C0.335786 2.25 0 1.91421 0 1.5C0 1.08579 0.335786 0.75 0.75 0.75C1.16421 0.75 1.5 1.08579 1.5 1.5Z" fill="currentColor"/>
                                <path d="M8 1.5C8 1.91421 7.66421 2.25 7.25 2.25C6.83579 2.25 6.5 1.91421 6.5 1.5C6.5 1.08579 6.83579 0.75 7.25 0.75C7.66421 0.75 8 1.08579 8 1.5Z" fill="currentColor"/>
                                <path d="M14.5 1.5C14.5 1.91421 14.1642 2.25 13.75 2.25C13.3358 2.25 13 1.91421 13 1.5C13 1.08579 13.3358 0.75 13.75 0.75C14.1642 0.75 14.5 1.08579 14.5 1.5Z" fill="currentColor"/>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleCopyUrl(media.url)}>
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Copy URL</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Download</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredMedia.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No media files found.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminMedia;
