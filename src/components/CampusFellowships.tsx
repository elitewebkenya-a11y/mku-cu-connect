import { Users, MapPin, Clock, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fellowships = [
  {
    name: "Kiganjo/Kiang'ombe Fellowship",
    location: "Kiganjo Area",
    time: "Monday, 7:00 PM",
    leader: "Bro. James",
    members: "15-20",
    focus: "Bible Study & Prayer",
  },
  {
    name: "Runda Fellowship",
    location: "Runda Hostels",
    time: "Monday, 7:00 PM",
    leader: "Sis. Grace",
    members: "12-18",
    focus: "Worship & Fellowship",
  },
  {
    name: "Biafra Fellowship",
    location: "Biafra Area",
    time: "Monday, 7:00 PM",
    leader: "Bro. Peter",
    members: "10-15",
    focus: "Discipleship",
  },
  {
    name: "Mukiriti/Zwni/Town Fellowship",
    location: "Town Area",
    time: "Monday, 7:00 PM",
    leader: "Sis. Mary",
    members: "20-25",
    focus: "Evangelism & Outreach",
  },
  {
    name: "Starehe Fellowship",
    location: "Starehe Hostels",
    time: "Monday, 7:00 PM",
    leader: "Bro. David",
    members: "15-20",
    focus: "Youth Ministry",
  },
  {
    name: "School Area Fellowship",
    location: "School Campus",
    time: "Monday, 7:00 PM",
    leader: "Sis. Ruth",
    members: "18-22",
    focus: "Campus Ministry",
  },
];

export const CampusFellowships = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Users className="w-5 h-5" />
            <span className="text-sm font-semibold">Home Fellowships</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Join a Campus Fellowship
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with believers in your area for Bible study, prayer, and community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {fellowships.map((fellowship, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">{fellowship.name}</h3>
                  <p className="text-sm text-muted-foreground">{fellowship.focus}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>{fellowship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>{fellowship.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span>{fellowship.members} members • Led by {fellowship.leader}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/254115475543?text=I%20want%20to%20join%20${encodeURIComponent(fellowship.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Join Fellowship
                </Button>
              </a>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-3">
            Can't find a fellowship near you?
          </p>
          <a
            href="https://wa.me/254115475543?text=I%20want%20to%20start%20a%20new%20fellowship%20in%20my%20area"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">
              Start a New Fellowship
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};