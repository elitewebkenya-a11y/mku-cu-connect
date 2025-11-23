import { Youtube, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sermons = [
  {
    title: "Living in the Knowledge of God",
    speaker: "Pst. Dennis Mutwiri",
    date: "Nov 24, 2025",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    duration: "45:23",
  },
  {
    title: "Walking in Faith and Purpose",
    speaker: "Rev. Sarah Kamau",
    date: "Nov 17, 2025",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    duration: "38:15",
  },
  {
    title: "The Power of Prayer",
    speaker: "Pst. John Omondi",
    date: "Nov 10, 2025",
    thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    duration: "42:50",
  },
];

export const LatestSermons = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-crimson/10 text-crimson px-3 py-2 md:px-4 rounded-full mb-3 md:mb-4">
            <Youtube className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-semibold">Latest from MKU CU</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
            Watch & Be Blessed
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Catch up on recent messages and testimonies from our services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {sermons.map((sermon, index) => (
            <a 
              key={index}
              href="https://www.youtube.com/live/2nKqPUZFPCE?si=aS38jGEpbkIwBpHc" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Card
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden min-h-[200px]">
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-48 md:h-56 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-crimson rounded-full flex items-center justify-center">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
                    {sermon.duration}
                  </div>
                </div>
                
                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1">{sermon.speaker}</p>
                  <p className="text-xs text-muted-foreground">{sermon.date}</p>
                </div>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12 space-y-3 md:space-y-4">
          <a href="https://www.youtube.com/live/2nKqPUZFPCE?si=aS38jGEpbkIwBpHc" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-crimson hover:bg-crimson/90 text-white text-sm md:text-base w-full md:w-auto">
              <Youtube className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Visit Our YouTube Channel
            </Button>
          </a>
          <p className="text-xs md:text-sm text-muted-foreground">
            Subscribe to never miss a message
          </p>
        </div>
      </div>
    </section>
  );
};
