import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary via-primary/90 to-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
                Get In Touch
              </h1>
              <p className="text-xl text-primary-foreground/80 mb-8 animate-fade-in-up">
                We'd love to hear from you. Reach out to us anytime!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="p-8 bg-card border-border">
                <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">First Name</label>
                      <Input placeholder="John" className="bg-background" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Last Name</label>
                      <Input placeholder="Doe" className="bg-background" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                    <Input type="email" placeholder="john@example.com" className="bg-background" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
                    <Input type="tel" placeholder="+254 700 000000" className="bg-background" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Subject</label>
                    <Input placeholder="How can we help you?" className="bg-background" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground">Message</label>
                    <Textarea 
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="bg-background"
                    />
                  </div>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="p-8 bg-card border-border">
                  <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1 text-foreground">Phone / WhatsApp</h3>
                        <p className="text-muted-foreground">+254 704 021 286</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1 text-foreground">Email</h3>
                        <p className="text-muted-foreground">mkucuthika@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1 text-foreground">Location</h3>
                        <p className="text-muted-foreground">Mount Kenya University</p>
                        <p className="text-muted-foreground">Thika, Kenya</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1 text-foreground">Service Times</h3>
                        <p className="text-muted-foreground">Sunday: 7:00 AM - 12:45 PM</p>
                        <p className="text-muted-foreground">Wednesday: 5:00 PM - 7:00 PM</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Social Media */}
                <Card className="p-8 bg-card border-border">
                  <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                    >
                      <Facebook className="w-6 h-6 text-primary-foreground" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                    >
                      <Instagram className="w-6 h-6 text-primary-foreground" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                    >
                      <Youtube className="w-6 h-6 text-primary-foreground" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                    >
                      <Twitter className="w-6 h-6 text-primary-foreground" />
                    </a>
                  </div>
                  <p className="text-muted-foreground mt-6">
                    Stay connected with us on social media for updates, events, and daily inspiration.
                  </p>
                </Card>

                {/* Map Placeholder */}
                <Card className="p-8 bg-card border-border">
                  <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">Find Us</h3>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Map Coming Soon</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-serif font-bold mb-6">
                Visit Us This Sunday
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8">
                Experience the warmth of our community. We can't wait to meet you!
              </p>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
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