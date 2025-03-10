
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Upload,
  Image as ImageIcon,
  Video,
  File,
  FolderPlus,
  Grid,
  List,
  Trash2,
  Download,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for media files
const mockMediaFiles = [
  {
    id: 1,
    name: 'featured-post-1.jpg',
    type: 'image',
    size: '1.2 MB',
    dimensions: '1920x1080',
    uploadDate: '2023-10-15',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3271&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'blog-header.jpg',
    type: 'image',
    size: '0.8 MB',
    dimensions: '1600x900',
    uploadDate: '2023-10-10',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=3270&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'product-demo.mp4',
    type: 'video',
    size: '24.5 MB',
    duration: '2:34',
    uploadDate: '2023-10-08',
    url: '',
  },
  {
    id: 4,
    name: 'team-photo.jpg',
    type: 'image',
    size: '1.5 MB',
    dimensions: '2000x1333',
    uploadDate: '2023-10-05',
    url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=3270&auto=format&fit=crop',
  },
  {
    id: 5,
    name: 'infographic.pdf',
    type: 'document',
    size: '0.5 MB',
    pages: '2',
    uploadDate: '2023-10-01',
    url: '',
  },
  {
    id: 6,
    name: 'how-to-guide.jpg',
    type: 'image',
    size: '0.7 MB',
    dimensions: '1200x800',
    uploadDate: '2023-09-28',
    url: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=3074&auto=format&fit=crop',
  },
  {
    id: 7,
    name: 'interview.mp4',
    type: 'video',
    size: '56.2 MB',
    duration: '5:21',
    uploadDate: '2023-09-25',
    url: '',
  },
  {
    id: 8,
    name: 'ebook-cover.jpg',
    type: 'image',
    size: '0.9 MB',
    dimensions: '1400x2000',
    uploadDate: '2023-09-20',
    url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=3234&auto=format&fit=crop',
  },
];

type ViewMode = 'grid' | 'list';
type MediaType = 'all' | 'image' | 'video' | 'document';

const AdminMedia = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mediaType, setMediaType] = useState<MediaType>('all');
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated for demo purposes
    const auth = localStorage.getItem('naijaHubAdminAuth');
    if (auth !== 'true') {
      toast({
        title: "Authentication required",
        description: "Please login to access the admin area",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Filter media files based on search and media type
  const filteredMediaFiles = mockMediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = mediaType === 'all' || file.type === mediaType;
    
    return matchesSearch && matchesType;
  });

  const handleSelectFile = (id: number) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredMediaFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredMediaFiles.map(file => file.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) return;
    
    // In a real app, you would send a request to your backend
    toast({
      title: `${selectedFiles.length} files deleted`,
      description: "The selected files have been successfully deleted.",
      duration: 3000,
    });
    
    setSelectedFiles([]);
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, you would upload the files to your backend
      toast({
        title: `${e.target.files.length} files uploaded`,
        description: "Your files have been successfully uploaded.",
        duration: 3000,
      });
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Media Library</h1>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="file-upload"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <Button variant="outline" onClick={() => document.getElementById("create-folder-modal")?.showModal()}>
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
              <Button variant="default" className="bg-naija-green hover:bg-naija-green/90" onClick={handleUploadClick}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </div>
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
              
              <Tabs value={mediaType} onValueChange={(value) => setMediaType(value as MediaType)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="image">Images</TabsTrigger>
                  <TabsTrigger value="video">Videos</TabsTrigger>
                  <TabsTrigger value="document">Documents</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={viewMode === 'list' ? 'bg-gray-100' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              
              {selectedFiles.length > 0 && (
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              )}
            </div>
          </div>
          
          {/* Media Files Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMediaFiles.map(file => (
                <div 
                  key={file.id}
                  className={`relative rounded-md border overflow-hidden group ${
                    selectedFiles.includes(file.id) ? 'ring-2 ring-naija-green' : ''
                  }`}
                  onClick={() => handleSelectFile(file.id)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {file.type === 'image' ? (
                      <img src={file.url} alt={file.name} className="object-cover w-full h-full" />
                    ) : file.type === 'video' ? (
                      <Video className="h-16 w-16 text-gray-400" />
                    ) : (
                      <File className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <div className="p-2 bg-white">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">{file.size}</p>
                      <p className="text-xs text-gray-500">{file.uploadDate}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(file.url, '_blank')}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600"
                          onClick={() => {
                            setSelectedFiles([file.id]);
                            handleDeleteSelected();
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md border bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedFiles.length === filteredMediaFiles.length && filteredMediaFiles.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                      />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMediaFiles.map(file => (
                    <tr key={file.id} className={selectedFiles.includes(file.id) ? 'bg-green-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleSelectFile(file.id)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                            {file.type === 'image' ? (
                              <img src={file.url} alt={file.name} className="h-10 w-10 rounded-md object-cover" />
                            ) : file.type === 'video' ? (
                              <Video className="h-6 w-6 text-gray-400" />
                            ) : (
                              <File className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            {file.type === 'image' && <div className="text-xs text-gray-500">{file.dimensions}</div>}
                            {file.type === 'video' && <div className="text-xs text-gray-500">{file.duration}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          file.type === 'image' ? 'bg-purple-100 text-purple-800' : 
                          file.type === 'video' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {file.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.uploadDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" onClick={() => window.open(file.url, '_blank')}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => {
                            setSelectedFiles([file.id]);
                            handleDeleteSelected();
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {filteredMediaFiles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No media files found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery ? 'Try adjusting your search query.' : 'Upload new files to get started.'}
              </p>
              {!searchQuery && (
                <Button className="mt-4" onClick={handleUploadClick}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Create Folder Modal (This would be better implemented with the Dialog component) */}
      <dialog id="create-folder-modal" className="modal p-6 rounded-lg shadow-lg max-w-md bg-white">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Create New Folder</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Folder Name</label>
            <Input className="mt-1" placeholder="Enter folder name" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => (document.getElementById("create-folder-modal") as HTMLDialogElement).close()}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "Folder created",
                description: "New folder has been created successfully.",
                duration: 3000,
              });
              (document.getElementById("create-folder-modal") as HTMLDialogElement).close();
            }}>
              Create Folder
            </Button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminMedia;
