import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Loader2, User, Reply, ChevronDown, ChevronUp, Lock } from "lucide-react";
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
  parent_id: string | null;
  thread_closed: boolean;
  reply_count: number;
}

interface CommentsSectionProps {
  postSlug: string;
}

const MAX_REPLIES = 7;

export const CommentsSection = ({ postSlug }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_slug", postSlug)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setComments((data as Comment[]) || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
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
        parent_id: parentId || null,
      });

      if (error) throw error;

      // Update reply count on parent if replying
      if (parentId) {
        const parentComment = comments.find(c => c.id === parentId);
        if (parentComment) {
          const newReplyCount = parentComment.reply_count + 1;
          const shouldClose = newReplyCount >= MAX_REPLIES;
          
          await supabase
            .from("comments")
            .update({ 
              reply_count: newReplyCount,
              thread_closed: shouldClose 
            })
            .eq("id", parentId);
        }
      }

      toast.success("Comment posted successfully!", { duration: 3000 });
      setNewComment("");
      setAuthorName("");
      setAuthorEmail("");
      setShowCommentForm(false);
      setReplyingTo(null);
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleThread = (commentId: string) => {
    setExpandedThreads(prev => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  // Get top-level comments (no parent)
  const topLevelComments = comments.filter(c => !c.parent_id);
  
  // Get replies for a specific comment
  const getReplies = (parentId: string) => comments.filter(c => c.parent_id === parentId);

  const CommentForm = ({ parentId, onCancel }: { parentId?: string; onCancel?: () => void }) => (
    <Card className="p-4 md:p-5 mb-4 bg-muted/50 border-border">
      <form onSubmit={(e) => handleSubmit(e, parentId)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1.5 text-foreground">Name *</label>
            <Input
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-background border-border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-foreground">Email (optional)</label>
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
          <label className="block text-sm font-medium mb-1.5 text-foreground">
            {parentId ? "Your Reply *" : "Comment *"}
          </label>
          <Textarea
            placeholder={parentId ? "Write your reply..." : "Share your thoughts..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="bg-background border-border resize-none"
            required
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                Posting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-1.5" />
                {parentId ? "Post Reply" : "Post Comment"}
              </>
            )}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="border-border"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );

  const CommentCard = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const replies = getReplies(comment.id);
    const isExpanded = expandedThreads.has(comment.id);
    const canReply = !comment.thread_closed && replies.length < MAX_REPLIES;

    return (
      <div className={isReply ? "ml-6 md:ml-10 mt-3" : ""}>
        <Card className={`p-4 hover:shadow-sm transition-shadow bg-card border-border ${isReply ? "border-l-2 border-l-primary/30" : ""}`}>
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h4 className="font-semibold text-sm text-foreground">{comment.author_name}</h4>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">{comment.content}</p>
              
              {/* Reply button and thread controls */}
              <div className="flex items-center gap-3 mt-3">
                {!isReply && canReply && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="h-7 text-xs text-muted-foreground hover:text-primary"
                  >
                    <Reply className="w-3 h-3 mr-1" />
                    Reply
                  </Button>
                )}
                
                {!isReply && replies.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleThread(comment.id)}
                    className="h-7 text-xs text-muted-foreground"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3 mr-1" />
                        Hide {replies.length} {replies.length === 1 ? "reply" : "replies"}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 mr-1" />
                        Show {replies.length} {replies.length === 1 ? "reply" : "replies"}
                      </>
                    )}
                  </Button>
                )}

                {!isReply && comment.thread_closed && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Thread closed
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Reply form */}
        {replyingTo === comment.id && (
          <div className="ml-6 md:ml-10 mt-3">
            <CommentForm 
              parentId={comment.id} 
              onCancel={() => setReplyingTo(null)} 
            />
          </div>
        )}

        {/* Replies */}
        {isExpanded && replies.map((reply) => (
          <CommentCard key={reply.id} comment={reply} isReply />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-10 pt-6 border-t border-border">
      <div className="flex items-center gap-3 mb-5">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-serif font-bold text-foreground">
          Comments ({topLevelComments.length})
        </h2>
      </div>

      {showCommentForm ? (
        <CommentForm onCancel={() => setShowCommentForm(false)} />
      ) : (
        <Button
          onClick={() => setShowCommentForm(true)}
          variant="outline"
          className="mb-5 border-2 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
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
          {topLevelComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {!isLoading && topLevelComments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No comments yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
};
