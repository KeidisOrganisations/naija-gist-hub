
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubmitGuide = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    category: "tech",
    content: "",
    files: null as File[] | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, files: Array.from(e.target.files || []) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Guide submitted successfully!",
        description: "Thank you for your contribution. Our team will review your guide.",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-naija-green to-naija-yellow py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Share Your Knowledge with Nigeria
              </h1>
              <p className="text-lg text-white/90 mb-0">
                Got a useful how-to guide that can help fellow Nigerians? Submit it here!
              </p>
            </div>
          </div>
        </section>
        
        {/* Submission Form */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Submit Your Guide</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                      />
                    </div>
                  </div>
                  
                  {/* Guide Info */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Guide Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      placeholder="How to..." 
                      value={formData.title}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category" 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-naija-green focus:border-naija-green"
                      required
                    >
                      <option value="tech">Tech</option>
                      <option value="money">Money</option>
                      <option value="life">Life</option>
                      <option value="relationships">Relationships</option>
                      <option value="news">News</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="content">Guide Content</Label>
                    <Textarea 
                      id="content" 
                      name="content" 
                      rows={8} 
                      placeholder="Write your step-by-step guide here..." 
                      value={formData.content}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="files">Attachments (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Drag and drop files here, or click to select files
                      </p>
                      <input
                        id="files"
                        name="files"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => document.getElementById('files')?.click()}
                      >
                        Select Files
                      </Button>
                      {formData.files && formData.files.length > 0 && (
                        <div className="mt-4 text-left">
                          <p className="text-sm font-medium">Selected files:</p>
                          <ul className="text-sm text-gray-500">
                            {Array.from(formData.files).map((file, i) => (
                              <li key={i} className="truncate">{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-naija-green hover:bg-naija-green/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Guide"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    By submitting, you agree to our <Link to="/terms" className="text-naija-green hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-naija-green hover:underline">Privacy Policy</Link>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitGuide;
