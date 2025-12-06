import { useState } from "react";
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
  Image
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "activities", label: "Weekly Activities", icon: Calendar },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "sermons", label: "Sermons", icon: Video },
  { id: "blog", label: "Blog Posts", icon: FileText },
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
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Admin Panel</span>
          </div>
          <Button onClick={() => navigate("/")} variant="outline" size="sm">
            <Home className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center gap-3 p-6 border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">MKU CU Admin</h1>
              <p className="text-xs text-muted-foreground">Content Manager</p>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-180px)] lg:h-[calc(100vh-140px)]">
            <nav className="p-4 space-y-1">
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
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Home className="h-4 w-4" />
              Back to Website
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
        <main className="flex-1 min-h-screen">
          {/* Page Header */}
          <div className="sticky top-0 lg:top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                {currentMenuItem && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <currentMenuItem.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        {currentMenuItem.label}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Manage your {currentMenuItem.label.toLowerCase()} content
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;