
import { Image, Video, File } from 'lucide-react';

export const getMediaIcon = (fileType: string) => {
  if (fileType.startsWith('image')) {
    return <Image className="h-16 w-16 text-gray-400" />;
  } else if (fileType.startsWith('video')) {
    return <Video className="h-16 w-16 text-gray-400" />;
  } else {
    return <File className="h-16 w-16 text-gray-400" />;
  }
};
