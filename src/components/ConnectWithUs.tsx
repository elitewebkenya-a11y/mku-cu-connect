import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube,
  ExternalLink
} from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick responses",
    action: "Chat Now",
    link: "https://wa.me/254700000000",
    color: "bg-green-500/10 text-green-600 dark:text-green-400"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+254 700 000 000",
    action: "Call",
    link: "tel:+254700000000",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Mail,
    title: "Email",
    description: "info@mkucu.org",
    action: "Send Email",
    link: "mailto:info@mkucu.org",
    color: "bg-secondary/10 text-secondary"
  },
  {
    icon: MapPin,
    title: "Location",
    description: "MKU Main Campus",
    action: "Get Directions",
    link: "https://maps.google.com",
    color: "bg-accent/10 text-accent"
  }
];

const socialLinks = [
  { icon: Facebook, link: "#", label: "Facebook" },
  { icon: Instagram, link: "#", label: "Instagram" },
  { icon: Youtube, link: "#", label: "YouTube" },
];

export const ConnectWithUs = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Connect With Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Reach out through any of these channels.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <Card key={index} className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-card overflow-hidden">
              <CardContent className="p-6 text-center">
                <div className={`w-14 h-14 rounded-full ${method.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                <a href={method.link} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {method.action}
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">Follow us on social media</p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:shadow-md transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
