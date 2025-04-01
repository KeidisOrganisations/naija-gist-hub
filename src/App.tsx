
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { initializeStorage } from "@/services/storage-service";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminArticleList from "./pages/admin/AdminArticleList";
import AdminArticleEditor from "./pages/admin/AdminArticleEditor";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMedia from "./pages/admin/AdminMedia";
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

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    // Initialize storage on app start
    initializeStorage();
  }, []);

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
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/articles" element={<AdminArticleList />} />
      <Route path="/admin/articles/new" element={<AdminArticleEditor />} />
      <Route path="/admin/articles/edit/:id" element={<AdminArticleEditor />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/media" element={<AdminMedia />} />
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
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
