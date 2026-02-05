import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/hooks/use-theme";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Events = lazy(() => import("./pages/Events"));
const Media = lazy(() => import("./pages/Media"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Admin = lazy(() => import("./pages/Admin"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Elections = lazy(() => import("./pages/Elections"));
const Ministries = lazy(() => import("./pages/Ministries"));
const Visitors = lazy(() => import("./pages/Visitors"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-navy-light text-xl font-serif">Loading...</div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/media" element={<Media />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/AdminLogin" element={<Admin />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/elections" element={<Elections />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/visitors" element={<Visitors />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
