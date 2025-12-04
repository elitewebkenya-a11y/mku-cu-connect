import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Users, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Leader {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  image_url: string | null;
  email: string | null;
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
        .select('*')
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading leaders...</p>
        </div>
      </section>
    );
  }

  if (leaders.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-muted/50 via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Our Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Meet Our Leaders
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated servants guiding our community in faith and fellowship
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <Card key={leader.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card">
              <div className="aspect-square overflow-hidden bg-muted">
                {leader.image_url ? (
                  <img
                    src={leader.image_url}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Users className="w-16 h-16 text-primary/40" />
                  </div>
                )}
              </div>
              <CardContent className="p-5 text-center">
                <h3 className="font-serif font-bold text-lg text-foreground mb-1">
                  {leader.name}
                </h3>
                <p className="text-secondary font-medium text-sm mb-2">
                  {leader.position}
                </p>
                {leader.email && (
                  <a
                    href={`mailto:${leader.email}`}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    {leader.email}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/about">
            <Button variant="outline" className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Leaders
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
