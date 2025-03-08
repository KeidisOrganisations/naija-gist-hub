
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, ThumbsUp, Flag } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

type Comment = {
  id: string;
  name: string;
  content: string;
  date: string;
  likes: number;
};

type CommentSectionProps = {
  articleId: string;
};

const CommentSection = ({ articleId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Emeka Johnson',
      content: 'This article is very helpful! I've been looking for ways to make money with AI and I'm definitely going to try some of these tools.',
      date: '2 days ago',
      likes: 5,
    },
    {
      id: '2',
      name: 'Blessing Okafor',
      content: 'I've been using ChatGPT for my freelance writing and it has really increased my productivity. Great tips!',
      date: '1 week ago',
      likes: 8,
    },
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [liked, setLiked] = useState<Record<string, boolean>>({});

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
    
    const comment: Comment = {
      id: Date.now().toString(),
      name: name,
      content: newComment,
      date: 'Just now',
      likes: 0,
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
      duration: 3000,
    });
  };

  const handleLike = (commentId: string) => {
    if (liked[commentId]) return;

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ));
    
    setLiked({ ...liked, [commentId]: true });
  };

  const handleReport = (commentId: string) => {
    toast({
      title: "Comment reported",
      description: "Thank you for helping us maintain a respectful community",
      duration: 3000,
    });
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
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Your Comment
            </label>
            <textarea
              id="comment"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-naija-green"
            ></textarea>
          </div>
          <Button 
            onClick={handleAddComment}
            className="bg-naija-green hover:bg-naija-green/90 text-black"
          >
            Post Comment
          </Button>
        </div>
      </div>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Be the first to comment on this article!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{comment.name}</h4>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700 mb-3">{comment.content}</p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1 text-sm ${liked[comment.id] ? 'text-naija-green' : 'text-gray-500 hover:text-naija-green'}`}
                >
                  <ThumbsUp size={14} />
                  <span>{comment.likes}</span>
                </button>
                <button 
                  onClick={() => handleReport(comment.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
                >
                  <Flag size={14} />
                  <span>Report</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
