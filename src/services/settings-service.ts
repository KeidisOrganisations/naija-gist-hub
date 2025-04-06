
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface SiteSettings {
  id?: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  copyrightText: string;
  enableComments: boolean;
  moderateComments: boolean;
  enableNewsletter: boolean;
  enableDarkMode: boolean;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  created_at?: string;
  updated_at?: string;
}

// Fetch current site settings
export async function fetchSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching site settings:", error);
      // If no settings found, return default settings
      if (error.code === 'PGRST116') {
        return null;
      }
      
      toast({
        title: "Error fetching site settings",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
    
    return data;
  } catch (error: any) {
    console.error("Error in fetchSiteSettings function:", error);
    throw error;
  }
}

// Save or update site settings
export async function saveSiteSettings(settings: SiteSettings) {
  try {
    console.log("Saving site settings:", settings);
    
    const { data: existingSettings } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1);
    
    let result;
    
    if (existingSettings && existingSettings.length > 0) {
      // Update existing settings
      const { data, error } = await supabase
        .from('site_settings')
        .update({
          siteName: settings.siteName,
          siteDescription: settings.siteDescription,
          contactEmail: settings.contactEmail,
          copyrightText: settings.copyrightText,
          enableComments: settings.enableComments,
          moderateComments: settings.moderateComments,
          enableNewsletter: settings.enableNewsletter,
          enableDarkMode: settings.enableDarkMode,
          socialLinks: settings.socialLinks,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingSettings[0].id)
        .select();

      if (error) {
        console.error("Error updating site settings:", error);
        toast({
          title: "Error saving settings",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      result = data && data[0];
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from('site_settings')
        .insert([{
          siteName: settings.siteName,
          siteDescription: settings.siteDescription,
          contactEmail: settings.contactEmail,
          copyrightText: settings.copyrightText,
          enableComments: settings.enableComments,
          moderateComments: settings.moderateComments,
          enableNewsletter: settings.enableNewsletter,
          enableDarkMode: settings.enableDarkMode,
          socialLinks: settings.socialLinks
        }])
        .select();

      if (error) {
        console.error("Error creating site settings:", error);
        toast({
          title: "Error saving settings",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      result = data && data[0];
    }
    
    console.log("Site settings saved successfully:", result);
    toast({
      title: "Settings saved",
      description: "Site settings have been saved successfully.",
    });
    
    return result;
  } catch (error: any) {
    console.error("Error in saveSiteSettings function:", error);
    throw error;
  }
}
