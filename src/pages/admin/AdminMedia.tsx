
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchMediaItems, fetchMediaFolders, uploadMediaFile, deleteMediaItem, createMediaFolder } from '@/services/media';

type ViewMode = 'grid' | 'list';
type MediaType = 'all' | 'image' | 'video' | 'document';

const AdminMedia = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mediaType, setMediaType] = useState<MediaType>('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
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

  // Fetch media items
  const { 
    data: mediaItems = [], 
    isLoading: isMediaLoading,
    error: mediaError
  } = useQuery({
    queryKey: ['mediaItems'],
    queryFn: fetchMediaItems
  });

  // Fetch folders
  const { 
    data: folders = [], 
    isLoading: isFoldersLoading 
  } = useQuery({
    queryKey: ['mediaFolders'],
    queryFn: fetchMediaFolders
  });

  // Upload file mutation
  const uploadFileMutation = useMutation({
    mutationFn: (file: File) => uploadMediaFile(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaItems'] });
      toast({
        title: 'File uploaded',
        description: 'Your file has been successfully uploaded.',
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Upload failed',
        description: `Error uploading file: ${error.message}`,
        variant: 'destructive',
        duration: 5000,
      });
    }
  });

  // Delete media mutation
  const deleteMediaMutation = useMutation({
    mutationFn: deleteMediaItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaItems'] });
      toast({
        title: 'File deleted',
        description: 'The file has been successfully deleted.',
        duration: 3000,
      });
      setSelectedFiles([]);
    },
    onError: (error: any) => {
      toast({
        title: 'Delete failed',
        description: `Error deleting file: ${error.message}`,
        variant: 'destructive',
        duration: 5000,
      });
    }
  });

  // Create folder mutation
  const createFolderMutation = useMutation({
    mutationFn: (name: string) => createMediaFolder(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaFolders'] });
      toast({
        title: 'Folder created',
        description: `New folder "${folderName}" has been created successfully.`,
        duration: 3000,
      });
      setFolderName('');
      setIsCreateFolderOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to create folder: ${error.message}`,
        variant: 'destructive',
        duration: 5000,
      });
    }
  });

  const filteredMediaItems = mediaItems.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = mediaType === 'all' || file.file_type.startsWith(mediaType);
    
    return matchesSearch && matchesType;
  });

  const handleSelectFile = (id: string) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredMediaItems.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredMediaItems.map(file => file.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) return;
    
    // Delete first file only for now (can be expanded for bulk delete)
    deleteMediaMutation.mutate(selectedFiles[0]);
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      
      // Upload first file only for now
      const file = e.target.files[0];
      uploadFileMutation.mutate(file);
      
      // Reset input
      e.target.value = '';
      setIsUploading(false);
    }
  };

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createFolderMutation.mutate(folderName);
    }
  };

  const getMediaIcon = (fileType: string) => {
    if (fileType.startsWith('image')) {
      return <ImageIcon className="h-16 w-16 text-gray-400" />;
    } else if (fileType.startsWith('video')) {
      return <Video className="h-16 w-16 text-gray-400" />;
    } else {
      return <File className="h-16 w-16 text-gray-400" />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (mediaError) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error loading media: {(mediaError as Error).message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
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
              <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    New Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogDescription>
                      Enter a name for your new folder.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="my-4">
                    <Input 
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                      placeholder="Enter folder name" 
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleCreateFolder}>Create Folder</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button 
                variant="default" 
                className="bg-naija-green hover:bg-naija-green/90" 
                onClick={handleUploadClick}
                disabled={isUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-6">
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
          
          {isMediaLoading ? (
            <div className="flex justify-center py-12">
              <p>Loading media files...</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMediaItems.map(file => (
                <div 
                  key={file.id}
                  className={`relative rounded-md border overflow-hidden group ${
                    selectedFiles.includes(file.id) ? 'ring-2 ring-naija-green' : ''
                  }`}
                  onClick={() => handleSelectFile(file.id)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {file.file_type.startsWith('image') ? (
                      <img src={file.file_path} alt={file.name} className="object-cover w-full h-full" />
                    ) : (
                      getMediaIcon(file.file_type)
                    )}
                  </div>
                  <div className="p-2 bg-white">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">{Math.round(file.file_size / 1024)} KB</p>
                      <p className="text-xs text-gray-500">
                        {new Date(file.uploaded_at).toLocaleDateString()}
                      </p>
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
                        <DropdownMenuItem 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(file.file_path, '_blank');
                          }}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
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
                        checked={selectedFiles.length === filteredMediaItems.length && filteredMediaItems.length > 0}
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
                  {filteredMediaItems.map(file => (
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
                            {file.file_type.startsWith('image') ? (
                              <img src={file.file_path} alt={file.name} className="h-10 w-10 rounded-md object-cover" />
                            ) : (
                              getMediaIcon(file.file_type)
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.round(file.file_size / 1024)} KB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          file.file_type.startsWith('image') ? 'bg-purple-100 text-purple-800' : 
                          file.file_type.startsWith('video') ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {file.file_type.split('/')[0]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(file.uploaded_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => window.open(file.file_path, '_blank')}
                        >
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
          
          {filteredMediaItems.length === 0 && !isMediaLoading && (
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
    </div>
  );
};

export default AdminMedia;
