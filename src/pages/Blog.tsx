import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen, Loader2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  featured_image: string | null;
  published_at: string | null;
  slug: string;
  tags: string[] | null;
}

const categories = [
  "All",
  "Testimonies",
  "Teaching",
  "Devotional",
  "Campus Life",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    return selectedCategory === "All" || post.category === selectedCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Loading stories...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Featured Post Background */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={filteredPosts[0]?.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1600&q=80"}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4 border border-white/20">
                  <BookOpen className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-medium text-white">Blog</span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
                  Stories of Transformation
                </h1>
                <p className="text-base md:text-lg text-white/90 max-w-2xl">
                  Real stories of faith and how God is moving at MKU CU
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories - Horizontal Scroll */}
        <section className="sticky top-[56px] md:top-[72px] z-40 bg-background/95 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post Card */}
        {filteredPosts.length > 0 && (
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <Link to={`/blog/${filteredPosts[0]?.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden">
                      <img
                        src={filteredPosts[0]?.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=800&q=80"}
                        alt={filteredPosts[0]?.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {filteredPosts[0]?.category && (
                        <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm">
                          {filteredPosts[0].category}
                        </Badge>
                      )}
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <span className="text-xs font-medium text-primary mb-3">Featured Story</span>
                      <h2 className="text-xl md:text-2xl font-bold mb-3 hover:text-primary transition-colors">
                        {filteredPosts[0]?.title}
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
                        {filteredPosts[0]?.excerpt}
                      </p>
                      {filteredPosts[0]?.published_at && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(filteredPosts[0].published_at).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      )}
                      <Button variant="outline" size="sm" className="w-fit">
                        Read More <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold">
                  {selectedCategory === "All" ? "Latest Stories" : selectedCategory}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                </span>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.slice(1).map((post, index) => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.slug}`}
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={post.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=600&q=80"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {post.category && (
                            <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm">
                              {post.category}
                            </Badge>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-base md:text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                            {post.excerpt}
                          </p>
                          {post.published_at && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>
                                {new Date(post.published_at).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">No stories found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try selecting a different category
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Share Your Testimony
              </h2>
              <p className="text-muted-foreground mb-6">
                Has God done something amazing in your life? We'd love to hear and share your story.
              </p>
              <a href="https://wa.me/254115475543?text=I%20want%20to%20share%20my%20testimony" target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  Share Your Story <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
