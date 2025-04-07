import { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Upload, Image, FileText, Film, Music } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { fetchMediaItems, uploadMediaFile } from '@/services/media';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { MediaItem } from '@/types/media';

interface MediaSelectorProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

const MediaSelector = ({ onSelect, onClose }: MediaSelectorProps) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('images');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    loadMedia();
  }, []);
  
  const loadMedia = async () => {
    try {
      setIsLoading(true);
      const data = await fetchMediaItems();
      setMedia(data);
    } catch (error) {
      console.error("Error loading media:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      const uploadedMedia = await uploadMediaFile(file);
      setMedia([uploadedMedia, ...media]);
      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully.",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSelect = () => {
    if (!selectedItem) {
      toast({
        title: "No media selected",
        description: "Please select a media item first.",
        variant: "destructive",
      });
      return;
    }
    
    onSelect(selectedItem);
  };
  
  const filteredMedia = media.filter(item => {
    const matchesSearch = item.file_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      selectedTab === 'all' ||
      (selectedTab === 'images' && item.file_type.startsWith('image/')) ||
      (selectedTab === 'documents' && item.file_type.includes('pdf')) ||
      (selectedTab === 'videos' && item.file_type.startsWith('video/')) ||
      (selectedTab === 'audio' && item.file_type.startsWith('audio/'));
    
    return matchesSearch && matchesTab;
  });
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
          <DialogDescription>
            Browse and select media from your library
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search media..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="relative">
            <Input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={handleFileUpload}
            />
            <Button 
              variant="outline" 
              className="w-full"
              disabled={isUploading}
              asChild
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? "Uploading..." : "Upload New"}
              </label>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="images" className="mt-4" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="images">
              <Image className="mr-2 h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Film className="mr-2 h-4 w-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="audio">
              <Music className="mr-2 h-4 w-4" />
              Audio
            </TabsTrigger>
          </TabsList>
          
          <div className="overflow-y-auto max-h-[400px] border rounded-md p-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner text="Loading media..." />
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Image className="h-12 w-12 text-gray-300 mb-2" />
                <p className="text-gray-500">No media items found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredMedia.map(item => (
                  <div 
                    key={item.id}
                    className={`
                      relative border rounded-md overflow-hidden cursor-pointer
                      ${selectedItem === item.file_path ? 'ring-2 ring-naija-green' : ''}
                    `}
                    onClick={() => setSelectedItem(item.file_path)}
                  >
                    {item.file_type.startsWith('image/') ? (
                      <img 
                        src={item.file_path} 
                        alt={item.file_name}
                        className="w-full h-40 object-cover" 
                      />
                    ) : (
                      <div className="h-40 flex items-center justify-center bg-gray-100">
                        {item.file_type.includes('pdf') ? (
                          <FileText className="h-12 w-12 text-gray-400" />
                        ) : item.file_type.startsWith('video/') ? (
                          <Film className="h-12 w-12 text-gray-400" />
                        ) : item.file_type.startsWith('audio/') ? (
                          <Music className="h-12 w-12 text-gray-400" />
                        ) : (
                          <FileText className="h-12 w-12 text-gray-400" />
                        )}
                      </div>
                    )}
                    <div className="p-2 text-xs truncate bg-white border-t">
                      {item.file_name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSelect}>Select</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaSelector;
