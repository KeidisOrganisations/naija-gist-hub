
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { SearchResult, searchArticles } from '@/services/search-service';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const searchResults = await searchArticles(query);
        setResults(searchResults);
      } catch (err: any) {
        console.error('Search error:', err);
        setError(err.message || 'Failed to search articles');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`Search Results for "${query}" | Naija Times`}
        description={`Search results for "${query}" on Naija Times. Find the latest news, guides, and stories.`}
        keywords={['search', 'results', query]}
      />
      <Navbar />
      
      <main className="flex-grow container px-4 mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Search Results{query ? `: "${query}"` : ''}
          </h1>
          <p className="text-gray-600">
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner text="Searching..." />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No results found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any articles matching your search term.
            </p>
            <Button asChild className="bg-naija-green hover:bg-naija-green/90">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {results.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  {result.featured_image && (
                    <div className="md:w-1/4">
                      <img
                        src={result.featured_image}
                        alt={result.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={`p-6 ${result.featured_image ? 'md:w-3/4' : 'w-full'}`}>
                    <div className="mb-2">
                      {result.category_name && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2">
                          {result.category_name}
                        </span>
                      )}
                      {result.published_at && (
                        <span className="text-gray-500 text-sm">
                          {new Date(result.published_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-2">
                      <Link to={`/article/${result.id}`} className="hover:text-naija-green">
                        {result.title}
                      </Link>
                    </h2>
                    {result.excerpt && (
                      <p className="text-gray-600 mb-4">{result.excerpt}</p>
                    )}
                    <Button asChild variant="outline">
                      <Link to={`/article/${result.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
