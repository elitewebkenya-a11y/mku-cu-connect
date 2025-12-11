import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CommentsSection } from "@/components/CommentsSection";
import { Calendar, Clock, Facebook, Twitter, Link as LinkIcon, ArrowRight, Loader2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  tags: string[] | null;
  category: string | null;
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
    toast.success("Link copied!");
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
        <main className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif font-bold mb-3 text-foreground">Post Not Found</h1>
          <p className="text-muted-foreground mb-6 text-sm">Sorry, we couldn't find that story.</p>
          <Link to="/blog">
            <Button size="sm">Back to Stories</Button>
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
        {/* Article Header */}
        <article className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Back Link */}
              <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ChevronLeft className="w-4 h-4" />
                Back to Stories
              </Link>

              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {post.category && (
                  <Badge className="bg-primary/10 text-primary border-0 text-xs">
                    {post.category}
                  </Badge>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {post.published_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{format(new Date(post.published_at), 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{Math.ceil(post.content.length / 1500)} min read</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 text-foreground leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Share Buttons */}
              <div className="flex items-center gap-2 mb-6 pb-6 border-b">
                <span className="text-xs text-muted-foreground mr-1">Share:</span>
                <Button 
                  size="sm"
                  variant="outline" 
                  className="h-8 w-8 p-0"
                  onClick={shareOnFacebook}
                >
                  <Facebook className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  size="sm"
                  variant="outline" 
                  className="h-8 w-8 p-0"
                  onClick={shareOnTwitter}
                >
                  <Twitter className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  size="sm"
                  variant="outline" 
                  className="h-8 w-8 p-0"
                  onClick={copyLink}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Featured Image */}
              {post.featured_image && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    className="w-full aspect-[16/9] object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div 
                className="prose prose-sm md:prose-base max-w-none
                  prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground
                  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                  prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
                  prose-blockquote:border-l-4 prose-blockquote:border-primary/30 prose-blockquote:pl-4 
                  prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:text-muted-foreground
                  prose-ul:my-4 prose-ul:space-y-1
                  prose-li:text-foreground/90
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-10">
                <CommentsSection postSlug={post.slug} />
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-10 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-serif font-bold mb-6 text-foreground">
                  More Stories
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                      <Card className="overflow-hidden group hover:shadow-md transition-all duration-300 h-full flex flex-col border-0 shadow-sm">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={relatedPost.featured_image || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=600&q=80'}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                          <h3 className="text-sm font-bold mb-1.5 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                            {relatedPost.title}
                          </h3>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-auto">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{Math.ceil((relatedPost.content?.length || 0) / 1500)} min</span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link to="/blog">
                    <Button variant="outline" size="sm">
                      View All Stories <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;