
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import TrendingSection from '@/components/TrendingSection';
import QuoteOfTheDay from '@/components/QuoteOfTheDay';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead'; // Add this import

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Naija Times | Your Trusted Source for Nigerian News & Guides"
        description="Naija Times provides the latest news, guides, and stories from Nigeria. Explore our articles on tech, business, lifestyle, and more."
        keywords={['Nigeria', 'news', 'guides', 'tech', 'business', 'lifestyle']}
      />
      <Navbar />
      <main className="flex-grow">
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
