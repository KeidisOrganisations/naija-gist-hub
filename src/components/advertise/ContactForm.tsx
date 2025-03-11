
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  return (
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
  );
};

export default ContactForm;
