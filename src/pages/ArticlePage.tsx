
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommentSection from '@/components/CommentSection';
import SocialShareButtons from '@/components/SocialShareButtons';
import { Link } from 'react-router-dom';
import { ChevronLeft, ThumbsUp, ThumbsDown, User, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { useEffect } from 'react';

// Sample article data (in a real app, this would come from an API)
const articles = [
  {
    id: "1",
    title: "How to Start Making Money with AI Tools in Nigeria",
    category: "tech",
    categoryTitle: "Tech",
    content: `
      <p class="mb-4">Looking to make extra income with the latest AI tools? You're in the right place!</p>
      
      <h2 class="text-2xl font-semibold mb-3 mt-6">Why AI is a Game-Changer for Nigerians</h2>
      <p class="mb-4">Artificial Intelligence is transforming how we work, and Nigerians can benefit greatly from this technology revolution. With just your laptop and internet connection, you can offer services globally.</p>
      
      <h2 class="text-2xl font-semibold mb-3 mt-6">Top 5 AI Tools to Start Making Money</h2>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">1. Content Creation with ChatGPT</h3>
      <p class="mb-4">Use ChatGPT to write blogs, social media posts, or even entire e-books. Many businesses are looking for content creators who can leverage AI to produce quality content faster.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">2. Design with Midjourney or DALL-E</h3>
      <p class="mb-4">Generate stunning images and designs for clients. From logo design to custom illustrations, AI image generators can help you create professional designs without traditional design skills.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">3. Video Creation with Runway ML</h3>
      <p class="mb-4">Create and edit videos using AI. This is perfect for social media managers, content creators, and digital marketers.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">4. Voice Overs with ElevenLabs</h3>
      <p class="mb-4">Generate human-like voice overs for videos, podcasts, and audiobooks. This is a growing market as content becomes more audio-visual.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">5. AI Consulting</h3>
      <p class="mb-4">Help businesses integrate AI tools into their workflow. Many Nigerian businesses want to use AI but don't know where to start.</p>
      
      <h2 class="text-2xl font-semibold mb-3 mt-6">How to Get Started</h2>
      <p class="mb-4">Start by picking one AI tool and mastering it. Create samples of your work to show potential clients. Use platforms like Upwork, Fiverr, or even Instagram to market your AI-powered services.</p>
      
      <p class="mb-4">Remember, the key is to focus on solving real problems for businesses or individuals. AI is just the tool – your understanding of client needs is what will set you apart!</p>
    `,
    image: "https://placehold.co/1200x600/9AE19D/FFFFFF?text=AI+Tools",
    date: "June 12, 2023",
    author: "Chioma Okonkwo",
    authorImage: "https://placehold.co/100x100/9AE19D/FFFFFF?text=CO",
    readTime: "5 min read",
    relatedArticles: ["2", "3", "6"],
    tags: ["AI", "Money", "Technology", "Freelancing"]
  },
  {
    id: "2",
    title: "Top 5 Apps Every Nigerian Student Should Have in 2023",
    category: "tech",
    categoryTitle: "Tech",
    content: `
      <p class="mb-4">Being a student in Nigeria comes with its unique challenges, but these apps can make your life much easier.</p>
      
      <h2 class="text-2xl font-semibold mb-3 mt-6">Must-Have Apps for Nigerian Students</h2>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">1. Photomath</h3>
      <p class="mb-4">Struggling with mathematics? Photomath allows you to scan math problems and get instant solutions with step-by-step explanations. Perfect for when you're stuck on homework.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">2. Google Drive</h3>
      <p class="mb-4">Never lose your assignments again with cloud storage. Google Drive gives you 15GB of free storage to keep your documents, presentations, and spreadsheets safe and accessible from any device.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">3. Forest</h3>
      <p class="mb-4">Stay focused during study sessions with this productivity app. Forest plants a virtual tree when you start studying, and the tree grows as long as you don't use your phone. If you leave the app, your tree dies.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">4. Pocket</h3>
      <p class="mb-4">Save articles, videos, and research materials to read later, even offline. This is essential for research projects when you might not always have internet access.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">5. Duolingo</h3>
      <p class="mb-4">Learn a new language for free. Adding another language to your CV can give you an edge in the job market after graduation.</p>
      
      <h2 class="text-2xl font-semibold mb-3 mt-6">Bonus: Money-Saving Apps</h2>
      <p class="mb-4">As a student, managing your finances is crucial. Apps like PiggyVest and Cowrywise can help you save small amounts regularly, which add up over time.</p>
      
      <p class="mb-4">Download these apps today and watch your student life become more organized and less stressful!</p>
    `,
    image: "https://placehold.co/1200x600/9AE19D/FFFFFF?text=Student+Apps",
    date: "May 28, 2023",
    author: "Tunde Adewale",
    authorImage: "https://placehold.co/100x100/9AE19D/FFFFFF?text=TA",
    readTime: "4 min read",
    relatedArticles: ["1", "3", "7"],
    tags: ["Education", "Apps", "Students", "Productivity"]
  },
  {
    id: "3",
    title: "Getting Your International Passport Without Stress in Nigeria",
    category: "life",
    categoryTitle: "Life",
    content: `
      <p class="mb-4">The process of getting an international passport in Nigeria has often been described as stressful. However, with the right information and approach, it can be a smooth experience.</p>
      
      <h2 class="text-2xl font-semibold mb-3 mt-6">Step-by-Step Guide</h2>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">1. Online Application</h3>
      <p class="mb-4">Visit the Nigeria Immigration Service website and fill out the application form. Make sure all details are correct to avoid future complications.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">2. Payment</h3>
      <p class="mb-4">Pay the required fee through the designated bank or payment platform. Keep your receipt safe as you'll need it later.</p>
      
      <h3 class="text-xl font-semibold mb-2 mt-4">3. Biometric Capture</h3>
      <p class="mb-4">Visit the immigration office for your biometric capture. It's best to arrive early to avoid long queues.</p>
      
      <h2 class="text-2xl font-semibold mb-3 mt-6">Tips to Make the Process Easier</h2>
      <p class="mb-4">Consider using the services of a trusted agent if you want to avoid the stress of dealing with the process yourself. Also, prepare all required documents beforehand to avoid unnecessary delays.</p>
      
      <p class="mb-4">Remember, patience is key throughout this process. Follow these steps and you'll have your international passport without unnecessary stress!</p>
    `,
    image: "https://placehold.co/1200x600/9AE19D/FFFFFF?text=Passport+Guide",
    date: "April 15, 2023",
    author: "Ngozi Eze",
    authorImage: "https://placehold.co/100x100/9AE19D/FFFFFF?text=NE",
    readTime: "6 min read",
    relatedArticles: ["1", "2"],
    tags: ["Travel", "Documentation", "Nigeria", "Guide"]
  }
];

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find(a => a.id === id);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title with article title
    if (article) {
      document.title = `${article.title} | Naija Times`;
    }
    
    return () => {
      // Reset title when unmounting
      document.title = 'Naija Times';
    };
  }, [article]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: window.location.href,
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        // Fallback if Web Share API fails
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Article link copied to clipboard",
          duration: 3000,
        });
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Article link copied to clipboard",
        duration: 3000,
      });
    }
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    toast({
      title: "Thanks for your feedback!",
      description: type === 'like' ? "We're glad you found this helpful" : "We'll work to improve our content",
      duration: 3000,
    });
  };

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-6">Sorry, the article you're looking for doesn't exist.</p>
            <Link to="/" className="text-naija-green hover:underline">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find related articles
  const relatedArticleData = article.relatedArticles
    .map(relId => articles.find(a => a.id === relId))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <div className="w-full h-64 md:h-96 bg-gray-200 relative">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div className="container px-4 mx-auto pb-8">
              <Link 
                to={`/category/${article.category}`}
                className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-naija-green text-white mb-4"
              >
                {article.categoryTitle}
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl font-heading">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container px-4 mx-auto py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                {/* Article Meta */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={article.authorImage || `https://placehold.co/100x100/9AE19D/FFFFFF?text=${article.author.charAt(0)}`} 
                        alt={article.author} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{article.author}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> 
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> 
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleShare}
                  >
                    Share this article
                  </Button>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <Link 
                        key={tag} 
                        to={`/tag/${tag.toLowerCase()}`}
                        className="inline-block px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Social Share */}
                <SocialShareButtons url={window.location.href} title={article.title} />

                {/* Article Body */}
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Article Footer */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-gray-600 mb-4">Was this article helpful?</p>
                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => handleFeedback('like')}
                    >
                      <ThumbsUp size={16} />
                      Yes, this helped
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => handleFeedback('dislike')}
                    >
                      <ThumbsDown size={16} />
                      Not really
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8">
                <CommentSection articleId={article.id} />
              </div>

              {/* Back to Category */}
              <div className="mt-6">
                <Link 
                  to={`/category/${article.category}`}
                  className="flex items-center text-naija-green hover:underline gap-1"
                >
                  <ChevronLeft size={16} />
                  Back to {article.categoryTitle}
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Author Info */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 font-heading">About the Author</h3>
                <div className="flex gap-4 items-center">
                  <img 
                    src={article.authorImage || `https://placehold.co/100x100/9AE19D/FFFFFF?text=${article.author.charAt(0)}`}
                    alt={article.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{article.author}</h4>
                    <p className="text-sm text-gray-500">Content Creator</p>
                    <div className="mt-2">
                      <Link to={`/author/${article.author.toLowerCase().replace(/\s+/g, '-')}`} className="text-naija-green text-sm hover:underline">
                        View all articles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 font-heading">Related Articles</h3>
                {relatedArticleData.length > 0 ? (
                  <div className="space-y-4">
                    {relatedArticleData.map(relArticle => (
                      relArticle && (
                        <Link 
                          key={relArticle.id} 
                          to={`/article/${relArticle.id}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <img 
                              src={relArticle.image} 
                              alt={relArticle.title} 
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className="font-medium group-hover:text-naija-green transition-colors">
                                {relArticle.title}
                              </h4>
                              <div className="flex gap-2 text-xs text-gray-500 mt-1">
                                <span>{relArticle.date}</span>
                                <span>•</span>
                                <span>{relArticle.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No related articles found.</p>
                )}
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4 font-heading">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Link to="/tag/tech" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                    #Tech
                  </Link>
                  <Link to="/tag/money" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                    #Money
                  </Link>
                  <Link to="/tag/education" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                    #Education
                  </Link>
                  <Link to="/tag/business" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                    #Business
                  </Link>
                  <Link to="/tag/travel" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                    #Travel
                  </Link>
                  <Link to="/tag/life" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors">
                    #Life
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage;
