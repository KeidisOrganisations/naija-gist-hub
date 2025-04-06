import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Upload,
  Save,
  Moon,
  Sun,
  Globe,
  Bell,
  Mail,
  User,
  Shield,
  Lock,
  Loader2,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { fetchSiteSettings, saveSiteSettings, SiteSettings } from '@/services/settings-service';

const AdminSettings = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'Naija Hub',
    siteDescription: 'Nigeria\'s premier destination for tech, lifestyle, and business insights.',
    contactEmail: 'info@naijahub.com',
    copyrightText: '© 2023 Naija Hub. All rights reserved.',
    enableComments: true,
    moderateComments: true,
    enableNewsletter: true,
    enableDarkMode: false,
    socialLinks: {
      facebook: 'https://facebook.com/naijahub',
      twitter: 'https://twitter.com/naijahub',
      instagram: 'https://instagram.com/naijahub',
    }
  });
  
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
      // Load settings
      loadSettings();
    }
  }, [navigate]);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const settings = await fetchSiteSettings();
      if (settings) {
        setSiteSettings(settings);
        setIsDarkMode(settings.enableDarkMode);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteSettings({
      ...siteSettings,
      [name]: value,
    });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSiteSettings({
      ...siteSettings,
      [name]: checked,
    });
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSiteSettings({
      ...siteSettings,
      socialLinks: {
        ...siteSettings.socialLinks,
        [name]: value,
      },
    });
  };

  const handleSaveSettings = async (tab: string) => {
    try {
      setIsLoading(true);
      // Save settings to database
      await saveSiteSettings(siteSettings);
      
      toast({
        title: "Settings saved",
        description: `${tab} settings have been successfully saved.`,
        duration: 3000,
      });
    } catch (error) {
      console.error(`Failed to save ${tab} settings:`, error);
      toast({
        title: "Error saving settings",
        description: `An error occurred while saving ${tab} settings.`,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = () => {
    document.getElementById("logo-upload")?.click();
  };

  const handleFaviconUpload = () => {
    document.getElementById("favicon-upload")?.click();
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
            <h1 className="text-2xl font-bold">Settings</h1>
            <div className="flex gap-2">
              <Switch
                checked={isDarkMode}
                onCheckedChange={(checked) => {
                  setIsDarkMode(checked);
                  handleSwitchChange('enableDarkMode', checked);
                }}
                id="dark-mode"
              />
              <Label htmlFor="dark-mode" className="flex items-center gap-2">
                {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </Label>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {isLoading && (
            <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Loading settings...</span>
              </div>
            </div>
          )}
          
          <Tabs defaultValue="general">
            <TabsList className="mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure the basic settings for your website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          name="siteName"
                          value={siteSettings.siteName}
                          onChange={handleSiteSettingsChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={siteSettings.contactEmail}
                          onChange={handleSiteSettingsChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        name="siteDescription"
                        value={siteSettings.siteDescription}
                        onChange={handleSiteSettingsChange}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="copyrightText">Copyright Text</Label>
                      <Input
                        id="copyrightText"
                        name="copyrightText"
                        value={siteSettings.copyrightText}
                        onChange={handleSiteSettingsChange}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableComments">Enable Comments</Label>
                        <div className="text-sm text-gray-500">
                          Allow visitors to comment on articles
                        </div>
                      </div>
                      <Switch
                        id="enableComments"
                        checked={siteSettings.enableComments}
                        onCheckedChange={(checked) => handleSwitchChange('enableComments', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="moderateComments">Moderate Comments</Label>
                        <div className="text-sm text-gray-500">
                          Review and approve comments before they are published
                        </div>
                      </div>
                      <Switch
                        id="moderateComments"
                        checked={siteSettings.moderateComments}
                        onCheckedChange={(checked) => handleSwitchChange('moderateComments', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableNewsletter">Enable Newsletter</Label>
                        <div className="text-sm text-gray-500">
                          Allow visitors to subscribe to your newsletter
                        </div>
                      </div>
                      <Switch
                        id="enableNewsletter"
                        checked={siteSettings.enableNewsletter}
                        onCheckedChange={(checked) => handleSwitchChange('enableNewsletter', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('General')}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Appearance Settings */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your website.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 py-4">
                    <div>
                      <Label>Logo</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="h-24 w-24 bg-gray-100 flex items-center justify-center rounded-md">
                          <img 
                            src="/placeholder.svg" 
                            alt="Site Logo" 
                            className="h-16 w-16 opacity-50"
                          />
                        </div>
                        <input
                          type="file"
                          id="logo-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={() => toast({
                            title: "Logo uploaded",
                            description: "Your logo has been updated successfully.",
                            duration: 3000,
                          })}
                        />
                        <Button variant="outline" onClick={handleLogoUpload}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Favicon</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-100 flex items-center justify-center rounded-md">
                          <img 
                            src="/favicon.ico" 
                            alt="Favicon" 
                            className="h-8 w-8"
                          />
                        </div>
                        <input
                          type="file"
                          id="favicon-upload"
                          className="hidden"
                          accept="image/x-icon,image/png"
                          onChange={() => toast({
                            title: "Favicon uploaded",
                            description: "Your favicon has been updated successfully.",
                            duration: 3000,
                          })}
                        />
                        <Button variant="outline" onClick={handleFaviconUpload}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Favicon
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enableDarkMode">Enable Dark Mode Option</Label>
                        <div className="text-sm text-gray-500">
                          Allow visitors to switch between light and dark mode
                        </div>
                      </div>
                      <Switch
                        id="enableDarkMode"
                        checked={siteSettings.enableDarkMode}
                        onCheckedChange={(checked) => handleSwitchChange('enableDarkMode', checked)}
                      />
                    </div>
                    <div>
                      <Label>Social Media Links</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label htmlFor="facebook" className="text-sm">Facebook</Label>
                          <Input
                            id="facebook"
                            name="facebook"
                            value={siteSettings.socialLinks.facebook}
                            onChange={handleSocialLinkChange}
                            placeholder="https://facebook.com/yourpage"
                          />
                        </div>
                        <div>
                          <Label htmlFor="twitter" className="text-sm">Twitter / X</Label>
                          <Input
                            id="twitter"
                            name="twitter"
                            value={siteSettings.socialLinks.twitter}
                            onChange={handleSocialLinkChange}
                            placeholder="https://twitter.com/yourhandle"
                          />
                        </div>
                        <div>
                          <Label htmlFor="instagram" className="text-sm">Instagram</Label>
                          <Input
                            id="instagram"
                            name="instagram"
                            value={siteSettings.socialLinks.instagram}
                            onChange={handleSocialLinkChange}
                            placeholder="https://instagram.com/yourprofile"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('Appearance')}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications from the system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5 flex items-center">
                        <Bell className="h-4 w-4 mr-2" />
                        <div>
                          <p className="text-sm font-medium">New Comments</p>
                          <p className="text-xs text-gray-500">Receive notifications when new comments are posted</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <div>
                          <p className="text-sm font-medium">New Subscribers</p>
                          <p className="text-xs text-gray-500">Receive notifications when new users subscribe</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Email Digests</p>
                          <p className="text-xs text-gray-500">Receive weekly email summaries of site activity</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5 flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        <div>
                          <p className="text-sm font-medium">Site Updates</p>
                          <p className="text-xs text-gray-500">Receive notifications about site updates and maintenance</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('Notifications')}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage security settings and access controls.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="change-password">Change Admin Password</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <Input 
                          id="current-password" 
                          type="password" 
                          placeholder="Current Password" 
                        />
                        <Input 
                          id="new-password" 
                          type="password" 
                          placeholder="New Password" 
                        />
                      </div>
                      <Button className="mt-4" onClick={() => toast({
                        title: "Password changed",
                        description: "Your password has been successfully updated.",
                        duration: 3000,
                      })}>
                        <Lock className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </div>
                    <div className="mt-6">
                      <Label>Two-Factor Authentication</Label>
                      <div className="flex items-center justify-between mt-2">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">Enable Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch defaultChecked={false} />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Label>Access Control</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5 flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            <p className="text-sm font-medium">Require Login for Comments</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5 flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            <p className="text-sm font-medium">IP Blocking</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('Security')}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
