import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* About */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-sm">MKU</span>
              </div>
              <div>
                <div className="font-serif font-bold text-base md:text-lg">MKU CU</div>
                <div className="text-xs text-muted-foreground italic">Living the Knowledge of God</div>
              </div>
            </div>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4">
              Nurturing belief in Christ and developing Christ-like character through discipleship, 
              evangelism, and missions at Mount Kenya University.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="https://wa.me/254115475543" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://wa.me/254115475543" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/live/2nKqPUZFPCE?si=aS38jGEpbkIwBpHc" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://wa.me/254115475543" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-muted hover:bg-secondary rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-serif font-bold text-base md:text-lg mb-3 md:mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors inline-block min-h-[44px] md:min-h-0 flex items-center justify-center md:justify-start">About Us</Link></li>
              <li><Link to="/events" className="hover:text-primary transition-colors inline-block min-h-[44px] md:min-h-0 flex items-center justify-center md:justify-start">Events Calendar</Link></li>
              <li><Link to="/media" className="hover:text-primary transition-colors inline-block min-h-[44px] md:min-h-0 flex items-center justify-center md:justify-start">Media & Sermons</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors inline-block min-h-[44px] md:min-h-0 flex items-center justify-center md:justify-start">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors inline-block min-h-[44px] md:min-h-0 flex items-center justify-center md:justify-start">Contact Us</Link></li>
              <li><a href="https://wa.me/254115475543?text=I%20want%20to%20join%20MKU%20CU" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-block min-h-[44px] md:min-h-0 flex items-center justify-center md:justify-start">Join MKU CU</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-serif font-bold text-base md:text-lg mb-3 md:mb-4 text-secondary">Connect With Us</h3>
            <ul className="space-y-3 text-xs md:text-sm text-muted-foreground">
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="https://wa.me/254115475543" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+254 115 475543</a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="mailto:mkucu@mku.ac.ke" className="hover:text-primary transition-colors break-all">mkucu@mku.ac.ke</a>
              </li>
              <li className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Mount Kenya University<br />Thika Campus</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center md:text-left">
            <h3 className="font-serif font-bold text-base md:text-lg mb-3 md:mb-4 text-secondary">Stay Updated</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Get weekly devotionals and event updates</p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="text-sm h-11"
              />
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-sm h-11">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">We respect your privacy</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 md:pt-8 mt-6 md:mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground text-center md:text-left">
            <p>© 2025 Mount Kenya University Christian Union. All rights reserved.</p>
            <p className="text-secondary italic">Living the Knowledge of God - John 17:2-3</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
