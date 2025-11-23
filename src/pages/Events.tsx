import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const upcomingEvents = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "7:00 AM - 12:45 PM",
    location: "Main Auditorium (MKCC)",
    description: "Join us for powerful worship, inspiring sermons, and fellowship with believers.",
    attendees: "500+",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Midweek Bible Study",
    date: "Every Wednesday",
    time: "5:00 PM - 7:00 PM",
    location: "Fellowship Hall",
    description: "Deep dive into God's Word with interactive discussions and practical applications.",
    attendees: "150+",
    image: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Campus Outreach Mission",
    date: "December 15, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "MKU Campus Grounds",
    description: "Evangelism drive reaching out to students with the Gospel message and free resources.",
    attendees: "200+",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Youth Praise & Worship Night",
    date: "December 20, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Open Ground",
    description: "An evening of powerful worship, testimonies, and prayer under the stars.",
    attendees: "400+",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Leadership Training Workshop",
    date: "January 10, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Conference Room A",
    description: "Equipping the next generation of Christian leaders with practical ministry skills.",
    attendees: "100",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Annual Missions Conference",
    date: "February 14-16, 2025",
    time: "All Day",
    location: "Main Campus",
    description: "Three-day conference focusing on global missions, with guest speakers and workshops.",
    attendees: "600+",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
                Upcoming Events
              </h1>
              <p className="text-xl text-gold-light mb-8 animate-fade-in-up">
                Join us for life-changing gatherings, worship services, and fellowship opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-navy-light transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gold" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gold" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-gold" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gold" />
                          <span>{event.attendees} Expected</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-navy hover:bg-navy-light">
                        Register Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-gold via-gold-light to-gold">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-navy mb-6">
                Never Miss an Event
              </h2>
              <p className="text-lg text-navy/80 mb-8">
                Stay updated with all our upcoming events, services, and special gatherings. 
                Subscribe to our calendar or join our WhatsApp community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-navy hover:bg-navy-light text-white">
                  Subscribe to Calendar
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-navy text-navy hover:bg-navy hover:text-white">
                  Join WhatsApp Group
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
