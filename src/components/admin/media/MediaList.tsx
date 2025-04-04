
import { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MediaItem } from '@/types/media';

interface MediaListProps {
  mediaItems: MediaItem[];
  selectedFiles: string[];
  onSelectFile: (id: string) => void;
  onSelectAll: () => void;
  onDeleteFile: (id: string) => void;
  getMediaIcon: (fileType: string) => JSX.Element;
}

const MediaList = ({ 
  mediaItems, 
  selectedFiles, 
  onSelectFile, 
  onSelectAll, 
  onDeleteFile,
  getMediaIcon 
}: MediaListProps) => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <input
                type="checkbox"
                checked={selectedFiles.length === mediaItems.length && mediaItems.length > 0}
                onChange={onSelectAll}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600"
              />
            </TableHead>
            <TableHead>File</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mediaItems.map(file => (
            <TableRow key={file.id} className={selectedFiles.includes(file.id) ? 'bg-green-50' : ''}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => onSelectFile(file.id)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                />
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {Math.round(file.file_size / 1024)} KB
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  file.file_type.startsWith('image') ? 'bg-purple-100 text-purple-800' : 
                  file.file_type.startsWith('video') ? 'bg-blue-100 text-blue-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {file.file_type.split('/')[0]}
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {new Date(file.uploaded_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.open(file.file_path, '_blank')}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MediaList;
