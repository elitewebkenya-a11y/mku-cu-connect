import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Calendar, Youtube, Loader2, Video, TrendingUp, Clock, Music, BookOpen } from "lucide-react";
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
  const featuredSermons = sermons.filter(s => s.is_featured);

  const SermonCard = ({ sermon, featured = false }: { sermon: Sermon; featured?: boolean }) => {
    const isPlaying = playingId === sermon.id;
    
    return (
      <Card className={`overflow-hidden group hover:shadow-2xl transition-all duration-500 bg-card border hover:border-primary/50 ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
        <div className={`relative ${featured ? 'aspect-[16/7]' : 'aspect-video'} overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800`}>
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
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${sermon.youtube_id}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              <button
                onClick={() => setPlayingId(sermon.id)}
                className="absolute inset-0 flex items-center justify-center group/play"
              >
                <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transform group-hover/play:scale-110 transition-transform shadow-2xl ring-4 ring-white/20">
                  <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </button>
              
              <div className="absolute top-3 left-3 flex gap-2">
                {sermon.is_featured && (
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    Featured
                  </div>
                )}
                <div className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Youtube className="w-3 h-3" />
                  Video
                </div>
              </div>

              {sermon.sermon_date && (
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {new Date(sermon.sermon_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              )}
            </>
          )}
        </div>
        <div className={`${featured ? 'p-6' : 'p-5'}`}>
          <h3 className={`font-bold ${featured ? 'text-xl mb-3' : 'text-base mb-2'} text-foreground group-hover:text-primary transition-colors line-clamp-2`}>
            {sermon.title}
          </h3>
          {sermon.speaker && (
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              {sermon.speaker}
            </p>
          )}
          {sermon.description && featured && (
            <p className="text-sm text-muted-foreground/80 line-clamp-2 mt-3">
              {sermon.description}
            </p>
          )}
        </div>
      </Card>
    );
  };

  const EmptyState = ({ icon: Icon, title }: { icon: any; title: string }) => (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Icon className="w-10 h-10 text-muted-foreground/50" />
      </div>
      <p className="text-base font-medium text-muted-foreground">{title}</p>
      <p className="text-sm text-muted-foreground/70 mt-2">Check back soon for new content</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Church Appropriate */}
        <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <Video className="w-4 h-4" />
                <span className="text-sm font-medium">Sermons & Teachings</span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight text-white">
                Media Library
              </h1>

              <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
                Watch sermons, worship sessions, and teachings from MKU Christian Union
              </p>

              {/* CTA Button */}
              <a href="https://youtube.com/@mkucu" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white gap-2 shadow-lg">
                  <Youtube className="w-5 h-5" />
                  Subscribe on YouTube
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        {featuredSermons.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-serif font-bold text-foreground">Featured Content</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredSermons.slice(0, 2).map((sermon) => (
                    <SermonCard key={sermon.id} sermon={sermon} featured />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Media Content with Tabs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-sm text-muted-foreground">Loading amazing content...</p>
              </div>
            ) : sermons.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <Video className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <h2 className="text-2xl font-bold mb-3">No Videos Yet</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Our media library is coming soon. Check back later for sermons, worship sessions, and more!
                </p>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full max-w-3xl mx-auto flex flex-wrap justify-center gap-2 mb-12 h-auto bg-transparent p-0">
                    <TabsTrigger 
                      value="all" 
                      className="px-4 py-2 text-sm bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                    >
                      All Videos
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sermons" 
                      className="px-4 py-2 text-sm bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                    >
                      Sermons
                    </TabsTrigger>
                    <TabsTrigger 
                      value="bible-study" 
                      className="px-4 py-2 text-sm bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                    >
                      Bible Study
                    </TabsTrigger>
                    <TabsTrigger 
                      value="worship" 
                      className="px-4 py-2 text-sm bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                    >
                      Worship
                    </TabsTrigger>
                    <TabsTrigger 
                      value="testimony" 
                      className="px-4 py-2 text-sm bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                    >
                      Testimony
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sermons.map((sermon) => (
                        <SermonCard key={sermon.id} sermon={sermon} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="sermons">
                    {sundaySermons.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sundaySermons.map((sermon) => (
                          <SermonCard key={sermon.id} sermon={sermon} />
                        ))}
                      </div>
                    ) : <EmptyState icon={BookOpen} title="No sermons available yet" />}
                  </TabsContent>

                  <TabsContent value="bible-study">
                    {bibleStudies.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bibleStudies.map((sermon) => (
                          <SermonCard key={sermon.id} sermon={sermon} />
                        ))}
                      </div>
                    ) : <EmptyState icon={BookOpen} title="No Bible studies available yet" />}
                  </TabsContent>

                  <TabsContent value="worship">
                    {worship.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {worship.map((sermon) => (
                          <SermonCard key={sermon.id} sermon={sermon} />
                        ))}
                      </div>
                    ) : <EmptyState icon={Music} title="No worship videos available yet" />}
                  </TabsContent>

                  <TabsContent value="testimony">
                    {testimonies.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonies.map((sermon) => (
                          <SermonCard key={sermon.id} sermon={sermon} />
                        ))}
                      </div>
                    ) : <EmptyState icon={Video} title="No testimonies available yet" />}
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
