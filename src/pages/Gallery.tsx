import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, X, ChevronLeft, ChevronRight, Play, Loader2, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: string;
  category: string | null;
  is_featured: boolean | null;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from("media_gallery")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", ...new Set(items.map(item => item.category || "Other"))];
  const filteredItems = filter === "all" ? items : items.filter(item => item.category === filter);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const nextImage = () => {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % filteredItems.length);
  };
  const prevImage = () => {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, filteredItems.length]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80"
              alt="Gallery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30" />
          </div>
          <div className="container mx-auto px-4 relative z-10 pb-10 md:pb-14">
            <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Camera className="w-4 h-4" /> Photo Gallery
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3">
              Moments of Faith
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl">
              Capturing the joy, worship, and community that make MKU CU special
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-4 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap capitalize transition-all flex-shrink-0 ${
                    filter === cat
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-foreground hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="columns-2 md:columns-3 lg:columns-4 gap-3 max-w-7xl mx-auto">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="break-inside-avoid mb-3 group cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <Card className="overflow-hidden">
                      <div className="relative">
                        {item.media_type === "video" ? (
                          <div className="aspect-video bg-muted flex items-center justify-center">
                            <Play className="w-12 h-12 text-primary" />
                          </div>
                        ) : (
                          <img
                            src={item.media_url}
                            alt={item.title}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {item.category && (
                          <Badge className="absolute top-2 right-2 text-xs bg-black/60 backdrop-blur-sm text-white border-0">
                            {item.category}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Image className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No gallery items yet</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Photos will appear here once uploaded</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {selectedIndex !== null && filteredItems[selectedIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
            >
              <X className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            <div className="max-w-4xl max-h-[85vh] px-4 sm:px-12" onClick={(e) => e.stopPropagation()}>
              <img
                src={filteredItems[selectedIndex].media_url}
                alt={filteredItems[selectedIndex].title}
                className="max-w-full max-h-[75vh] object-contain mx-auto rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="text-white text-lg font-semibold">{filteredItems[selectedIndex].title}</h3>
                {filteredItems[selectedIndex].description && (
                  <p className="text-white/60 mt-1 text-sm">{filteredItems[selectedIndex].description}</p>
                )}
                <p className="text-white/40 text-xs mt-2">{selectedIndex + 1} / {filteredItems.length}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
