import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Users, Heart, Target, Award, BookOpen, Globe } from "lucide-react";

const leaders = [
  { name: "John Kamau", role: "Chairperson", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80" },
  { name: "Grace Wanjiru", role: "Vice Chairperson", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
  { name: "David Omondi", role: "Secretary", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
  { name: "Sarah Akinyi", role: "Treasurer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
                About MKU Christian Union
              </h1>
              <p className="text-xl text-gold-light mb-8 animate-fade-in-up">
                Living the Knowledge of God since our founding
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-center mb-12">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Mount Kenya University Christian Union is a vibrant community of students committed to living 
                  out the knowledge of God on campus and beyond. Founded with a vision to transform campus life 
                  through authentic Christian fellowship, we have grown into a movement of over 500 active members.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our journey began with a small group of passionate students who wanted to create a space where 
                  faith could flourish in the academic environment. Today, we continue that legacy through weekly 
                  gatherings, discipleship programs, evangelism initiatives, and community outreach.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe in nurturing not just academic excellence, but also spiritual growth that prepares 
                  students for lifelong kingdom impact in their respective fields and communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Grid */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    Living as True Disciples of Jesus Christ, transforming our campus and communities.
                  </p>
                </Card>
                
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    Nurturing belief in Christ and developing Christ-like character through discipleship.
                  </p>
                </Card>
                
                <Card className="p-8 text-center">
                  <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4">Our Impact</h3>
                  <p className="text-muted-foreground">
                    500+ active members, 1000+ lives touched through evangelism and missions.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif font-bold mb-4">Our Leadership Team</h2>
                <p className="text-lg text-muted-foreground">
                  Servant leaders committed to guiding MKU CU with wisdom and grace
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {leaders.map((leader, index) => (
                  <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-lg mb-1">{leader.name}</h3>
                      <p className="text-muted-foreground text-sm">{leader.role}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-center mb-12">What We Believe</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                  <BookOpen className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold mb-3">The Bible</h3>
                  <p className="text-white/80">
                    We believe the Bible is God's inspired Word, our final authority for faith and practice.
                  </p>
                </Card>
                
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                  <Heart className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold mb-3">Salvation</h3>
                  <p className="text-white/80">
                    Salvation is found only through faith in Jesus Christ and His finished work on the cross.
                  </p>
                </Card>
                
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                  <Users className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold mb-3">Community</h3>
                  <p className="text-white/80">
                    We are called to live in authentic Christian community, supporting and encouraging one another.
                  </p>
                </Card>
                
                <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                  <Globe className="w-8 h-8 text-gold mb-4" />
                  <h3 className="text-xl font-bold mb-3">The Great Commission</h3>
                  <p className="text-white/80">
                    We are commissioned to make disciples of all nations, sharing the Gospel boldly.
                  </p>
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
