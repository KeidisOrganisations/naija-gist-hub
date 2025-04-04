
import { useState } from 'react';
import { MoreHorizontal, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { MediaItem } from '@/types/media';

interface MediaGridProps {
  mediaItems: MediaItem[];
  selectedFiles: string[];
  onSelectFile: (id: string) => void;
  onDeleteFile: (id: string) => void;
  getMediaIcon: (fileType: string) => JSX.Element;
}

const MediaGrid = ({ 
  mediaItems, 
  selectedFiles, 
  onSelectFile, 
  onDeleteFile,
  getMediaIcon 
}: MediaGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {mediaItems.map(file => (
        <div 
          key={file.id}
          className={`relative rounded-md border overflow-hidden group ${
            selectedFiles.includes(file.id) ? 'ring-2 ring-naija-green' : ''
          }`}
          onClick={() => onSelectFile(file.id)}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Deletion</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete "{file.name}"? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button 
                        variant="destructive" 
                        onClick={() => onDeleteFile(file.id)}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid;
