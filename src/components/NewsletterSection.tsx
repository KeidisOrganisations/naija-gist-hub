
import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([]);
  const { toast } = useToast();
  const location = useLocation();

  // Load saved emails on component mount
  useEffect(() => {
    const savedEmails = localStorage.getItem('naijaHubSubscribers');
    if (savedEmails) {
      setSubscribedEmails(JSON.parse(savedEmails));
    }
    
    // Handle scroll if coming from another page
    if (location.state && location.state.scrollToNewsletter) {
      setTimeout(() => {
        document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Abeg enter your email!",
        description: "We need your email to send you the updates.",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email format!",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Check if email already exists
    if (subscribedEmails.includes(email)) {
      toast({
        title: "You don already subscribe!",
        description: "This email is already on our mailing list.",
        variant: "destructive" // Changed from "warning" to "destructive" to match allowed variants
      });
      return;
    }

    // Save email to localStorage
    const updatedEmails = [...subscribedEmails, email];
    localStorage.setItem('naijaHubSubscribers', JSON.stringify(updatedEmails));
    setSubscribedEmails(updatedEmails);
    
    toast({
      title: "Subscription successful!",
      description: "You don join our mailing list. We go dey send you the best gist!",
    });
    
    setEmail('');
  };

  return (
    <section id="newsletter-section" className="py-16 bg-naija-lightYellow">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Subscribe Make You No Miss Gist!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of smart Nigerians who dey receive our weekly how-to guides straight for their inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-3 px-4 rounded-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="bg-naija-charcoal hover:bg-naija-charcoal/90 text-white rounded-full flex items-center gap-2">
              Subscribe
              <Send size={16} />
            </Button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            No spam, we promise! Unsubscribe anytime.
          </p>
          {subscribedEmails.length > 0 && (
            <p className="text-sm text-green-600 mt-2">
              {subscribedEmails.length} subscribers and counting!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
