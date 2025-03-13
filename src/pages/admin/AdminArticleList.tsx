
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useArticleAdmin } from '@/hooks/useArticleAdmin';
import ArticleBulkActions from '@/components/admin/articles/ArticleBulkActions';
import ArticleRowActions from '@/components/admin/articles/ArticleRowActions';
import ArticlePagination from '@/components/admin/articles/ArticlePagination';

const AdminArticleList = () => {
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
    paginatedArticles,
    filteredArticles,
    categories,
    totalPages,
    
    // Loading states
    isLoading,
    isError,
    error,
    
    // Actions
    handleSelectAll,
    handleSelectArticle,
    handleDeleteArticle,
    handleDeleteSelected,
    handlePublishSelected,
    navigate
  } = useArticleAdmin();

  if (isError) {
    return (
      <AdminLayout title="Articles">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading articles: {(error as Error).message}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Articles" 
      action={
        <Button 
          onClick={() => navigate('/admin/articles/new')}
          className="bg-naija-green hover:bg-naija-green/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      }
    >
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Select 
              value={selectedStatus} 
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((category: any) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedArticles.length > 0 && (
          <ArticleBulkActions 
            selectedArticles={selectedArticles}
            onPublish={handlePublishSelected}
            onDelete={handleDeleteSelected}
          />
        )}
      </div>
      
      {/* Articles Table */}
      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox 
                  checked={selectedArticles.length === paginatedArticles.length && paginatedArticles.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all articles"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Loading articles...
                </TableCell>
              </TableRow>
            ) : paginatedArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No articles found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedArticles.map((article: any) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedArticles.includes(article.id)}
                      onCheckedChange={() => handleSelectArticle(article.id)}
                      aria-label={`Select article ${article.title}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.category ? article.category.name : 'Uncategorized'}</TableCell>
                  <TableCell>
                    <Badge variant={
                      article.status === 'published' ? 'success' : 
                      article.status === 'draft' ? 'outline' : 
                      'warning'
                    }>
                      {article.status?.charAt(0).toUpperCase() + article.status?.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {article.created_at && format(new Date(article.created_at), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell>{article.view_count?.toLocaleString() || 0}</TableCell>
                  <TableCell className="text-right">
                    <ArticleRowActions 
                      article={article}
                      onDelete={handleDeleteArticle}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <ArticlePagination 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        itemCount={paginatedArticles.length}
        totalCount={filteredArticles.length}
      />
    </AdminLayout>
  );
};

export default AdminArticleList;
