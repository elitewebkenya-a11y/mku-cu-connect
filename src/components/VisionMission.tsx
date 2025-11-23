import { Target, Heart, Users, BookOpen, Globe, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const values = [
  { icon: BookOpen, title: "Discipleship", description: "Growing deep in God's Word" },
  { icon: Users, title: "Evangelism", description: "Sharing Christ with boldness" },
  { icon: Globe, title: "Mission", description: "Reaching beyond our campus" },
  { icon: Heart, title: "Fellowship", description: "Building authentic community" },
  { icon: Shield, title: "Integrity", description: "Living with godly character" },
  { icon: Target, title: "Leadership", description: "Developing servant leaders" },
];

export const VisionMission = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-12 lg:mb-16">
            <Card className="p-6 md:p-8 bg-white/10 backdrop-blur-md border-white/20 text-white animate-slide-in-left">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gold rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Target className="w-7 h-7 md:w-8 md:h-8 text-navy" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Our Vision</h3>
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                Living as True Disciples of Jesus Christ, transforming our campus and communities 
                through authentic faith, sacrificial love, and unwavering commitment to the Gospel.
              </p>
            </Card>

            <Card className="p-6 md:p-8 bg-white/10 backdrop-blur-md border-white/20 text-white animate-slide-in-right">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gold rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Heart className="w-7 h-7 md:w-8 md:h-8 text-navy" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4">Our Mission</h3>
              <p className="text-base md:text-lg text-white/90 leading-relaxed">
                Nurturing belief in Christ and developing Christ-like character through discipleship, 
                evangelism, and missions - equipping students for lifelong kingdom impact.
              </p>
            </Card>
          </div>

          <div className="text-center mb-6 md:mb-8 animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 md:mb-4">Our Core Values</h3>
            <p className="text-white/80 text-base md:text-lg px-4">Guiding principles that shape everything we do</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-4 md:p-6 bg-white/10 backdrop-blur-md border-white/20 text-center hover:bg-white/20 transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-5 h-5 md:w-6 md:h-6 text-navy" />
                </div>
                <h4 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">{value.title}</h4>
                <p className="text-xs text-white/70">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
