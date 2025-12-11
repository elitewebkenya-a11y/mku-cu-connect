import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen, Loader2, User } from "lucide-react";
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
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section - Compact */}
        <section className="py-10 md:py-14 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full mb-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-medium">Faith Stories & Testimonies</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                Stories of Transformation
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Discover how God is moving at MKU CU through real stories of faith
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar - Sticky */}
        <div className="sticky top-[56px] md:top-[72px] z-40 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-2.5">
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <section className="py-6 md:py-8 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <Link to={`/blog/${filteredPosts[0]?.slug}`}>
                  <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                        <img
                          src={filteredPosts[0]?.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=800&q=80"}
                          alt={filteredPosts[0]?.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 md:p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                          {filteredPosts[0]?.category && (
                            <Badge className="bg-primary/10 text-primary border-0 text-xs">
                              {filteredPosts[0].category}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">Featured</span>
                        </div>
                        <h2 className="text-lg md:text-xl font-serif font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {filteredPosts[0]?.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {filteredPosts[0]?.excerpt}
                        </p>
                        {filteredPosts[0]?.published_at && (
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(filteredPosts[0].published_at).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        )}
                        <Button size="sm" className="w-fit text-xs">
                          Read Story <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-8 md:py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg md:text-xl font-serif font-bold text-foreground">
                  {selectedCategory === "All" ? "All Stories" : selectedCategory}
                </h2>
                <span className="text-xs text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
                </span>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {filteredPosts.slice(1).map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 h-full flex flex-col border-0 shadow-sm">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={post.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=600&q=80"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 md:p-4 flex flex-col flex-grow">
                          {post.category && (
                            <Badge className="mb-2 bg-muted text-muted-foreground border-0 w-fit text-[10px]">
                              {post.category}
                            </Badge>
                          )}
                          <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-1.5">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2 flex-grow hidden md:block">
                            {post.excerpt}
                          </p>
                          {post.published_at && (
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Calendar className="w-2.5 h-2.5" />
                              <span>
                                {new Date(post.published_at).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric'
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
                <div className="text-center py-12">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No stories found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center">
              <h2 className="text-lg md:text-xl font-serif font-bold text-foreground mb-2">
                Share Your Testimony
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Has God done something amazing in your life? We'd love to hear and share your story.
              </p>
              <a href="https://wa.me/254115475543?text=I%20want%20to%20share%20my%20testimony" target="_blank" rel="noopener noreferrer">
                <Button size="sm">
                  Share Your Story
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