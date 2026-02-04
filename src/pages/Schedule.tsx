import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Calendar, Clock, MapPin, Users, BookOpen, Music, Heart, 
  MessageCircle, Phone, ExternalLink, Sun, Moon, ChevronRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DailyScheduleItem {
  id: string;
  day_of_week: string;
  theme: string | null;
  activity_name: string;
  activity_type: string;
  start_time: string;
  end_time: string | null;
  venue: string;
  description: string | null;
  facilitator: string | null;
  is_active: boolean;
  display_order: number;
}

interface HomeFellowship {
  id: string;
  name: string;
  area: string;
  meeting_day: string;
  meeting_time: string;
  venue: string | null;
  leader_name: string | null;
  contact_link: string | null;
  description: string | null;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dayThemes: Record<string, { theme: string; icon: React.ReactNode; color: string }> = {
  Monday: { 
    theme: "Prayer & Fasting Focus", 
    icon: <Heart className="w-5 h-5" />,
    color: "bg-green-500"
  },
  Tuesday: { 
    theme: "Leadership & Creative Arts", 
    icon: <Music className="w-5 h-5" />,
    color: "bg-purple-500"
  },
  Wednesday: { 
    theme: "Midweek Service", 
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-yellow-500"
  },
  Thursday: { 
    theme: "Evangelism Day", 
    icon: <Users className="w-5 h-5" />,
    color: "bg-teal-500"
  },
  Friday: { 
    theme: "Service & Ministry", 
    icon: <Heart className="w-5 h-5" />,
    color: "bg-orange-500"
  },
  Saturday: { 
    theme: "Preparation & Events", 
    icon: <Calendar className="w-5 h-5" />,
    color: "bg-pink-500"
  },
  Sunday: { 
    theme: "Main Worship Service", 
    icon: <Sun className="w-5 h-5" />,
    color: "bg-blue-500"
  },
};

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Sunday");
  const [dbSchedule, setDbSchedule] = useState<DailyScheduleItem[]>([]);
  const [dbFellowships, setDbFellowships] = useState<HomeFellowship[]>([]);
  const [dbFaqs, setDbFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [scheduleRes, fellowshipsRes, faqsRes] = await Promise.all([
        supabase.from("daily_schedule").select("*").eq("is_active", true).order("display_order"),
        supabase.from("home_fellowships").select("*").eq("is_active", true),
        supabase.from("faqs").select("*").eq("is_active", true).order("display_order"),
      ]);

      if (scheduleRes.data) setDbSchedule(scheduleRes.data);
      if (fellowshipsRes.data) setDbFellowships(fellowshipsRes.data);
      if (faqsRes.data) setDbFaqs(faqsRes.data);
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDaySchedule = () => {
    const dbItems = dbSchedule.filter(item => item.day_of_week === selectedDay);
    return dbItems.map(item => ({
      name: item.activity_name,
      time: item.end_time ? `${item.start_time} - ${item.end_time}` : item.start_time,
      venue: item.venue,
      description: item.description || undefined,
    }));
  };

  const getFellowships = () => {
    return dbFellowships.map(f => ({
      name: f.name,
      area: f.area,
      day: f.meeting_day,
      time: f.meeting_time,
      contact_link: f.contact_link,
    }));
  };

  const getFaqs = () => {
    return dbFaqs.map(f => ({ q: f.question, a: f.answer }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <Badge className="bg-white/20 text-white mb-4">MKUCU 2025/2026 Regime</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
              Complete Schedule
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Join us for worship, fellowship, and spiritual growth throughout the week
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">5:00 AM</div>
                <div className="text-sm text-muted-foreground">Morning Devotions</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">7:00 PM</div>
                <div className="text-sm text-muted-foreground">Bethel Prayers</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">7+</div>
                <div className="text-sm text-muted-foreground">Home Fellowships</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Ministries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Schedule */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Daily Activities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select a day to view all scheduled activities
              </p>
            </div>

            {/* Day Selector */}
            <div className="flex overflow-x-auto gap-2 pb-4 mb-8 justify-center flex-wrap">
              {dayOrder.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? "default" : "outline"}
                  onClick={() => setSelectedDay(day)}
                  className="flex-shrink-0"
                >
                  {day.slice(0, 3)}
                </Button>
              ))}
            </div>

            {/* Selected Day Content */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader className={`${dayThemes[selectedDay]?.color || 'bg-primary'} text-white rounded-t-lg`}>
                <div className="flex items-center gap-3">
                  {dayThemes[selectedDay]?.icon}
                  <div>
                    <CardTitle className="text-2xl">{selectedDay}</CardTitle>
                    <p className="text-white/80">{dayThemes[selectedDay]?.theme}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading schedule...</div>
                ) : getCurrentDaySchedule().length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p>No activities scheduled for {selectedDay}.</p>
                    <p className="text-sm mt-1">Check the admin panel to add activities.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getCurrentDaySchedule().map((activity, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-shrink-0 w-24 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {activity.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{activity.name}</h4>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {activity.venue}
                          </div>
                          {activity.description && (
                            <p className="text-sm text-muted-foreground mt-2">{activity.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Home Fellowships */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Badge className="mb-4">Small Groups</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Home Fellowships</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with believers in your area for Bible study, prayer, and fellowship
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading fellowships...</div>
            ) : getFellowships().length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>No home fellowships available yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {getFellowships().map((fellowship, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{fellowship.name}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {fellowship.area}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {fellowship.day}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {fellowship.time}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                        <a href={fellowship.contact_link || "https://chat.whatsapp.com/I0O4FU8BFMo59CwKnnVB29"} target="_blank" rel="noopener noreferrer">
                          Join Fellowship
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Venues */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Venue Guide</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Quick reference for all our meeting locations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {[
                { name: "MLT Hall B", purpose: "Morning devotions, Bethel prayers" },
                { name: "PEFA Church", purpose: "Lunch hour services (primary)" },
                { name: "CT Grounds", purpose: "Large gatherings, departures" },
                { name: "CC Upper Room", purpose: "Debates, home fellowships" },
                { name: "Indoor Arena", purpose: "Large worship events, Keshas" },
                { name: "Basketball Court", purpose: "Sunday services (occasional)" },
                { name: "MLT Block NC5", purpose: "Choir practices" },
                { name: "CT 8.1", purpose: "Vocal J classes" },
                { name: "General Kago Primary", purpose: "Children's ministry, missions" },
              ].map((venue, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold">{venue.name}</h4>
                      <p className="text-sm text-muted-foreground">{venue.purpose}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about joining and participating in MKUCU
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading FAQs...</div>
            ) : getFaqs().length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No FAQs available yet.</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-2">
                {getFaqs().map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg border px-4">
                    <AccordionTrigger className="text-left font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Have Questions?</h2>
            <p className="mb-6 opacity-90">Connect with us for more information about our activities</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <a href="https://wa.me/254115475543" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                <a href="https://www.youtube.com/@mkucuofficial" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Watch on YouTube
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Schedule;
