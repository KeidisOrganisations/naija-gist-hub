
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample article data (in a real app, this would come from an API)
const articles = [
  {
    id: "1",
    title: "How to Start Making Money with AI Tools in Nigeria",
    category: "tech",
    categoryTitle: "Tech",
    excerpt: "Looking to make extra income with the latest AI tools? You're in the right place! Artificial Intelligence is transforming how we work, and Nigerians can benefit greatly from this technology revolution.",
    image: "https://placehold.co/1200x600/9AE19D/FFFFFF?text=AI+Tools",
    date: "June 12, 2023",
    author: "Chioma Okonkwo",
    tags: ["AI", "Money", "Technology", "Freelancing"]
  },
  {
    id: "2",
    title: "Top 5 Apps Every Nigerian Student Should Have in 2023",
    category: "tech",
    categoryTitle: "Tech",
    excerpt: "Being a student in Nigeria comes with its unique challenges, but these apps can make your life much easier. From Photomath to Google Drive, these tools will boost your productivity.",
    image: "https://placehold.co/1200x600/9AE19D/FFFFFF?text=Student+Apps",
    date: "May 28, 2023",
    author: "Tunde Adewale",
    tags: ["Education", "Apps", "Students", "Productivity"]
  },
  {
    id: "3",
    title: "Getting Your International Passport Without Stress in Nigeria",
    category: "life",
    categoryTitle: "Life",
    excerpt: "The process of getting an international passport in Nigeria has often been described as stressful. However, with the right information and approach, it can be a smooth experience.",
    image: "https://placehold.co/1200x600/9AE19D/FFFFFF?text=Passport+Guide",
    date: "April 15, 2023",
    author: "Ngozi Eze",
    tags: ["Travel", "Documentation", "Nigeria", "Guide"]
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    setTimeout(() => {
      if (query) {
        const searchResults = articles.filter(article => {
          const matchInTitle = article.title.toLowerCase().includes(query.toLowerCase());
          const matchInExcerpt = article.excerpt.toLowerCase().includes(query.toLowerCase());
          const matchInTags = article.tags.some(tag => 
            tag.toLowerCase().includes(query.toLowerCase())
          );
          
          return matchInTitle || matchInExcerpt || matchInTags;
        });
        
        setResults(searchResults);
      } else {
        setResults([]);
      }
      
      setIsLoading(false);
    }, 500); // Simulate loading delay
    
    // Update page title
    document.title = `Search: ${query} | Naija Times`;
    
    return () => {
      document.title = 'Naija Times';
    };
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-6 font-heading">Search Results</h1>
            <div className="max-w-lg">
              <SearchBar variant="expanded" placeholder="Search articles..." />
            </div>
            {query && (
              <p className="mt-4 text-gray-600">
                {isLoading 
                  ? 'Searching...' 
                  : `Found ${results.length} results for "${query}"`}
              </p>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-naija-green" />
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map(article => (
                <div key={article.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover-scale">
                  <Link to={`/article/${article.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link 
                      to={`/category/${article.category}`}
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-3"
                    >
                      {article.categoryTitle}
                    </Link>
                    <Link to={`/article/${article.id}`}>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-naija-green transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{article.date}</span>
                      <Link 
                        to={`/article/${article.id}`}
                        className="text-naija-green font-medium hover:underline"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold mb-4">No results found</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any articles matching your search query. Try using different keywords or browse our categories.
              </p>
              <Button asChild className="bg-naija-green hover:bg-naija-green/90 text-black">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
