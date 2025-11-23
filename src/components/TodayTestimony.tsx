import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const todayTestimony = {
  name: "Faith Mwangi",
  role: "Computer Science Student, 3rd Year",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  testimony: "I came to MKU CU feeling lost and without direction in my spiritual life. Through the Home Fellowships and mentorship programs, I found a family that genuinely cared about my growth. The teachings on living the knowledge of God transformed how I view my relationship with Christ. Today, I lead a Bible study group and I've seen God use me to reach other students. MKU CU didn't just change my university experience – it changed my life forever.",
  date: "December 2024",
  title: "From Lost to Leading: A Journey of Faith"
};

export const TodayTestimony = () => {
  return (
    <section className="py-12 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-crimson/10 text-crimson px-4 py-2 rounded-full mb-4">
              <Quote className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">Today's Testimony</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Life Transformation Story
            </h2>
            <p className="text-base md:text-xl text-muted-foreground">
              Real stories of God's work in the lives of MKU students
            </p>
          </div>

          {/* Featured Testimony */}
          <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image Section */}
              <div className="md:col-span-2 aspect-square md:aspect-auto">
                <div className="relative h-full">
                  <img
                    src={todayTestimony.image}
                    alt={todayTestimony.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent md:bg-gradient-to-r" />
                  <div className="absolute bottom-6 left-6 md:bottom-auto md:top-6 text-white">
                    <Quote className="w-12 h-12 text-gold mb-2" />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="md:col-span-3 p-6 md:p-10">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                    {todayTestimony.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{todayTestimony.name}</span>
                    <span>•</span>
                    <span>{todayTestimony.role}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    {todayTestimony.testimony}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/blog">
                    <Button className="bg-navy hover:bg-navy-light w-full sm:w-auto">
                      Read More Testimonies
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <a 
                    href="https://wa.me/254115475543?text=I%20would%20like%20to%20share%20my%20testimony%20with%20MKU%20CU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full sm:w-auto">
                      Share Your Story
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-muted-foreground mt-6 italic">
                  Member since {todayTestimony.date}
                </p>
              </div>
            </div>
          </Card>

          {/* CTA Banner */}
          <div className="mt-8 text-center">
            <p className="text-sm md:text-base text-muted-foreground">
              Has God done something amazing in your life? We'd love to hear your story!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
