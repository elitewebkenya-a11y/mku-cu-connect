import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Heart, Target, Award, BookOpen, Globe } from "lucide-react";
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-28 bg-gradient-to-br from-primary via-primary/90 to-primary rounded-b-3xl shadow-lg">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6 animate-fade-in-up drop-shadow-md">
                About MKU Christian Union
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 animate-fade-in-up">
                Living the Knowledge of God since our founding
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <AnimatedSection animation="fade-up">
          <section className="py-24">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-14 text-foreground">
                  Our Story
                </h2>
                <div className="prose prose-lg max-w-none mx-auto">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Mount Kenya University Christian Union is a vibrant community of students committed to living out the knowledge of God on campus and beyond.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Our journey began with a small group of passionate believers desiring a space where faith thrives in the academic environment.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We continue to grow into a movement that nurtures spiritual growth and empowers students for lifelong kingdom impact.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Mission & Values Grid */}
        <AnimatedSection animation="scale">
          <section className="py-24 bg-muted/40 rounded-3xl">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-6xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  <Card className="p-8 text-center bg-card rounded-2xl shadow-md hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-5 shadow">
                      <Target className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-card-foreground">Our Vision</h3>
                    <p className="text-muted-foreground">
                      Living as True Disciples of Jesus Christ, transforming our campus and communities.
                    </p>
                  </Card>

                  <Card className="p-8 text-center bg-card rounded-2xl shadow-md hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-5 shadow">
                      <Heart className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-card-foreground">Our Mission</h3>
                    <p className="text-muted-foreground">
                      Nurturing belief in Christ and developing Christ-like character through discipleship.
                    </p>
                  </Card>

                  <Card className="p-8 text-center bg-card rounded-2xl shadow-md hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-5 shadow">
                      <Award className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-4 text-card-foreground">Our Impact</h3>
                    <p className="text-muted-foreground">
                      500+ active members, 1000+ lives touched through evangelism and missions.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Leadership Team */}
        <AnimatedSection animation="fade-up">
          <section className="py-24">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">Our Leadership Team</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Servant leaders committed to guiding MKU CU with wisdom and grace
                  </p>
                </div>

                {loading ? (
                  <div className="text-center">Loading leaders...</div>
                ) : displayLeaders ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {displayLeaders.map((leader) => (
                      <Card key={leader.id} className="overflow-hidden group hover:shadow-xl rounded-2xl transition-all bg-card">
                        <div className="aspect-square overflow-hidden rounded-t-2xl">
                          <img
                            src={leader.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"}
                            alt={leader.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 text-center">
                          <h3 className="font-bold text-lg mb-1 text-card-foreground">{leader.name}</h3>
                          <p className="text-muted-foreground text-sm">{leader.position}</p>
                          {leader.bio && (
                            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{leader.bio}</p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {defaultLeaders.map((leader, index) => (
                      <Card key={index} className="overflow-hidden group hover:shadow-xl rounded-2xl transition-all bg-card">
                        <div className="aspect-square overflow-hidden rounded-t-2xl">
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 text-center">
                          <h3 className="font-bold text-lg mb-1 text-card-foreground">{leader.name}</h3>
                          <p className="text-muted-foreground text-sm">{leader.role}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* What We Believe */}
        <AnimatedSection animation="slide-left">
          <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-primary text-primary-foreground rounded-t-3xl">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-14">What We Believe</h2>

                <div className="grid sm:grid-cols-2 gap-10">
                  <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl shadow-lg">
                    <BookOpen className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-white">The Bible</h3>
                    <p className="text-white/80">
                      We believe the Bible is God's inspired Word, our final authority for faith and practice.
                    </p>
                  </Card>

                  <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl shadow-lg">
                    <Heart className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-white">Salvation</h3>
                    <p className="text-white/80">
                      Salvation is found only through faith in Jesus Christ and His finished work on the cross.
                    </p>
                  </Card>

                  <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl shadow-lg">
                    <Users className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-white">Community</h3>
                    <p className="text-white/80">
                      We are called to live in authentic Christian community, supporting one another.
                    </p>
                  </Card>

                  <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl shadow-lg">
                    <Globe className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-2xl font-bold mb-3 text-white">The Great Commission</h3>
                    <p className="text-white/80">
                      We are commissioned to make disciples of all nations, sharing the Gospel boldly.
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
