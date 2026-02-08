import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  WeeklyActivitiesManager,
  EventsManager,
  AnnouncementsManager,
  SermonsManager,
  BlogPostsManager,
  LeadersManager,
  MinistriesManager,
  FellowshipsManager,
  VolunteersManager,
  DailyScheduleManager,
  HomeFellowshipsManager,
  FAQsManager,
  ElectionsManager
} from "@/components/admin";
import { PrayerRequestsManager } from "@/components/admin/PrayerRequestsManager";
import { CommentsManager } from "@/components/admin/CommentsManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { NotificationsManager } from "@/components/admin/NotificationsManager";
import { 
  Home, 
  Calendar, 
  CalendarDays, 
  Megaphone, 
  Video, 
  FileText, 
  Users, 
  Church, 
  UsersRound, 
  HandHelping,
  Menu,
  X,
  LayoutDashboard,
  MessageCircleHeart,
  MessageCircle,
  Image,
  ChevronRight,
  ClipboardList,
  HomeIcon,
  HelpCircle,
  Vote,
  BellRing
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "notifications", label: "Notifications", icon: BellRing },
  { id: "schedule", label: "Daily Schedule", icon: ClipboardList },
  { id: "activities", label: "Weekly Activities", icon: Calendar },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "sermons", label: "Sermons", icon: Video },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "comments", label: "Comments", icon: MessageCircle },
  { id: "prayers", label: "Prayers", icon: MessageCircleHeart },
  { id: "leaders", label: "Leaders", icon: Users },
  { id: "ministries", label: "Ministries", icon: Church },
  { id: "fellowships", label: "Campus Fellowships", icon: UsersRound },
  { id: "homefellowships", label: "Home Fellowships", icon: HomeIcon },
  { id: "volunteers", label: "Volunteers", icon: HandHelping },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "elections", label: "Elections", icon: Vote },
];

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("notifications");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "notifications":
        return <NotificationsManager />;
      case "schedule":
        return <DailyScheduleManager />;
      case "activities":
        return <WeeklyActivitiesManager />;
      case "events":
        return <EventsManager />;
      case "gallery":
        return <GalleryManager />;
      case "announcements":
        return <AnnouncementsManager />;
      case "sermons":
        return <SermonsManager />;
      case "blog":
        return <BlogPostsManager />;
      case "comments":
        return <CommentsManager />;
      case "prayers":
        return <PrayerRequestsManager />;
      case "leaders":
        return <LeadersManager />;
      case "ministries":
        return <MinistriesManager />;
      case "fellowships":
        return <FellowshipsManager />;
      case "homefellowships":
        return <HomeFellowshipsManager />;
      case "volunteers":
        return <VolunteersManager />;
      case "faqs":
        return <FAQsManager />;
      case "elections":
        return <ElectionsManager />;
      default:
        return <NotificationsManager />;
    }
  };

  const currentMenuItem = menuItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-muted/30 touch-manipulation">
      {/* Mobile Header - App-like */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm safe-area-top">
        <div className="flex items-center justify-between px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-10 w-10 rounded-xl active:scale-95 transition-transform"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">MKU CU Admin</span>
          </div>
          <Button 
            onClick={() => navigate("/")} 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-xl active:scale-95 transition-transform"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
        {/* Current section indicator */}
        <div className="px-4 pb-3 flex items-center gap-2 border-t border-border/50 pt-2 bg-muted/30">
          {currentMenuItem && (
            <>
              <currentMenuItem.icon className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">{currentMenuItem.label}</span>
            </>
          )}
        </div>
      </header>

      <div className="flex lg:pt-0 pt-[104px]">
        {/* Sidebar - App-like on mobile */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-40 h-screen bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
            "w-72 lg:w-56",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center gap-3 p-4 border-b border-border">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">MKU CU</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          {/* Mobile Header in Sidebar */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-border safe-area-top pt-6">
            <span className="font-bold text-lg">Menu</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-xl active:scale-95 transition-transform" 
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-180px)] lg:h-[calc(100vh-140px)]">
            <nav className="p-3 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted/80"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                    {activeTab === item.id && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border bg-card safe-area-bottom">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full justify-center gap-2 h-12 rounded-xl text-sm font-medium"
            >
              <Home className="h-4 w-4" />
              Back to Site
            </Button>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen w-full">
          {/* Desktop Page Header */}
          <div className="hidden lg:block sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                {currentMenuItem && (
                  <>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <currentMenuItem.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      {currentMenuItem.label}
                    </h2>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Area - Mobile optimized padding */}
          <div className="p-4 lg:p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;