import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CommentsSection } from "@/components/CommentsSection";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Calendar, Clock, User, Eye, Facebook, Twitter, Link as LinkIcon, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow, format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  tags: string[] | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();

      if (error) throw error;
      setPost(data);

      // Fetch related posts
      if (data) {
        const { data: related } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .neq('slug', slug)
          .limit(3);
        
        setRelatedPosts(related || []);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post?.title || '')}`,
      '_blank'
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-40">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4 text-foreground">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, we couldn't find that blog post.</p>
          <Link to="/blog">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Back to Blog
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <main>
        {/* Hero Section */}
        <AnimatedSection animation="fade-in">
          <section className="py-8 md:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <Link to="/blog" className="inline-block mb-6">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                    ← Back to Blog
                  </Button>
                </Link>
                
                {post.tags && post.tags.length > 0 && (
                  <Badge className="mb-4 bg-secondary text-secondary-foreground text-sm">
                    {post.tags[0]}
                  </Badge>
                )}
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight text-white">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-white/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {post.published_at 
                        ? format(new Date(post.published_at), 'MMMM d, yyyy')
                        : post.created_at 
                          ? format(new Date(post.created_at), 'MMMM d, yyyy')
                          : 'Recently'
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{Math.ceil(post.content.length / 1500)} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Featured Image */}
        {post.featured_image && (
          <AnimatedSection animation="scale">
            <div className="w-full bg-muted">
              <div className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    className="w-full aspect-[2/1] object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Article Content */}
        <AnimatedSection animation="fade-up">
          <article className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8">
                  {/* Sidebar - Share */}
                  <aside className="lg:col-span-2">
                    <div className="lg:sticky lg:top-24">
                      <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wide">Share</h3>
                      <div className="flex lg:flex-col gap-2">
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="flex-1 lg:w-full justify-start hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]"
                          onClick={shareOnFacebook}
                        >
                          <Facebook className="w-4 h-4 lg:mr-2" />
                          <span className="hidden lg:inline">Facebook</span>
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="flex-1 lg:w-full justify-start hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2]"
                          onClick={shareOnTwitter}
                        >
                          <Twitter className="w-4 h-4 lg:mr-2" />
                          <span className="hidden lg:inline">Twitter</span>
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline" 
                          className="flex-1 lg:w-full justify-start hover:bg-primary hover:text-white hover:border-primary"
                          onClick={copyLink}
                        >
                          <LinkIcon className="w-4 h-4 lg:mr-2" />
                          <span className="hidden lg:inline">Copy</span>
                        </Button>
                      </div>
                    </div>
                  </aside>

                  {/* Article Content */}
                  <div className="lg:col-span-10">
                    {post.excerpt && (
                      <p className="text-xl leading-relaxed text-muted-foreground mb-8 italic">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div 
                      className="prose prose-lg max-w-none
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground
                        prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:leading-tight
                        prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground
                        prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:pl-6 
                        prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:my-8 prose-blockquote:text-muted-foreground
                        prose-ul:my-6 prose-ul:space-y-3
                        prose-li:text-lg prose-li:leading-relaxed prose-li:text-foreground
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-lg prose-img:shadow-md"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-border">
                        <h3 className="text-sm font-bold mb-4 text-muted-foreground uppercase tracking-wide">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-muted hover:bg-muted/80 text-foreground">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Comments Section */}
                    <CommentsSection postSlug={post.slug} />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </AnimatedSection>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <AnimatedSection animation="fade-up">
            <section className="py-16 md:py-20 bg-gradient-to-br from-muted via-background to-muted/50">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 md:mb-12 text-foreground">
                    Related Articles
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                        <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-card border-border">
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={relatedPost.featured_image || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&q=80'}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6 flex flex-col flex-grow">
                            {relatedPost.tags && relatedPost.tags.length > 0 && (
                              <Badge className="mb-3 bg-primary text-primary-foreground w-fit">
                                {relatedPost.tags[0]}
                              </Badge>
                            )}
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                              {relatedPost.title}
                            </h3>
                            {relatedPost.excerpt && (
                              <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
                                {relatedPost.excerpt}
                              </p>
                            )}
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{Math.ceil((relatedPost.content?.length || 0) / 1500)} min read</span>
                              </div>
                            </div>
                            <Button variant="link" className="p-0 text-primary w-fit mt-4">
                              Read More <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>

                  <div className="text-center mt-12">
                    <Link to="/blog">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        View All Articles
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
