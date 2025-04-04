
import { FolderPlus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';

interface MediaHeaderProps {
  onUploadClick: () => void;
  onCreateFolder: (name: string) => void;
  isUploading: boolean;
}

const MediaHeader = ({ onUploadClick, onCreateFolder, isUploading }: MediaHeaderProps) => {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      onCreateFolder(folderName);
      setFolderName('');
      setIsCreateFolderOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <div className="flex items-center gap-2">
          <input
            type="file"
            id="file-upload"
            multiple
            className="hidden"
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
            onClick={onUploadClick}
            disabled={isUploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MediaHeader;
