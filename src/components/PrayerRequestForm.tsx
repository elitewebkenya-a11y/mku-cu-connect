import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleHeart, Send } from "lucide-react";
import { toast } from "sonner";

export const PrayerRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    request: "",
    isAnonymous: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would send to backend
    console.log("Prayer Request:", formData);
    
    toast.success("Prayer request submitted! Our prayer team will lift you up in prayer.", {
      description: "You're not alone. God hears every prayer.",
    });
    
    setFormData({ name: "", email: "", request: "", isAnonymous: false });
  };

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <MessageCircleHeart className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">Prayer Request</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-foreground">
              We're Here to Pray With You
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Share your prayer needs and let our community stand with you in faith
            </p>
          </div>

          <Card className="p-6 md:p-8 border-border bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                    Your Name {formData.isAnonymous && "(Optional)"}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required={!formData.isAnonymous}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                    Email {formData.isAnonymous && "(Optional)"}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required={!formData.isAnonymous}
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="request" className="block text-sm font-medium mb-2 text-foreground">
                  Prayer Request *
                </label>
                <Textarea
                  id="request"
                  placeholder="Share what's on your heart..."
                  value={formData.request}
                  onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                  required
                  rows={6}
                  className="bg-background border-border resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                  Submit anonymously
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Prayer Request
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Your request will be kept confidential and prayed over by our prayer team
              </p>
            </form>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              "The prayer of a righteous person is powerful and effective."
            </p>
            <p className="text-xs md:text-sm text-primary font-semibold">— James 5:16</p>
          </div>
        </div>
      </div>
    </section>
  );
};
