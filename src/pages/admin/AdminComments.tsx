
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  CheckCircle,
  XCircle,
  Trash2,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

// Type for the comment data from Supabase
interface Comment {
  id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: string;
  created_at: string;
  article: {
    id: string;
    title: string;
  };
}

// Fetch comments from Supabase
const fetchComments = async () => {
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      article:articles(id, title)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Update comment status
const updateCommentStatus = async ({ id, status }: { id: string; status: string }) => {
  const { error } = await supabase
    .from('comments')
    .update({ status })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

// Delete a comment
const deleteComment = async (id: string) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

// Batch update comment status
const batchUpdateStatus = async ({ ids, status }: { ids: string[]; status: string }) => {
  const { error } = await supabase
    .from('comments')
    .update({ status })
    .in('id', ids);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

// Batch delete comments
const batchDeleteComments = async (ids: string[]) => {
  const { error } = await supabase
    .from('comments')
    .delete()
    .in('id', ids);

  if (error) {
    throw new Error(error.message);
  }
  
  return true;
};

const AdminComments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [replyText, setReplyText] = useState('');
  
  const queryClient = useQueryClient();

  // Fetch comments with React Query
  const {
    data: comments = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments
  });

  // Update comment status mutation
  const updateStatusMutation = useMutation({
    mutationFn: updateCommentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast({
        title: "Comment status updated",
        description: "The comment status has been updated successfully.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update comment status: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Delete comment mutation
  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast({
        title: "Comment deleted",
        description: "The comment has been deleted successfully.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete comment: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Batch update status mutation
  const batchUpdateMutation = useMutation({
    mutationFn: batchUpdateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast({
        title: "Comments approved",
        description: `${selectedComments.length} comments have been approved.`,
        duration: 3000,
      });
      setSelectedComments([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to approve comments: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Batch delete mutation
  const batchDeleteMutation = useMutation({
    mutationFn: batchDeleteComments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      toast({
        title: "Comments deleted",
        description: `${selectedComments.length} comments have been deleted.`,
        duration: 3000,
      });
      setSelectedComments([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete comments: ${error.message}`,
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  // Filter comments based on search and filters
  const filteredComments = comments.filter((comment: Comment) => {
    const matchesSearch = comment.author_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (comment.article?.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || comment.status === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map(comment => comment.id));
    }
  };

  const handleSelectComment = (id: string) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter(commentId => commentId !== id));
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleApprove = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'approved' });
  };

  const handleApproveSelected = () => {
    if (selectedComments.length === 0) return;
    
    batchUpdateMutation.mutate({
      ids: selectedComments,
      status: 'approved'
    });
  };

  const handleSpam = (id: string) => {
    updateStatusMutation.mutate({ id, status: 'spam' });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleDeleteSelected = () => {
    if (selectedComments.length === 0) return;
    
    batchDeleteMutation.mutate(selectedComments);
  };

  const handleReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Reply cannot be empty",
        description: "Please enter a reply message.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // In a real implementation, you would send an email to the commenter here
    toast({
      title: "Reply sent",
      description: `Your reply to ${replyTo?.author_name} has been sent.`,
      duration: 3000,
    });

    setReplyTo(null);
    setReplyText('');
  };

  const handleViewArticle = (articleId: string) => {
    // Open article in a new tab
    window.open(`/article/${articleId}`, '_blank');
  };

  if (isError) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error loading comments: {(error as Error).message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Comments</h1>
            {selectedComments.length > 0 && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleApproveSelected}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Selected
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </header>
        
        <main className="p-6">
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search comments..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Spam">Spam</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Comments Table */}
          <div className="rounded-md border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all comments"
                    />
                  </TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Article</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Loading comments...
                    </TableCell>
                  </TableRow>
                ) : filteredComments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No comments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredComments.map((comment: Comment) => (
                    <TableRow key={comment.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedComments.includes(comment.id)}
                          onCheckedChange={() => handleSelectComment(comment.id)}
                          aria-label={`Select comment by ${comment.author_name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{comment.author_name}</p>
                          <p className="text-xs text-gray-500">{comment.author_email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="line-clamp-2 max-w-xs">{comment.content}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <p className="truncate max-w-[150px]">{comment.article?.title || 'Unknown Article'}</p>
                          {comment.article && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 ml-1"
                              onClick={() => handleViewArticle(comment.article.id)}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${comment.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`
                          }
                        >
                          {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{format(new Date(comment.created_at), 'yyyy-MM-dd HH:mm')}</TableCell>
                      <TableCell className="flex justify-end gap-2">
                        {comment.status === 'pending' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-green-600"
                            onClick={() => handleApprove(comment.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {comment.status !== 'spam' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-orange-600"
                            onClick={() => handleSpam(comment.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-blue-600"
                              onClick={() => setReplyTo(comment)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reply to Comment</DialogTitle>
                              <DialogDescription>
                                Your reply will be sent to {replyTo?.author_name}'s email address.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="bg-gray-50 p-3 rounded-md mb-4">
                              <p className="text-sm font-medium">{replyTo?.author_name} wrote:</p>
                              <p className="text-sm text-gray-600 mt-1">{replyTo?.content}</p>
                            </div>
                            <Textarea
                              placeholder="Type your reply here..."
                              className="min-h-[120px]"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline" onClick={() => {
                                  setReplyTo(null);
                                  setReplyText('');
                                }}>
                                  Cancel
                                </Button>
                              </DialogClose>
                              <Button onClick={handleReply}>Send Reply</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminComments;
