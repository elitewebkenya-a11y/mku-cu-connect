import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, CreditCard, Building2, Phone } from "lucide-react";
import titheImage from "@/assets/tithe-giving.jpg";

export const GivingSection = () => {
  const whatsappNumber = "254115475543";
  const whatsappMessage = "Hello, I would like to know more about giving/tithing at MKU CU";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-gold/10 via-background to-navy/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full mb-4">
              <Heart className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">Give Cheerfully</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Support God's Work
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <Card className="overflow-hidden">
                <img
                  src={titheImage}
                  alt="Support MKU CU through giving and tithing"
                  className="w-full h-64 md:h-96 object-cover"
                />
              </Card>
            </div>

            {/* Giving Options */}
            <div className="order-1 md:order-2 space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-navy" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold mb-2">M-Pesa Paybill</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-3">
                      Send your tithes and offerings via M-Pesa
                    </p>
                    <div className="bg-muted p-3 rounded-lg mb-3">
                      <p className="text-sm"><span className="font-semibold">Paybill:</span> Coming Soon</p>
                      <p className="text-sm"><span className="font-semibold">Account:</span> Your Name</p>
                    </div>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact for Details
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold mb-2">Bank Transfer</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-3">
                      Direct bank deposit for tithes and special offerings
                    </p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Get Bank Details
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-navy text-white">
                <h4 className="font-bold text-lg mb-2">Why Give?</h4>
                <ul className="space-y-2 text-sm">
                  <li>✓ Support campus evangelism and missions</li>
                  <li>✓ Enable ministry programs and events</li>
                  <li>✓ Provide resources for discipleship</li>
                  <li>✓ Advance God's kingdom on campus</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
