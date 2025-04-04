
import React from 'react';
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export interface SocialShareButtonsProps {
  url: string;
  title: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ url, title }) => {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied",
        description: "Link has been copied to clipboard",
      });
    }, (err) => {
      console.error('Could not copy text: ', err);
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        onClick={shareOnFacebook} 
        variant="outline" 
        size="sm" 
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Share
      </Button>
      
      <Button 
        onClick={shareOnTwitter} 
        variant="outline" 
        size="sm" 
        className="bg-blue-400 text-white hover:bg-blue-500"
      >
        <Twitter className="mr-2 h-4 w-4" />
        Tweet
      </Button>
      
      <Button 
        onClick={shareOnLinkedin} 
        variant="outline" 
        size="sm" 
        className="bg-blue-700 text-white hover:bg-blue-800"
      >
        <Linkedin className="mr-2 h-4 w-4" />
        Share
      </Button>
      
      <Button 
        onClick={copyToClipboard} 
        variant="outline" 
        size="sm"
      >
        <LinkIcon className="mr-2 h-4 w-4" />
        Copy Link
      </Button>
    </div>
  );
};

export default SocialShareButtons;
