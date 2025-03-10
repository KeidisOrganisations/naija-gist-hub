
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import {
  Bell,
  UserPlus,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Trash2,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'comment',
    message: 'John Doe commented on your article "How to Make Money with AI Tools in Nigeria"',
    time: '10 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'subscriber',
    message: 'New subscriber: mary@example.com',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'system',
    message: 'System backup completed successfully',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 4,
    type: 'comment',
    message: 'Jane Smith replied to a comment on "Top 5 Apps Every Nigerian Student Should Have"',
    time: '1 day ago',
    read: true,
  },
  {
    id: 5,
    type: 'system',
    message: 'New version of the CMS is available (v2.1.0)',
    time: '2 days ago',
    read: true,
  },
  {
    id: 6,
    type: 'subscriber',
    message: 'New subscriber: david@example.com',
    time: '3 days ago',
    read: true,
  },
  {
    id: 7,
    type: 'system',
    message: 'Warning: Disk space usage is above 80%',
    time: '4 days ago',
    read: false,
    urgent: true,
  },
  {
    id: 8,
    type: 'subscriber',
    message: '10 new subscribers from newsletter campaign',
    time: '5 days ago',
    read: true,
  },
];

type NotificationType = 'all' | 'comment' | 'subscriber' | 'system';

const AdminNotifications = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [notificationType, setNotificationType] = useState<NotificationType>('all');
  const [notifications, setNotifications] = useState(mockNotifications);
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

  const filteredNotifications = notifications.filter(notification => {
    if (notificationType === 'all') {
      return true;
    }
    return notification.type === notificationType;
  });

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    toast({
      title: "All notifications marked as read",
      duration: 3000,
    });
  };

  const handleMarkAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === id) {
        return {
          ...notification,
          read: true,
        };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  const handleDeleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    toast({
      title: "Notification deleted",
      duration: 3000,
    });
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      duration: 3000,
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'subscriber':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
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
            <h1 className="text-2xl font-bold">Notifications</h1>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark All as Read
                </Button>
              )}
              {notifications.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => {
                toast({
                  title: "Refreshed",
                  description: "Notifications have been refreshed",
                  duration: 3000,
                });
              }}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          <Tabs value={notificationType} onValueChange={(value) => setNotificationType(value as NotificationType)}>
            <TabsList className="mb-6">
              <TabsTrigger value="all" className="relative">
                All
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="comment">Comments</TabsTrigger>
              <TabsTrigger value="subscriber">Subscribers</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
            
            <TabsContent value={notificationType}>
              <div className="rounded-md border bg-white overflow-hidden">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Bell className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {notificationType === 'all' 
                        ? 'You don\'t have any notifications at the moment.' 
                        : `You don't have any ${notificationType} notifications.`}
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredNotifications.map((notification) => (
                      <li 
                        key={notification.id} 
                        className={cn(
                          "relative p-4 hover:bg-gray-50 cursor-pointer group",
                          !notification.read && "bg-blue-50"
                        )}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <p className={cn(
                                "text-sm",
                                !notification.read ? "font-semibold" : "text-gray-700"
                              )}>
                                {notification.message}
                              </p>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMarkAsRead(notification.id);
                                  }}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNotification(notification.id);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-xs text-gray-500">{notification.time}</p>
                              {notification.urgent && (
                                <span className="flex items-center text-xs text-red-600">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Urgent
                                </span>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminNotifications;
