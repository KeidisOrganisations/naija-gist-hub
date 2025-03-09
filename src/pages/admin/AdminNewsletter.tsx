
import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Upload, UserPlus, Send, Check, X } from 'lucide-react';

const mockSubscribers = [
  { id: 1, email: 'john.doe@example.com', dateSubscribed: '2023-05-10', status: 'Active' },
  { id: 2, email: 'jane.smith@example.com', dateSubscribed: '2023-06-15', status: 'Active' },
  { id: 3, email: 'michael.johnson@example.com', dateSubscribed: '2023-07-20', status: 'Inactive' },
  { id: 4, email: 'sarah.williams@example.com', dateSubscribed: '2023-08-25', status: 'Active' },
  { id: 5, email: 'robert.brown@example.com', dateSubscribed: '2023-09-30', status: 'Active' },
  { id: 6, email: 'emily.jones@example.com', dateSubscribed: '2023-10-05', status: 'Active' },
];

const mockCampaigns = [
  { id: 1, title: 'August Newsletter', dateSent: '2023-08-01', recipients: 450, openRate: '32%' },
  { id: 2, title: 'September Newsletter', dateSent: '2023-09-01', recipients: 520, openRate: '28%' },
  { id: 3, title: 'October Special Offer', dateSent: '2023-10-15', recipients: 480, openRate: '35%' },
];

const AdminNewsletter = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Newsletter</h1>
          <p className="text-gray-600">Manage subscribers and send newsletters</p>
        </div>

        <Tabs defaultValue="subscribers">
          <TabsList className="mb-6">
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="create">Create Newsletter</TabsTrigger>
          </TabsList>

          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Email Subscribers</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                    <Button size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Subscriber
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date Subscribed</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSubscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell>
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium">{subscriber.email}</TableCell>
                          <TableCell>{subscriber.dateSubscribed}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              subscriber.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {subscriber.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Newsletter Campaigns</CardTitle>
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    New Campaign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date Sent</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Open Rate</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">{campaign.title}</TableCell>
                          <TableCell>{campaign.dateSent}</TableCell>
                          <TableCell>{campaign.recipients}</TableCell>
                          <TableCell>{campaign.openRate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Duplicate</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Newsletter Title</label>
                    <Input placeholder="November Newsletter" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject Line</label>
                    <Input placeholder="Check out our latest updates and tips!" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <Textarea placeholder="Write your newsletter content here..." rows={10} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      Test Email
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send Newsletter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminNewsletter;
