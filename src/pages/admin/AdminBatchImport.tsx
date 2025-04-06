
import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import BatchImport from '@/components/admin/BatchImport';
import BatchImportNav from '@/components/admin/BatchImportNav';

const AdminBatchImport = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Batch Import</h1>
          </div>
        </header>
        
        <main className="p-6">
          <BatchImportNav />
          
          <div className="mb-6">
            <p className="text-gray-600 max-w-3xl">
              Import multiple articles or media items at once using JSON or CSV format. 
              Make sure your data includes all required fields (title, content, and slug for articles; 
              name, file_path, file_type, and file_size for media).
            </p>
          </div>
          
          <div className="flex justify-center">
            <BatchImport />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBatchImport;
