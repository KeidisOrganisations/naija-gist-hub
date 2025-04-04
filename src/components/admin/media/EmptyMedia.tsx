
import { Image as ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyMediaProps {
  onUploadClick: () => void;
  hasSearchQuery: boolean;
}

const EmptyMedia = ({ onUploadClick, hasSearchQuery }: EmptyMediaProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900">No media files found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {hasSearchQuery ? 'Try adjusting your search query.' : 'Upload new files to get started.'}
      </p>
      {!hasSearchQuery && (
        <Button className="mt-4" onClick={onUploadClick}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      )}
    </div>
  );
};

export default EmptyMedia;
