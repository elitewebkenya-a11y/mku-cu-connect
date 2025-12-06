import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AnimatedSection } from "@/components/AnimatedSection";

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string | null;
  location: string;
  category: string | null;
  image_url: string | null;
  registration_link: string | null;
  is_featured: boolean | null;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter((e) => e.event_date >= today);
  const pastEvents = events.filter((e) => e.event_date < today).reverse();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-foreground">Loading events...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in">
                Upcoming Events
              </h1>
              <p className="text-xl text-white/80 mb-8 animate-fade-in">
                Join us for life-changing gatherings, worship services, and fellowship opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Events Grid */}
        <AnimatedSection animation="fade-up">
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Upcoming Events</h2>
              <div className="max-w-7xl mx-auto">
                {upcomingEvents.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-card">
                        <div className="aspect-video overflow-hidden relative">
                          <img
                            src={event.image_url || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          {event.category && (
                            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                              {event.category}
                            </Badge>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-serif font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          {event.description && (
                            <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                          )}
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>{new Date(event.event_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>{event.start_time}{event.end_time && ` - ${event.end_time}`}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <a href={event.registration_link || "#"} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                              Register Now <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </a>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No upcoming events. Check back soon!</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <AnimatedSection animation="fade-up">
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-serif font-bold text-muted-foreground mb-6">Past Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 opacity-60">
                  {pastEvents.slice(0, 8).map((event) => (
                    <Card key={event.id} className="overflow-hidden bg-card/50">
                      <div className="aspect-video overflow-hidden relative grayscale">
                        <img
                          src={event.image_url || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <Badge variant="secondary" className="absolute top-2 right-2 text-xs">Past</Badge>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-sm mb-1 text-muted-foreground line-clamp-1">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{new Date(event.event_date).toLocaleDateString()}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* CTA Section */}
        <AnimatedSection animation="scale">
          <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Never Miss an Event</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Stay updated with all our upcoming events and gatherings. Join our WhatsApp community.
                </p>
                <a href="https://wa.me/254115475543?text=Hi%2C%20add%20me%20to%20the%20events%20WhatsApp%20group" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">Join WhatsApp Group</Button>
                </a>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Events;