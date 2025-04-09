
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronLeft, Share2, Clock, Eye, BookmarkPlus, Heart, AlertTriangle, Download, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/SEOHead';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedCommentSection from '@/components/EnhancedCommentSection';
import RelatedArticles from '@/components/RelatedArticles';
import { Card, CardContent } from '@/components/ui/card';

const CVWritingArticle = () => {
  // Mock article data
  const article = {
    id: "cv-writing-guide",
    title: "How to Write a CV That Gets You Noticed",
    content: "",
    slug: "how-to-write-a-cv-that-gets-you-noticed",
    published_at: "2025-04-05T10:00:00Z",
    view_count: 1562,
    category_id: "career-development",
    categories: {
      id: "career-development",
      name: "Career Development",
      slug: "career-development"
    }
  };
  
  const articleUrl = window.location.href;
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="How to Write a CV That Gets You Noticed | Career Development"
        description="Learn how to create an attention-grabbing CV that stands out to employers with these expert tips, templates, and examples for job seekers in Nigeria."
        keywords={['CV writing', 'resume', 'job application', 'career development', 'job search', 'employment']}
        ogImage="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070"
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
                <Link to="/category/career-development">Career Development</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>CV Writing Guide</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Back button */}
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/category/career-development" className="flex items-center">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Career Development
          </Link>
        </Button>
        
        {/* Article header */}
        <header className="mb-8">
          <Link 
            to="/category/career-development"
            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4"
          >
            Career Development
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How to Write a CV That Gets You Noticed
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-500 mb-6 gap-4">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              April 5, 2025
            </span>
            
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              1,562 views
            </span>
            
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              12 min read
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
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070" 
            alt="Person reviewing a CV document"
            className="w-full h-auto rounded-lg object-cover shadow-md"
            style={{ maxHeight: '500px' }}
          />
          <p className="text-sm text-gray-500 mt-2 text-center">
            A well-crafted CV can open doors to exciting career opportunities.
          </p>
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2>Introduction: Your CV is Your Professional Story</h2>
          <p>
            In today's competitive job market, your curriculum vitae (CV) is often your first—and sometimes only—chance to make an impression on potential employers. A well-crafted CV doesn't just list your work history; it tells a compelling story about your professional journey, showcases your unique value, and convinces hiring managers that you're the right fit for the role.
          </p>
          <p>
            However, with recruiters typically spending just 6-7 seconds scanning each CV, you need to ensure yours stands out for the right reasons. This guide will walk you through creating a CV that captures attention, highlights your strengths, and ultimately helps you land interviews for the positions you want.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-lg my-8 border-l-4 border-blue-500">
            <h3 className="text-blue-800 font-medium text-lg mb-2">Did You Know?</h3>
            <p className="text-blue-700 mb-0">
              According to recruitment statistics, approximately 75% of CVs are rejected by Applicant Tracking Systems (ATS) before they even reach a human recruiter. This guide includes tips to ensure your CV passes these digital gatekeepers.
            </p>
          </div>
          
          <h2>Step 1: Choose the Right CV Format</h2>
          <p>
            Before writing a single word, you need to select the CV format that best showcases your experience and suits the position you're applying for:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Chronological</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Lists work history starting with most recent position
                </p>
                <div className="text-sm">
                  <p className="mb-1"><strong>Best for:</strong> Candidates with steady work history in the same field</p>
                  <p><strong>Highlights:</strong> Career progression and growth</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Functional</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Emphasizes skills and abilities over work history
                </p>
                <div className="text-sm">
                  <p className="mb-1"><strong>Best for:</strong> Career changers or those with employment gaps</p>
                  <p><strong>Highlights:</strong> Transferable skills and achievements</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Combination</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Blends elements of both chronological and functional formats
                </p>
                <div className="text-sm">
                  <p className="mb-1"><strong>Best for:</strong> Experienced professionals highlighting specialized skills</p>
                  <p><strong>Highlights:</strong> Both relevant skills and solid work history</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <p>
            For most job seekers in Nigeria, a chronological or combination format works best, as employers typically prefer seeing your work history clearly presented.
          </p>
          
          <h2>Step 2: Craft a Compelling Personal Statement</h2>
          <p>
            Your personal statement (or professional summary) sits at the top of your CV and serves as a powerful introduction. In 3-5 sentences, it should encapsulate your professional identity and highlight what makes you an ideal candidate.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h4 className="font-bold mb-3">Example Personal Statement (Marketing Professional)</h4>
            <p className="italic border-l-4 pl-4 border-gray-300">
              "Results-driven Marketing Manager with 5+ years of experience developing successful campaigns that increased brand visibility and customer engagement. Proven track record of growing social media followings by an average of 40% and implementing data-driven strategies that boosted conversion rates by 25%. Seeking to leverage creative content development and analytical skills to drive marketing excellence at [Company Name]."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div>
              <h4 className="font-bold mb-2 text-green-700">Do:</h4>
              <ul className="list-disc pl-5">
                <li>Tailor your statement to the specific role</li>
                <li>Include quantifiable achievements when possible</li>
                <li>Keep it concise and impactful (3-5 sentences)</li>
                <li>Address what value you bring to the employer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2 text-red-700">Don't:</h4>
              <ul className="list-disc pl-5">
                <li>Use generic statements that could apply to anyone</li>
                <li>Include objectives that focus only on what you want</li>
                <li>Write in the first person ("I am...")</li>
                <li>Use clichés like "team player" without context</li>
              </ul>
            </div>
          </div>
          
          <h2>Step 3: Showcase Your Professional Experience</h2>
          <p>
            Your work experience section is the core of your CV. For each position, include:
          </p>
          <ul>
            <li>Company name and location</li>
            <li>Your job title</li>
            <li>Dates of employment (month and year)</li>
            <li>3-5 bullet points highlighting achievements and responsibilities</li>
          </ul>
          
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <h4 className="font-bold mb-3">Example Work Experience Entry</h4>
            <p className="font-medium">Marketing Coordinator | ABC Company, Lagos | June 2022 - Present</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Managed social media accounts across 4 platforms, increasing follower engagement by 35% through strategic content creation and community management</li>
              <li>Designed and implemented email marketing campaigns that improved open rates from 15% to 22% within 3 months</li>
              <li>Collaborated with design team to develop consistent branding materials, resulting in 40% improved brand recognition according to customer surveys</li>
              <li>Analyzed marketing metrics using Google Analytics and prepared monthly performance reports for executive leadership</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg my-8 border-l-4 border-yellow-500 flex">
            <div className="mr-4">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-yellow-800 font-medium text-lg mb-2">Key Tip: Use the PAR Method</h3>
              <p className="text-yellow-700 mb-0">
                When writing achievement bullets, use the <strong>Problem-Action-Result</strong> format:
                <br />
                1. <strong>Problem:</strong> What challenge did you face?
                <br />
                2. <strong>Action:</strong> What did you do about it?
                <br />
                3. <strong>Result:</strong> What positive outcome did your action create?
                <br />
                This structure clearly demonstrates your impact and value.
              </p>
            </div>
          </div>
          
          <h2>Step 4: Highlight Your Education and Qualifications</h2>
          <p>
            List your educational background in reverse chronological order, including:
          </p>
          <ul>
            <li>Degree earned and field of study</li>
            <li>Institution name and location</li>
            <li>Graduation year (or expected graduation)</li>
            <li>Relevant coursework, honors, or high GPA (if notable)</li>
          </ul>
          <p>
            For professional certifications, include the certification name, issuing organization, and date obtained.
          </p>
          
          <h2>Step 5: Showcase Relevant Skills</h2>
          <p>
            Create a skills section that highlights both hard skills (technical abilities) and soft skills (interpersonal qualities) relevant to the position. Be specific and honest about your proficiency levels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div>
              <h4 className="font-bold mb-2">Hard Skills Example:</h4>
              <ul className="list-disc pl-5">
                <li>Adobe Creative Suite (Photoshop, Illustrator)</li>
                <li>Content Management Systems (WordPress, Drupal)</li>
                <li>Email Marketing Platforms (Mailchimp, SendGrid)</li>
                <li>Google Analytics and SEO tools</li>
                <li>HTML/CSS (Basic proficiency)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Soft Skills Example:</h4>
              <ul className="list-disc pl-5">
                <li>Project Management</li>
                <li>Cross-functional Collaboration</li>
                <li>Client Communication</li>
                <li>Creative Problem-solving</li>
                <li>Presentation and Public Speaking</li>
              </ul>
            </div>
          </div>
          
          <h2>Step 6: Optimize for Applicant Tracking Systems (ATS)</h2>
          <p>
            Many employers use ATS software to screen CVs before human eyes ever see them. To ensure yours makes it through:
          </p>
          <ol>
            <li><strong>Use keywords from the job description</strong> - Incorporate relevant terms and phrases that match the job requirements</li>
            <li><strong>Keep formatting simple</strong> - Avoid tables, headers/footers, images, and complex design elements</li>
            <li><strong>Use standard section headings</strong> - "Work Experience," "Education," "Skills," etc.</li>
            <li><strong>Submit in the right file format</strong> - Usually PDF or Word (.docx), as specified in the application instructions</li>
            <li><strong>Include your contact information in the main body</strong> - Not in headers or footers where ATS might miss them</li>
          </ol>
          
          <h2>Step 7: Polish and Proofread</h2>
          <p>
            A single typo or grammatical error can undermine your professionalism. Before submitting your CV:
          </p>
          <ul>
            <li>Proofread multiple times, reading backward to catch more errors</li>
            <li>Use tools like Grammarly to check spelling and grammar</li>
            <li>Ask someone else to review it with fresh eyes</li>
            <li>Check that all links (e.g., to your LinkedIn profile) work properly</li>
            <li>Ensure consistent formatting throughout (font, spacing, bullet styles, etc.)</li>
          </ul>
          
          <h2>CV Checklist: Final Review</h2>
          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Contact information is complete and prominent at the top</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Personal statement highlights your value proposition</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Work experience emphasizes achievements with quantifiable results</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Education section is complete and relevant</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Skills section is tailored to the job requirements</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Keywords from the job posting are incorporated naturally</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Formatting is consistent and ATS-friendly</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>CV length is appropriate (typically 1-2 pages)</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>No spelling or grammatical errors</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>Information is honest and accurate</span>
              </li>
            </ul>
          </div>
          
          <h2>Conclusion: Your CV is a Living Document</h2>
          <p>
            Remember that your CV should evolve throughout your career. Update it regularly with new accomplishments, skills, and experiences. Most importantly, customize it for each significant application to align with the specific requirements and culture of the organization.
          </p>
          <p>
            A well-crafted CV takes time and effort, but the investment pays off when it opens doors to interviews and ultimately to job offers that advance your career. By following the steps in this guide, you'll create a professional CV that effectively communicates your value to potential employers and helps you stand out in today's competitive job market.
          </p>
          
          <div className="bg-blue-50 p-8 rounded-lg my-8 text-center">
            <h3 className="text-xl font-bold mb-4">Need more help with your job search?</h3>
            <p className="mb-6">
              Download our professionally designed CV templates that have helped thousands of job seekers land interviews.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download CV Templates
            </Button>
          </div>
          
          <h3>Related Career Resources</h3>
          <ul>
            <li><a href="/article/ace-your-next-job-interview">Ace Your Next Job Interview: Preparation Strategies</a></li>
            <li><a href="/article/using-linkedin-effectively">Using LinkedIn Effectively for Your Job Search</a></li>
            <li><a href="/article/negotiating-your-salary">Negotiating Your Salary: What You Need to Know</a></li>
          </ul>
        </div>
        
        {/* Tags section */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            CV Writing
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Job Search
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Career Development
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Employment
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            Resume Tips
          </span>
        </div>
        
        {/* Author section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex items-center">
            <img 
              src="https://placehold.co/100x100/D3E4FD/333333?text=CI" 
              alt="Author Avatar"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold text-lg">Chidi Iwuoma</h3>
              <p className="text-gray-600 text-sm">Career Coach & HR Consultant</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700">
            Chidi has over 10 years of experience in talent acquisition and career development. He has helped hundreds of professionals improve their CVs and secure interviews at top companies across Nigeria and beyond.
          </p>
        </div>
        
        {/* Comments section */}
        <Tabs defaultValue="comments" className="mb-12">
          <TabsList className="mb-4">
            <TabsTrigger value="comments">Comments (15)</TabsTrigger>
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

export default CVWritingArticle;
