import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
  avatar: string;
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "James Mwangi",
    date: "2 days ago",
    text: "This testimony really touched my heart. Thank you for sharing your journey with us. It's a reminder that God is always faithful!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    author: "Mary Achieng",
    date: "1 day ago",
    text: "Glory to God! Your story encourages me to keep pushing through my own struggles. The MKU CU family is truly special.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    author: "David Omondi",
    date: "12 hours ago",
    text: "Amen! This is exactly what I needed to read today. God's timing is perfect. Thank you for being vulnerable and sharing this.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

export const CommentsSection = () => {
  const [comments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !newComment.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Comment submitted! It will appear after moderation.");
    setNewComment("");
    setName("");
    setShowCommentForm(false);
  };

  return (
    <div className="mt-16 pt-12 border-t">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-navy" />
        <h2 className="text-2xl md:text-3xl font-serif font-bold">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      {showCommentForm ? (
        <Card className="p-6 mb-8 bg-muted/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
              />
            </div>
            <div>
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="bg-background resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="bg-navy hover:bg-navy-light">
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowCommentForm(false)}
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
          className="mb-8 w-full sm:w-auto border-2 hover:bg-navy hover:text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Leave a Comment
        </Button>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              <img 
                src={comment.avatar}
                alt={comment.author}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-base">{comment.author}</h4>
                  <span className="text-sm text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-base leading-relaxed text-foreground">
                  {comment.text}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
};
