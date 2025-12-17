import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, CreditCard, Building2, Phone, Loader2, CheckCircle, XCircle, Smartphone } from "lucide-react";
import { toast } from "sonner";
import titheImage from "@/assets/tithe-giving.jpg";

const quickAmounts = [100, 500, 1000, 5000];

// Lovable Cloud edge functions URL
const EDGE_FUNCTIONS_URL = "https://cteiidzqhrernptuubzx.supabase.co/functions/v1";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0ZWlpZHpxaHJlcm5wdHV1Ynp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMTQ1NDksImV4cCI6MjA3OTc5MDU0OX0.vvHVeKBaJTcDVwlEclFKd08vSi_eoJ8zvOMaAl8UiBU";

export const GivingSection = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("500");
  const [donorName, setDonorName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [currentReference, setCurrentReference] = useState<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappNumber = "254115475543";
  const whatsappMessage = "Hello, I would like to know more about giving/tithing at MKU CU";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  const checkPaymentStatus = async (reference: string) => {
    try {
      const response = await fetch(`${EDGE_FUNCTIONS_URL}/payment-status?reference=${encodeURIComponent(reference)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY
        }
      });

      const data = await response.json();
      const status = data?.status || 'pending';

      if (status === 'success') {
        setPaymentStatus('success');
        toast.success("Payment successful! Thank you for your generous giving.");
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      } else if (status === 'failed') {
        setPaymentStatus('failed');
        toast.error("Payment was not completed. Please try again.");
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
      }
    } catch (error) {
      console.error('Status check error:', error);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid phone number and amount");
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('idle');

    try {
      console.log('Initiating payment to:', `${EDGE_FUNCTIONS_URL}/initiate-payment`);
      
      const response = await fetch(`${EDGE_FUNCTIONS_URL}/initiate-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          phone,
          amount: parseFloat(amount),
          payment_type: 'tithe',
          donor_name: donorName || undefined
        })
      });

      const data = await response.json();
      console.log('Payment response:', data);

      if (data.status === 'success') {
        setCurrentReference(data.reference);
        setPaymentStatus('pending');
        toast.info("STK push sent! Please check your phone and enter M-Pesa PIN to complete payment.");
        
        // Start polling for payment status
        pollIntervalRef.current = setInterval(() => {
          checkPaymentStatus(data.reference);
        }, 5000);

        // Stop polling after 2 minutes
        setTimeout(() => {
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            if (paymentStatus === 'pending') {
              setPaymentStatus('idle');
              toast.info("Payment verification timed out. If you completed the payment, it will reflect shortly.");
            }
          }
        }, 120000);
      } else {
        throw new Error(data.error || 'Payment initiation failed');
      }
    } catch (error: unknown) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      toast.error(errorMessage);
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setCurrentReference(null);
    setPhone("");
    setAmount("500");
    setDonorName("");
  };

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

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* M-Pesa Payment Form */}
            <div className="order-1">
              <Card className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">M-Pesa Payment</h3>
                    <p className="text-sm text-muted-foreground">Instant STK Push</p>
                  </div>
                </div>

                {paymentStatus === 'success' ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h4>
                    <p className="text-muted-foreground mb-6">Thank you for your generous giving. God bless you!</p>
                    <Button onClick={resetPayment} variant="outline">Make Another Payment</Button>
                  </div>
                ) : paymentStatus === 'failed' ? (
                  <div className="text-center py-8">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-red-600 mb-2">Payment Not Completed</h4>
                    <p className="text-muted-foreground mb-6">The payment was cancelled or failed. Please try again.</p>
                    <Button onClick={resetPayment}>Try Again</Button>
                  </div>
                ) : (
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <Label htmlFor="donorName">Your Name (Optional)</Label>
                      <Input
                        id="donorName"
                        placeholder="Enter your name"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        disabled={isProcessing || paymentStatus === 'pending'}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">M-Pesa Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="07XXXXXXXX or 254XXXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={isProcessing || paymentStatus === 'pending'}
                      />
                    </div>

                    <div>
                      <Label htmlFor="amount">Amount (KES) *</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        max="150000"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        disabled={isProcessing || paymentStatus === 'pending'}
                        className="text-lg font-semibold"
                      />
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setAmount(quickAmount.toString())}
                          disabled={isProcessing || paymentStatus === 'pending'}
                          className={amount === quickAmount.toString() ? 'bg-primary text-primary-foreground' : ''}
                        >
                          KES {quickAmount.toLocaleString()}
                        </Button>
                      ))}
                    </div>

                    {paymentStatus === 'pending' && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                          Check your phone for M-Pesa prompt...
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Enter your PIN to complete the payment
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                      disabled={isProcessing || paymentStatus === 'pending'}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : paymentStatus === 'pending' ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Awaiting Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay with M-Pesa
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Secure payment powered by PayHero. You'll receive an STK push on your phone.
                    </p>
                  </form>
                )}
              </Card>
            </div>

            {/* Right Column - Image & Info */}
            <div className="order-2 space-y-6">
              <Card className="overflow-hidden">
                <img
                  src={titheImage}
                  alt="Support MKU CU through giving and tithing"
                  className="w-full h-48 md:h-64 object-cover"
                />
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">Bank Transfer</h3>
                    <p className="text-sm text-muted-foreground mb-3">
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
