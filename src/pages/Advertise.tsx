
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";

const Advertise = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-naija-green to-naija-yellow py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Advertise on Naija How-To Hub
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Connect with millions of engaged Nigerians looking for practical advice and solutions
              </p>
              <Button 
                size="lg" 
                className="bg-white text-naija-green hover:bg-white/90"
                asChild
              >
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-naija-green mb-2">2M+</p>
                <p className="text-gray-600">Monthly Visitors</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-naija-green mb-2">5M+</p>
                <p className="text-gray-600">Page Views</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-naija-green mb-2">15min</p>
                <p className="text-gray-600">Avg. Time on Site</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Advertising Options */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Advertising Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Option 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Banner Ads</h3>
                <p className="text-gray-600 mb-6">
                  Premium placement across our most popular pages with high visibility
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>Header & sidebar placements</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>Desktop & mobile responsive</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>Performance tracking</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Learn More</Button>
              </div>
              
              {/* Option 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Sponsored Content</h3>
                <p className="text-gray-600 mb-6">
                  Native articles written by our team that feature your product or service
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>Custom article creation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>Homepage feature</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>Social media promotion</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Learn More</Button>
              </div>
              
              {/* Option 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Newsletter Ads</h3>
                <p className="text-gray-600 mb-6">
                  Reach our engaged subscriber base directly in their inbox
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>100k+ subscribers</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>High open rates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-naija-green mr-2 h-5 w-5" />
                    <span>Targeted segments available</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form */}
        <section id="contact" className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-center mb-8">
                  Fill out the form below and our advertising team will contact you within 24 hours.
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-naija-green focus:border-naija-green"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-naija-green focus:border-naija-green"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-naija-green focus:border-naija-green"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-naija-green focus:border-naija-green"
                    >
                      <option>Select a budget range</option>
                      <option>₦50,000 - ₦200,000</option>
                      <option>₦200,000 - ₦500,000</option>
                      <option>₦500,000 - ₦1,000,000</option>
                      <option>₦1,000,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-naija-green focus:border-naija-green"
                      placeholder="Tell us about your advertising goals..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-naija-green hover:bg-naija-green/90">
                    <Mail className="mr-2 h-4 w-4" />
                    Submit Inquiry
                  </Button>
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

export default Advertise;
