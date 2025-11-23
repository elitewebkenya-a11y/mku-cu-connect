import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Calendar, Eye, Youtube } from "lucide-react";

const sermons = [
  {
    title: "Living the Knowledge of God",
    speaker: "Rev. John Kamau",
    date: "December 8, 2024",
    views: "1.2K",
    thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    duration: "45:30",
  },
  {
    title: "Faith in Action",
    speaker: "Pastor Grace Wanjiru",
    date: "December 1, 2024",
    views: "980",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    duration: "38:15",
  },
  {
    title: "The Power of Prayer",
    speaker: "Rev. David Omondi",
    date: "November 24, 2024",
    views: "1.5K",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    duration: "42:20",
  },
  {
    title: "Walking in Love",
    speaker: "Pastor Sarah Akinyi",
    date: "November 17, 2024",
    views: "890",
    thumbnail: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
    duration: "40:45",
  },
];

const testimonies = [
  {
    title: "From Darkness to Light",
    person: "James Mwangi",
    date: "December 5, 2024",
    thumbnail: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=800&q=80",
    duration: "8:30",
  },
  {
    title: "God's Healing Power",
    person: "Mary Njeri",
    date: "November 28, 2024",
    thumbnail: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
    duration: "12:15",
  },
];

const worship = [
  {
    title: "Holy Spirit Move",
    artist: "MKU CU Worship Team",
    date: "December 8, 2024",
    thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    duration: "6:45",
  },
  {
    title: "Jesus My Savior",
    artist: "MKU CU Worship Team",
    date: "December 1, 2024",
    thumbnail: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=800&q=80",
    duration: "5:20",
  },
];

const Media = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
                Media Library
              </h1>
              <p className="text-xl text-gold-light mb-8 animate-fade-in-up">
                Watch sermons, testimonies, and worship sessions anytime, anywhere
              </p>
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy">
                <Youtube className="w-5 h-5 mr-2" />
                Subscribe on YouTube
              </Button>
            </div>
          </div>
        </section>

        {/* Media Tabs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <Tabs defaultValue="sermons" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                  <TabsTrigger value="sermons">Sermons</TabsTrigger>
                  <TabsTrigger value="testimonies">Testimonies</TabsTrigger>
                  <TabsTrigger value="worship">Worship</TabsTrigger>
                </TabsList>

                {/* Sermons Tab */}
                <TabsContent value="sermons">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sermons.map((sermon, index) => (
                      <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={sermon.thumbnail}
                            alt={sermon.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-16 h-16 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                            {sermon.duration}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-navy-light transition-colors">
                            {sermon.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">{sermon.speaker}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{sermon.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              <span>{sermon.views}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Testimonies Tab */}
                <TabsContent value="testimonies">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonies.map((testimony, index) => (
                      <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={testimony.thumbnail}
                            alt={testimony.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-16 h-16 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                            {testimony.duration}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{testimony.title}</h3>
                          <p className="text-muted-foreground mb-2">{testimony.person}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{testimony.date}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Worship Tab */}
                <TabsContent value="worship">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {worship.map((song, index) => (
                      <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={song.thumbnail}
                            alt={song.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-16 h-16 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded">
                            {song.duration}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{song.title}</h3>
                          <p className="text-muted-foreground mb-2">{song.artist}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{song.date}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Media;
