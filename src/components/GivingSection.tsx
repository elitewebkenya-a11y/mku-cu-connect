import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Heart,
  CreditCard,
  Building2,
  Phone,
  Loader2,
  CheckCircle,
  XCircle,
  Smartphone,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import titheImage from "@/assets/tithe-giving.jpg";

const quickAmounts = [100, 500, 1000, 5000];

export const GivingSection = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("500");
  const [donorName, setDonorName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] =
    useState<"idle" | "pending" | "success" | "failed">("idle");
  const [currentReference, setCurrentReference] = useState<string | null>(null);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappNumber = "254115475543";
  const whatsappMessage =
    "Hello, I would like to know more about giving/tithing at MKU CU";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // Cleanup polling
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // ✅ POLL PAYMENT STATUS FROM SUPABASE
  const checkPaymentStatus = async (reference: string) => {
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("status")
        .eq("external_reference", reference)
        .maybeSingle();

      if (error) {
        console.error(error);
        return;
      }

      const status = data?.status || "pending";

      if (status === "success") {
        setPaymentStatus("success");
        toast.success(
          "Payment successful! Thank you for your generous giving."
        );
        pollIntervalRef.current && clearInterval(pollIntervalRef.current);
      }

      if (status === "failed") {
        setPaymentStatus("failed");
        toast.error("Payment was not completed. Please try again.");
        pollIntervalRef.current && clearInterval(pollIntervalRef.current);
      }
    } catch (err) {
      console.error("Status check error:", err);
    }
  };

  // ✅ INITIATE PAYMENT VIA PHP (PayHero)
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid phone number and amount");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("idle");

    try {
      const response = await fetch(
        "https://remote.victoryschoolclub.co.ke/process-payment.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            amount: parseFloat(amount),
            donor_name: donorName || null,
            payment_type: "tithe",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error(data.error || "Payment initiation failed");
      }

      setCurrentReference(data.reference);
      setPaymentStatus("pending");

      toast.info(
        "STK push sent! Please check your phone and enter M-Pesa PIN."
      );

      // Start polling
      pollIntervalRef.current = setInterval(() => {
        checkPaymentStatus(data.reference);
      }, 5000);

      // Stop polling after 2 minutes
      setTimeout(() => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          if (paymentStatus === "pending") {
            setPaymentStatus("idle");
            toast.info(
              "Payment verification timed out. If completed, it will reflect shortly."
            );
          }
        }
      }, 120000);
    } catch (error: unknown) {
      console.error("Payment error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again.";
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
    <section className="py-12 md:py-20 bg-gradient-to-br from-gold/10 via-background to-navy/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full mb-4">
              <Heart className="w-5 h-5" />
              <span className="font-semibold">Give Cheerfully</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Support God's Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              “Each of you should give what you have decided in your heart to
              give…” — 2 Corinthians 9:7
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Payment Form */}
            <Card className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <Smartphone className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">M-Pesa Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant STK Push
                  </p>
                </div>
              </div>

              {paymentStatus === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">
                    Payment Successful!
                  </h4>
                  <Button onClick={resetPayment} variant="outline">
                    Give Again
                  </Button>
                </div>
              ) : paymentStatus === "failed" ? (
                <div className="text-center py-8">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">
                    Payment Failed
                  </h4>
                  <Button onClick={resetPayment}>Try Again</Button>
                </div>
              ) : (
                <form onSubmit={handlePayment} className="space-y-4">
                  <Label>Your Name (Optional)</Label>
                  <Input value={donorName} onChange={(e) => setDonorName(e.target.value)} />

                  <Label>M-Pesa Phone *</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} required />

                  <Label>Amount (KES) *</Label>
                  <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

                  <div className="flex gap-2 flex-wrap">
                    {quickAmounts.map((a) => (
                      <Button key={a} type="button" variant="outline" onClick={() => setAmount(a.toString())}>
                        KES {a}
                      </Button>
                    ))}
                  </div>

                  {paymentStatus === "pending" && (
                    <div className="text-center text-blue-600">
                      <Loader2 className="animate-spin mx-auto mb-2" />
                      Check your phone for M-Pesa prompt
                    </div>
                  )}

                  <Button className="w-full bg-green-600 text-white" disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Pay with M-Pesa"}
                  </Button>
                </form>
              )}
            </Card>

            {/* Info */}
            <div className="space-y-6">
              <Card>
                <img src={titheImage} className="w-full h-56 object-cover" />
              </Card>

              <Card className="p-6">
                <Button asChild variant="outline" className="w-full">
                  <a href={whatsappLink} target="_blank">
                    <Phone className="mr-2" /> Get Bank Details
                  </a>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
