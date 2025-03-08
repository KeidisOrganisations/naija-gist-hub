
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  FileText,
  ArrowUpRight,
  Eye,
  ThumbsUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated for demo purposes
    const auth = localStorage.getItem('naijaHubAdminAuth');
    if (auth !== 'true') {
      toast({
        title: "Authentication required",
        description: "Please login to access the admin area",
        variant: "destructive",
        duration: 3000,
      });
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('naijaHubAdminAuth');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
      duration: 3000,
    });
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Visitors</p>
                  <h3 className="text-2xl font-bold">24,328</h3>
                </div>
                <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>12% increase</span>
              </div>
            </div>
            
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Page Views</p>
                  <h3 className="text-2xl font-bold">78,623</h3>
                </div>
                <div className="rounded-full bg-purple-50 p-3 text-purple-600">
                  <Eye className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>18% increase</span>
              </div>
            </div>
            
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Articles</p>
                  <h3 className="text-2xl font-bold">342</h3>
                </div>
                <div className="rounded-full bg-green-50 p-3 text-green-600">
                  <FileText className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>5 new today</span>
              </div>
            </div>
            
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Comments</p>
                  <h3 className="text-2xl font-bold">1,283</h3>
                </div>
                <div className="rounded-full bg-orange-50 p-3 text-orange-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>24 new today</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Top Performing Articles</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {[
                  { title: "How to Make Money with AI Tools in Nigeria", views: 12453, category: "Tech" },
                  { title: "Top 5 Apps Every Nigerian Student Should Have", views: 8932, category: "Tech" },
                  { title: "Getting Your International Passport Without Stress", views: 7845, category: "Life" },
                  { title: "How to Open a Dollar Account in Nigeria", views: 6234, category: "Money" },
                  { title: "Dating in Lagos: Finding Genuine Connections", views: 5421, category: "Relationships" }
                ].map((article, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{article.title}</p>
                      <span className="text-xs text-gray-500">{article.category}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Eye className="mr-1 h-3 w-3 text-gray-500" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Comments</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {[
                  { user: "Emeka Johnson", comment: "This article is very helpful! I've been looking for ways to make money with AI...", article: "How to Make Money with AI", time: "2 hours ago" },
                  { user: "Blessing Okafor", comment: "I've been using ChatGPT for my freelance writing and it has really increased my productivity...", article: "Top AI Tools for Writers", time: "5 hours ago" },
                  { user: "Tunde Adewale", comment: "Thanks for this guide! Just opened my dollar account yesterday following these steps...", article: "Dollar Account Guide", time: "1 day ago" },
                  { user: "Funke Akindele", comment: "These tips really work! I've already connected with 3 potential business partners...", article: "Networking at Events", time: "2 days ago" }
                ].map((comment, i) => (
                  <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{comment.user}</p>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{comment.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">on: {comment.article}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic Overview */}
          <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Traffic Overview</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Weekly</Button>
                <Button variant="outline" size="sm">Monthly</Button>
                <Button variant="outline" size="sm" className="bg-naija-lightGreen text-naija-charcoal">Yearly</Button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center">
              <BarChart3 className="h-40 w-40 text-gray-300" />
              <p className="text-gray-500">Traffic chart visualization would appear here</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
