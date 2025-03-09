
import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Trash, Bell } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    title: 'New comment on "How to Start a Business in Nigeria"',
    content: 'User JohnDoe commented: "This article was very helpful, thanks!"',
    date: '2 hours ago',
    isRead: false,
  },
  {
    id: 2,
    title: 'New subscriber',
    content: 'Email: jane.smith@example.com has subscribed to your newsletter',
    date: '6 hours ago',
    isRead: false,
  },
  {
    id: 3,
    title: 'Article approval needed',
    content: 'A new article has been submitted and requires your approval',
    date: '1 day ago',
    isRead: true,
  },
  {
    id: 4,
    title: 'System update',
    content: 'The system has been updated to version 2.3.0',
    date: '3 days ago',
    isRead: true,
  },
];

const AdminNotifications = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <p className="text-gray-600">Manage your system and user notifications</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All</Button>
            <Button variant="outline" size="sm">Unread</Button>
            <Button variant="outline" size="sm">Read</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Mark All as Read</Button>
            <Button variant="destructive" size="sm">Clear All</Button>
          </div>
        </div>

        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <Card key={notification.id} className={notification.isRead ? 'bg-white' : 'bg-blue-50 border-blue-200'}>
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    {!notification.isRead && (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                    {notification.title}
                  </CardTitle>
                  <CardDescription className="text-xs">{notification.date}</CardDescription>
                </div>
                <Badge variant={notification.isRead ? 'outline' : 'default'}>
                  {notification.isRead ? 'Read' : 'Unread'}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{notification.content}</p>
                <div className="flex gap-2 mt-3">
                  {!notification.isRead && (
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Mark as Read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-xs text-red-500">
                    <Trash className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
