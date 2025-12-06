import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface GalleryItem {
  id: string;
  media_url: string;
  title: string;
}

const fallbackImages = [
  { id: "1", media_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", title: "Sunday Worship" },
  { id: "2", media_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80", title: "Praise Night" },
  { id: "3", media_url: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80", title: "Campus Outreach" },
  { id: "4", media_url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80", title: "Bible Study" },
];

export const GalleryPreview = () => {
  const [images, setImages] = useState<GalleryItem[]>(fallbackImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase.from("media_gallery").select("id, media_url, title").limit(8);
      if (data && data.length > 0) setImages(data);
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-4">
            <Camera className="w-5 h-5" />
            <span className="text-sm font-semibold">Photo Gallery</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Moments of Faith</h2>
        </div>

        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
            {images.map((img, i) => (
              <div key={img.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentIndex ? "opacity-100" : "opacity-0"}`}>
                <img src={img.media_url} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-4 left-4 text-white text-xl font-bold">{img.title}</p>
              </div>
            ))}
            <button onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button onClick={() => setCurrentIndex((currentIndex + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link to="/gallery">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              View Full Gallery <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
