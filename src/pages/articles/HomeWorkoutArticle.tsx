
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronLeft, Share2, Clock, Eye, BookmarkPlus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedCommentSection from '@/components/EnhancedCommentSection';
import RelatedArticles from '@/components/RelatedArticles';

const HomeWorkoutArticle = () => {
  // Mock article data
  const article = {
    id: "home-workout-routine",
    title: "How to Create a Simple Home Workout Routine",
    content: "",
    slug: "how-to-create-a-simple-home-workout-routine",
    published_at: "2025-04-08T10:00:00Z",
    view_count: 1240,
    category_id: "health-wellness",
    categories: {
      id: "health-wellness",
      name: "Health & Wellness",
      slug: "health-wellness"
    }
  };
  
  const articleUrl = window.location.href;
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="How to Create a Simple Home Workout Routine | Health & Wellness"
        description="Discover how to create an effective home workout routine that fits your schedule, space constraints, and fitness goals—no fancy equipment required."
        keywords={['home workout', 'fitness', 'exercise', 'health', 'wellness', 'workout routine']}
        ogImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070"
      />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/category/health-wellness">Health & Wellness</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home Workout Routine</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Back button */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/category/health-wellness" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Health & Wellness
          </Link>
        </Button>
        
        {/* Article header */}
        <header className="mb-8">
          <Link 
            to="/category/health-wellness"
            className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full mb-4"
          >
            Health & Wellness
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How to Create a Simple Home Workout Routine
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-4">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              April 8, 2025
            </span>
            
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              1,240 views
            </span>
            
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              8 min read
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <BookmarkPlus className="h-4 w-4" />
              Save
            </Button>
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              Like
            </Button>
          </div>
        </header>
        
        {/* Featured image */}
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070" 
            alt="Woman doing yoga at home"
            className="w-full h-auto rounded-lg object-cover shadow-md"
            style={{ maxHeight: '500px' }}
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Creating a home workout routine can help you stay fit without leaving your house.
          </p>
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2>Introduction: Why Home Workouts Matter</h2>
          <p>
            In today's busy world, finding time to visit the gym can be challenging. Whether it's due to a tight schedule, budget constraints, or simply preferring the comfort of your own space, home workouts offer a practical solution to staying fit. The good news is that you don't need expensive equipment or a lot of space to get an effective workout at home.
          </p>
          <p>
            This guide will walk you through creating a simple yet effective home workout routine that you can adapt to your fitness level, goals, and available space. By the end, you'll have all the tools needed to design your personalized fitness plan.
          </p>
          
          <div className="bg-green-50 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h3 className="text-green-800 font-medium text-lg mb-2">Quick Takeaway</h3>
            <p className="text-green-700 mb-0">
              The most effective home workout routine is one you'll actually follow. Focus on consistency rather than perfection, and start with just 10-15 minutes daily.
            </p>
          </div>
          
          <h2>Step 1: Assess Your Fitness Goals and Space</h2>
          <p>Before diving into specific exercises, take a moment to consider:</p>
          <ul>
            <li><strong>Your fitness goals:</strong> Are you looking to build strength, increase endurance, lose weight, or improve flexibility?</li>
            <li><strong>Available space:</strong> Do you have enough room to lie down and extend your arms and legs in all directions?</li>
            <li><strong>Available equipment:</strong> While no equipment is necessary to start, do you have items like dumbbells, resistance bands, or a yoga mat?</li>
            <li><strong>Time commitment:</strong> How many days per week can you realistically dedicate to your routine?</li>
          </ul>
          
          <h2>Step 2: Choose Your Exercise Categories</h2>
          <p>A well-rounded workout routine should include several components:</p>
          <ol>
            <li><strong>Warm-up (5 minutes):</strong> Prepare your body with light movement like marching in place, arm circles, and dynamic stretches.</li>
            <li><strong>Cardiovascular exercise (10-30 minutes):</strong> Get your heart pumping with exercises like jumping jacks, high knees, or burpees.</li>
            <li><strong>Strength training (10-20 minutes):</strong> Work major muscle groups with squats, push-ups, lunges, and planks.</li>
            <li><strong>Flexibility (5-10 minutes):</strong> End with stretches focusing on major muscle groups you've worked.</li>
          </ol>
          
          <h3>Sample 30-Minute Beginner Routine</h3>
          <div className="bg-gray-50 p-6 rounded-lg my-4">
            <h4 className="font-bold mb-2">Warm-up (5 minutes)</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>Marching in place – 1 minute</li>
              <li>Arm circles (forward and backward) – 1 minute</li>
              <li>Bodyweight squats (quarter depth) – 1 minute</li>
              <li>Shoulder rolls – 1 minute</li>
              <li>Gentle side-to-side twists – 1 minute</li>
            </ul>
            
            <h4 className="font-bold mb-2">Cardio Circuit (10 minutes)</h4>
            <p className="mb-2">Complete each exercise for 45 seconds, rest 15 seconds, then move to the next:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Jumping jacks (or step jacks for low impact)</li>
              <li>High knees (or marching for low impact)</li>
              <li>Lateral shuffles</li>
              <li>Mountain climbers (slow pace)</li>
              <li>Repeat circuit twice</li>
            </ul>
            
            <h4 className="font-bold mb-2">Strength Circuit (10 minutes)</h4>
            <p className="mb-2">Complete each exercise for 45 seconds, rest 15 seconds, then move to the next:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Modified push-ups (on knees if needed)</li>
              <li>Bodyweight squats</li>
              <li>Stationary lunges (alternating legs)</li>
              <li>Forearm plank (or plank on knees)</li>
              <li>Repeat circuit twice</li>
            </ul>
            
            <h4 className="font-bold mb-2">Cool Down & Flexibility (5 minutes)</h4>
            <ul className="list-disc pl-5 mb-0">
              <li>Hamstring stretch – 30 seconds each leg</li>
              <li>Quad stretch – 30 seconds each leg</li>
              <li>Chest stretch – 30 seconds</li>
              <li>Child's pose – 30 seconds</li>
              <li>Deep breathing – 1 minute</li>
            </ul>
          </div>
          
          <h2>Step 3: Create a Weekly Schedule</h2>
          <p>For beginners, aim to complete your routine 3-4 times per week with rest days in between. A sample weekly schedule might look like:</p>
          <ul>
            <li><strong>Monday:</strong> Full-body workout</li>
            <li><strong>Tuesday:</strong> Rest or light stretching/walking</li>
            <li><strong>Wednesday:</strong> Full-body workout</li>
            <li><strong>Thursday:</strong> Rest or light stretching/walking</li>
            <li><strong>Friday:</strong> Full-body workout</li>
            <li><strong>Saturday:</strong> Active recovery (longer walk, gentle yoga)</li>
            <li><strong>Sunday:</strong> Rest</li>
          </ul>
          
          <h2>Step 4: Progress Your Routine Over Time</h2>
          <p>As your fitness improves, gradually increase the challenge of your workouts to continue seeing results:</p>
          <ul>
            <li>Increase duration (add 5 minutes to your workout each week)</li>
            <li>Increase intensity (reduce rest periods or add more challenging variations)</li>
            <li>Add equipment (incorporate dumbbells, resistance bands)</li>
            <li>Split routines (focus on different body areas on different days)</li>
          </ul>
          
          <div className="bg-blue-50 p-6 rounded-lg my-8 border-l-4 border-blue-500">
            <h3 className="text-blue-800 font-medium text-lg mb-2">Pro Tip</h3>
            <p className="text-blue-700 mb-0">
              Track your workouts in a journal or fitness app. Recording your progress helps you stay motivated and see improvements over time.
            </p>
          </div>
          
          <h2>Step 5: Make It Sustainable</h2>
          <p>The most effective workout routine is one you'll stick with long-term. To make your home workouts sustainable:</p>
          <ul>
            <li><strong>Schedule it:</strong> Block out specific times for your workouts and treat them as important appointments.</li>
            <li><strong>Create a dedicated space:</strong> Even if it's just a corner of your living room, having a designated workout area can help you get in the right mindset.</li>
            <li><strong>Find accountability:</strong> Share your goals with a friend or join online fitness communities to stay motivated.</li>
            <li><strong>Mix it up:</strong> Prevent boredom by varying your routine with different exercises, workout videos, or challenges.</li>
          </ul>
          
          <h2>Conclusion: Your Home Fitness Journey</h2>
          <p>
            Creating a home workout routine doesn't require fancy equipment or extensive fitness knowledge. By following these simple steps, you can design a sustainable fitness plan that fits your schedule, space, and goals. Remember that consistency is more important than perfection – even short, regular workouts will yield benefits over time.
          </p>
          <p>
            Most importantly, listen to your body and adjust as needed. If an exercise causes pain (beyond normal muscle fatigue), modify it or try an alternative. As your fitness improves, your routine can evolve with you, continuing to provide challenges and results.
          </p>
          <p>
            Ready to get started? Set aside just 30 minutes today to try the beginner routine outlined above. Your future self will thank you for taking this small but significant step toward better health.
          </p>
          
          <div className="bg-amber-50 p-8 rounded-lg my-8 text-center">
            <h3 className="text-xl font-bold mb-4">Ready to take your fitness journey further?</h3>
            <p className="mb-6">
              Subscribe to our newsletter for weekly workout plans, nutrition tips, and expert advice delivered straight to your inbox.
            </p>
            <Button size="lg" className="bg-naija-green hover:bg-naija-green/90">
              Subscribe Now
            </Button>
          </div>
        </div>
        
        {/* Tags section */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Home Workout
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Fitness
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Beginner
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Exercise
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Health
          </span>
        </div>
        
        {/* Author section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex items-center">
            <img 
              src="https://placehold.co/100x100/E5DEFF/333333?text=AC" 
              alt="Author Avatar"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold text-lg">Ade Chukwu</h3>
              <p className="text-gray-600 text-sm">Certified Personal Trainer</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            Ade is a certified personal trainer with over 5 years of experience helping clients achieve their fitness goals through personalized workout plans and nutrition guidance.
          </p>
        </div>
        
        {/* Comments section */}
        <Tabs defaultValue="comments" className="mb-12">
          <TabsList className="mb-4">
            <TabsTrigger value="comments">Comments (12)</TabsTrigger>
            <TabsTrigger value="related">Related Articles</TabsTrigger>
          </TabsList>
          <TabsContent value="comments">
            <EnhancedCommentSection articleId={article.id} />
          </TabsContent>
          <TabsContent value="related">
            <RelatedArticles categoryId={article.category_id} currentArticleId={article.id} />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeWorkoutArticle;
