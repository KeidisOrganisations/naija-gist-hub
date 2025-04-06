import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Home, FileText, Image, List, Settings, Plus, Edit, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/useAuth';

const AdminSidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-white border-r border-gray-700">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        <Link to="/" className="flex items-center text-lg font-semibold">
          <Home className="mr-2 h-5 w-5" />
          Naija Times
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              {user?.email ? (
                <span className="sr-only">Open user menu</span>
              ) : (
                <Home className="h-4 w-4" />
              )}
              {user?.email}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.email}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.role}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sidebar Content */}
      <nav className="flex-grow p-4">
        {/* Dashboard Link */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ${
              isActive ? 'bg-gray-800 font-semibold' : 'text-gray-400'
            }`
          }
          onClick={closeMenu}
        >
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </NavLink>

        {/* Articles Section */}
        <div className="mt-4">
          <div className="uppercase text-xs text-gray-500 font-semibold mb-2 px-4">
            Articles
          </div>
          <NavLink
            to="/admin/articles"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 font-semibold' : 'text-gray-400'
              }`
            }
            onClick={closeMenu}
          >
            <FileText className="mr-2 h-4 w-4" />
            All Articles
          </NavLink>
          <NavLink
            to="/admin/articles/new"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 font-semibold' : 'text-gray-400'
              }`
            }
            onClick={closeMenu}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Article
          </NavLink>
          
          <NavLink
            to="/admin/batch-import"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 font-semibold' : 'text-gray-400'
              }`
            }
            onClick={closeMenu}
          >
            <Upload className="mr-2 h-4 w-4" />
            Batch Import
          </NavLink>
        </div>

        {/* Media Section */}
        <div className="mt-4">
          <div className="uppercase text-xs text-gray-500 font-semibold mb-2 px-4">
            Media
          </div>
          <NavLink
            to="/admin/media"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 font-semibold' : 'text-gray-400'
              }`
            }
            onClick={closeMenu}
          >
            <Image className="mr-2 h-4 w-4" />
            All Media
          </NavLink>
        </div>

        {/* Categories Section */}
        <div className="mt-4">
          <div className="uppercase text-xs text-gray-500 font-semibold mb-2 px-4">
            Categories
          </div>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 font-semibold' : 'text-gray-400'
              }`
            }
            onClick={closeMenu}
          >
            <List className="mr-2 h-4 w-4" />
            Manage Categories
          </NavLink>
        </div>

        {/* Settings Section */}
        <div className="mt-4">
          <div className="uppercase text-xs text-gray-500 font-semibold mb-2 px-4">
            Settings
          </div>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 font-semibold' : 'text-gray-400'
              }`
            }
            onClick={closeMenu}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
