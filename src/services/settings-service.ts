
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

// Interface mapping to the database column names
interface DBSiteSettings {
  id?: string;
  sitename: string;
  sitedescription: string;
  contactemail: string;
  copyrighttext: string;
  enablecomments: boolean;
  moderatecomments: boolean;
  enablenewsletter: boolean;
  enabledarkmode: boolean;
  sociallinks: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  created_at?: string;
  updated_at?: string;
}

// Convert DB format to our interface format
function dbToInterface(dbSettings: DBSiteSettings): SiteSettings {
  return {
    id: dbSettings.id,
    siteName: dbSettings.sitename,
    siteDescription: dbSettings.sitedescription,
    contactEmail: dbSettings.contactemail,
    copyrightText: dbSettings.copyrighttext,
    enableComments: dbSettings.enablecomments,
    moderateComments: dbSettings.moderatecomments,
    enableNewsletter: dbSettings.enablenewsletter,
    enableDarkMode: dbSettings.enabledarkmode,
    socialLinks: dbSettings.sociallinks,
    created_at: dbSettings.created_at,
    updated_at: dbSettings.updated_at
  };
}

// Convert our interface format to DB format
function interfaceToDb(settings: SiteSettings): DBSiteSettings {
  return {
    id: settings.id,
    sitename: settings.siteName,
    sitedescription: settings.siteDescription,
    contactemail: settings.contactEmail,
    copyrighttext: settings.copyrightText,
    enablecomments: settings.enableComments,
    moderatecomments: settings.moderateComments,
    enablenewsletter: settings.enableNewsletter,
    enabledarkmode: settings.enableDarkMode,
    sociallinks: settings.socialLinks,
    created_at: settings.created_at,
    updated_at: settings.updated_at
  };
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
      // If no settings found, return null so we can create default settings
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
    
    return data ? dbToInterface(data as DBSiteSettings) : null;
  } catch (error: any) {
    console.error("Error in fetchSiteSettings function:", error);
    throw error;
  }
}

// Save or update site settings
export async function saveSiteSettings(settings: SiteSettings) {
  try {
    console.log("Saving site settings:", settings);
    
    const dbSettings = interfaceToDb(settings);
    
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
          sitename: dbSettings.sitename,
          sitedescription: dbSettings.sitedescription,
          contactemail: dbSettings.contactemail,
          copyrighttext: dbSettings.copyrighttext,
          enablecomments: dbSettings.enablecomments,
          moderatecomments: dbSettings.moderatecomments,
          enablenewsletter: dbSettings.enablenewsletter,
          enabledarkmode: dbSettings.enabledarkmode,
          sociallinks: dbSettings.sociallinks,
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
      
      result = data && data[0] ? dbToInterface(data[0] as DBSiteSettings) : null;
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from('site_settings')
        .insert([{
          sitename: dbSettings.sitename,
          sitedescription: dbSettings.sitedescription,
          contactemail: dbSettings.contactemail,
          copyrighttext: dbSettings.copyrighttext,
          enablecomments: dbSettings.enablecomments,
          moderatecomments: dbSettings.moderatecomments,
          enablenewsletter: dbSettings.enablenewsletter,
          enabledarkmode: dbSettings.enabledarkmode,
          sociallinks: dbSettings.sociallinks
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
      
      result = data && data[0] ? dbToInterface(data[0] as DBSiteSettings) : null;
    }
    
    console.log("Site settings saved successfully:", result);
    toast({
      title: "Settings saved",
      description: "Site settings have been saved successfully.",
    });
    
    return result as SiteSettings;
  } catch (error: any) {
    console.error("Error in saveSiteSettings function:", error);
    throw error;
  }
}
