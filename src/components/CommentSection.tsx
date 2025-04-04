
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, ThumbsUp, ThumbsDown, Flag, Reply } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

type Comment = {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Reply[];
  avatar?: string;
};

type Reply = {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
  avatar?: string;
};

type CommentSectionProps = {
  articleId: string;
};

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Emeka Johnson',
      content: "This article is very helpful! I've been looking for ways to make money with AI and I'm definitely going to try some of these tools.",
      date: '2 days ago',
      likes: 5,
      dislikes: 0,
      avatar: 'https://placehold.co/100x100/9AE19D/FFFFFF?text=EJ',
      replies: [
        {
          id: '1-1',
          name: 'Admin',
          content: 'Thank you for your feedback, Emeka! We\'re glad you found the article useful.',
          date: '1 day ago',
          likes: 2,
          avatar: 'https://placehold.co/100x100/9AE19D/FFFFFF?text=A',
        }
      ]
    },
    {
      id: '2',
      name: 'Blessing Okafor',
      content: "I've been using ChatGPT for my freelance writing and it has really increased my productivity. Great tips!",
      date: '1 week ago',
      likes: 8,
      dislikes: 1,
      avatar: 'https://placehold.co/100x100/9AE19D/FFFFFF?text=BO',
    },
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const [dislikedComments, setDislikedComments] = useState<Record<string, boolean>>({});
  const [commentSorting, setCommentSorting] = useState<'newest' | 'oldest' | 'popular'>('newest');

  useEffect(() => {
    // Check for saved user info in localStorage
    const savedName = localStorage.getItem('commentName');
    const savedEmail = localStorage.getItem('commentEmail');
    
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleAddComment = () => {
    if (!newComment.trim() || !name.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and comment",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Optional email validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Save user info for future comments
    localStorage.setItem('commentName', name);
    if (email) localStorage.setItem('commentEmail', email);
    
    // Create avatar text from name
    const nameInitials = name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    const comment: Comment = {
      id: Date.now().toString(),
      name: name,
      content: newComment,
      date: 'Just now',
      likes: 0,
      dislikes: 0,
      avatar: `https://placehold.co/100x100/9AE19D/FFFFFF?text=${nameInitials}`,
      replies: [],
    };
    
    // Add new comment to the top or bottom based on sorting
    if (commentSorting === 'newest') {
      setComments([comment, ...comments]);
    } else {
      setComments([...comments, comment]);
    }
    
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
      duration: 3000,
    });
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim() || !name.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and reply",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Create avatar text from name
    const nameInitials = name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
    
    const reply: Reply = {
      id: `${commentId}-${Date.now()}`,
      name: name,
      content: replyContent,
      date: 'Just now',
      likes: 0,
      avatar: `https://placehold.co/100x100/9AE19D/FFFFFF?text=${nameInitials}`,
    };
    
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            replies: [...(comment.replies || []), reply] 
          } 
        : comment
    ));
    
    setReplyingTo(null);
    setReplyContent('');
    
    toast({
      title: "Reply added",
      description: "Your reply has been posted successfully",
      duration: 3000,
    });
  };

  const handleLike = (commentId: string) => {
    // If already liked, do nothing
    if (likedComments[commentId]) return;
    
    // If disliked, remove dislike first
    let updatedDisliked = { ...dislikedComments };
    if (dislikedComments[commentId]) {
      delete updatedDisliked[commentId];
      setDislikedComments(updatedDisliked);
    }
    
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            likes: comment.likes + 1,
            dislikes: dislikedComments[commentId] ? comment.dislikes - 1 : comment.dislikes
          } 
        : comment
    ));
    
    setLikedComments({ ...likedComments, [commentId]: true });
  };

  const handleDislike = (commentId: string) => {
    // If already disliked, do nothing
    if (dislikedComments[commentId]) return;
    
    // If liked, remove like first
    let updatedLiked = { ...likedComments };
    if (likedComments[commentId]) {
      delete updatedLiked[commentId];
      setLikedComments(updatedLiked);
    }
    
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            dislikes: comment.dislikes + 1,
            likes: likedComments[commentId] ? comment.likes - 1 : comment.likes
          } 
        : comment
    ));
    
    setDislikedComments({ ...dislikedComments, [commentId]: true });
  };

  const handleReport = (commentId: string) => {
    toast({
      title: "Comment reported",
      description: "Thank you for helping us maintain a respectful community",
      duration: 3000,
    });
  };
  
  const handleSortChange = (sortType: 'newest' | 'oldest' | 'popular') => {
    setCommentSorting(sortType);
    
    let sortedComments = [...comments];
    
    if (sortType === 'newest') {
      // Sort by most recent (assuming higher IDs are newer for now)
      sortedComments.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortType === 'oldest') {
      // Sort by oldest first
      sortedComments.sort((a, b) => Number(a.id) - Number(b.id));
    } else if (sortType === 'popular') {
      // Sort by most likes
      sortedComments.sort((a, b) => b.likes - a.likes);
    }
    
    setComments(sortedComments);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-naija-green" size={24} />
        <h3 className="text-xl font-semibold font-heading">Comments ({comments.length})</h3>
      </div>
      
      {/* Add Comment Form */}
      <div className="mb-8 border-b pb-8">
        <h4 className="font-medium mb-4">Join the conversation</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Your Email <span className="text-gray-400">(optional)</span>
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Your Comment <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naija-green"
              required
            />
          </div>
          <Button 
            onClick={handleAddComment}
            className="bg-naija-green hover:bg-naija-green/90 text-black"
          >
            Post Comment
          </Button>
        </div>
      </div>
      
      {/* Comments Sorting */}
      {comments.length > 0 && (
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-medium">All Comments</h4>
          <div className="flex gap-2">
            <Button 
              variant={commentSorting === 'newest' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleSortChange('newest')}
              className={commentSorting === 'newest' ? 'bg-naija-green text-black' : ''}
            >
              Newest
            </Button>
            <Button 
              variant={commentSorting === 'oldest' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleSortChange('oldest')}
              className={commentSorting === 'oldest' ? 'bg-naija-green text-black' : ''}
            >
              Oldest
            </Button>
            <Button 
              variant={commentSorting === 'popular' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleSortChange('popular')}
              className={commentSorting === 'popular' ? 'bg-naija-green text-black' : ''}
            >
              Popular
            </Button>
          </div>
        </div>
      )}
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Be the first to comment on this article!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Avatar>
                    <img src={comment.avatar} alt={comment.name} />
                  </Avatar>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{comment.name}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{comment.content}</p>
                  <div className="flex items-center gap-4 mb-3">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center gap-1 text-sm ${likedComments[comment.id] ? 'text-naija-green' : 'text-gray-500 hover:text-naija-green'}`}
                      aria-label="Like comment"
                    >
                      <ThumbsUp size={14} />
                      <span>{comment.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleDislike(comment.id)}
                      className={`flex items-center gap-1 text-sm ${dislikedComments[comment.id] ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                      aria-label="Dislike comment"
                    >
                      <ThumbsDown size={14} />
                      <span>{comment.dislikes}</span>
                    </button>
                    <button 
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-naija-green"
                      aria-label="Reply to comment"
                    >
                      <Reply size={14} />
                      <span>Reply</span>
                    </button>
                    <button 
                      onClick={() => handleReport(comment.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
                      aria-label="Report comment"
                    >
                      <Flag size={14} />
                      <span>Report</span>
                    </button>
                  </div>
                  
                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 mb-4 bg-gray-50 p-4 rounded-lg">
                      <h5 className="text-sm font-medium mb-2">Reply to {comment.name}</h5>
                      <Textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        rows={3}
                        className="w-full mb-3"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleReply(comment.id)} 
                          size="sm"
                          className="bg-naija-green hover:bg-naija-green/90 text-black"
                        >
                          Post Reply
                        </Button>
                        <Button 
                          onClick={() => setReplyingTo(null)} 
                          variant="outline" 
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-100">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="flex-shrink-0">
                            <Avatar className="w-8 h-8">
                              <img src={reply.avatar} alt={reply.name} />
                            </Avatar>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-sm">{reply.name}</h5>
                              <span className="text-xs text-gray-500">{reply.date}</span>
                            </div>
                            <p className="text-gray-700 text-sm">{reply.content}</p>
                            <button 
                              onClick={() => handleLike(`reply-${reply.id}`)}
                              className={`flex items-center gap-1 text-xs mt-1 ${likedComments[`reply-${reply.id}`] ? 'text-naija-green' : 'text-gray-500 hover:text-naija-green'}`}
                            >
                              <ThumbsUp size={12} />
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
