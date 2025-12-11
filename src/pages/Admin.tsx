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
  VolunteersManager
} from "@/components/admin";
import { PrayerRequestsManager } from "@/components/admin/PrayerRequestsManager";
import { CommentsManager } from "@/components/admin/CommentsManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
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
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "activities", label: "Activities", icon: Calendar },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "sermons", label: "Sermons", icon: Video },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "comments", label: "Comments", icon: MessageCircle },
  { id: "prayers", label: "Prayers", icon: MessageCircleHeart },
  { id: "leaders", label: "Leaders", icon: Users },
  { id: "ministries", label: "Ministries", icon: Church },
  { id: "fellowships", label: "Fellowships", icon: UsersRound },
  { id: "volunteers", label: "Volunteers", icon: HandHelping },
];

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activities");
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
      case "volunteers":
        return <VolunteersManager />;
      default:
        return <WeeklyActivitiesManager />;
    }
  };

  const currentMenuItem = menuItems.find(item => item.id === activeTab);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-9 w-9 p-0"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">Admin</span>
          </div>
          <Button onClick={() => navigate("/")} variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Home className="w-4 h-4" />
          </Button>
        </div>
        {/* Current section indicator on mobile */}
        <div className="px-3 pb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <ChevronRight className="w-3 h-3" />
          <span className="font-medium text-foreground">{currentMenuItem?.label}</span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-40 h-screen bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
            "w-56 lg:w-52",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center gap-2 p-4 border-b border-border">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-foreground">MKU CU</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          {/* Mobile Header in Sidebar */}
          <div className="lg:hidden flex items-center justify-between p-3 border-b border-border">
            <span className="font-semibold text-sm">Menu</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-130px)] lg:h-[calc(100vh-120px)]">
            <nav className="p-2 space-y-0.5">
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
                      "w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-border bg-card">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 text-xs"
            >
              <Home className="h-3 w-3" />
              Back to Site
            </Button>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen w-full">
          {/* Desktop Page Header */}
          <div className="hidden lg:block sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="px-4 py-3">
              <div className="flex items-center gap-2">
                {currentMenuItem && (
                  <>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <currentMenuItem.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">
                        {currentMenuItem.label}
                      </h2>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Area - Mobile optimized padding */}
          <div className="p-3 lg:p-4">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;