
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  action?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

const AdminLayout = ({ children, title, action, breadcrumbs }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <div>
              {breadcrumbs ? (
                <div className="flex items-center text-sm text-gray-500">
                  <Link to="/admin/dashboard" className="hover:text-naija-green">
                    Dashboard
                  </Link>
                  
                  {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <ChevronRight className="mx-1 h-4 w-4" />
                      {item.href ? (
                        <Link to={item.href} className="hover:text-naija-green">
                          {item.label}
                        </Link>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
              
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            
            {action}
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
