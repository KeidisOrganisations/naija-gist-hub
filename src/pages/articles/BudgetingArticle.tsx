
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronLeft, Share2, Clock, Eye, BookmarkPlus, Heart, DollarSign, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedCommentSection from '@/components/EnhancedCommentSection';
import RelatedArticles from '@/components/RelatedArticles';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const BudgetingArticle = () => {
  // Mock article data
  const article = {
    id: "budgeting-first-job",
    title: "How to Start Budgeting for Your First Job",
    content: "",
    slug: "how-to-start-budgeting-for-your-first-job",
    published_at: "2025-04-07T10:00:00Z",
    view_count: 956,
    category_id: "personal-finance",
    categories: {
      id: "personal-finance",
      name: "Personal Finance",
      slug: "personal-finance"
    }
  };
  
  const articleUrl = window.location.href;
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="How to Start Budgeting for Your First Job | Personal Finance"
        description="Learn effective budgeting strategies for your first salary, including how to allocate your income, save consistently, and build financial security from day one."
        keywords={['budgeting', 'first job', 'personal finance', 'money management', 'salary', 'saving']}
        ogImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011"
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
                <Link to="/category/personal-finance">Personal Finance</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Budgeting for Your First Job</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Back button */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/category/personal-finance" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Personal Finance
          </Link>
        </Button>
        
        {/* Article header */}
        <header className="mb-8">
          <Link 
            to="/category/personal-finance"
            className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full mb-4"
          >
            Personal Finance
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How to Start Budgeting for Your First Job
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-4">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              April 7, 2025
            </span>
            
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              956 views
            </span>
            
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              10 min read
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
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011" 
            alt="Person calculating finances on a calculator"
            className="w-full h-auto rounded-lg object-cover shadow-md"
            style={{ maxHeight: '500px' }}
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            Smart budgeting is the foundation of financial independence.
          </p>
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2>Introduction: The First Step to Financial Independence</h2>
          <p>
            Congratulations on landing your first job! That regular paycheck represents more than just compensation for your work—it's your first real opportunity to build financial independence. However, without proper planning, that exciting new income can disappear quickly, leaving you wondering where all your money went.
          </p>
          <p>
            This guide will walk you through creating a simple yet effective budget that helps you make the most of your first salary while building habits that will benefit you throughout your financial journey.
          </p>
          
          <div className="bg-purple-50 p-6 rounded-lg my-8 border-l-4 border-purple-500">
            <h3 className="text-purple-800 font-medium text-lg mb-2">Key Insight</h3>
            <p className="text-purple-700 mb-0">
              The budgeting habits you establish with your first paycheck often set the pattern for your entire financial future. Starting right now means less financial stress later.
            </p>
          </div>
          
          <h2>Step 1: Calculate Your After-Tax Income</h2>
          <p>
            The first rule of budgeting is to work with your actual take-home pay, not your gross salary. Your employer will withhold taxes and possibly other deductions like health insurance or retirement contributions from your paycheck.
          </p>
          <p>
            For example, if your job offers ₦150,000 monthly:
          </p>
          <ul>
            <li>Gross monthly salary: ₦150,000</li>
            <li>Tax withholding (estimate): ₦22,500</li>
            <li>Pension contribution (if applicable): ₦15,000</li>
            <li><strong>Net monthly income:</strong> ₦112,500</li>
          </ul>
          <p>
            This net amount is your true starting point for budgeting purposes.
          </p>
          
          <h2>Step 2: Track Your Spending</h2>
          <p>
            Before creating a formal budget, spend 30 days tracking every naira you spend. This creates awareness of your spending patterns and helps identify areas where money might be slipping through the cracks.
          </p>
          <p>
            You can track expenses using:
          </p>
          <ul>
            <li>A budgeting app</li>
            <li>A simple spreadsheet</li>
            <li>A notebook where you write down daily expenses</li>
            <li>Your bank's transaction history</li>
          </ul>
          <p>
            Categorize your expenses into groups like housing, food, transportation, utilities, entertainment, etc. This will help you see clearly where your money is going.
          </p>
          
          <h2>Step 3: Follow the 50/30/20 Rule</h2>
          <p>
            One popular budgeting approach for beginners is the 50/30/20 rule. Here's how to allocate your after-tax income:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <Card className="border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-2">50%</span>
                  Necessities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  <li>Rent/housing</li>
                  <li>Groceries</li>
                  <li>Transportation</li>
                  <li>Utilities</li>
                  <li>Minimum debt payments</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-green-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-2">30%</span>
                  Wants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  <li>Entertainment</li>
                  <li>Dining out</li>
                  <li>Shopping</li>
                  <li>Hobbies</li>
                  <li>Subscriptions</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-amber-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-amber-100 text-amber-800 w-8 h-8 rounded-full flex items-center justify-center mr-2">20%</span>
                  Savings/Debt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  <li>Emergency fund</li>
                  <li>Retirement savings</li>
                  <li>Additional debt payments</li>
                  <li>Investment contributions</li>
                  <li>Future goals</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <p>
            Using our example of ₦112,500 monthly net income:
          </p>
          <ul>
            <li><strong>Necessities (50%):</strong> ₦56,250</li>
            <li><strong>Wants (30%):</strong> ₦33,750</li>
            <li><strong>Savings/Debt (20%):</strong> ₦22,500</li>
          </ul>
          
          <div className="bg-amber-50 p-6 rounded-lg my-8 border-l-4 border-amber-500">
            <h3 className="text-amber-800 font-medium text-lg mb-2">Pro Tip</h3>
            <p className="text-amber-700 mb-0">
              If you can live with your parents or share housing costs with roommates during your first job, take advantage of this opportunity to allocate more of your budget toward savings and debt repayment.
            </p>
          </div>
          
          <h2>Step 4: Prioritize Building an Emergency Fund</h2>
          <p>
            Before focusing on other financial goals, aim to save enough money to cover 3-6 months of essential expenses. This emergency fund serves as your financial safety net in case of job loss, medical emergencies, or other unexpected situations.
          </p>
          <p>
            Start with a smaller goal of ₦50,000, then build from there. Keep this money in a separate savings account where it's accessible but not too easy to spend impulsively.
          </p>
          
          <h2>Step 5: Implement a System to Stay Consistent</h2>
          <p>
            Creating a budget is just the beginning—sticking to it is where many people struggle. Here are strategies to help you maintain your budget:
          </p>
          <ol>
            <li>
              <strong>Automate your savings:</strong> Set up automatic transfers to your savings account on payday so you never "see" that money in your checking account.
            </li>
            <li>
              <strong>Use the envelope system:</strong> For categories where you tend to overspend, withdraw cash and place it in labeled envelopes. When the envelope is empty, you're done spending in that category until the next month.
            </li>
            <li>
              <strong>Schedule regular budget reviews:</strong> Set calendar reminders to review your budget weekly or biweekly to stay on track.
            </li>
            <li>
              <strong>Use budgeting tools:</strong> Apps like PiggyVest, Mint, or YNAB can help automate tracking and provide visual reports of your spending.
            </li>
          </ol>
          
          <h2>Step 6: Plan for Financial Growth</h2>
          <p>
            Your first budget isn't just about managing current expenses—it's also about setting yourself up for future financial success:
          </p>
          <ul>
            <li><strong>Start retirement savings early:</strong> Even small contributions to a retirement account can grow significantly over time thanks to compound interest.</li>
            <li><strong>Develop your skills:</strong> Consider allocating some money toward courses or certifications that could increase your earning potential.</li>
            <li><strong>Gradually increase your savings rate:</strong> Each time you receive a raise, increase your savings percentage before expanding your lifestyle.</li>
          </ul>
          
          <h3>Simple Monthly Budget Template</h3>
          <div className="bg-gray-50 p-6 rounded-lg my-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Allocation</th>
                  <th className="text-left py-2">Actual</th>
                  <th className="text-left py-2">Difference</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-bold" colSpan={4}>Income</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Net Salary</td>
                  <td>₦112,500</td>
                  <td>₦112,500</td>
                  <td>₦0</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-bold" colSpan={4}>Necessities (50%)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Rent</td>
                  <td>₦35,000</td>
                  <td>₦35,000</td>
                  <td>₦0</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Groceries</td>
                  <td>₦10,000</td>
                  <td>₦12,000</td>
                  <td className="text-red-500">-₦2,000</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Transportation</td>
                  <td>₦8,000</td>
                  <td>₦7,500</td>
                  <td className="text-green-500">+₦500</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Utilities</td>
                  <td>₦3,250</td>
                  <td>₦3,250</td>
                  <td>₦0</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-bold" colSpan={4}>Wants (30%)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Dining Out</td>
                  <td>₦10,000</td>
                  <td>₦12,500</td>
                  <td className="text-red-500">-₦2,500</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Entertainment</td>
                  <td>₦8,000</td>
                  <td>₦7,000</td>
                  <td className="text-green-500">+₦1,000</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Shopping</td>
                  <td>₦10,000</td>
                  <td>₦11,000</td>
                  <td className="text-red-500">-₦1,000</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Subscriptions</td>
                  <td>₦5,750</td>
                  <td>₦5,750</td>
                  <td>₦0</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 font-bold" colSpan={4}>Savings/Debt (20%)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Emergency Fund</td>
                  <td>₦12,500</td>
                  <td>₦12,500</td>
                  <td>₦0</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 pl-4">Investment</td>
                  <td>₦10,000</td>
                  <td>₦6,000</td>
                  <td className="text-red-500">-₦4,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2>Conclusion: Start Now, Adjust Often</h2>
          <p>
            Budgeting is not about restriction—it's about intention. By creating a plan for your money, you're ensuring that your spending aligns with your values and goals. Your first budget won't be perfect, and that's okay. The key is to start now and refine your approach as you gain more experience with managing your finances.
          </p>
          <p>
            Remember that financial circumstances change. Revisit your budget any time your income changes, your expenses shift significantly, or you develop new financial goals. The budgeting muscles you build now will serve you throughout your career and help you achieve financial independence.
          </p>
          
          <div className="bg-purple-50 p-8 rounded-lg my-8 text-center">
            <h3 className="text-xl font-bold mb-4">Ready to take control of your finances?</h3>
            <p className="mb-6">
              Download our free budgeting spreadsheet template to easily track your income and expenses.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Budget Template
            </Button>
          </div>
          
          <h3>Related Financial Topics</h3>
          <ul>
            <li><a href="/article/understanding-taxes-for-young-professionals">Understanding Taxes for Young Professionals</a></li>
            <li><a href="/article/setting-up-your-first-investment-account">Setting Up Your First Investment Account</a></li>
            <li><a href="/article/managing-student-loans">Managing Student Loans: Repayment Strategies</a></li>
          </ul>
        </div>
        
        {/* Tags section */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Budgeting
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            First Job
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Money Management
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Saving
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Financial Planning
          </span>
        </div>
        
        {/* Author section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex items-center">
            <img 
              src="https://placehold.co/100x100/E5DEFF/333333?text=OA" 
              alt="Author Avatar"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold text-lg">Oluwaseun Adeyemi</h3>
              <p className="text-gray-600 text-sm">Financial Advisor</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            Oluwaseun is a certified financial advisor specializing in helping young professionals establish strong financial foundations. He has a passion for making complex financial concepts accessible to everyone.
          </p>
        </div>
        
        {/* Comments section */}
        <Tabs defaultValue="comments" className="mb-12">
          <TabsList className="mb-4">
            <TabsTrigger value="comments">Comments (8)</TabsTrigger>
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

export default BudgetingArticle;
