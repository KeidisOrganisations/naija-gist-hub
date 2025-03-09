
import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Upload } from 'lucide-react';

const AdminSettings = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Manage your website settings and preferences</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="permissions">User Permissions</TabsTrigger>
            <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your website's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input id="site-title" defaultValue="Naija How-To Hub" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    defaultValue="Practical guides on finance, education, tech, business, and everyday life in Nigeria." 
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input id="site-url" defaultValue="https://naijahowto.netlify.app" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" defaultValue="admin@naijahub.com" />
                </div>

                <div className="space-y-2">
                  <Label>Logo & Favicon</Label>
                  <div className="flex items-start space-x-6">
                    <div className="space-y-2">
                      <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto text-gray-400" />
                          <span className="text-xs text-gray-500 mt-1">Logo</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-24">Upload</Button>
                    </div>
                    <div className="space-y-2">
                      <div className="h-12 w-12 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                          <Upload className="h-4 w-4 mx-auto text-gray-400" />
                          <span className="text-[10px] text-gray-500">Favicon</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-24">Upload</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how your website looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex">
                    <Input id="primary-color" defaultValue="#00913E" className="w-40" />
                    <div className="w-10 h-10 ml-2 rounded" style={{ backgroundColor: '#00913E' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex">
                    <Input id="secondary-color" defaultValue="#F9DA0A" className="w-40" />
                    <div className="w-10 h-10 ml-2 rounded" style={{ backgroundColor: '#F9DA0A' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme-mode">Theme Mode</Label>
                  <Select defaultValue="light">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select theme mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Administrator</h3>
                      <p className="text-sm text-gray-500">Full access to all settings and features</p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">Edit Role</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Editor</h3>
                      <p className="text-sm text-gray-500">Can create and edit all content but can't modify settings</p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">Edit Role</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Author</h3>
                      <p className="text-sm text-gray-500">Can create and edit their own content</p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">Edit Role</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <h3 className="font-medium">Contributor</h3>
                      <p className="text-sm text-gray-500">Can write and edit their own posts but cannot publish</p>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">Edit Role</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-notifications" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-medium">New Comments</h3>
                      <p className="text-sm text-gray-500">Get notified when someone comments on your article</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="comment-notifications" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h3 className="font-medium">New Subscribers</h3>
                      <p className="text-sm text-gray-500">Get notified when someone subscribes to your newsletter</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="subscriber-notifications" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <h3 className="font-medium">System Notifications</h3>
                      <p className="text-sm text-gray-500">Get notified about system updates and maintenance</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="system-notifications" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSettings;
