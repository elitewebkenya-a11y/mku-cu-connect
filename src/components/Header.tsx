import { useState } from "react";
import { Menu, X, Youtube, Phone, Mail, Facebook, Instagram, Twitter, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navGroups = {
  main: [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/visitors", label: "I'm New", highlight: true },
  ],
  connect: {
    label: "Connect",
    items: [
      { to: "/schedule", label: "Schedule", desc: "Daily & weekly activities" },
      { to: "/events", label: "Events", desc: "Upcoming gatherings" },
      { to: "/ministries", label: "Ministries", desc: "Serve with your gifts" },
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
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const { isVisible, isAtTop } = useScrollHeader();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileGroup = (group: string) => {
    setOpenMobileGroup(openMobileGroup === group ? null : group);
  };

  return (
    <>
      {/* Top Bar - Only on desktop */}
      <div className={cn(
        "bg-primary text-primary-foreground py-2 hidden lg:block transition-all duration-300",
        !isVisible && "-translate-y-full opacity-0"
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
        "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm fixed left-0 right-0 z-50 border-b border-border transition-all duration-300",
        !isVisible && "-translate-y-full",
        isVisible && !isAtTop && "shadow-lg",
        isAtTop ? "top-0 lg:top-10" : "top-0"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="MKU CU Logo" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105"
              />
              <div>
                <div className="font-serif font-bold text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
                  MKU Christian Union
                </div>
                <div className="text-xs text-muted-foreground italic hidden sm:block">
                  Living the Knowledge of God
                </div>
              </div>
            </Link>

            {/* Desktop Navigation with Dropdowns */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-1">
                {navGroups.main.map(item => (
                  <NavigationMenuItem key={item.to}>
                    <Link to={item.to}>
                      <NavigationMenuLink className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                        isActive(item.to) && "bg-accent text-accent-foreground",
                        item.highlight && "bg-accent text-accent-foreground font-semibold"
                      )}>
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                {/* Connect Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 rounded-lg">Connect</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-3 w-56">
                      {navGroups.connect.items.map(item => (
                        <li key={item.to}>
                          <Link 
                            to={item.to} 
                            className={cn(
                              "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.to) && "bg-accent"
                            )}
                          >
                            <div className="text-sm font-semibold mb-1">{item.label}</div>
                            <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Media Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 rounded-lg">Media</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-3 w-56">
                      {navGroups.media.items.map(item => (
                        <li key={item.to}>
                          <Link 
                            to={item.to} 
                            className={cn(
                              "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.to) && "bg-accent"
                            )}
                          >
                            <div className="text-sm font-semibold mb-1">{item.label}</div>
                            <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Engage Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 py-2 rounded-lg">Engage</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-1 p-3 w-56">
                      {navGroups.engage.items.map(item => (
                        <li key={item.to}>
                          <Link 
                            to={item.to} 
                            className={cn(
                              "block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive(item.to) && "bg-accent"
                            )}
                          >
                            <div className="text-sm font-semibold mb-1">{item.label}</div>
                            <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
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
                <Button variant="outline" size="sm" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
                  <Youtube className="w-4 h-4" />
                  Watch Live
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <NotificationBell />
              <ThemeToggle />
              <button
                className="p-2 rounded-lg hover:bg-accent transition-colors"
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
          <div className="lg:hidden border-t bg-background/98 backdrop-blur-md max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {/* Main Links */}
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)} 
                className={cn(
                  "flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-colors",
                  isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                )}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)} 
                className={cn(
                  "flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-colors",
                  isActive("/about") ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                )}
              >
                About
              </Link>
              <Link 
                to="/visitors" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center justify-between py-3 px-4 rounded-xl font-medium bg-accent text-accent-foreground hover:bg-accent/80 transition-colors"
              >
                I'm New Here
                <ChevronRight className="w-4 h-4" />
              </Link>
              
              {/* Connect Group */}
              <Collapsible open={openMobileGroup === 'connect'} onOpenChange={() => toggleMobileGroup('connect')}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-xl font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <span>Connect</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", openMobileGroup === 'connect' && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-1">
                  {navGroups.connect.items.map(item => (
                    <Link 
                      key={item.to}
                      to={item.to} 
                      onClick={() => setIsMenuOpen(false)} 
                      className={cn(
                        "flex flex-col py-3 px-4 rounded-xl transition-colors",
                        isActive(item.to) ? "bg-primary/10 text-primary" : "hover:bg-accent"
                      )}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              
              {/* Media Group */}
              <Collapsible open={openMobileGroup === 'media'} onOpenChange={() => toggleMobileGroup('media')}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-xl font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <span>Media</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", openMobileGroup === 'media' && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-1">
                  {navGroups.media.items.map(item => (
                    <Link 
                      key={item.to}
                      to={item.to} 
                      onClick={() => setIsMenuOpen(false)} 
                      className={cn(
                        "flex flex-col py-3 px-4 rounded-xl transition-colors",
                        isActive(item.to) ? "bg-primary/10 text-primary" : "hover:bg-accent"
                      )}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              
              {/* Engage Group */}
              <Collapsible open={openMobileGroup === 'engage'} onOpenChange={() => toggleMobileGroup('engage')}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-xl font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <span>Engage</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", openMobileGroup === 'engage' && "rotate-180")} />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-1">
                  {navGroups.engage.items.map(item => (
                    <Link 
                      key={item.to}
                      to={item.to} 
                      onClick={() => setIsMenuOpen(false)} 
                      className={cn(
                        "flex flex-col py-3 px-4 rounded-xl transition-colors",
                        isActive(item.to) ? "bg-primary/10 text-primary" : "hover:bg-accent"
                      )}
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              
              {/* Bottom Actions */}
              <div className="pt-4 mt-4 border-t space-y-3">
                <a href="https://chat.whatsapp.com/I0O4FU8BFMo59CwKnnVB29" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    Join MKU CU Community
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://www.youtube.com/live/2nKqPUZFPCE" target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <Youtube className="w-4 h-4" />
                    Watch Live Service
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
      
      {/* Spacer for fixed header */}
      <div className={cn("transition-all duration-300", isAtTop ? "h-14 lg:h-24" : "h-14")} />
    </>
  );
};
