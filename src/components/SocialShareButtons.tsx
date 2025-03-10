
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  MessageCircle,
  Share2,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";

interface SocialShareButtonsProps {
  url: string;
  title: string;
}

const SocialShareButtons = ({ url, title }: SocialShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copied!",
      description: "Article link copied to clipboard",
      duration: 3000,
    });
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const shareToWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-3 mb-6">
      <p className="text-sm font-medium text-gray-500">Share this article:</p>
      <div className="flex gap-2">
        <Button 
          onClick={shareToFacebook} 
          variant="outline" 
          size="sm" 
          className="rounded-full w-9 h-9 p-0"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4 text-blue-600" />
        </Button>
        <Button 
          onClick={shareToTwitter} 
          variant="outline" 
          size="sm" 
          className="rounded-full w-9 h-9 p-0"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4 text-sky-500" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full w-9 h-9 p-0"
          aria-label="Share on Instagram"
          onClick={() => toast({
            title: "Instagram sharing",
            description: "Instagram sharing is only available in the mobile app",
            duration: 3000,
          })}
        >
          <Instagram className="h-4 w-4 text-pink-600" />
        </Button>
        <Button 
          onClick={shareToWhatsapp} 
          variant="outline" 
          size="sm" 
          className="rounded-full w-9 h-9 p-0"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="h-4 w-4 text-green-500" />
        </Button>
        <Button 
          onClick={handleCopyLink} 
          variant="outline" 
          size="sm" 
          className="rounded-full w-9 h-9 p-0"
          aria-label="Copy link"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SocialShareButtons;
