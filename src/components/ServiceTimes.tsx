import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Calendar } from "lucide-react";

const services = [
  {
    day: "Sunday",
    name: "Main Service",
    time: "9:00 AM - 12:00 PM",
    location: "Main Chapel",
    highlight: true
  },
  {
    day: "Wednesday",
    name: "Midweek Service",
    time: "5:00 PM - 7:00 PM",
    location: "Fellowship Hall",
    highlight: false
  },
  {
    day: "Friday",
    name: "Prayer Meeting",
    time: "6:00 PM - 8:00 PM",
    location: "Prayer Room",
    highlight: false
  },
  {
    day: "Saturday",
    name: "Youth Fellowship",
    time: "2:00 PM - 5:00 PM",
    location: "Youth Center",
    highlight: false
  }
];

export const ServiceTimes = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-card via-muted/20 to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            Service Times
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Join Us For Worship
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We gather together to worship, learn, and grow in faith. Everyone is welcome!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`border-0 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                service.highlight 
                  ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground' 
                  : 'bg-card'
              }`}
            >
              <CardContent className="p-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  service.highlight 
                    ? 'bg-white/20 text-white' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  <Calendar className="w-3 h-3" />
                  {service.day}
                </div>
                
                <h3 className={`font-serif font-bold text-xl mb-3 ${
                  service.highlight ? 'text-white' : 'text-foreground'
                }`}>
                  {service.name}
                </h3>
                
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${
                    service.highlight ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    <Clock className="w-4 h-4" />
                    {service.time}
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${
                    service.highlight ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    <MapPin className="w-4 h-4" />
                    {service.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
