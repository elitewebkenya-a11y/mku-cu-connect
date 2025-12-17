import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Smartphone, Loader2, CheckCircle, XCircle, Phone, BookOpen, Church, Sparkles, HandHeart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import titheImage from "@/assets/tithe-giving.jpg";

const quickAmounts = [50, 100, 500, 1000];

export const GivingSection = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("100");
  const [donorName, setDonorName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "pending" | "success" | "failed">("idle");
  const [currentReference, setCurrentReference] = useState<string | null>(null);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappNumber = "254115475543";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to know more about giving/tithing at MKU CU"
  )}`;

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, []);

  const checkPaymentStatus = async (reference: string) => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("status")
        .eq("external_reference", reference)
        .maybeSingle();

      if (error) {
        console.error("Supabase status check error:", error);
        return;
      }

      const status = data?.status || "pending";

      if (status !== paymentStatus) {
        setPaymentStatus(status as "pending" | "success" | "failed");

        if (status === "success") {
          toast.success("Payment successful! Thank you for your generous giving.");
          pollIntervalRef.current && clearInterval(pollIntervalRef.current);
        }

        if (status === "failed") {
          toast.error("Payment was not completed. Please try again.");
          pollIntervalRef.current && clearInterval(pollIntervalRef.current);
        }
      }
    } catch (err) {
      console.error("Status check error:", err);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid phone number and amount");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("idle");

    try {
      const res = await fetch("https://remote.victoryschoolclub.co.ke/process-payment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount: parseFloat(amount), donor_name: donorName, payment_type: "tithe" }),
      });

      const data = await res.json();

      if (!res.ok || data.status !== "success") throw new Error(data.error || "Payment initiation failed");

      setCurrentReference(data.reference);
      setPaymentStatus("pending");
      toast.info("STK push sent! Please check your phone and enter M-Pesa PIN.");

      pollIntervalRef.current = setInterval(() => checkPaymentStatus(data.reference), 5000);

      setTimeout(() => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          if (paymentStatus === "pending") {
            setPaymentStatus("idle");
            toast.info("Payment verification timed out. If completed, it will reflect shortly.");
          }
        }
      }, 120000);

    } catch (err: unknown) {
      console.error("Payment error:", err);
      const message = err instanceof Error ? err.message : "Payment failed. Please try again.";
      toast.error(message);
      setPaymentStatus("failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setPaymentStatus("idle");
    setCurrentReference(null);
    setPhone("");
    setAmount("100");
    setDonorName("");
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-navy/10 text-navy px-5 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4 fill-navy" />
              <span className="font-semibold text-sm uppercase tracking-wide">Tithes & Offerings</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-navy">
              Give Cheerfully
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              Your generous contributions help us spread the Gospel, support our community, and continue God's work at MKU Christian Union.
            </p>

            {/* Scripture Quote */}
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-gold/5 to-navy/5 border-gold/20 p-8 md:p-12">
                <BookOpen className="w-10 h-10 text-gold mx-auto mb-4" />
                <blockquote className="text-xl md:text-2xl italic text-gray-800 leading-relaxed mb-4">
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                </blockquote>
                <cite className="text-gold font-semibold text-lg">— 2 Corinthians 9:7</cite>
              </Card>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
            
            {/* Left Column - Impact Cards */}
            <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
              <Card className="p-5 md:p-6 border-navy/10 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-navy/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Church className="w-5 h-5 md:w-6 md:h-6 text-navy" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2 text-navy">Ministry & Outreach</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Support campus evangelism, discipleship programs, and community missions that transform lives for Christ.
                </p>
              </Card>

              <Card className="p-5 md:p-6 border-navy/10 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2 text-navy">Bible Teaching</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Enable quality biblical education, resources, and training that equip believers to grow in their faith.
                </p>
              </Card>

              <Card className="p-5 md:p-6 border-navy/10 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <HandHeart className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2 text-navy">Student Support</h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  Help students in need, provide resources, and create a welcoming environment for spiritual growth.
                </p>
              </Card>
            </div>

            {/* Center Column - Payment Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Card className="p-6 md:p-8 lg:p-10 shadow-xl border-navy/10">
                
                {paymentStatus === "success" ? (
                  <div className="text-center py-12 md:py-16">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                      <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-600" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-navy">God Bless You!</h4>
                    <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto px-4">
                      Your offering has been received. Thank you for partnering with us in advancing God's Kingdom.
                    </p>
                    <Button 
                      onClick={resetPayment} 
                      size="lg"
                      className="bg-navy hover:bg-navy/90"
                    >
                      Make Another Offering
                    </Button>
                  </div>
                ) : paymentStatus === "failed" ? (
                  <div className="text-center py-12 md:py-16">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                      <XCircle className="w-12 h-12 md:w-16 md:h-16 text-red-600" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-navy">Payment Not Complete</h4>
                    <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-md mx-auto px-4">
                      The transaction was not completed. Please try again or contact us for assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                      <Button 
                        onClick={resetPayment}
                        size="lg"
                        className="bg-navy hover:bg-navy/90 w-full sm:w-auto"
                      >
                        Try Again
                      </Button>
                      <Button 
                        asChild
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                          <Phone className="mr-2 w-4 h-4" />
                          Get Help
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6 md:mb-8">
                      <div className="inline-flex items-center gap-2 md:gap-3 mb-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-navy/10 rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 md:w-7 md:h-7 text-navy fill-navy" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl md:text-2xl font-bold text-navy">Support God's Work</h3>
                          <p className="text-gray-500 text-xs md:text-sm">Give securely and conveniently</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 md:space-y-6">
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block text-sm">
                          Your Name <span className="text-gray-400 font-normal">(Optional)</span>
                        </Label>
                        <Input 
                          value={donorName} 
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Enter your name"
                          className="h-12 border-gray-200 focus:border-navy"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block text-sm">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="254712345678"
                          required
                          className="h-12 border-gray-200 focus:border-navy"
                        />
                        <p className="text-xs text-gray-500 mt-1">We'll send a payment prompt to this number</p>
                      </div>

                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block text-sm">
                          Amount (KES) <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          type="number" 
                          value={amount} 
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="100"
                          min="1"
                          required
                          className="h-12 md:h-14 border-gray-200 focus:border-navy text-lg md:text-xl font-semibold"
                        />
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 mt-3 md:mt-4">
                          {quickAmounts.map((a) => (
                            <Button 
                              key={a} 
                              type="button" 
                              variant="outline"
                              onClick={() => setAmount(a.toString())}
                              className={`h-10 md:h-12 border-2 font-semibold transition-all text-sm md:text-base ${
                                amount === a.toString() 
                                  ? 'border-navy bg-navy text-white' 
                                  : 'border-gray-200 hover:border-navy'
                              }`}
                            >
                              {a.toLocaleString()}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {paymentStatus === "pending" && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
                          <p className="text-blue-900 font-semibold mb-1">Processing Your Gift</p>
                          <p className="text-blue-700 text-sm">
                            Please check your phone and complete the payment
                          </p>
                        </div>
                      )}

                      <Button 
                        onClick={handlePayment}
                        className="w-full h-14 text-lg font-semibold bg-navy hover:bg-navy/90 shadow-lg"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Processing Your Gift...
                          </>
                        ) : (
                          <>
                            <Heart className="w-5 h-5 mr-2 fill-white" />
                            Give Now
                          </>
                        )}
                      </Button>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-center text-sm text-gray-600 mb-4">
                          Need other ways to give?
                        </p>
                        <Button 
                          asChild 
                          variant="outline"
                          className="w-full border-2"
                          size="lg"
                        >
                          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Phone className="mr-2 w-4 h-4" />
                            Contact Us for More Options
                          </a>
                        </Button>
                      </div>

                      <div className="text-center pt-4">
                        <p className="text-xs text-gray-400">
                          Powered by <span className="font-semibold text-navy">Hydrocephcare Kenya</span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </Card>

              {/* Image Card Below */}
              <Card className="mt-4 md:mt-6 overflow-hidden shadow-lg border-navy/10">
                <img 
                  src={titheImage} 
                  alt="Church Giving" 
                  className="w-full h-48 md:h-64 object-cover"
                />
              </Card>
            </div>
          </div>

          {/* Bottom Section - Additional Info */}
          <div className="mt-12 md:mt-16 text-center">
            <div className="max-w-3xl mx-auto px-4">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-gold mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-navy mb-3 md:mb-4">Every Gift Makes a Difference</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Whether you give your tithes, offerings, or special contributions, know that your generosity is making an eternal impact. Together, we are living the knowledge of God and transforming lives across our campus and beyond.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
