import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  author_id: string | null;
  category: string | null;
  featured_image: string | null;
  published_at: string | null;
  slug: string;
  tags: string[] | null;
  is_published: boolean | null;
}

const categories = [
  "All Posts",
  "Testimonies",
  "Teaching",
  "Mission Reports",
  "Campus Life",
  "Devotional",
  "General"
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");
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
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.excerpt?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">Loading blog posts...</div>
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
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 md:mb-6 animate-fade-in-up">
                Blog & Testimonies
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 animate-fade-in-up">
                Stories of faith, transformation, and God's work at MKU CU
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar - Sticky */}
        <div className="sticky top-[72px] z-40 bg-background shadow-md border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="max-w-6xl mx-auto">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-primary/10"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <section className="py-12 bg-muted">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <Link to={`/blog/${filteredPosts[0]?.slug}`}>
                  <Card className="overflow-hidden grid md:grid-cols-2 gap-0 hover:shadow-xl transition-shadow">
                    <div className="aspect-video md:aspect-auto overflow-hidden">
                      <img
                        src={filteredPosts[0]?.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1200&q=80"}
                        alt={filteredPosts[0]?.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      {filteredPosts[0]?.category && (
                        <Badge className="w-fit mb-4 bg-secondary text-secondary-foreground">{filteredPosts[0].category}</Badge>
                      )}
                      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 line-clamp-2">
                        {filteredPosts[0]?.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 line-clamp-3">{filteredPosts[0]?.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-6">
                        {filteredPosts[0]?.published_at && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(filteredPosts[0].published_at).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button className="w-fit bg-primary hover:bg-primary/90 text-primary-foreground">
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 md:mb-12">
                {selectedCategory === "All Posts" ? "Latest Articles" : selectedCategory}
              </h2>
              
              {filteredPosts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredPosts.slice(1).map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1200&q=80"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          {post.category && (
                            <Badge className="mb-3 bg-primary text-primary-foreground w-fit">{post.category}</Badge>
                          )}
                          <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground mb-4">
                            {post.published_at && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
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
                          <Button variant="link" className="p-0 text-primary w-fit">
                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No posts found matching your criteria.</p>
                </div>
              )}

              {/* Pagination */}
              {filteredPosts.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button className="bg-primary text-primary-foreground">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <span className="text-muted-foreground">...</span>
                  <Button variant="outline">10</Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonies Slider */}
        <TestimonialsSlider />

        {/* Newsletter CTA */}
        <section className="py-16 md:py-20 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4 md:mb-6">
                Stay Updated
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
                Subscribe to receive the latest articles, updates, and devotionals delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-border focus:border-primary"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
