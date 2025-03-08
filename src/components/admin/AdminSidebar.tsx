
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Settings,
  MessageSquare,
  Bell,
  Mail,
  LogOut,
  Image
} from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Articles',
    href: '/admin/articles',
    icon: FileText,
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: FolderOpen,
  },
  {
    title: 'Media Library',
    href: '/admin/media',
    icon: Image,
  },
  {
    title: 'Comments',
    href: '/admin/comments',
    icon: MessageSquare,
  },
  {
    title: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
  },
  {
    title: 'Newsletter',
    href: '/admin/newsletter',
    icon: Mail,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="p-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-naija-green to-naija-yellow bg-clip-text text-transparent">
            Naija Admin
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  isActive
                    ? "bg-naija-lightGreen text-naija-charcoal"
                    : "text-gray-500 hover:text-naija-green hover:bg-gray-50"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive && "text-naija-green")} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link 
          to="/"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;
