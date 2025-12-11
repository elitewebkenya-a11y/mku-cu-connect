import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Calendar, Youtube, Loader2, Video } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Sermon {
  id: string;
  title: string;
  speaker: string | null;
  sermon_date: string | null;
  youtube_url: string;
  youtube_id: string;
  description: string | null;
  category: string | null;
  is_featured: boolean | null;
}

const Media = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      const { data, error } = await supabase
        .from("sermons")
        .select("*")
        .order("sermon_date", { ascending: false });

      if (error) throw error;
      setSermons(data || []);
    } catch (error) {
      console.error("Error fetching sermons:", error);
    } finally {
      setLoading(false);
    }
  };

  const sundaySermons = sermons.filter(s => s.category === "Sunday Service" || !s.category);
  const bibleStudies = sermons.filter(s => s.category === "Bible Study");
  const testimonies = sermons.filter(s => s.category === "Testimony");
  const worship = sermons.filter(s => s.category === "Worship");

  const SermonCard = ({ sermon }: { sermon: Sermon }) => {
    const isPlaying = playingId === sermon.id;
    
    return (
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-card border-0 shadow-sm">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${sermon.youtube_id}?autoplay=1`}
              title={sermon.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={`https://img.youtube.com/vi/${sermon.youtube_id}/maxresdefault.jpg`}
                alt={sermon.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${sermon.youtube_id}/hqdefault.jpg`;
                }}
              />
              <button
                onClick={() => setPlayingId(sermon.id)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </button>
              <div className="absolute top-2 left-2">
                <div className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                  <Youtube className="w-3 h-3 inline mr-1" />
                  Video
                </div>
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-sm md:text-base mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {sermon.title}
          </h3>
          {sermon.speaker && (
            <p className="text-xs text-muted-foreground mb-2">{sermon.speaker}</p>
          )}
          {sermon.sermon_date && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{new Date(sermon.sermon_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const EmptyState = () => (
    <div className="text-center py-12">
      <Video className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">No videos in this category yet.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-10 md:py-14 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full mb-3">
                <Video className="w-4 h-4" />
                <span className="text-xs font-medium">Media Library</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                Watch & Be Blessed
              </h1>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Sermons, teachings, and worship from MKU CU
              </p>
              <a href="https://youtube.com/@mkucu" target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="secondary" className="gap-2">
                  <Youtube className="w-4 h-4" />
                  Subscribe on YouTube
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Media Content */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : sermons.length === 0 ? (
              <div className="text-center py-16">
                <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h2 className="text-lg font-bold mb-2">No Videos Yet</h2>
                <p className="text-sm text-muted-foreground">Check back soon for sermons and worship videos.</p>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full max-w-lg mx-auto grid grid-cols-4 mb-8 h-auto">
                    <TabsTrigger value="all" className="text-xs py-2">All</TabsTrigger>
                    <TabsTrigger value="sermons" className="text-xs py-2">Sermons</TabsTrigger>
                    <TabsTrigger value="bible-study" className="text-xs py-2">Study</TabsTrigger>
                    <TabsTrigger value="worship" className="text-xs py-2">Worship</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                      {sermons.map((sermon) => (
                        <SermonCard key={sermon.id} sermon={sermon} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="sermons">
                    {sundaySermons.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {sundaySermons.map((sermon) => (
                          <SermonCard key={sermon.id} sermon={sermon} />
                        ))}
                      </div>
                    ) : <EmptyState />}
                  </TabsContent>

                  <TabsContent value="bible-study">
                    {bibleStudies.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {bibleStudies.map((sermon) => (
                          <SermonCard key={sermon.id} sermon={sermon} />
                        ))}
                      </div>
                    ) : <EmptyState />}
                  </TabsContent>

                  <TabsContent value="worship">
                    {worship.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {worship.map((sermon) => (
                          <SermonCard key={sermon.id} sermon={sermon} />
                        ))}
                      </div>
                    ) : <EmptyState />}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Media;