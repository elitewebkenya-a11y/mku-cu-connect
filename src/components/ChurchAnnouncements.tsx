import { Megaphone, Calendar, Clock, MapPin, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  description: string;
  announcement_date: string;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  category: string | null;
  priority: string | null;
  contact_link: string | null;
  is_active: boolean | null;
}

export const ChurchAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false })
        .order("announcement_date", { ascending: true })
        .limit(4);

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading announcements...</div>
        </div>
      </section>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <Megaphone className="w-5 h-5" />
            <span className="text-sm font-semibold">Stay Updated</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Church Announcements
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Important updates and upcoming activities you don't want to miss
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className={`p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
                announcement.priority === "high" ? "border-l-accent" : "border-l-primary"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    announcement.priority === "high" ? "bg-accent/10" : "bg-primary/10"
                  }`}>
                    <Megaphone className={`w-6 h-6 ${
                      announcement.priority === "high" ? "text-accent" : "text-primary"
                    }`} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{announcement.title}</h3>
                    {announcement.category && (
                      <Badge variant={announcement.priority === "high" ? "default" : "outline"}>
                        {announcement.category}
                      </Badge>
                    )}
                    {announcement.priority === "high" && (
                      <Badge className="bg-accent text-white">Priority</Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {announcement.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>
                        {new Date(announcement.announcement_date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    {announcement.start_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span>
                          {announcement.start_time}
                          {announcement.end_time && ` - ${announcement.end_time}`}
                        </span>
                      </div>
                    )}
                    {announcement.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span>{announcement.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href={announcement.contact_link || `https://wa.me/254115475543?text=I%20want%20more%20info%20about%20${encodeURIComponent(announcement.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Info className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://wa.me/254115475543?text=I%20want%20to%20receive%20weekly%20announcements"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              Subscribe to Announcements
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
