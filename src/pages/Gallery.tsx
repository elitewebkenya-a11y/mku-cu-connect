import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AnimatedSection } from "@/components/AnimatedSection";

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
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    }
  };
  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <Camera className="w-5 h-5" />
                <span className="text-sm font-medium">Photo Gallery</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                Moments of Faith & Fellowship
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                Capturing the joy, worship, and community that make MKU CU special
              </p>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-8 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={filter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(cat)}
                  className="capitalize"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <AnimatedSection animation="fade-up">
          <section className="py-16">
            <div className="container mx-auto px-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse text-muted-foreground">Loading gallery...</div>
                </div>
              ) : filteredItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredItems.map((item, index) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden group cursor-pointer"
                      onClick={() => openLightbox(index)}
                    >
                      <div className="aspect-square relative">
                        {item.media_type === "video" ? (
                          <div className="w-full h-full bg-muted flex items-center justify-center">
                            <Play className="w-12 h-12 text-primary" />
                          </div>
                        ) : (
                          <img
                            src={item.media_url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {item.category && (
                          <Badge className="absolute top-2 right-2 text-xs">{item.category}</Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No gallery items yet</p>
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>

        {/* Lightbox */}
        {selectedIndex !== null && filteredItems[selectedIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-white/80 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-white/80"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <div className="max-w-4xl max-h-[80vh]">
              <img
                src={filteredItems[selectedIndex].media_url}
                alt={filteredItems[selectedIndex].title}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-semibold">{filteredItems[selectedIndex].title}</h3>
                {filteredItems[selectedIndex].description && (
                  <p className="text-white/70 mt-2">{filteredItems[selectedIndex].description}</p>
                )}
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
