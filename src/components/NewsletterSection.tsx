
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

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

    // Here you would usually send the email to your backend
    toast({
      title: "Subscription successful!",
      description: "You don join our mailing list. We go dey send you the best gist!",
    });
    
    setEmail('');
  };

  return (
    <section className="py-16 bg-naija-lightYellow">
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
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
