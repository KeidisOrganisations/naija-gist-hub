import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button'; 
import { toast } from '@/hooks/use-toast';
import { fetchMediaItems, fetchMediaFolders, uploadMediaFile, deleteMediaItem, createMediaFolder } from '@/services/media';
import { MediaItem } from '@/types/media';
import { useAuthStatus } from '@/hooks/useAuthStatus';

// Import our newly created components
import MediaHeader from '@/components/admin/media/MediaHeader';
import MediaToolbar from '@/components/admin/media/MediaToolbar';
import MediaGrid from '@/components/admin/media/MediaGrid';
import MediaList from '@/components/admin/media/MediaList';
import EmptyMedia from '@/components/admin/media/EmptyMedia';
import { getMediaIcon } from '@/components/admin/media/MediaIconUtils';

type ViewMode = 'grid' | 'list';
type MediaType = 'all' | 'image' | 'video' | 'document';

const AdminMedia = () => {
  const { isAuthenticated, isLoading: authLoading, enableTestAuth } = useAuthStatus();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mediaType, setMediaType] = useState<MediaType>('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isAuthenticated === false && !authLoading) {
      enableTestAuth();
    }
  }, [isAuthenticated, authLoading]);

  const { 
    data: mediaItems = [], 
    isLoading: isMediaLoading,
    error: mediaError,
    refetch: refetchMedia
  } = useQuery({
    queryKey: ['mediaItems'],
    queryFn: fetchMediaItems,
    enabled: !!isAuthenticated
  });

  const { 
    data: folders = [], 
    isLoading: isFoldersLoading 
  } = useQuery({
    queryKey: ['mediaFolders'],
    queryFn: fetchMediaFolders,
    enabled: !!isAuthenticated
  });

  const uploadFileMutation = useMutation({
    mutationFn: (file: File) => {
      console.log('Uploading file:', file.name);
      return uploadMediaFile(file);
    },
    onSuccess: (data) => {
      console.log('Upload successful:', data);
      queryClient.invalidateQueries({ queryKey: ['mediaItems'] });
      toast({
        title: 'File uploaded',
        description: 'Your file has been successfully uploaded.',
        duration: 3000,
      });
    },
    onError: (error: any) => {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: `Error uploading file: ${error.message}`,
        variant: 'destructive',
        duration: 5000,
      });
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  const deleteMediaMutation = useMutation({
    mutationFn: (id: string) => {
      console.log('Deleting media item:', id);
      return deleteMediaItem(id);
    },
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
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: `Error deleting file: ${error.message}`,
        variant: 'destructive',
        duration: 5000,
      });
    }
  });

  const createFolderMutation = useMutation({
    mutationFn: (name: string) => createMediaFolder(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mediaFolders'] });
      toast({
        title: 'Folder created',
        description: `New folder has been created successfully.`,
        duration: 3000,
      });
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

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <p>You need to be authenticated to access the media library.</p>
        <Button onClick={enableTestAuth}>Sign In (Demo Mode)</Button>
      </div>
    );
  }

  const filteredMediaItems = mediaItems.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    let matchesType = true;
    
    if (mediaType === 'image') {
      matchesType = file.file_type.startsWith('image/');
    } else if (mediaType === 'video') {
      matchesType = file.file_type.startsWith('video/');
    } else if (mediaType === 'document') {
      matchesType = !file.file_type.startsWith('image/') && !file.file_type.startsWith('video/');
    }
    
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
    
    deleteMediaMutation.mutate(selectedFiles[0]);
    setDeleteConfirmOpen(false);
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload")?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      
      const file = e.target.files[0];
      uploadFileMutation.mutate(file);
      
      e.target.value = '';
    }
  };

  const handleCreateFolder = (name: string) => {
    if (name.trim()) {
      createFolderMutation.mutate(name);
    }
  };

  if (mediaError) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error loading media: {(mediaError as Error).message}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => refetchMedia()}
              className="ml-4"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <MediaHeader 
          onUploadClick={handleUploadClick}
          onCreateFolder={handleCreateFolder}
          isUploading={isUploading}
        />
        
        <main className="p-6">
          <input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          
          <MediaToolbar 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            mediaType={mediaType}
            onMediaTypeChange={setMediaType}
            selectedFilesCount={selectedFiles.length}
            onDeleteSelected={handleDeleteSelected}
          />
          
          {isMediaLoading ? (
            <div className="flex justify-center py-12">
              <p>Loading media files...</p>
            </div>
          ) : filteredMediaItems.length === 0 ? (
            <EmptyMedia 
              onUploadClick={handleUploadClick}
              hasSearchQuery={searchQuery.length > 0}
            />
          ) : viewMode === 'grid' ? (
            <MediaGrid 
              mediaItems={filteredMediaItems}
              selectedFiles={selectedFiles}
              onSelectFile={handleSelectFile}
              onDeleteFile={(id) => {
                setSelectedFiles([id]);
                handleDeleteSelected();
              }}
              getMediaIcon={getMediaIcon}
            />
          ) : (
            <MediaList 
              mediaItems={filteredMediaItems}
              selectedFiles={selectedFiles}
              onSelectFile={handleSelectFile}
              onSelectAll={handleSelectAll}
              onDeleteFile={(id) => {
                setSelectedFiles([id]);
                handleDeleteSelected();
              }}
              getMediaIcon={getMediaIcon}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminMedia;
