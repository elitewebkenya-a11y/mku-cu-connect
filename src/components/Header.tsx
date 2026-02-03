import { useState } from "react";
import { Menu, X, Youtube, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/mku-cu-logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationBell } from "@/components/NotificationBell";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+254704021286" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+254 704 021 286</span>
              </a>
              <a href="mailto:mkucuthika@gmail.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4" />
                <span>mkucuthika@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/254704021286" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="https://wa.me/254704021286" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="https://www.youtube.com/live/2nKqPUZFPCE" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="https://wa.me/254704021286" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="https://chat.whatsapp.com/I0O4FU8BFMo59CwKnnVB29" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground ml-4">Join Us</Button>
              </a>
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
            <nav className="hidden lg:flex items-center gap-5">
              <Link to="/" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Home</Link>
              <Link to="/about" className="text-foreground hover:text-primary font-medium transition-colors text-sm">About</Link>
              <Link to="/schedule" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Schedule</Link>
              <Link to="/events" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Events</Link>
              <Link to="/media" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Media</Link>
              <Link to="/blog" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Blog</Link>
              <Link to="/gallery" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Gallery</Link>
              <Link to="/elections" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Elections</Link>
              <Link to="/contact" className="text-foreground hover:text-primary font-medium transition-colors text-sm">Contact</Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
              <a href="https://www.youtube.com/live/2nKqPUZFPCE" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Youtube className="w-4 h-4 mr-1" />
                  Live
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <NotificationBell />
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
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Home</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">About</Link>
              <Link to="/schedule" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Schedule</Link>
              <Link to="/events" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Events</Link>
              <Link to="/media" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Media</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Blog</Link>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Gallery</Link>
              <Link to="/elections" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Elections</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Contact</Link>
              <Link to="/volunteer" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Volunteer</Link>
              <div className="pt-3 mt-2 border-t flex gap-2">
                <a href="https://chat.whatsapp.com/I0O4FU8BFMo59CwKnnVB29" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="sm" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">Join MKU CU</Button>
                </a>
                <a href="https://www.youtube.com/live/2nKqPUZFPCE" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    <Youtube className="w-4 h-4 mr-1" />
                    Live
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
