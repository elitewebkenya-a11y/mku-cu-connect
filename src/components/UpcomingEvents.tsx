import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const upcomingEvents = [
  {
    id: 1,
    title: "🌍 Limuru Sub-Mission 2025",
    subtitle: "Restored by His Mercy",
    date: "Oct 17-19, 2025",
    time: "Full Weekend Event",
    location: "Destiny Chapel Limuru",
    attendees: "50+ Expected",
    category: "Mission",
    description: "Join us for a powerful weekend of evangelism, crusades, and school outreach in Limuru.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Campus Crusade Week",
    subtitle: "Reaching Every Student",
    date: "Dec 2-6, 2025",
    time: "Daily 5:00 PM - 8:00 PM",
    location: "MKU Main Campus",
    attendees: "200+ Expected",
    category: "Outreach",
    description: "A week of powerful evangelism, worship, and testimonies across campus.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Leadership Conference",
    subtitle: "Raising Kingdom Leaders",
    date: "Jan 10-12, 2026",
    time: "8:00 AM - 5:00 PM",
    location: "Auditorium MKCC",
    attendees: "100+ Leaders",
    category: "Training",
    description: "Equipping ministry leaders with skills for effective service and spiritual growth.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
  },
];

export const UpcomingEvents = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <Calendar className="w-5 h-5" />
            <span className="text-sm md:text-base font-semibold">Upcoming Events</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-foreground">
            Join Us for Upcoming Events
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Be part of life-changing experiences and community gatherings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-border bg-card"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  {event.category}
                </Badge>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-card-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground italic mb-4">{event.subtitle}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.attendees}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {event.description}
                </p>

                <a
                  href="https://wa.me/254115475543?text=Hi%2C%20I%20want%20to%20register%20for%20the%20upcoming%20event"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href="/events">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
