import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const testimonies = [
  {
    id: "gods-faithfulness-through-challenges",
    text: "God transformed my life at MKU CU. I came as a lost student but found purpose and family here. The fellowship and teachings helped me discover my calling.",
    author: "Sarah Njeri",
    details: "3rd Year, Business",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "testimony-addiction-freedom",
    text: "I was struggling with addiction and felt hopeless. Through prayer, counseling, and the unwavering support of this community, I found freedom in Christ.",
    author: "Mark Otieno",
    details: "4th Year, Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "finding-purpose",
    text: "MKU CU showed me that faith isn't just about Sunday services. It's about living out God's love daily. This community changed everything for me.",
    author: "Faith Mwangi",
    details: "2nd Year, Education",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "prayer-answered",
    text: "Through the prayers of this fellowship, I've seen God answer impossible prayers. From financial breakthroughs to academic success, He's been faithful.",
    author: "David Omondi",
    details: "3rd Year, IT",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "campus-transformation",
    text: "I came to MKU broken and confused. The love and acceptance I found here helped me rebuild my life on Christ's foundation. Forever grateful.",
    author: "Grace Wanjiru",
    details: "4th Year, Nursing",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80"
  }
];

export const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonies.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonies.length) % testimonies.length);
    setIsAutoPlaying(false);
  };

  const getVisibleTestimonies = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonies[(currentIndex + i) % testimonies.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Recent Testimonies
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear how God is moving at MKU CU
            </p>
          </div>

          {/* Desktop View - 3 Cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-8">
            {getVisibleTestimonies().map((testimony, index) => (
              <Card 
                key={`${testimony.id}-${index}`}
                className="p-6 bg-white hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <Quote className="w-12 h-12 text-gold mb-4" />
                <p className="text-muted-foreground mb-6 flex-grow line-clamp-4 italic">
                  "{testimony.text}"
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimony.image} 
                    alt={testimony.author}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-navy">{testimony.author}</p>
                    <p className="text-sm text-muted-foreground">{testimony.details}</p>
                  </div>
                </div>
                <Link to={`/blog/${testimony.id}`}>
                  <Button variant="link" className="p-0 text-navy-light">
                    Read Full Story →
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          {/* Mobile/Tablet View - 1 Card */}
          <div className="lg:hidden mb-8">
            <Card className="p-6 bg-white shadow-xl flex flex-col">
              <Quote className="w-12 h-12 text-gold mb-4" />
              <p className="text-muted-foreground mb-6 italic text-lg">
                "{testimonies[currentIndex].text}"
              </p>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={testimonies[currentIndex].image} 
                  alt={testimonies[currentIndex].author}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-navy">{testimonies[currentIndex].author}</p>
                  <p className="text-sm text-muted-foreground">{testimonies[currentIndex].details}</p>
                </div>
              </div>
              <Link to={`/blog/${testimonies[currentIndex].id}`}>
                <Button variant="link" className="p-0 text-navy-light">
                  Read Full Story →
                </Button>
              </Link>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full hover:bg-navy hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-navy w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full hover:bg-navy hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
