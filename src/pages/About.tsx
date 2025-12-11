import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Heart, Target, Award, BookOpen, Globe, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";

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

const defaultLeaders = [
  { name: "John Kamau", role: "Chairperson", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
  { name: "Grace Wanjiru", role: "Vice Chairperson", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
  { name: "David Omondi", role: "Secretary", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { name: "Sarah Akinyi", role: "Treasurer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
];

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

  const displayLeaders = leaders.length > 0 ? leaders : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Enhanced with overlay pattern */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0yNCAzOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Living the Knowledge of God
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in-up tracking-tight">
                About MKU Christian Union
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-fade-in-up max-w-2xl mx-auto leading-relaxed">
                A vibrant community transforming campus life through authentic Christian fellowship
              </p>
            </div>
          </div>
        </section>

        {/* Our Story - Enhanced with side accent */}
        <AnimatedSection animation="fade-up">
          <section className="py-24 relative">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-start gap-6">
                  <div className="hidden md:block w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full"></div>
                  <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">Our Story</h2>
                    <div className="h-1 w-24 bg-primary rounded-full mb-12"></div>
                    <div className="space-y-8">
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Mount Kenya University Christian Union is a vibrant community of students committed to living 
                        out the knowledge of God on campus and beyond. Founded with a vision to transform campus life 
                        through authentic Christian fellowship, we have grown into a movement of over 500 active members.
                      </p>
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Our journey began with a small group of passionate students who wanted to create a space where 
                        faith could flourish in the academic environment. Today, we continue that legacy through weekly 
                        gatherings, discipleship programs, evangelism initiatives, and community outreach.
                      </p>
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        We believe in nurturing not just academic excellence, but also spiritual growth that prepares 
                        students for lifelong kingdom impact in their respective fields and communities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Mission & Values Grid - Enhanced cards */}
        <AnimatedSection animation="scale">
          <section className="py-24 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">Our Foundation</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Built on unwavering principles that guide everything we do
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="p-8 text-center bg-card border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Target className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-card-foreground">Our Vision</h3>
                    <div className="h-1 w-16 bg-primary/30 rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Living as True Disciples of Jesus Christ, transforming our campus and communities through authentic faith.
                    </p>
                  </Card>
                  
                  <Card className="p-8 text-center bg-card border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Heart className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-card-foreground">Our Mission</h3>
                    <div className="h-1 w-16 bg-primary/30 rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      Nurturing belief in Christ and developing Christ-like character through intentional discipleship and growth.
                    </p>
                  </Card>
                  
                  <Card className="p-8 text-center bg-card border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Award className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-card-foreground">Our Impact</h3>
                    <div className="h-1 w-16 bg-primary/30 rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      500+ active members, 1000+ lives touched through evangelism, missions, and community transformation.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Leadership Team - Enhanced with better spacing */}
        <AnimatedSection animation="fade-up">
          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">Our Leadership Team</h2>
                  <div className="h-1 w-24 bg-primary rounded-full mx-auto mb-6"></div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Servant leaders committed to guiding MKU CU with wisdom, grace, and unwavering dedication
                  </p>
                </div>
              
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-muted-foreground">Loading our amazing team...</p>
                  </div>
                ) : displayLeaders ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayLeaders.map((leader) => (
                      <Card key={leader.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-2 hover:border-primary/50">
                        <div className="aspect-square overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img
                            src={leader.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"}
                            alt={leader.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 text-center">
                          <h3 className="font-bold text-xl mb-2 text-card-foreground group-hover:text-primary transition-colors">{leader.name}</h3>
                          <p className="text-primary text-sm font-medium mb-3">{leader.position}</p>
                          {leader.bio && (
                            <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">{leader.bio}</p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {defaultLeaders.map((leader, index) => (
                      <Card key={index} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-2 hover:border-primary/50">
                        <div className="aspect-square overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 text-center">
                          <h3 className="font-bold text-xl mb-2 text-card-foreground group-hover:text-primary transition-colors">{leader.name}</h3>
                          <p className="text-primary text-sm font-medium">{leader.role}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* What We Believe - Enhanced with modern glassmorphism */}
        <AnimatedSection animation="slide-left">
          <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNk0yNCAzOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">What We Believe</h2>
                  <div className="h-1 w-24 bg-white/30 rounded-full mx-auto mb-6"></div>
                  <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    Our core beliefs anchor us in truth and guide our journey of faith
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">The Bible</h3>
                    <p className="text-white/90 leading-relaxed">
                      We believe the Bible is God's inspired Word, our final authority for faith and practice, providing guidance for every aspect of life.
                    </p>
                  </Card>
                  
                  <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Salvation</h3>
                    <p className="text-white/90 leading-relaxed">
                      Salvation is found only through faith in Jesus Christ and His finished work on the cross, offering grace and redemption to all.
                    </p>
                  </Card>
                  
                  <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Community</h3>
                    <p className="text-white/90 leading-relaxed">
                      We are called to live in authentic Christian community, supporting and encouraging one another in love and truth.
                    </p>
                  </Card>
                  
                  <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">The Great Commission</h3>
                    <p className="text-white/90 leading-relaxed">
                      We are commissioned to make disciples of all nations, sharing the Gospel boldly and living out our faith daily.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default About;
