import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedSection } from "@/components/AnimatedSection";

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
  "All Posts",
  "Testimonies",
  "Teaching",
  "Devotional",
  "Campus Life",
  "General"
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
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
    return selectedCategory === "All Posts" || post.category === selectedCategory;
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
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary via-primary/90 to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-4">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Testimonies & Stories</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                Faith Stories
              </h1>
              <p className="text-sm md:text-base text-primary-foreground/80">
                Discover how God is transforming lives at MKU CU
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <div className="sticky top-[72px] z-40 bg-background shadow-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10"
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
          <AnimatedSection animation="fade-up">
            <section className="py-8 bg-muted/50">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <Link to={`/blog/${filteredPosts[0]?.slug}`}>
                    <Card className="overflow-hidden grid md:grid-cols-2 gap-0 hover:shadow-lg transition-shadow">
                      <div className="aspect-video md:aspect-auto overflow-hidden">
                        <img
                          src={filteredPosts[0]?.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=800&q=80"}
                          alt={filteredPosts[0]?.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col justify-center">
                        {filteredPosts[0]?.category && (
                          <Badge className="w-fit mb-3 bg-secondary text-secondary-foreground text-xs">{filteredPosts[0].category}</Badge>
                        )}
                        <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 line-clamp-2 text-foreground">
                          {filteredPosts[0]?.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{filteredPosts[0]?.excerpt}</p>
                        {filteredPosts[0]?.published_at && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(filteredPosts[0].published_at).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        )}
                        <Button size="sm" className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground">
                          Read Story <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}

        {/* Blog Posts Grid */}
        <AnimatedSection animation="scale">
          <section className="py-10">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 text-foreground">
                  {selectedCategory === "All Posts" ? "All Stories" : selectedCategory}
                </h2>
                
                {filteredPosts.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPosts.slice(1).map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`}>
                        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=600&q=80"}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            {post.category && (
                              <Badge className="mb-2 bg-primary text-primary-foreground w-fit text-xs">{post.category}</Badge>
                            )}
                            <h3 className="text-sm font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-grow">{post.excerpt}</p>
                            {post.published_at && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
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
                  <div className="text-center py-10">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No stories found in this category.</p>
                  </div>
                )}

                {/* Pagination */}
                {filteredPosts.length > 6 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground h-8">1</Button>
                    <Button variant="outline" size="sm" className="h-8">2</Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* CTA */}
        <section className="py-10 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3">
                Share Your Testimony
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Has God done something amazing in your life? We'd love to hear your story.
              </p>
              <a href="https://wa.me/254115475543?text=I%20want%20to%20share%20my%20testimony" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
