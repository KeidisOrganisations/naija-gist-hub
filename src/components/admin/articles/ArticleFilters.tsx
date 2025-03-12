
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ArticleFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: any[];
  isLoading?: boolean;
}

const ArticleFilters = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  categories,
  isLoading
}: ArticleFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-2">
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
          disabled={isLoading}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Pending">Pending Review</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={selectedCategory} 
          onValueChange={setSelectedCategory}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ArticleFilters;
