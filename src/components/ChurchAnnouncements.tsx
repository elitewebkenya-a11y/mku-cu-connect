import { Megaphone, Calendar, Clock, MapPin, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const announcements = [
  {
    title: "Campus Evangelism Drive",
    date: "This Week",
    time: "Daily, 12:00 PM - 2:00 PM",
    location: "Main Campus Gate",
    description: "Join us as we share the gospel across campus. Bring your friends!",
    type: "Outreach",
    priority: "high",
  },
  {
    title: "Leadership Training Workshop",
    date: "December 7, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "CT Hall",
    description: "Equipping the next generation of campus leaders. Register early!",
    type: "Training",
    priority: "medium",
  },
  {
    title: "End of Semester Thanksgiving Service",
    date: "December 14, 2025",
    time: "10:00 AM - 1:00 PM",
    location: "Main Auditorium",
    description: "Let's celebrate God's faithfulness this semester with thanksgiving and worship.",
    type: "Service",
    priority: "high",
  },
  {
    title: "Christmas Outreach Planning",
    date: "December 1, 2025",
    time: "5:00 PM - 7:00 PM",
    location: "CT Hall",
    description: "Planning meeting for our Christmas community outreach program.",
    type: "Meeting",
    priority: "medium",
  },
];

export const ChurchAnnouncements = () => {
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
          {announcements.map((announcement, index) => (
            <Card
              key={index}
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
                    <Badge variant={announcement.priority === "high" ? "default" : "outline"}>
                      {announcement.type}
                    </Badge>
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
                      <span>{announcement.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>{announcement.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>{announcement.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <a
                    href={`https://wa.me/254115475543?text=I%20want%20more%20info%20about%20${encodeURIComponent(announcement.title)}`}
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