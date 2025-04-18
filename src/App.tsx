
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; 
import { InitializeStorageLoader } from "@/components/ui/initialize-storage-loader";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";
import SearchResults from "./pages/SearchResults";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminArticleList from "./pages/admin/AdminArticleList";
import AdminArticleEditor from "./pages/admin/AdminArticleEditor";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminBatchImport from "./pages/admin/AdminBatchImport";
import AdminComments from "./pages/admin/AdminComments";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminSettings from "./pages/admin/AdminSettings";
import Advertise from "./pages/Advertise";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SubmitGuide from "./pages/SubmitGuide";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

// New category pages
import HealthWellnessPage from "./pages/category/HealthWellness";
import PersonalFinancePage from "./pages/category/PersonalFinance";
import CareerDevelopmentPage from "./pages/category/CareerDevelopment";
import DIYProjectsPage from "./pages/category/DIYProjects";
import SelfImprovementPage from "./pages/category/SelfImprovement";

// New article template pages
import HomeWorkoutArticle from "./pages/articles/HomeWorkoutArticle";
import BudgetingArticle from "./pages/articles/BudgetingArticle";
import CVWritingArticle from "./pages/articles/CVWritingArticle";
import WoodenShelfArticle from "./pages/articles/WoodenShelfArticle";
import ProductivityHacksArticle from "./pages/articles/ProductivityHacksArticle";

// Create a new client with default settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/index" element={<Navigate to="/" replace />} />
      <Route path="/index.html" element={<Navigate to="/" replace />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/advertise" element={<Advertise />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/submit-guide" element={<SubmitGuide />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchResults />} />
      
      {/* General category and article routes */}
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
      
      {/* New specific category pages */}
      <Route path="/category/health-wellness" element={<HealthWellnessPage />} />
      <Route path="/category/personal-finance" element={<PersonalFinancePage />} />
      <Route path="/category/career-development" element={<CareerDevelopmentPage />} />
      <Route path="/category/diy-projects" element={<DIYProjectsPage />} />
      <Route path="/category/self-improvement" element={<SelfImprovementPage />} />
      
      {/* New specific article template pages */}
      <Route path="/article/how-to-create-a-simple-home-workout-routine" element={<HomeWorkoutArticle />} />
      <Route path="/article/how-to-start-budgeting-for-your-first-job" element={<BudgetingArticle />} />
      <Route path="/article/how-to-write-a-cv-that-gets-you-noticed" element={<CVWritingArticle />} />
      <Route path="/article/how-to-build-a-wooden-shelf-with-simple-tools" element={<WoodenShelfArticle />} />
      <Route path="/article/7-life-hacks-to-boost-productivity-every-day" element={<ProductivityHacksArticle />} />
      
      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/articles" element={<AdminArticleList />} />
      <Route path="/admin/articles/new" element={<AdminArticleEditor />} />
      <Route path="/admin/articles/edit/:id" element={<AdminArticleEditor />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/media" element={<AdminMedia />} />
      <Route path="/admin/batch-import" element={<AdminBatchImport />} />
      <Route path="/admin/comments" element={<AdminComments />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/newsletter" element={<AdminNewsletter />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
            <InitializeStorageLoader />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
