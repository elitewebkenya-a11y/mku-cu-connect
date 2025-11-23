import { useEffect, useRef, useState } from "react";
import { Users, Award, School, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Active Members",
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
  {
    icon: Award,
    value: 46,
    suffix: "",
    label: "Years Active",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
  {
    icon: School,
    value: 20,
    suffix: "+",
    label: "Schools Reached",
    color: "text-navy-light",
    bgColor: "bg-navy-light/10",
  },
  {
    icon: Sparkles,
    value: 1000,
    suffix: "+",
    label: "Salvations",
    color: "text-crimson",
    bgColor: "bg-crimson/10",
  },
];

export const EnhancedStatsCounter = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-background via-muted/30 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <StatCard 
                key={index} 
                {...stat} 
                shouldAnimate={hasAnimated}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
  bgColor: string;
  shouldAnimate: boolean;
  delay: number;
}

const StatCard = ({ 
  icon: Icon, 
  value, 
  suffix, 
  label, 
  color, 
  bgColor,
  shouldAnimate,
  delay 
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [shouldAnimate, value, delay]);

  return (
    <Card className="p-4 md:p-6 lg:p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-card border-border/50">
      <div className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${color}`} />
      </div>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 md:mb-2 font-serif">
        {displayValue}{suffix}
      </div>
      <p className="text-xs md:text-sm lg:text-base text-muted-foreground font-medium">
        {label}
      </p>
    </Card>
  );
};
