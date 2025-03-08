
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-naija-charcoal text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Naija How-To Hub</h3>
            <p className="max-w-xs mt-2 text-gray-300">
              Life no suppose hard! Get the best Naija how-tos here.
            </p>
            <div className="flex mt-6 space-x-4">
              <Link to="#" className="text-gray-300 hover:text-naija-yellow transition-colors">
                <Instagram />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-naija-yellow transition-colors">
                <Facebook />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-naija-yellow transition-colors">
                <Twitter />
              </Link>
              <Link to="#" className="text-gray-300 hover:text-naija-yellow transition-colors">
                <Mail />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-medium mb-4 font-heading">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/submit-guide" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Submit a Guide
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 font-heading">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/category/tech" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Tech
                  </Link>
                </li>
                <li>
                  <Link to="/category/life" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Life
                  </Link>
                </li>
                <li>
                  <Link to="/category/money" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Money
                  </Link>
                </li>
                <li>
                  <Link to="/category/relationships" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Relationships
                  </Link>
                </li>
                <li>
                  <Link to="/category/news" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    News
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 font-heading">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/advertise" className="text-gray-300 hover:text-naija-yellow transition-colors">
                    Advertise with us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-700">
          <p className="text-center text-gray-300">
            &copy; {new Date().getFullYear()} Naija How-To Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
