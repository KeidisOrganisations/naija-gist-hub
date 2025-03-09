
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Filter,
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
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

// Mock data
const mockComments = [
  {
    id: 1,
    author: "Emeka Johnson",
    email: "emeka@example.com",
    comment: "This article is very helpful! I've been looking for ways to make money with AI and these tips are practical for the Nigerian context.",
    article: "How to Make Money with AI Tools in Nigeria",
    articleId: 1,
    status: "Approved",
    date: "2023-10-15 14:32",
  },
  {
    id: 2,
    author: "Blessing Okafor",
    email: "blessing@example.com",
    comment: "I've been using ChatGPT for my freelance writing and it has really increased my productivity. Thank you for sharing these insights!",
    article: "Top 5 AI Tools for Writers",
    articleId: 2,
    status: "Approved",
    date: "2023-10-14 09:15",
  },
  {
    id: 3,
    author: "Tunde Adewale",
    email: "tunde@example.com",
    comment: "Thanks for this guide! Just opened my dollar account yesterday following these steps. The process was smooth.",
    article: "How to Open a Dollar Account in Nigeria",
    articleId: 4,
    status: "Pending",
    date: "2023-10-13 18:43",
  },
  {
    id: 4,
    author: "Funke Akindele",
    email: "funke@example.com",
    comment: "These tips really work! I've already connected with 3 potential business partners using the networking strategies you suggested.",
    article: "Networking at Events: How to Make Valuable Connections",
    articleId: 5,
    status: "Approved",
    date: "2023-10-12 11:27",
  },
  {
    id: 5,
    author: "spam_bot",
    email: "spam@example.com",
    comment: "Check out my website for amazing deals on designer bags! [link removed]",
    article: "How to Open a Dollar Account in Nigeria",
    articleId: 4,
    status: "Spam",
    date: "2023-10-11 03:12",
  },
  {
    id: 6,
    author: "Ibrahim Mohammed",
    email: "ibrahim@example.com",
    comment: "This budget template is exactly what I needed for my small business. The Excel formulas are well set up.",
    article: "Free Budget Templates for Nigerian Small Businesses",
    articleId: 6,
    status: "Pending",
    date: "2023-10-10 15:39",
  },
  {
    id: 7,
    author: "Ngozi Okonjo",
    email: "ngozi@example.com",
    comment: "As someone who has worked in finance for 10 years, I can confirm these investment strategies are sound. Great article!",
    article: "Investment Opportunities in Nigeria's Growing Sectors",
    articleId: 7,
    status: "Approved",
    date: "2023-10-09 17:22",
  },
  {
    id: 8,
    author: "David Adeleke",
    email: "david@example.com",
    comment: "The tips on dealing with Lagos traffic are spot on! I've started using the alternative routes you suggested and it's saved me hours.",
    article: "Navigating Lagos Traffic: Insider Tips and Shortcuts",
    articleId: 8,
    status: "Pending",
    date: "2023-10-08 08:54",
  },
];

const AdminComments = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedComments, setSelectedComments] = useState<number[]>([]);
  const [replyTo, setReplyTo] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const navigate = useNavigate();

  // Filter comments based on search and filters
  const filteredComments = mockComments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.article.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || comment.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map(comment => comment.id));
    }
  };

  const handleSelectComment = (id: number) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter(commentId => commentId !== id));
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleApprove = (id: number) => {
    // In a real app, you would send a request to your backend
    toast({
      title: "Comment approved",
      description: "The comment has been approved and published.",
      duration: 3000,
    });
  };

  const handleApproveSelected = () => {
    if (selectedComments.length === 0) return;
    
    // In a real app, you would send a request to your backend
    toast({
      title: `${selectedComments.length} comments approved`,
      description: "The selected comments have been approved and published.",
      duration: 3000,
    });
    
    setSelectedComments([]);
  };

  const handleSpam = (id: number) => {
    // In a real app, you would send a request to your backend
    toast({
      title: "Comment marked as spam",
      description: "The comment has been marked as spam and removed from public view.",
      duration: 3000,
    });
  };

  const handleDelete = (id: number) => {
    // In a real app, you would send a request to your backend
    toast({
      title: "Comment deleted",
      description: "The comment has been permanently deleted.",
      duration: 3000,
    });
  };

  const handleDeleteSelected = () => {
    if (selectedComments.length === 0) return;
    
    // In a real app, you would send a request to your backend
    toast({
      title: `${selectedComments.length} comments deleted`,
      description: "The selected comments have been permanently deleted.",
      duration: 3000,
    });
    
    setSelectedComments([]);
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

    // In a real app, you would send a request to your backend
    toast({
      title: "Reply sent",
      description: `Your reply to ${replyTo.author} has been sent.`,
      duration: 3000,
    });

    setReplyTo(null);
    setReplyText('');
  };

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
                {filteredComments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No comments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredComments.map(comment => (
                    <TableRow key={comment.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedComments.includes(comment.id)}
                          onCheckedChange={() => handleSelectComment(comment.id)}
                          aria-label={`Select comment by ${comment.author}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-xs text-gray-500">{comment.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="line-clamp-2 max-w-xs">{comment.comment}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <p className="truncate max-w-[150px]">{comment.article}</p>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-1">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${comment.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                              comment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`
                          }
                        >
                          {comment.status}
                        </span>
                      </TableCell>
                      <TableCell>{comment.date}</TableCell>
                      <TableCell className="flex justify-end gap-2">
                        {comment.status === 'Pending' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-green-600"
                            onClick={() => handleApprove(comment.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {comment.status !== 'Spam' && (
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
                                Your reply will be sent to {replyTo?.author}'s email address.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="bg-gray-50 p-3 rounded-md mb-4">
                              <p className="text-sm font-medium">{replyTo?.author} wrote:</p>
                              <p className="text-sm text-gray-600 mt-1">{replyTo?.comment}</p>
                            </div>
                            <Textarea
                              placeholder="Type your reply here..."
                              className="min-h-[120px]"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {
                                setReplyTo(null);
                                setReplyText('');
                              }}>
                                Cancel
                              </Button>
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
