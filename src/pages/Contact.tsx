import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
                Get In Touch
              </h1>
              <p className="text-xl text-gold-light mb-8 animate-fade-in-up">
                We'd love to hear from you. Reach out to us anytime!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8">
                <h2 className="text-3xl font-serif font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input type="tel" placeholder="+254 700 000000" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input placeholder="How can we help you?" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>
                  
                  <Button className="w-full bg-navy hover:bg-navy-light text-white" size="lg">
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="p-8">
                  <h2 className="text-3xl font-serif font-bold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Phone</h3>
                        <p className="text-muted-foreground">+254 704 021286</p>
                        <p className="text-muted-foreground">+254 712 345678</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Email</h3>
                        <p className="text-muted-foreground">mkucu@mku.ac.ke</p>
                        <p className="text-muted-foreground">info@mkucu.org</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Location</h3>
                        <p className="text-muted-foreground">Mount Kenya University</p>
                        <p className="text-muted-foreground">Thika, Kenya</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">Service Times</h3>
                        <p className="text-muted-foreground">Sunday: 7:00 AM - 12:45 PM</p>
                        <p className="text-muted-foreground">Wednesday: 5:00 PM - 7:00 PM</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Social Media */}
                <Card className="p-8">
                  <h3 className="text-2xl font-serif font-bold mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-navy rounded-full flex items-center justify-center hover:bg-navy-light transition-colors"
                    >
                      <Facebook className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-navy rounded-full flex items-center justify-center hover:bg-navy-light transition-colors"
                    >
                      <Instagram className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-navy rounded-full flex items-center justify-center hover:bg-navy-light transition-colors"
                    >
                      <Youtube className="w-6 h-6 text-white" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-navy rounded-full flex items-center justify-center hover:bg-navy-light transition-colors"
                    >
                      <Twitter className="w-6 h-6 text-white" />
                    </a>
                  </div>
                  <p className="text-muted-foreground mt-6">
                    Stay connected with us on social media for updates, events, and daily inspiration.
                  </p>
                </Card>

                {/* Map Placeholder */}
                <Card className="p-8">
                  <h3 className="text-2xl font-serif font-bold mb-4">Find Us</h3>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map Coming Soon</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-navy via-navy-light to-navy text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold mb-6">
                Visit Us This Sunday
              </h2>
              <p className="text-xl text-gold-light mb-8">
                Experience the warmth of our community. We can't wait to meet you!
              </p>
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy">
                Plan Your Visit
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
