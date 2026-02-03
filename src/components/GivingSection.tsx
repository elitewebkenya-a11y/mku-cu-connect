import { Heart, CreditCard, Info, BookOpen, Church, HandHeart, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import titheImage from "@/assets/tithe-giving.jpg";

export const GivingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 fill-primary" />
              <span className="font-semibold text-sm uppercase tracking-wide">Tithes & Offerings</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground">
              Give Cheerfully
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Your generous contributions help us spread the Gospel, support our community, and continue God's work at MKU Christian Union.
            </p>

            {/* Scripture Quote */}
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-secondary/10 to-primary/5 border-secondary/20 p-6 md:p-10">
              <BookOpen className="w-8 h-8 text-secondary mx-auto mb-4" />
              <blockquote className="text-lg md:text-xl italic text-foreground leading-relaxed mb-3">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </blockquote>
              <cite className="text-secondary font-semibold">— 2 Corinthians 9:7</cite>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column - Impact Cards */}
            <div className="space-y-4">
              <Card className="p-5 border-border hover:shadow-lg transition-shadow bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Church className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">Ministry & Outreach</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Support campus evangelism, discipleship programs, and community missions that transform lives for Christ.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-border hover:shadow-lg transition-shadow bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">Bible Teaching</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Enable quality biblical education, resources, and training that equip believers to grow in their faith.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-border hover:shadow-lg transition-shadow bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <HandHeart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">Student Support</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Help students in need, provide resources, and create a welcoming environment for spiritual growth.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Image Card */}
              <Card className="overflow-hidden shadow-lg border-border">
                <img 
                  src={titheImage} 
                  alt="Church Giving" 
                  className="w-full h-48 md:h-56 object-cover"
                />
              </Card>
            </div>

            {/* Right Column - M-Pesa Till Card */}
            <div>
              <Card className="p-6 md:p-8 border-border bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">Pay via M-Pesa Till</h3>
                    <p className="text-muted-foreground text-sm">Quick, secure, and convenient giving</p>
                  </div>
                </div>
                
                <div className="bg-card rounded-xl p-5 border-2 border-green-200 dark:border-green-800 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-medium">Till Number:</span>
                    <span className="text-3xl md:text-4xl font-bold text-green-600">6960137</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">MKU Christian Union</p>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold text-foreground flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    How to Pay:
                  </h5>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">1</span>
                      <span>Go to <strong className="text-foreground">M-Pesa</strong> on your phone</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">2</span>
                      <span>Select <strong className="text-foreground">Lipa na M-Pesa</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">3</span>
                      <span>Choose <strong className="text-foreground">Buy Goods and Services</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">4</span>
                      <span>Enter Till Number: <strong className="text-green-600">6960137</strong></span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">5</span>
                      <span>Enter the <strong className="text-foreground">amount</strong> you wish to give</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">6</span>
                      <span>Enter your <strong className="text-foreground">M-Pesa PIN</strong> to complete</span>
                    </li>
                  </ol>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> After payment, you'll receive an M-Pesa confirmation message. Please save it for your records.
                  </p>
                </div>
              </Card>

              {/* Bottom Message */}
              <div className="text-center mt-8">
                <Sparkles className="w-6 h-6 text-secondary mx-auto mb-3" />
                <h4 className="text-lg font-bold text-foreground mb-2">Every Gift Makes a Difference</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Whether you give your tithes, offerings, or special contributions, your generosity is making an eternal impact.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
