import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Heart, Target, Award, BookOpen, Globe, Sparkles, Church } from "lucide-react";
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
const defaultLeaders = [{
  name: "John Kamau",
  role: "Chairperson",
  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
}, {
  name: "Grace Wanjiru",
  role: "Vice Chairperson",
  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
}, {
  name: "David Omondi",
  role: "Secretary",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
}, {
  name: "Sarah Akinyi",
  role: "Treasurer",
  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
}];
const About = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  useEffect(() => {
    fetchLeaders();
  }, []);
  const fetchLeaders = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from("leaders").select("*").eq("is_active", true).order("display_order", {
        ascending: true
      });
      if (error) throw error;
      setLeaders(data || []);
    } catch (error) {
      console.error("Error fetching leaders:", error);
    } finally {
      setLoading(false);
    }
  };
  const displayLeaders = leaders.length > 0 ? leaders : null;
  return <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Church-themed with peaceful imagery */}
        <section className="relative min-h-[50vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with overlay */}
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80" alt="Church background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
          </div>
          
          {/* Animated floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{
            animationDelay: '1s'
          }}></div>
            <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{
            animationDelay: '2s'
          }}></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{
            animationDelay: '1.5s'
          }}></div>
          </div>
          
          {/* Soft light rays effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* "About Us" label */}
              <div className="justify-start mb-8 flex flex-col">
                <div className="backdrop-blur-sm px-6 py-2 rounded-full border-white/20 bg-black/0 border-0">
                  <span className="text-white/90 text-sm md:text-base font-medium tracking-wide">About Us</span>
                </div>
              </div>

              {/* Decorative cross icon */}
              <div className="flex justify-center mb-6">
                
              </div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                MKU Christian Union
              </h1>

              {/* Tagline */}
              <p className="text-lg md:text-3xl text-white/90 mb-6 md:mb-8 font-light tracking-wide">
                Living the Knowledge of God
              </p>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 mb-6 md:mb-10">
                <div className="h-px w-12 md:w-16 bg-white/30"></div>
                <Church className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                <div className="h-px w-12 md:w-16 bg-white/30"></div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-16">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">500+</div>
                  <div className="text-white/70 text-xs md:text-sm tracking-wide">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">15+</div>
                  <div className="text-white/70 text-xs md:text-sm tracking-wide">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2">1000+</div>
                  <div className="text-white/70 text-xs md:text-sm tracking-wide">Lives Touched</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom shadow for smooth transition */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
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

        {/* Leadership Team - Hidden text until hover */}
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
              
                {loading ? <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-muted-foreground">Loading our team...</p>
                  </div> : displayLeaders ? <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {displayLeaders.map(leader => <div key={leader.id} className="group cursor-pointer" onClick={() => setSelectedLeader(leader)}>
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg hover:shadow-2xl transition-all duration-300">
                          {/* Image */}
                          <img src={leader.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"} alt={leader.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75" loading="lazy" />
                          
                          {/* Text overlay - hidden by default, shows on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                            <h3 className="text-white font-bold text-lg md:text-xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{leader.name}</h3>
                            <p className="text-white/90 text-sm md:text-base font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                              {leader.position}
                            </p>
                          </div>
                        </div>
                      </div>)}
                  </div> : <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {defaultLeaders.map((leader, index) => <div key={index} className="group cursor-pointer" onClick={() => setSelectedLeader({
                  id: String(index),
                  name: leader.name,
                  position: leader.role,
                  bio: null,
                  image_url: leader.image,
                  email: null,
                  display_order: index,
                  is_active: true
                })}>
                        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg hover:shadow-2xl transition-all duration-300">
                          {/* Image */}
                          <img src={leader.image} alt={leader.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75" loading="lazy" />
                          
                          {/* Text overlay - hidden by default, shows on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                            <h3 className="text-white font-bold text-lg md:text-xl mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{leader.name}</h3>
                            <p className="text-white/90 text-sm md:text-base font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                              {leader.role}
                            </p>
                          </div>
                        </div>
                      </div>)}
                  </div>}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* What We Believe - White background with elegant styling */}
        <AnimatedSection animation="slide-left">
          <section className="py-20 md:py-28 bg-background relative overflow-hidden border-y border-border">
            {/* Subtle decorative elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">What We Believe</h2>
                  <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-4"></div>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Our core beliefs anchor us in truth and guide our journey of faith
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                      <BookOpen className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">The Bible</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We believe the Bible is God's inspired Word, our final authority for faith and practice, providing guidance for every aspect of life.
                    </p>
                  </Card>
                  
                  <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                      <Heart className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Salvation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Salvation is found only through faith in Jesus Christ and His finished work on the cross, offering grace and redemption to all.
                    </p>
                  </Card>
                  
                  <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Community</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We are called to live in authentic Christian community, supporting and encouraging one another in love and truth.
                    </p>
                  </Card>
                  
                  <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                      <Globe className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">The Great Commission</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We are commissioned to make disciples of all nations, sharing the Gospel boldly and living out our faith daily.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Leader Modal */}
        {selectedLeader && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setSelectedLeader(null)}>
            <div className="relative max-w-2xl w-full bg-background rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
              {/* Close button */}
              <button onClick={() => setSelectedLeader(null)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image */}
              <div className="relative h-96 md:h-[500px] overflow-hidden">
                <img src={selectedLeader.image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80"} alt={selectedLeader.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{selectedLeader.name}</h2>
                <p className="text-primary text-lg md:text-xl font-medium mb-4">{selectedLeader.position}</p>
                
                {selectedLeader.bio && <p className="text-muted-foreground leading-relaxed mb-4">{selectedLeader.bio}</p>}
                
                {selectedLeader.email && <a href={`mailto:${selectedLeader.email}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {selectedLeader.email}
                  </a>}
              </div>
            </div>
          </div>}
      </main>
      <Footer />
    </div>;
};
export default About;