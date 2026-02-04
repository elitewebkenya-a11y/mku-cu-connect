import { useState } from "react";
import { Menu, X, Youtube, Phone, Mail, Facebook, Instagram, Twitter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/mku-cu-logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationBell } from "@/components/NotificationBell";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navGroups = {
  main: [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
  ],
  connect: {
    label: "Connect",
    items: [
      { to: "/schedule", label: "Schedule", desc: "Daily & weekly activities" },
      { to: "/events", label: "Events", desc: "Upcoming gatherings" },
      { to: "/contact", label: "Contact", desc: "Get in touch" },
    ],
  },
  media: {
    label: "Media",
    items: [
      { to: "/media", label: "Sermons", desc: "Watch sermons" },
      { to: "/blog", label: "Blog", desc: "Faith stories" },
      { to: "/gallery", label: "Gallery", desc: "Photos & videos" },
    ],
  },
  engage: {
    label: "Engage",
    items: [
      { to: "/elections", label: "Elections", desc: "Vote for leaders" },
      { to: "/volunteer", label: "Volunteer", desc: "Serve with us" },
    ],
  },
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isVisible, isAtTop } = useScrollHeader();

  return (
    <>
      {/* Top Bar */}
      <div className={cn(
        "bg-primary text-primary-foreground py-2 hidden md:block transition-transform duration-300",
        !isVisible && "-translate-y-full"
      )}>
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
      <header className={cn(
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-md fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300",
        !isVisible && "-translate-y-full",
        isVisible && !isAtTop && "shadow-lg"
      )}>
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

            {/* Desktop Navigation with Dropdowns */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navGroups.main.map(item => (
                  <NavigationMenuItem key={item.to}>
                    <Link to={item.to}>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* Connect Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Connect</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-48">
                      {navGroups.connect.items.map(item => (
                        <li key={item.to}>
                          <Link to={item.to} className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">{item.label}</div>
                            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Media Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Media</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-48">
                      {navGroups.media.items.map(item => (
                        <li key={item.to}>
                          <Link to={item.to} className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">{item.label}</div>
                            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Engage Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Engage</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-2 w-48">
                      {navGroups.engage.items.map(item => (
                        <li key={item.to}>
                          <Link to={item.to} className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium">{item.label}</div>
                            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
          <div className="lg:hidden border-t bg-background max-h-[70vh] overflow-y-auto">
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">Home</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-3 px-3 rounded-lg">About</Link>
              
              {/* Connect Group */}
              <div className="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Connect</div>
              <Link to="/schedule" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-2.5 px-3 rounded-lg ml-2">Schedule</Link>
              <Link to="/events" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-2.5 px-3 rounded-lg ml-2">Events</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-2.5 px-3 rounded-lg ml-2">Contact</Link>
              
              {/* Media Group */}
              <div className="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Media</div>
              <Link to="/media" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-2.5 px-3 rounded-lg ml-2">Sermons</Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-2.5 px-3 rounded-lg ml-2">Blog</Link>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-2.5 px-3 rounded-lg ml-2">Gallery</Link>
              
              {/* Engage Group */}
              <div className="px-3 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Engage</div>
              <Link to="/elections" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-2.5 px-3 rounded-lg ml-2">Elections</Link>
              <Link to="/volunteer" onClick={() => setIsMenuOpen(false)} className="text-foreground hover:text-primary hover:bg-muted font-medium transition-colors py-2.5 px-3 rounded-lg ml-2">Volunteer</Link>
              
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
      
      {/* Spacer for fixed header */}
      <div className="h-14" />
    </>
  );
};
