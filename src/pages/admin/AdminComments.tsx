
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Check,
  X,
  Trash2,
  EyeOff,
  Eye,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Comment {
  id: string;
  content: string;
  status: string;
  article_id: string;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_email: string;
  article?: {
    id: string;
    title: string;
  };
}

const AdminComments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch comments from Supabase with article titles
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        article:articles(id, title)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Comment[];
  };

  // Approve comment
  const approveComment = async (id: string) => {
    const { error } = await supabase
      .from('comments')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) throw error;
    return id;
  };

  // Reject comment
  const rejectComment = async (id: string) => {
    const { error } = await supabase
      .from('comments')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) throw error;
    return id;
  };

  // Delete comment
  const deleteComment = async (id: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return id;
  };

  // Query & mutations
  const { data: comments = [], isLoading, error } = useQuery({
    queryKey: ['admin-comments'],
    queryFn: fetchComments
  });

  const approveMutation = useMutation({
    mutationFn: approveComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
      toast({
        title: 'Comment approved',
        description: 'The comment has been published.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to approve comment: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: rejectComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
      toast({
        title: 'Comment rejected',
        description: 'The comment has been hidden.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to reject comment: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-comments'] });
      setConfirmDeleteOpen(false);
      setSelectedComment(null);
      toast({
        title: 'Comment deleted',
        description: 'The comment has been permanently removed.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: `Failed to delete comment: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Apply filters
  const filteredComments = comments.filter(comment => {
    const matchesSearch = 
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comment.author_name && comment.author_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (comment.author_email && comment.author_email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteClick = (comment: Comment) => {
    setSelectedComment(comment);
    setConfirmDeleteOpen(true);
  };

  if (error) {
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
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Comments</h1>
          </div>
        </header>
        
        <main className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              {/* Search input */}
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
              
              {/* Status filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Comments</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner text="Loading comments..." />
            </div>
          ) : (
            <div className="rounded-md border bg-white">
              {filteredComments.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-gray-500">No comments found matching your filters.</p>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comment
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        On Article
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComments.map((comment) => (
                      <tr key={comment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{comment.author_name || 'Anonymous'}</div>
                          <div className="text-sm text-gray-500">{comment.author_email || 'No email'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 line-clamp-2">{comment.content}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {comment.article?.title || 'Unknown article'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${comment.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : comment.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {comment.status === 'pending' && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => approveMutation.mutate(comment.id)}
                                className="text-green-600"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => rejectMutation.mutate(comment.id)}
                                className="text-red-600"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {comment.status === 'approved' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => rejectMutation.mutate(comment.id)}
                              className="text-gray-600"
                            >
                              <EyeOff className="h-4 w-4" />
                            </Button>
                          )}
                          {comment.status === 'rejected' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => approveMutation.mutate(comment.id)}
                              className="text-gray-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteClick(comment)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={() => selectedComment && deleteMutation.mutate(selectedComment.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminComments;
