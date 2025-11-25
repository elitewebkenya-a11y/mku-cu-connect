import { Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sermons = [
  {
    title: "Living in the Knowledge of God",
    speaker: "Pst. Dennis Mutwiri",
    date: "Nov 24, 2025",
    videoId: "2nKqPUZFPCE",
    duration: "45:23",
  },
  {
    title: "Walking in Faith and Purpose",
    speaker: "Rev. Sarah Kamau",
    date: "Nov 17, 2025",
    videoId: "2nKqPUZFPCE",
    duration: "38:15",
  },
  {
    title: "The Power of Prayer",
    speaker: "Pst. John Omondi",
    date: "Nov 10, 2025",
    videoId: "2nKqPUZFPCE",
    duration: "42:50",
  },
];

export const LatestSermons = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 md:px-4 rounded-full mb-3 md:mb-4">
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
            <Card
              key={index}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${sermon.videoId}`}
                  title={sermon.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
              
              <div className="p-4 md:p-5">
                <h3 className="font-bold text-base md:text-lg mb-2 line-clamp-2">
                  {sermon.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">{sermon.speaker}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{sermon.date}</p>
                  <p className="text-xs text-muted-foreground">{sermon.duration}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12 space-y-3 md:space-y-4">
          <a href="https://www.youtube.com/live/2nKqPUZFPCE?si=aS38jGEpbkIwBpHc" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-sm md:text-base w-full md:w-auto">
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
