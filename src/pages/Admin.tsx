import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => navigate("/")} variant="outline" size="sm">
            <Home className="w-4 h-4 mr-2" />
            Back to Site
          </Button>
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
