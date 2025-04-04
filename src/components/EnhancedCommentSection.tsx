
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Comment, fetchComments, postComment } from '@/services/comment-service';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MessageSquare, ThumbsUp, Reply, Flag, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CommentSectionProps {
  articleId: string;
}

const EnhancedCommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  
  useEffect(() => {
    loadComments();
  }, [articleId]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const fetchedComments = await fetchComments(articleId);
      setComments(fetchedComments);
      setError(null);
    } catch (err: any) {
      console.error('Error loading comments:', err);
      setError(err.message || 'Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.content) {
      setError('Name and comment are required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newComment = {
        article_id: articleId,
        author_name: formData.name,
        author_email: formData.email || null,
        content: formData.content,
        user_id: null, // In a real app, set to the logged-in user's ID
        parent_id: replyTo ? replyTo.id : null
      };

      await postComment(newComment);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        content: '',
      });
      setReplyTo(null);
      
      // Reload comments to show the new one
      loadComments();
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      setError(err.message || 'Failed to submit comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (comment: Comment) => {
    setReplyTo(comment);
    // Scroll to comment form
    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelReply = () => {
    setReplyTo(null);
  };

  const renderComment = (comment: Comment, level = 0) => {
    const initials = comment.author_name
      ? comment.author_name
          .split(' ')
          .map(part => part[0])
          .join('')
          .toUpperCase()
      : '??';

    return (
      <div key={comment.id} className={`mb-6 ${level > 0 ? 'ml-12' : ''}`}>
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{comment.author_name || 'Anonymous'}</div>
                <div className="text-gray-500 text-sm">
                  {new Date(comment.created_at).toLocaleDateString()}
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleReply(comment)}>
                    <Reply className="mr-2 h-4 w-4" />
                    Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="mt-2 text-gray-700">{comment.content}</div>
            
            <div className="mt-2 flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ThumbsUp className="mr-1 h-3 w-3" />
                Like
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => handleReply(comment)}>
                <Reply className="mr-1 h-3 w-3" />
                Reply
              </Button>
            </div>
          </div>
        </div>
        
        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 border-l-2 border-gray-100 pl-4">
            {comment.replies.map(reply => renderComment(reply, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    // For 'popular', we'd need a way to track popularity (likes, etc.)
    return 0;
  });

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <MessageSquare className="mr-2" />
        Comments ({comments.length})
      </h2>
      
      {/* Comment form */}
      <div id="comment-form" className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {replyTo ? `Reply to ${replyTo.author_name}` : 'Leave a Comment'}
        </h3>
        
        {replyTo && (
          <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
            <div className="font-medium">{replyTo.author_name} wrote:</div>
            <p className="text-gray-700">{replyTo.content}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={cancelReply}
              className="mt-2 text-gray-500"
            >
              Cancel Reply
            </Button>
          </div>
        )}
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name*
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (optional)
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Comment*
            </label>
            <Textarea
              id="content"
              name="content"
              rows={4}
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="bg-naija-green hover:bg-naija-green/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </Button>
        </form>
      </div>
      
      {/* Comments list */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner text="Loading comments..." />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No comments yet</h3>
          <p className="text-gray-600">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">All Comments</h3>
            
            <Tabs defaultValue={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <TabsList>
                <TabsTrigger value="newest">Newest</TabsTrigger>
                <TabsTrigger value="oldest">Oldest</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            {sortedComments.map(comment => renderComment(comment))}
          </div>
        </>
      )}
    </section>
  );
};

export default EnhancedCommentSection;
