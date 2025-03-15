
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import SampleDataButton from '@/components/admin/SampleDataButton';

const AdminDashboard = () => {
  // Fetch dashboard statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [articlesResult, categoriesResult, commentsResult, viewsResult] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('categories').select('id', { count: 'exact' }),
        supabase.from('comments').select('id', { count: 'exact' }),
        supabase.from('articles').select('view_count').then(res => {
          if (res.error) throw res.error;
          return res.data.reduce((sum, article) => sum + (article.view_count || 0), 0);
        })
      ]);
      
      return {
        articlesCount: articlesResult.count || 0,
        categoriesCount: categoriesResult.count || 0,
        commentsCount: commentsResult.count || 0,
        totalViews: viewsResult
      };
    }
  });

  // Fetch top articles by views
  const { data: topArticles, isLoading: isLoadingTopArticles } = useQuery({
    queryKey: ['top-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('title, view_count, slug')
        .order('view_count', { ascending: false })
        .limit(5);
        
      if (error) throw error;
      return data;
    }
  });

  return (
    <AdminLayout 
      title="Dashboard" 
      action={<SampleDataButton />}
    >
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-naija-green" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Total Articles</CardTitle>
                <CardDescription>Published and draft articles</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.articlesCount || 0}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Categories</CardTitle>
                <CardDescription>Content organization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.categoriesCount || 0}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Comments</CardTitle>
                <CardDescription>User engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.commentsCount || 0}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Total Views</CardTitle>
                <CardDescription>Article impressions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats?.totalViews || 0}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Top Performing Articles</CardTitle>
                <CardDescription>Articles with most views</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingTopArticles ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-naija-green" />
                  </div>
                ) : topArticles && topArticles.length > 0 ? (
                  <div className="space-y-4">
                    {topArticles.map((article, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-3 font-medium">{index + 1}.</span>
                          <span className="font-medium truncate max-w-[200px] md:max-w-[300px]">
                            {article.title}
                          </span>
                        </div>
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {article.view_count || 0} views
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No article data available yet
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
                <CardDescription>Distribution of articles by status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-naija-green" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Categories', value: stats?.categoriesCount || 0 },
                        { name: 'Articles', value: stats?.articlesCount || 0 },
                        { name: 'Comments', value: stats?.commentsCount || 0 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#9AE19D" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
