import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen, Loader2, Clock, Tag } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <Header />
        <main className="flex items-center justify-center py-32">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading stories...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      <main>
        {/* Hero Section - Enhanced */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-purple-600">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Faith Stories & Testimonies</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Stories of <span className="text-yellow-300">Transformation</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Discover how God is moving at MKU CU through real stories of faith, hope, and redemption
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  <span>{blogPosts.length} Stories</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  <span>{categories.length - 1} Categories</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar - Modern Design */}
        <div className="sticky top-[56px] md:top-[72px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm font-medium text-slate-600 whitespace-nowrap hidden md:block">Filter:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-102"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post - Premium Design */}
        {filteredPosts.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">Featured Story</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
              </div>
              
              <div className="max-w-6xl mx-auto">
                <Link to={`/blog/${filteredPosts[0]?.slug}`}>
                  <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-white">
                    <div className="grid md:grid-cols-5 gap-0">
                      <div className="md:col-span-3 aspect-video md:aspect-auto md:h-full overflow-hidden relative">
                        <img
                          src={filteredPosts[0]?.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1200&q=80"}
                          alt={filteredPosts[0]?.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
                        {filteredPosts[0]?.category && (
                          <Badge className="absolute top-4 left-4 bg-white text-primary border-0 text-xs font-semibold shadow-lg">
                            {filteredPosts[0].category}
                          </Badge>
                        )}
                      </div>
                      <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                        <div className="mb-4">
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                            ⭐ FEATURED
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-slate-900 group-hover:text-primary transition-colors leading-tight">
                          {filteredPosts[0]?.title}
                        </h2>
                        <p className="text-base text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                          {filteredPosts[0]?.excerpt}
                        </p>
                        {filteredPosts[0]?.published_at && (
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span>
                                {new Date(filteredPosts[0].published_at).toLocaleDateString('en-US', { 
                                  month: 'long', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        )}
                        <Button className="w-fit group/btn">
                          Read Full Story 
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid - Enhanced Layout */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">
                    {selectedCategory === "All" ? "All Stories" : selectedCategory}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
                  <Tag className="w-4 h-4" />
                  <span className="font-medium">{filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}</span>
                </div>
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredPosts.slice(1).map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-500 h-full flex flex-col border-0 shadow-md bg-white hover:-translate-y-2">
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img
                            src={post.featured_image || "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=800&q=80"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          {post.category && (
                            <Badge className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-700 border-0 text-xs font-semibold shadow-lg">
                              {post.category}
                            </Badge>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
                            {post.excerpt}
                          </p>
                          {post.published_at && (
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>
                                  {new Date(post.published_at).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                          )}
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No stories found</h3>
                  <p className="text-slate-600">Try selecting a different category to explore more stories.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
                <BookOpen className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Share Your Testimony
              </h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl mx-auto">
                Has God done something amazing in your life? We'd love to hear and share your story with our community.
              </p>
              <a href="https://wa.me/254115475543?text=I%20want%20to%20share%20my%20testimony" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 shadow-xl font-semibold">
                  Share Your Story
                  <ArrowRight className="w-5 h-5 ml-2" />
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
