import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, User, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";

const categories = [
  "All Posts",
  "Testimonies",
  "Teaching",
  "Mission Reports",
  "Campus Life",
  "Devotional"
];

const blogPosts = [
  {
    id: "gods-faithfulness-through-challenges",
    title: "God's Faithfulness Through My Darkest Moments",
    excerpt: "I came to MKU broken and lost, but God used this community to restore my faith and give me purpose. This is my story of transformation...",
    author: "Sarah Njeri",
    date: "November 24, 2025",
    readTime: "8 min read",
    views: 234,
    category: "Testimonies",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "walking-in-faith-during-exams",
    title: "Walking in Faith During Exams",
    excerpt: "Practical tips on maintaining your spiritual life and trusting God during the examination season. Learn how to balance academics and faith...",
    author: "Grace Wanjiru",
    date: "November 20, 2025",
    readTime: "5 min read",
    views: 189,
    category: "Campus Life",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "power-of-community-in-campus",
    title: "The Power of Community in Campus",
    excerpt: "Discover how authentic Christian fellowship can transform your university experience and strengthen your faith journey...",
    author: "John Kamau",
    date: "November 18, 2025",
    readTime: "7 min read",
    views: 312,
    category: "Teaching",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "evangelism-21st-century",
    title: "Evangelism in the 21st Century",
    excerpt: "Modern approaches to sharing the Gospel effectively with your peers and making disciples on campus in today's digital age...",
    author: "David Omondi",
    date: "November 15, 2025",
    readTime: "6 min read",
    views: 267,
    category: "Teaching",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mission-trip-turkana",
    title: "Mission Trip to Turkana: Lives Changed",
    excerpt: "Our recent mission trip to Turkana was life-changing. Read about the testimonies, challenges, and how God moved powerfully...",
    author: "Faith Mwangi",
    date: "November 10, 2025",
    readTime: "9 min read",
    views: 421,
    category: "Mission Reports",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "daily-devotion-psalms",
    title: "Finding Peace in Psalms 23",
    excerpt: "A deep dive into the shepherd's psalm and what it means for us as students navigating the challenges of university life...",
    author: "Peter Ochieng",
    date: "November 8, 2025",
    readTime: "4 min read",
    views: 178,
    category: "Devotional",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "balancing-academics-ministry",
    title: "Balancing Academics and Ministry",
    excerpt: "How to excel in your studies while actively serving in ministry and maintaining a healthy spiritual life. Practical strategies that work...",
    author: "Sarah Akinyi",
    date: "November 5, 2025",
    readTime: "8 min read",
    views: 298,
    category: "Campus Life",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "testimony-addiction-freedom",
    title: "From Addiction to Freedom in Christ",
    excerpt: "My journey from the chains of addiction to complete freedom in Jesus. How MKU CU became my support system and family...",
    author: "Mark Otieno",
    date: "November 1, 2025",
    readTime: "10 min read",
    views: 567,
    category: "Testimonies",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "prayer-foundation-of-everything",
    title: "Prayer: The Foundation of Everything",
    excerpt: "Why prayer should be your first response, not your last resort. Building a consistent prayer life that transforms everything...",
    author: "John Kamau",
    date: "October 28, 2025",
    readTime: "5 min read",
    views: 234,
    category: "Teaching",
    image: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?auto=format&fit=crop&w=1200&q=80",
  },
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 md:mb-6 animate-fade-in-up">
                Blog & Testimonies
              </h1>
              <p className="text-lg md:text-xl text-gold-light animate-fade-in-up">
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
                        ? "bg-navy text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-navy/10"
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
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Link to={`/blog/${filteredPosts[0]?.id}`}>
                <Card className="overflow-hidden grid md:grid-cols-2 gap-0 hover:shadow-xl transition-shadow">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={filteredPosts[0]?.image}
                      alt={filteredPosts[0]?.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-gold text-navy">{filteredPosts[0]?.category}</Badge>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 line-clamp-2">
                      {filteredPosts[0]?.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{filteredPosts[0]?.excerpt}</p>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{filteredPosts[0]?.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{filteredPosts[0]?.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{filteredPosts[0]?.readTime}</span>
                      </div>
                    </div>
                    <Button className="w-fit bg-navy hover:bg-navy-light">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

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
                    <Link key={post.id} to={`/blog/${post.id}`}>
                      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <Badge className="mb-3 bg-navy text-white w-fit">{post.category}</Badge>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-navy-light transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                          <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <Button variant="link" className="p-0 text-navy-light w-fit">
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
                  <Button className="bg-navy text-white">1</Button>
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
        <section className="py-16 md:py-20 bg-gradient-to-br from-gold via-gold-light to-gold">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy mb-4 md:mb-6">
                Stay Updated
              </h2>
              <p className="text-base md:text-lg text-navy/80 mb-6 md:mb-8">
                Subscribe to receive the latest articles, updates, and devotionals delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-navy/20 focus:border-navy"
                />
                <Button className="bg-navy hover:bg-navy-light text-white">
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
