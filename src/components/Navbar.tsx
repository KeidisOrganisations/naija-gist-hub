
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from './SearchBar'; // Add this import

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when navigation occurs
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  const linkClasses = `text-${
    isScrolled || isMobile ? 'gray-800' : 'white'
  } hover:text-naija-green transition-colors font-medium`;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold font-heading">
            <span className={`${isScrolled || isMobile ? 'text-naija-green' : 'text-white'}`}>
              Naija
            </span>
            <span className={`${isScrolled || isMobile ? 'text-naija-charcoal' : 'text-naija-lightYellow'}`}>
              Times
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={linkClasses}>
              Home
            </Link>
            <Link to="/category/tech" className={linkClasses}>
              Tech
            </Link>
            <Link to="/category/business" className={linkClasses}>
              Business
            </Link>
            <Link to="/category/life" className={linkClasses}>
              Lifestyle
            </Link>
            <Link to="/about" className={linkClasses}>
              About
            </Link>
            <Link to="/contact" className={linkClasses}>
              Contact
            </Link>
            
            {/* Add Search Bar */}
            <SearchBar 
              variant="simple" 
              className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}
            />
            
            <Button asChild variant="outline" className="ml-4">
              <Link to="/signup">
                Sign Up
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <SearchBar variant="simple" />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`ml-2 p-2 ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-3 px-4 py-2">
              <Link to="/" className="py-2 text-gray-800 hover:text-naija-green">
                Home
              </Link>
              <Link to="/category/tech" className="py-2 text-gray-800 hover:text-naija-green">
                Tech
              </Link>
              <Link to="/category/business" className="py-2 text-gray-800 hover:text-naija-green">
                Business
              </Link>
              <Link to="/category/life" className="py-2 text-gray-800 hover:text-naija-green">
                Lifestyle
              </Link>
              <Link to="/about" className="py-2 text-gray-800 hover:text-naija-green">
                About
              </Link>
              <Link to="/contact" className="py-2 text-gray-800 hover:text-naija-green">
                Contact
              </Link>
              <div className="pt-2">
                <Button asChild className="w-full bg-naija-green hover:bg-naija-green/90 text-black">
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
