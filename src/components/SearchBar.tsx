
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  variant?: 'simple' | 'expanded';
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  variant = 'simple', 
  onSearch, 
  placeholder = 'Search articles...', 
  className = '' 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');
  const navigate = useNavigate();

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  // For simple variant, toggle expansion
  const toggleExpand = () => {
    if (variant === 'simple') {
      setIsExpanded(!isExpanded);
    }
  };

  // Focus the input when expanded
  useEffect(() => {
    if (isExpanded) {
      document.getElementById('search-input')?.focus();
    }
  }, [isExpanded]);

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center">
        {(isExpanded || variant === 'expanded') ? (
          <>
            <Input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="pr-10 rounded-full"
              onBlur={() => variant === 'simple' && !query && setIsExpanded(false)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full rounded-full"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </>
        ) : (
          <Button 
            type="button" 
            size="icon" 
            variant="ghost" 
            onClick={toggleExpand}
            className="rounded-full"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Open search</span>
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
