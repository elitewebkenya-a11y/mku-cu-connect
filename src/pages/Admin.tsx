import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeeklyActivitiesManager } from "@/components/admin/WeeklyActivitiesManager";
import { EventsManager } from "@/components/admin/EventsManager";
import { AnnouncementsManager } from "@/components/admin/AnnouncementsManager";
import { SermonsManager } from "@/components/admin/SermonsManager";
import { BlogPostsManager } from "@/components/admin/BlogPostsManager";
import { LeadersManager } from "@/components/admin/LeadersManager";
import { MinistriesManager } from "@/components/admin/MinistriesManager";
import { FellowshipsManager } from "@/components/admin/FellowshipsManager";
import { VolunteersManager } from "@/components/admin/VolunteersManager";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="activities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2">
            <TabsTrigger value="activities">Weekly Activities</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="sermons">Sermons</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="leaders">Leaders</TabsTrigger>
            <TabsTrigger value="ministries">Ministries</TabsTrigger>
            <TabsTrigger value="fellowships">Fellowships</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          </TabsList>

          <TabsContent value="activities">
            <WeeklyActivitiesManager />
          </TabsContent>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsManager />
          </TabsContent>

          <TabsContent value="sermons">
            <SermonsManager />
          </TabsContent>

          <TabsContent value="blog">
            <BlogPostsManager />
          </TabsContent>

          <TabsContent value="leaders">
            <LeadersManager />
          </TabsContent>

          <TabsContent value="ministries">
            <MinistriesManager />
          </TabsContent>

          <TabsContent value="fellowships">
            <FellowshipsManager />
          </TabsContent>

          <TabsContent value="volunteers">
            <VolunteersManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
