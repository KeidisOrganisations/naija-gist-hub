import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ArticleFilters from '@/components/admin/articles/ArticleFilters';
import ArticleBulkActions from '@/components/admin/articles/ArticleBulkActions';
import ArticlesTable from '@/components/admin/articles/ArticlesTable';
import ArticlesPagination from '@/components/admin/articles/ArticlesPagination';
import { useArticles } from '@/hooks/useArticles';
import type { Article } from '@/services/articles';

const AdminArticles = () => {
  const navigate = useNavigate();
  
  const {
    // State
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    selectedArticles,
    currentPage,
    setCurrentPage,
    
    // Data
    categories,
    paginatedArticles,
    filteredArticles,
    totalPages,
    
    // Loading states
    isLoading,
    isError,
    error,
    
    // Actions
    handleSelectAll,
    handleSelectArticle,
    handleDeleteSelected,
    handlePublishSelected,
    handleDeleteArticle
  } = useArticles();

  const handleCreateArticle = () => {
    navigate('/admin/articles/new');
  };

  if (isError) {
    return (
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error loading articles: {(error as Error).message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white px-6 shadow-sm">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-2xl font-bold">Articles</h1>
            <Button 
              variant="default" 
              className="bg-naija-green hover:bg-naija-green/90"
              onClick={handleCreateArticle}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </div>
        </header>
        
        <main className="p-6">
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <ArticleFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
            />
            
            <ArticleBulkActions 
              selectedArticles={selectedArticles}
              onPublish={handlePublishSelected}
              onDelete={handleDeleteSelected}
            />
          </div>
          
          {/* Articles Table */}
          <div className="rounded-md border bg-white">
            <ArticlesTable 
              articles={paginatedArticles as unknown as Article[]}
              isLoading={isLoading}
              selectedArticles={selectedArticles}
              onSelectAll={handleSelectAll}
              onSelectArticle={handleSelectArticle}
              onDeleteArticle={handleDeleteArticle}
            />
          </div>
          
          {/* Pagination */}
          <ArticlesPagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            itemCount={paginatedArticles.length}
            totalCount={filteredArticles.length}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminArticles;
