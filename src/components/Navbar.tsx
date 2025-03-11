
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-naija-lightGreen shadow-sm">
      <div className="container px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-heading bg-gradient-to-r from-naija-green to-naija-yellow bg-clip-text text-transparent">
            Naija How-To Hub
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-naija-green transition-colors">
            Home
          </Link>
          <Link to="/category/tech" className="font-medium hover:text-naija-green transition-colors">
            Tech
          </Link>
          <Link to="/category/life" className="font-medium hover:text-naija-green transition-colors">
            Life
          </Link>
          <Link to="/category/money" className="font-medium hover:text-naija-green transition-colors">
            Money
          </Link>
          <Link to="/category/relationships" className="font-medium hover:text-naija-green transition-colors">
            Relationships
          </Link>
          <Link to="/category/news" className="font-medium hover:text-naija-green transition-colors">
            News
          </Link>
        </nav>

        {/* Search & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex rounded-full hover:bg-naija-lightGreen" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <button
            onClick={toggleMenu}
            className="md:hidden text-naija-charcoal p-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-naija-lightGreen">
          <nav className="container px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="font-medium p-2 hover:bg-naija-lightGreen rounded-md transition-colors">
              Home
            </Link>
            <Link to="/category/tech" className="font-medium p-2 hover:bg-naija-lightGreen rounded-md transition-colors">
              Tech
            </Link>
            <Link to="/category/life" className="font-medium p-2 hover:bg-naija-lightGreen rounded-md transition-colors">
              Life
            </Link>
            <Link to="/category/money" className="font-medium p-2 hover:bg-naija-lightGreen rounded-md transition-colors">
              Money
            </Link>
            <Link to="/category/relationships" className="font-medium p-2 hover:bg-naija-lightGreen rounded-md transition-colors">
              Relationships
            </Link>
            <Link to="/category/news" className="font-medium p-2 hover:bg-naija-lightGreen rounded-md transition-colors">
              News
            </Link>
            <Button variant="outline" className="w-full rounded-full hover:bg-naija-lightGreen" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
