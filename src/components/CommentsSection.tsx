import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  author_name: string;
  author_email: string | null;
  content: string;
  created_at: string;
  post_slug: string;
}

interface CommentsSectionProps {
  postSlug: string;
}

export const CommentsSection = ({ postSlug }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", postSlug)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authorName.trim() || !newComment.trim()) {
      toast.error("Please fill in your name and comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("comments").insert({
        post_slug: postSlug,
        author_name: authorName.trim(),
        author_email: authorEmail.trim() || null,
        content: newComment.trim(),
      });

      if (error) throw error;

      toast.success("Comment posted successfully! God bless you.");
      setNewComment("");
      setAuthorName("");
      setAuthorEmail("");
      setShowCommentForm(false);
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
          Comments ({comments.length})
        </h2>
      </div>

      {showCommentForm ? (
        <Card className="p-4 md:p-6 mb-6 bg-muted/50 border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Name *</label>
                <Input
                  placeholder="Your name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="bg-background border-border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email (optional)</label>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  className="bg-background border-border"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Comment *</label>
              <Textarea
                placeholder="Share your thoughts, testimony or encouragement..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="bg-background border-border resize-none"
                required
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCommentForm(false)}
                className="border-border"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Button
          onClick={() => setShowCommentForm(true)}
          variant="outline"
          className="mb-6 w-full sm:w-auto border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Leave a Comment
        </Button>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-4 hover:shadow-md transition-shadow bg-card border-border">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h4 className="font-bold text-sm text-foreground">{comment.author_name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && comments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No comments yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
};
