
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronLeft, Share2, Clock, Eye, BookmarkPlus, Heart, Tool, Timer, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedCommentSection from '@/components/EnhancedCommentSection';
import RelatedArticles from '@/components/RelatedArticles';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const WoodenShelfArticle = () => {
  // Mock article data
  const article = {
    id: "wooden-shelf-simple-tools",
    title: "How to Build a Wooden Shelf With Simple Tools",
    content: "",
    slug: "how-to-build-a-wooden-shelf-with-simple-tools",
    published_at: "2025-04-03T10:00:00Z",
    view_count: 843,
    category_id: "diy-projects",
    categories: {
      id: "diy-projects",
      name: "DIY Projects",
      slug: "diy-projects"
    }
  };
  
  const articleUrl = window.location.href;
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="How to Build a Wooden Shelf With Simple Tools | DIY Projects"
        description="Learn to build a beautiful, functional wooden shelf with basic tools and materials. Perfect for beginners looking to start their DIY journey with a practical project."
        keywords={['DIY', 'woodworking', 'shelf', 'furniture', 'beginner project', 'home improvement']}
        ogImage="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1974"
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
                <Link to="/category/diy-projects">DIY Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Wooden Shelf Project</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Back button */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/category/diy-projects" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to DIY Projects
          </Link>
        </Button>
        
        {/* Article header */}
        <header className="mb-8">
          <Link 
            to="/category/diy-projects"
            className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full mb-4"
          >
            DIY Projects
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How to Build a Wooden Shelf With Simple Tools
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-4">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              April 3, 2025
            </span>
            
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              843 views
            </span>
            
            <span className="flex items-center">
              <Timer className="mr-1 h-4 w-4" />
              Project time: 3-4 hours
            </span>
            
            <span className="flex items-center">
              <Tool className="mr-1 h-4 w-4" />
              Difficulty: Beginner
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
            src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1974" 
            alt="Wooden shelf with books and decorative items"
            className="w-full h-auto rounded-lg object-cover shadow-md"
            style={{ maxHeight: '500px' }}
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Build this elegant and functional wooden shelf for your living space with basic tools.
          </p>
        </div>
        
        {/* Project overview card */}
        <div className="bg-amber-50 rounded-lg p-6 mb-8 border border-amber-200">
          <h2 className="font-bold text-xl mb-4 text-amber-900">Project Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-amber-800">Materials</h3>
              <ul className="list-disc pl-5 text-sm mt-2">
                <li>1 × 8-inch pine board (6 feet long)</li>
                <li>1 × 4-inch pine board (6 feet long)</li>
                <li>Wood screws (1½-inch)</li>
                <li>Wood glue</li>
                <li>Sandpaper (medium and fine grit)</li>
                <li>Wood stain or paint (optional)</li>
                <li>Clear polyurethane finish (optional)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Tools</h3>
              <ul className="list-disc pl-5 text-sm mt-2">
                <li>Measuring tape</li>
                <li>Pencil</li>
                <li>Hand saw or circular saw</li>
                <li>Drill with drill bits</li>
                <li>Screwdriver</li>
                <li>Sanding block</li>
                <li>Level</li>
                <li>Safety glasses</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Skills Required</h3>
              <ul className="list-disc pl-5 text-sm mt-2">
                <li>Basic measuring</li>
                <li>Simple cutting</li>
                <li>Drilling</li>
                <li>Screwing components together</li>
                <li>Sanding</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2>Introduction: Why Build Your Own Shelf?</h2>
          <p>
            Building your own wooden shelf is not only satisfying but also practical. Store-bought shelves often come with a hefty price tag and may not fit your space perfectly. By creating your own, you can customize the dimensions, finish, and style to match your home décor while developing valuable DIY skills.
          </p>
          <p>
            This project is ideal for beginners because it requires minimal tools and basic woodworking techniques. Even if you've never built anything before, you can complete this simple shelf in an afternoon and enjoy the fruits of your labor for years to come.
          </p>
          
          <h2>Step 1: Plan and Measure</h2>
          <p>
            Before cutting any wood, take time to plan your shelf. For this tutorial, we'll create a wall-mounted shelf with two levels, each measuring 24 inches wide by 8 inches deep, with a total height of 16 inches.
          </p>
          <p>
            You'll need to cut the following pieces from your boards:
          </p>
          <ul>
            <li>2 shelf boards from the 1 × 8-inch pine (each 24 inches long)</li>
            <li>2 side pieces from the 1 × 8-inch pine (each 16 inches long)</li>
            <li>1 back brace from the 1 × 4-inch pine (24 inches long)</li>
          </ul>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h4 className="font-bold mb-3">Measurement Diagram</h4>
            <img 
              src="https://placehold.co/800x400/FDE1D3/333333?text=Shelf+Measurements+Diagram" 
              alt="Diagram showing shelf measurements and cut pieces"
              className="w-full h-auto rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">
              Diagram showing the measurements for each piece of wood.
            </p>
          </div>
          
          <div className="bg-amber-50 p-6 rounded-lg my-8 border-l-4 border-amber-500">
            <h3 className="text-amber-800 font-medium text-lg mb-2">Pro Tip: Material Selection</h3>
            <p className="text-amber-700 mb-0">
              While pine is affordable and easy to work with, you can use other woods like oak or maple for a more premium look. Just be aware that hardwoods require sharper tools and more effort to cut and drill.
            </p>
          </div>
          
          <h2>Step 2: Cut the Wood</h2>
          <p>
            With your measurements and plan ready, it's time to cut the wood:
          </p>
          <ol>
            <li>Put on your safety glasses before cutting.</li>
            <li>Measure and mark each piece according to your plan.</li>
            <li>Double-check your measurements (measure twice, cut once!).</li>
            <li>Using your hand saw or circular saw, carefully cut along your marked lines.</li>
          </ol>
          
          <div className="bg-red-50 p-6 rounded-lg my-8 border-l-4 border-red-500 flex">
            <div className="mr-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-red-800 font-medium text-lg mb-2">Safety First</h3>
              <p className="text-red-700 mb-0">
                Always wear safety glasses when cutting wood and follow all safety instructions for power tools. Keep fingers away from saw blades and work in a well-ventilated area.
              </p>
            </div>
          </div>
          
          <h2>Step 3: Sand the Pieces</h2>
          <p>
            Now that your pieces are cut, it's time to smooth them:
          </p>
          <ol>
            <li>Start with medium-grit sandpaper (around 120 grit) to remove any rough edges or saw marks.</li>
            <li>Sand in the direction of the wood grain, not against it.</li>
            <li>Once the surfaces feel relatively smooth, switch to fine-grit sandpaper (180-220 grit) for a final polish.</li>
            <li>Wipe away all dust with a slightly damp cloth.</li>
          </ol>
          
          <h2>Step 4: Assembly</h2>
          <p>
            With your pieces prepared, follow these steps to assemble your shelf:
          </p>
          <ol>
            <li>Lay one of the side pieces flat on your work surface.</li>
            <li>Apply wood glue along the edge where the first shelf board will connect.</li>
            <li>Position the shelf board perpendicular to the side piece, flush with the top.</li>
            <li>Pre-drill two holes through the side piece into the end of the shelf board to prevent splitting.</li>
            <li>Secure with wood screws.</li>
            <li>Repeat for the bottom shelf, positioning it at the bottom of the side piece.</li>
            <li>Attach the second side piece using the same method (glue, pre-drill, screw).</li>
            <li>Finally, attach the back brace across the back of the top shelf for additional support and wall-mounting.</li>
          </ol>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <Card>
              <CardHeader className="pb-2">
                <h4 className="font-bold">Step 1-2: Position & Pre-drill</h4>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://placehold.co/600x400/FDE1D3/333333?text=Assembly+Step+1-2" 
                  alt="Positioning and pre-drilling the shelf pieces"
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Apply glue, position the shelf board against the side piece, and pre-drill holes to prevent wood splitting.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <h4 className="font-bold">Step 3-4: Secure & Complete</h4>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://placehold.co/600x400/FDE1D3/333333?text=Assembly+Step+3-4" 
                  alt="Securing the pieces and completing assembly"
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Secure with screws and repeat the process for all connections until the basic structure is complete.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2>Step 5: Finishing (Optional)</h2>
          <p>
            To give your shelf a professional look and protect the wood:
          </p>
          <ol>
            <li>Sand any rough spots that became apparent during assembly.</li>
            <li>Apply wood stain according to the manufacturer's instructions if desired.</li>
            <li>Once the stain is completely dry (usually 24 hours), apply a clear polyurethane finish for protection.</li>
            <li>Apply 2-3 coats of finish, lightly sanding between coats with fine-grit sandpaper.</li>
          </ol>
          
          <div className="bg-blue-50 p-6 rounded-lg my-8 border-l-4 border-blue-500">
            <h3 className="text-blue-800 font-medium text-lg mb-2">Customization Ideas</h3>
            <p className="text-blue-700">
              Make this project your own with these variations:
            </p>
            <ul className="list-disc pl-5 text-blue-700 mb-0">
              <li>Paint rather than stain for a pop of color</li>
              <li>Add decorative brackets underneath for extra support and style</li>
              <li>Install hooks on the underside for hanging items</li>
              <li>Add a third shelf for more storage</li>
              <li>Create multiple units of different sizes for a staggered wall display</li>
            </ul>
          </div>
          
          <h2>Step 6: Mounting Your Shelf</h2>
          <p>
            To hang your shelf on the wall:
          </p>
          <ol>
            <li>Use a stud finder to locate wall studs (ideally, you want to anchor your shelf to studs for maximum support).</li>
            <li>Mark the position where you want to hang your shelf, ensuring it's level.</li>
            <li>Pre-drill holes through the back brace where it will align with the wall studs.</li>
            <li>With help from another person, hold the shelf against the wall at your marked position.</li>
            <li>Secure it to the wall using appropriate screws (2½-3 inch wood screws for studs, wall anchors for drywall).</li>
            <li>Check that the shelf is level after installation.</li>
          </ol>
          
          <h2>Troubleshooting Common Issues</h2>
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h4 className="font-bold mb-3">Problem: Uneven Shelf</h4>
            <p className="mb-1"><strong>Solution:</strong> Check if the wall is uneven. You may need to use small shims between the wall and the shelf to achieve a level surface.</p>
            
            <h4 className="font-bold mb-3 mt-4">Problem: Wood Splitting</h4>
            <p className="mb-1"><strong>Solution:</strong> Always pre-drill holes before inserting screws, especially near the edges of the wood.</p>
            
            <h4 className="font-bold mb-3 mt-4">Problem: Shelf Doesn't Feel Secure</h4>
            <p className="mb-1"><strong>Solution:</strong> Ensure you've mounted the shelf to wall studs or used appropriate wall anchors. Consider adding L-brackets underneath for additional support.</p>
          </div>
          
          <h2>Conclusion: Enjoy Your Handmade Shelf!</h2>
          <p>
            Congratulations! You've successfully built a custom wooden shelf with your own hands. Not only do you have a practical piece of furniture, but you've also gained valuable DIY skills that you can apply to future projects.
          </p>
          <p>
            Display your favorite books, plants, or decorative items on your new shelf with pride. Remember that each small imperfection tells the story of your learning process and makes your creation unique.
          </p>
          <p>
            As you grow more confident, consider tackling larger woodworking projects like bookcases, coffee tables, or even custom furniture. Each project builds upon the skills you've developed, allowing you to create increasingly sophisticated pieces for your home.
          </p>
          
          <div className="bg-amber-50 p-8 rounded-lg my-8 text-center">
            <h3 className="text-xl font-bold mb-4">Ready for your next DIY project?</h3>
            <p className="mb-6">
              Join our DIY community to share your creations, get feedback, and discover new project ideas!
            </p>
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
              Join DIY Community
            </Button>
          </div>
        </div>
        
        {/* Tags section */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Woodworking
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Shelving
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Beginner DIY
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Home Decor
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Furniture
          </span>
        </div>
        
        {/* Author section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex items-center">
            <img 
              src="https://placehold.co/100x100/FDE1D3/333333?text=FO" 
              alt="Author Avatar"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold text-lg">Folake Ogunleye</h3>
              <p className="text-gray-600 text-sm">DIY Enthusiast & Woodworker</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            Folake discovered her passion for woodworking five years ago and has been creating functional, beautiful pieces for her home ever since. She specializes in beginner-friendly projects that help others develop confidence in their DIY abilities.
          </p>
        </div>
        
        {/* Comments section */}
        <Tabs defaultValue="comments" className="mb-12">
          <TabsList className="mb-4">
            <TabsTrigger value="comments">Comments (6)</TabsTrigger>
            <TabsTrigger value="related">Related Projects</TabsTrigger>
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

export default WoodenShelfArticle;
