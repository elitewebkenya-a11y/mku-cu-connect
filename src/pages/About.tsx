import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Heart, Target, Award, BookOpen, Globe, Sparkles, Cross, Church } from "lucide-react";
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
        {/* Hero Section - Church-themed with peaceful imagery */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with overlay */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80" 
              alt="Church background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
          </div>
          
          {/* Soft light rays effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Decorative cross icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Cross className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Main heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight">
                MKU Christian Union
              </h1>

              {/* Tagline */}
              <p className="text-xl md:text-3xl text-white/90 mb-8 font-light tracking-wide">
                Living the Knowledge of God
              </p>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px w-16 bg-white/30"></div>
                <Church className="w-5 h-5 text-white/70" />
                <div className="h-px w-16 bg-white/30"></div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                  <div className="text-white/70 text-sm tracking-wide">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">15+</div>
                  <div className="text-white/70 text-sm tracking-wide">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">1000+</div>
                  <div className="text-white/70 text-sm tracking-wide">Lives Touched</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <AnimatedSection animation="fade-up">
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Our Story</h2>
                  <div className="h-1 w-20 bg-primary rounded-full mx-auto"></div>
                </div>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
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
        </AnimatedSection>

        {/* Mission & Values */}
        <AnimatedSection animation="scale">
          <section className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Our Foundation</h2>
                  <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-4"></div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Built on unwavering principles that guide everything we do
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Living as True Disciples of Jesus Christ, transforming our campus and communities through authentic faith.
                    </p>
                  </Card>
                  
                  <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nurturing belief in Christ and developing Christ-like character through intentional discipleship and growth.
                    </p>
                  </Card>
                  
                  <Card className="p-8 text-center hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Our Impact</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      500+ active members, 1000+ lives touched through evangelism, missions, and community transformation.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Leadership Team - Enhanced hover effect */}
        <AnimatedSection animation="fade-up">
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Our Leadership Team</h2>
                  <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-4"></div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Servant leaders committed to guiding MKU CU with wisdom and grace
                  </p>
                </div>
              
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-muted-foreground">Loading our team...</p>
                  </div>
                ) : displayLeaders ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {displayLeaders.map((leader) => (
                      <div key={leader.id} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-muted">
                          {/* Image */}
                          <img
                            src={leader.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"}
                            alt={leader.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white font-bold text-lg md:text-xl mb-1">{leader.name}</h3>
                            <p className="text-white/90 text-sm md:text-base">{leader.position}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {defaultLeaders.map((leader, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-muted">
                          {/* Image */}
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h3 className="text-white font-bold text-lg md:text-xl mb-1">{leader.name}</h3>
                            <p className="text-white/90 text-sm md:text-base">{leader.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* What We Believe */}
        <AnimatedSection animation="slide-left">
          <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">What We Believe</h2>
                  <div className="h-1 w-20 bg-white/30 rounded-full mx-auto mb-4"></div>
                  <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    Our core beliefs anchor us in truth and guide our journey of faith
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-5">
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">The Bible</h3>
                    <p className="text-white/90 leading-relaxed">
                      We believe the Bible is God's inspired Word, our final authority for faith and practice, providing guidance for every aspect of life.
                    </p>
                  </Card>
                  
                  <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-5">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Salvation</h3>
                    <p className="text-white/90 leading-relaxed">
                      Salvation is found only through faith in Jesus Christ and His finished work on the cross, offering grace and redemption to all.
                    </p>
                  </Card>
                  
                  <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-5">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Community</h3>
                    <p className="text-white/90 leading-relaxed">
                      We are called to live in authentic Christian community, supporting and encouraging one another in love and truth.
                    </p>
                  </Card>
                  
                  <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-5">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">The Great Commission</h3>
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
