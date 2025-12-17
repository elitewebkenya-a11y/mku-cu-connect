import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Smartphone, Loader2, CheckCircle, XCircle, Phone, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import titheImage from "@/assets/tithe-giving.jpg";

const quickAmounts = [100, 500, 1000, 5000];

export const GivingSection = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("500");
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
    setAmount("500");
    setDonorName("");
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with Scripture */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2.5 rounded-full mb-6 shadow-lg">
              <Heart className="w-5 h-5 fill-white" />
              <span className="font-semibold">Tithes & Offerings</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent">
              Give with Joy
            </h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-xl border border-amber-100">
                <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-3">
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                </p>
                <p className="text-amber-700 font-semibold">— 2 Corinthians 9:7</p>
              </div>
            </div>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your generosity enables us to spread the Gospel, support our community, and continue God's work at MKU Christian Union.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Inspiration Image & Info */}
            <div className="space-y-6">
              <Card className="overflow-hidden shadow-2xl border-0">
                <div className="relative">
                  <img 
                    src={titheImage} 
                    alt="Giving" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Sow in Faith</h3>
                    <p className="text-white/90">Every seed planted in faith yields an eternal harvest</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  Why We Give
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>To honor God with our firstfruits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>To support ministry and outreach programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>To bless those in need within our community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>To advance the Kingdom of God on campus</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-green-50 border-green-200">
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Need bank details or have questions?
                </p>
                <Button 
                  asChild 
                  className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
                  size="lg"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 w-5 h-5" /> 
                    Contact Us on WhatsApp
                  </a>
                </Button>
              </Card>
            </div>

            {/* Right Side - Payment Form */}
            <div className="lg:sticky lg:top-8">
              <Card className="p-8 md:p-10 shadow-2xl border-0 bg-white">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <Smartphone className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">M-Pesa Giving</h3>
                    <p className="text-sm text-gray-500">Quick & Secure Payment</p>
                  </div>
                </div>

                {paymentStatus === "success" ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-bold mb-3 text-gray-800">Thank You!</h4>
                    <p className="text-gray-600 mb-6">Your offering has been received. May God bless you abundantly!</p>
                    <Button 
                      onClick={resetPayment} 
                      variant="outline" 
                      size="lg"
                      className="border-2"
                    >
                      Give Again
                    </Button>
                  </div>
                ) : paymentStatus === "failed" ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <XCircle className="w-12 h-12 text-red-600" />
                    </div>
                    <h4 className="text-2xl font-bold mb-3 text-gray-800">Payment Not Completed</h4>
                    <p className="text-gray-600 mb-6">Please try again or contact us for assistance.</p>
                    <Button 
                      onClick={resetPayment}
                      size="lg"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-gray-700 font-semibold mb-2 block">
                        Your Name <span className="text-gray-400 font-normal">(Optional)</span>
                      </Label>
                      <Input 
                        value={donorName} 
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Enter your name"
                        className="h-12 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 font-semibold mb-2 block">
                        M-Pesa Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="254712345678"
                        required
                        className="h-12 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 font-semibold mb-2 block">
                        Amount (KES) <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="500"
                        min="1"
                        required
                        className="h-12 border-gray-300 text-lg font-semibold"
                      />
                      
                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {quickAmounts.map((a) => (
                          <Button 
                            key={a} 
                            type="button" 
                            variant="outline"
                            onClick={() => setAmount(a.toString())}
                            className="h-10 text-sm hover:bg-amber-50 hover:border-amber-400 hover:text-amber-700"
                          >
                            {a}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {paymentStatus === "pending" && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
                        <p className="text-blue-800 font-medium text-sm">
                          Check your phone for M-Pesa prompt
                        </p>
                      </div>
                    )}

                    <Button 
                      onClick={handlePayment}
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Smartphone className="w-5 h-5 mr-2" />
                          Complete Payment
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      Secure payment powered by M-Pesa. Your transaction is encrypted and safe.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
