import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    alt: "Sunday worship service with congregation",
    caption: "Sunday Worship"
  },
  {
    src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    alt: "Students worshiping with raised hands",
    caption: "Praise Night"
  },
  {
    src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
    alt: "Campus outreach and evangelism",
    caption: "Campus Outreach"
  },
  {
    src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=800&q=80",
    alt: "Bible study group discussion",
    caption: "Bible Study"
  },
  {
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    alt: "Students praying together",
    caption: "Prayer Meeting"
  },
  {
    src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    alt: "Fellowship and community",
    caption: "Fellowship"
  }
];

export const GalleryPreview = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-navy via-navy-light to-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full mb-4">
            <Camera className="w-5 h-5" />
            <span className="text-sm md:text-base font-semibold">Photo Gallery</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-white">
            Moments of Faith & Fellowship
          </h2>
          <p className="text-lg md:text-xl text-gold-light max-w-2xl mx-auto">
            Capturing the joy, worship, and community that make MKU CU special
          </p>
        </div>

        {/* Masonry-style Gallery Grid */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* First Column */}
            <div className="space-y-4">
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={galleryImages[0].src}
                    alt={galleryImages[0].alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{galleryImages[0].caption}</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={galleryImages[1].src}
                    alt={galleryImages[1].alt}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{galleryImages[1].caption}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Second Column */}
            <div className="space-y-4">
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{galleryImages[2].caption}</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={galleryImages[3].src}
                    alt={galleryImages[3].alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{galleryImages[3].caption}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Third Column */}
            <div className="space-y-4">
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={galleryImages[4].src}
                    alt={galleryImages[4].alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{galleryImages[4].caption}</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={galleryImages[5].src}
                    alt={galleryImages[5].alt}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{galleryImages[5].caption}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Fourth Column - Mobile Hidden */}
            <div className="space-y-4 hidden md:block">
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80"
                    alt="Praise and worship team"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">Worship Team</p>
                  </div>
                </div>
              </Card>
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
                    alt="Sunday service congregation"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">Sunday Service</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href="https://wa.me/254115475543?text=I%20want%20to%20see%20more%20photos%20from%20MKU%20CU%20events" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-2 border-gold text-gold hover:bg-gold hover:text-navy">
              View Full Gallery
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
      
      {/* Better Footer Spacing */}
      <div className="h-12"></div>
    </section>
  );
};
