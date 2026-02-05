import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, Heart, Music, BookOpen, Globe, HandHeart, 
  Mic, Camera, Shield, Home, Baby, Sparkles,
  Clock, MapPin, User, Loader2
} from "lucide-react";

interface Ministry {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  leader_name: string | null;
  meeting_schedule: string | null;
  joining_link: string;
  is_active: boolean | null;
}

const iconMap: { [key: string]: any } = {
  Music: Music,
  BookOpen: BookOpen,
  Globe: Globe,
  HandHeart: HandHeart,
  Heart: Heart,
  Users: Users,
  Mic: Mic,
  Camera: Camera,
  Shield: Shield,
  Home: Home,
  Baby: Baby,
  Sparkles: Sparkles,
};

const Ministries = () => {
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      const { data, error } = await supabase
        .from("ministries")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setMinistries(data || []);
    } catch (error) {
      console.error("Error fetching ministries:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string | null) => {
    if (iconName && iconMap[iconName]) {
      return iconMap[iconName];
    }
    return Heart;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4" variant="secondary">Serve With Purpose</Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Our Ministries
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your calling and make a difference through one of our active ministries. 
            Everyone has a gift - find where yours can be used for God's glory.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : ministries.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Ministries Yet</h3>
              <p className="text-muted-foreground">Check back soon for available ministries to join.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministries.map((ministry) => {
                const IconComponent = getIcon(ministry.icon);
                return (
                  <Card
                    key={ministry.id}
                    className="p-6 hover:shadow-xl transition-all duration-300 group border-border bg-card hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <IconComponent className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                          {ministry.name}
                        </h3>
                        {ministry.leader_name && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <User className="w-3 h-3" />
                            <span>Led by {ministry.leader_name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {ministry.description}
                    </p>
                    
                    {ministry.meeting_schedule && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 bg-muted/50 p-2 rounded-lg">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{ministry.meeting_schedule}</span>
                      </div>
                    )}
                    
                    <a
                      href={ministry.joining_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Join This Ministry
                      </Button>
                    </a>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We'd love to help you find the perfect ministry based on your gifts and interests.
          </p>
          <a href="https://wa.me/254704021286?text=Hi%2C%20I%20want%20to%20learn%20more%20about%20joining%20a%20ministry" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Talk to a Leader
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ministries;
