
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import TrendingSection from '@/components/TrendingSection';
import QuoteOfTheDay from '@/components/QuoteOfTheDay';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead'; 
import SampleDataButton from '@/components/admin/SampleDataButton';
import { useEffect, useState } from 'react';
import { initializeStorage } from '@/services/storage-service';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  
  useEffect(() => {
    // Initialize storage on component mount
    initializeStorage();
    
    // Check for admin mode in URL params
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('admin') === 'true') {
      setShowAdmin(true);
    }
  }, []);
  
  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
    toast({
      title: showAdmin ? "Admin Tools Hidden" : "Admin Tools Shown",
      description: showAdmin 
        ? "Admin tools are now hidden" 
        : "You can now add sample data to the website",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Naija Times | Your Trusted Source for Nigerian News & Guides"
        description="Naija Times provides the latest news, guides, and stories from Nigeria. Explore our articles on tech, business, lifestyle, and more."
        keywords={['Nigeria', 'news', 'guides', 'tech', 'business', 'lifestyle']}
      />
      <Navbar />
      <main className="flex-grow">
        {showAdmin && (
          <div className="bg-gray-100 py-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-xl font-semibold">Admin Tools</h2>
                <p className="text-gray-600 text-center">
                  Click the button below to add sample articles and categories to your website.
                </p>
                <SampleDataButton />
              </div>
            </div>
          </div>
        )}
        
        <Hero />
        <CategorySection />
        <div className="bg-white py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-heading mb-4">Quote of the Day</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Some Naija wisdom to inspire your day!
              </p>
            </div>
            <div className="max-w-xl mx-auto">
              <QuoteOfTheDay />
            </div>
          </div>
        </div>
        <TrendingSection />
        <NewsletterSection />
        
        {/* Admin toggle button - fixed at bottom right */}
        <div className="fixed bottom-5 right-5">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleAdmin}
            className="bg-white shadow-md"
          >
            {showAdmin ? "Hide Admin" : "Show Admin"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
