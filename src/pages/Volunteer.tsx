import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  requirements: string | null;
  time_commitment: string | null;
  contact_link: string;
  is_active: boolean | null;
}

const Volunteer = () => {
  const [opportunities, setOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from("volunteer_opportunities")
        .select("*")
        .eq("is_active", true);

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error("Error fetching volunteer opportunities:", error);
      toast.error("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-foreground">Loading opportunities...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold">Serve With Purpose</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
                Volunteer Opportunities
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 animate-fade-in-up">
                Use your gifts and talents to serve God and build His kingdom on campus.
                Every contribution matters in advancing the Gospel.
              </p>
            </div>
          </div>
        </section>

        {/* Why Volunteer Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-center mb-12 text-foreground">
                Why Volunteer With Us?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Make an Impact</h3>
                  <p className="text-muted-foreground">Your service directly touches lives and transforms the campus community.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Grow Spiritually</h3>
                  <p className="text-muted-foreground">Serving others deepens your faith and helps you grow in Christ-like character.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">Flexible Commitment</h3>
                  <p className="text-muted-foreground">We work with your schedule to find the right fit for your availability.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-serif font-bold text-center mb-12 text-foreground">
                Current Opportunities
              </h2>
              
              {opportunities.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {opportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="p-6 hover:shadow-xl transition-all duration-300 bg-card">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heart className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-card-foreground">{opportunity.title}</h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6">{opportunity.description}</p>

                      <div className="space-y-4 mb-6">
                        {opportunity.time_commitment && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              <strong className="text-card-foreground">Commitment:</strong> {opportunity.time_commitment}
                            </span>
                          </div>
                        )}
                        
                        {opportunity.requirements && (
                          <div>
                            <p className="text-sm font-semibold text-card-foreground mb-2">Requirements:</p>
                            <p className="text-sm text-muted-foreground">{opportunity.requirements}</p>
                          </div>
                        )}
                      </div>

                      <a
                        href={opportunity.contact_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-6">
                    No volunteer opportunities available at the moment. Check back soon or contact us to learn more!
                  </p>
                  <a href="https://wa.me/254115475543?text=Hi%2C%20I%20want%20to%20volunteer%20at%20MKU%20CU" target="_blank" rel="noopener noreferrer">
                    <Button size="lg">Contact Us to Volunteer</Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join our volunteer team and be part of something bigger than yourself. 
                Your time and talents can help transform lives on campus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://wa.me/254115475543?text=Hi%2C%20I%20want%20to%20volunteer%20at%20MKU%20CU" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Get Started Today
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteer;