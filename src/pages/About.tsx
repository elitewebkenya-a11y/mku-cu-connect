import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Heart, Target, Award, BookOpen, Globe, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Leader {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
  email: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const About = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const { data, error } = await supabase
        .from("leaders")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setLeaders(data || []);
    } catch (error) {
      console.error("Error fetching leaders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Compact */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center text-primary-foreground">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                About MKU CU
              </h1>
              <p className="text-sm md:text-base text-primary-foreground/80">
                Living the Knowledge of God on campus and beyond
              </p>
            </div>
          </div>
        </section>

        {/* Our Story - Cleaner layout */}
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-6 text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>
                  Mount Kenya University Christian Union is a vibrant community of students committed to living 
                  out the knowledge of God on campus and beyond. Founded with a vision to transform campus life 
                  through authentic Christian fellowship, we have grown into a movement of over 500 active members.
                </p>
                <p>
                  Our journey began with a small group of passionate students who wanted to create a space where 
                  faith could flourish in the academic environment. Today, we continue that legacy through weekly 
                  gatherings, discipleship programs, evangelism initiatives, and community outreach.
                </p>
                <p>
                  We believe in nurturing not just academic excellence, but also spiritual growth that prepares 
                  students for lifelong kingdom impact in their respective fields and communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Impact - Grid */}
        <section className="py-10 md:py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                <Card className="p-5 text-center bg-card border-0 shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-foreground">Our Vision</h3>
                  <p className="text-sm text-muted-foreground">
                    Living as True Disciples of Jesus Christ, transforming our campus and communities.
                  </p>
                </Card>
                
                <Card className="p-5 text-center bg-card border-0 shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-foreground">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">
                    Nurturing belief in Christ and developing Christ-like character through discipleship.
                  </p>
                </Card>
                
                <Card className="p-5 text-center bg-card border-0 shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold mb-2 text-foreground">Our Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    500+ active members, 1000+ lives touched through evangelism and missions.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team - Improved mobile layout */}
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-2">
                  <Users className="w-3 h-3" />
                  Leadership
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                  Meet Our Leaders
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Servant leaders committed to guiding MKU CU with wisdom and grace
                </p>
              </div>
            
              {loading ? (
                <div className="text-center text-sm text-muted-foreground">Loading leaders...</div>
              ) : leaders.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {leaders.map((leader) => (
                    <Card key={leader.id} className="overflow-hidden group hover:shadow-md transition-shadow bg-card border-0 shadow-sm">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={leader.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"}
                          alt={leader.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-bold text-sm text-foreground">{leader.name}</h3>
                        <p className="text-xs text-muted-foreground">{leader.position}</p>
                        {leader.email && (
                          <a href={`mailto:${leader.email}`} className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1">
                            <Mail className="w-3 h-3" />
                            Contact
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-sm text-muted-foreground py-8">
                  No leaders added yet.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* What We Believe - Cleaner */}
        <section className="py-10 md:py-14 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-8">What We Believe</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1 text-white">The Bible</h3>
                      <p className="text-sm text-white/80">
                        God's inspired Word, our final authority for faith and practice.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1 text-white">Salvation</h3>
                      <p className="text-sm text-white/80">
                        Found only through faith in Jesus Christ's finished work on the cross.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1 text-white">Community</h3>
                      <p className="text-sm text-white/80">
                        Called to live in authentic Christian community, supporting one another.
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-1 text-white">The Great Commission</h3>
                      <p className="text-sm text-white/80">
                        Commissioned to make disciples of all nations, sharing the Gospel.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;