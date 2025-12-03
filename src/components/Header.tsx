import { useState } from "react";
import { Menu, X, Youtube, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/mku-cu-logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+254704021286" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span>+254 704 021286</span>
              </a>
              <a href="mailto:mkucu@mku.ac.ke" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="w-4 h-4" />
                <span>mkucu@mku.ac.ke</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gold transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="hover:text-gold transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-gold transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="hover:text-gold transition-colors"><Twitter className="w-4 h-4" /></a>
              <Button size="sm" className="bg-gold hover:bg-gold/90 text-navy ml-4">Join Us</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background shadow-md sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src={logo} 
                alt="MKU CU Logo" 
                className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
              />
              <div>
                <div className="font-serif font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  MKU Christian Union
                </div>
                <div className="text-xs text-muted-foreground italic hidden md:block">
                  Living the Knowledge of God
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-foreground hover:text-primary font-medium transition-colors">Home</Link>
              <Link to="/about" className="text-foreground hover:text-primary font-medium transition-colors">About</Link>
              <Link to="/events" className="text-foreground hover:text-primary font-medium transition-colors">Events</Link>
              <Link to="/volunteer" className="text-foreground hover:text-primary font-medium transition-colors">Volunteer</Link>
              <Link to="/media" className="text-foreground hover:text-primary font-medium transition-colors">Media</Link>
              <Link to="/blog" className="text-foreground hover:text-primary font-medium transition-colors">Blog</Link>
              <Link to="/contact" className="text-foreground hover:text-primary font-medium transition-colors">Contact</Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                <Youtube className="w-4 h-4 mr-2" />
                Watch Live
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-foreground hover:text-primary font-medium transition-colors py-2">Home</Link>
              <Link to="/about" className="text-foreground hover:text-primary font-medium transition-colors py-2">About</Link>
              <Link to="/events" className="text-foreground hover:text-primary font-medium transition-colors py-2">Events</Link>
              <Link to="/volunteer" className="text-foreground hover:text-primary font-medium transition-colors py-2">Volunteer</Link>
              <Link to="/media" className="text-foreground hover:text-primary font-medium transition-colors py-2">Media</Link>
              <Link to="/blog" className="text-foreground hover:text-primary font-medium transition-colors py-2">Blog</Link>
              <Link to="/contact" className="text-foreground hover:text-primary font-medium transition-colors py-2">Contact</Link>
              <div className="pt-4 border-t space-y-3">
                <Button className="w-full bg-gold hover:bg-gold/90 text-navy">Join MKU CU</Button>
                <Button variant="outline" className="w-full border-2 border-primary text-primary">
                  <Youtube className="w-4 h-4 mr-2" />
                  Watch Live
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
