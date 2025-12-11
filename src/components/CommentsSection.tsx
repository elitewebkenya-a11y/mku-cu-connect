import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface CommentsSectionProps {
  postId: string; // renamed to match DB
}

export const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
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

    if (!name.trim() || !newComment.trim()) {
      toast.error("Please fill in your name and comment");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("comments").insert({
        post_id: postId,
        name: name.trim(),
        message: newComment.trim(),
      });

      if (error) throw error;

      toast.success("Comment posted successfully!");
      setNewComment("");
      setName("");
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
    <div className="mt-16 pt-12 border-t border-border">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
          Comments ({comments.length})
        </h2>
      </div>

      {showCommentForm ? (
        <Card className="p-6 mb-8 bg-muted/50 border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Name *</label>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Comment *</label>
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="bg-background border-border resize-none"
                required
              />
            </div>

            <div className="flex gap-3">
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
          className="mb-8 w-full sm:w-auto border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Leave a Comment
        </Button>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-6 hover:shadow-md transition-shadow bg-card border-border">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-base text-foreground">{comment.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-foreground">{comment.message}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && comments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};
