import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Leader {
  id: string;
  name: string;
  position: string;
  image_url: string | null;
}

export const LeadersPreview = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    try {
      const { data, error } = await supabase
        .from('leaders')
        .select('id, name, position, image_url')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(4);

      if (error) throw error;
      setLeaders(data || []);
    } catch (error) {
      console.error('Error fetching leaders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Loading leaders...
        </div>
      </section>
    );
  }

  if (leaders.length === 0) return null;

  return (
    <section className="py-8 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium mb-2">
            <Users className="w-3 h-3" />
            Leadership
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
            Meet Our Leaders
          </h2>
        </div>

        {/* Responsive grid that works on all screen sizes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
          {leaders.map((leader) => (
            <Card key={leader.id} className="group overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card">
              <div className="aspect-square overflow-hidden bg-muted">
                {leader.image_url ? (
                  <img
                    src={leader.image_url}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-primary/40" />
                  </div>
                )}
              </div>
              <CardContent className="p-2 md:p-3 text-center">
                <h3 className="font-bold text-xs md:text-sm text-foreground line-clamp-1">
                  {leader.name}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-1">
                  {leader.position}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/about">
            <Button variant="outline" size="sm" className="group border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground text-xs">
              View All Leaders
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
