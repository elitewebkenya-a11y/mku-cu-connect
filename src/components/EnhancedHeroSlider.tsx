import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Welcome to MKU Christian Union",
    subtitle: "Living the Knowledge of God",
    verse: '"Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent."',
    verseRef: "— John 17:2-3",
    cta1: { text: "Join MKU CU Today", link: "https://wa.me/254115475543?text=Hello%2C%20I%20would%20like%20to%20join%20MKU%20CU" },
    cta2: { text: "Attend This Sunday", link: "/events" },
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    title: "Join Us for Sunday Worship",
    subtitle: "Every Sunday | 7:00 AM - 12:45 PM",
    location: "Auditorium (MKCC), MKU Thika Campus",
    details: [
      "First Service: 7:00 - 9:00 AM",
      "Second Service: 9:00 - 11:00 AM",
      "Third Service: 11:00 AM - 12:45 PM"
    ],
    theme: "Living the Knowledge of God",
    themeVerse: "John 17:2-3",
    cta1: { text: "View This Week's Program", link: "/events" },
    cta2: { text: "Add to Calendar", link: "https://wa.me/254115475543?text=Hi%2C%20please%20share%20this%20week%27s%20calendar" },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    title: "Never Miss a Message",
    features: [
      "🎥 Watch Weekly Sermons",
      "📖 Listen to Bible Teachings",
      "✨ Experience Powerful Testimonies",
      "🙏 Join Live Services Online"
    ],
    stats: "Join 2,500+ subscribers growing in faith",
    cta1: { text: "🔴 Watch Live Now", link: "https://www.youtube.com/live/2nKqPUZFPCE?si=aS38jGEpbkIwBpHc" },
    cta2: { text: "Visit YouTube Channel", link: "https://www.youtube.com/live/2nKqPUZFPCE?si=aS38jGEpbkIwBpHc" },
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 4,
    title: "🌍 Limuru Sub-Mission 2025",
    subtitle: '"Restored by His Mercy"',
    verse: "1 Peter 1:3",
    date: "📅 October 17-19, 2025",
    location: "📍 Destiny Chapel Limuru",
    activities: [
      "Door-to-Door Evangelism",
      "Crusades & Revivals",
      "School Outreach"
    ],
    tagline: "Be part of God's work in Limuru!",
    cta1: { text: "Learn More", link: "/events" },
    cta2: { text: "Support This Mission", link: "https://wa.me/254115475543?text=I%20want%20to%20support%20the%20Limuru%20mission" },
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 5,
    title: "Become Part of Our Family",
    stats: [
      "500+ Students Growing Together",
      "20+ Home Fellowships",
      "8 Ministry Departments",
      "Countless Lives Transformed"
    ],
    tagline: "Find Your Place in God's Family",
    verse: '"They devoted themselves to the apostles\' teaching and to fellowship, to the breaking of bread and to prayer."',
    verseRef: "— Acts 2:42",
    cta1: { text: "Join WhatsApp Community", link: "https://wa.me/254115475543?text=Hi%2C%20I%20want%20to%20join%20the%20WhatsApp%20community" },
    cta2: { text: "Register as Member", link: "https://wa.me/254115475543?text=I%20want%20to%20register%20as%20an%20MKU%20CU%20member" },
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1920&q=80",
  },
];

export const EnhancedHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px] w-full overflow-hidden touch-pan-y">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
              transition: "transform 5s ease-out",
            }}
          >
            {/* Disable Ken Burns zoom on mobile */}
            <style>{`
              @media (max-width: 768px) {
                .absolute.inset-0.bg-cover.bg-center {
                  transform: scale(1) !important;
                }
              }
            `}</style>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
          
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-5xl mx-auto animate-fade-in-up">
              {/* Slide 1: Main Welcome */}
              {slide.id === 1 && (
                <>
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 md:mb-5 leading-tight drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gold mb-3 md:mb-5 font-semibold">
                    {slide.subtitle}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 italic mb-2 max-w-3xl mx-auto leading-relaxed">
                    {slide.verse}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gold-light mb-6 md:mb-8">
                    {slide.verseRef}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full max-w-lg mx-auto">
                    <a href={slide.cta1.link} target={slide.cta1.link.startsWith('http') ? '_blank' : undefined} rel={slide.cta1.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="w-full sm:w-auto">
                      <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base shadow-glow w-full">
                        {slide.cta1.text} →
                      </Button>
                    </a>
                    <a href={slide.cta2.link} target={slide.cta2.link.startsWith('http') ? '_blank' : undefined} rel={slide.cta2.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="w-full sm:w-auto">
                      <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base w-full">
                        {slide.cta2.text} →
                      </Button>
                    </a>
                  </div>
                </>
              )}

              {/* Slide 2: Sunday Service */}
              {slide.id === 2 && (
                <>
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-2 md:mb-3 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-xl text-gold mb-2">
                    {slide.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-white/90 mb-3 md:mb-4">
                    {slide.location}
                  </p>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-5 mb-3 md:mb-5 max-w-2xl mx-auto">
                    <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3">Three Services:</h3>
                    <div className="space-y-1 text-white/90 text-xs md:text-base">
                      {slide.details?.map((detail, idx) => (
                        <p key={idx}>• {detail}</p>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 md:mb-6">
                    <p className="text-gold text-sm md:text-lg font-bold">This Week's Theme:</p>
                    <p className="text-white text-base md:text-xl font-serif">{slide.theme}</p>
                    <p className="text-gold-light text-xs md:text-sm">{slide.themeVerse}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center w-full max-w-lg mx-auto">
                    <a href={slide.cta1.link} target={slide.cta1.link.startsWith('http') ? '_blank' : undefined} rel={slide.cta1.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="w-full sm:w-auto">
                      <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm w-full">
                        {slide.cta1.text}
                      </Button>
                    </a>
                    <a href={slide.cta2.link} target={slide.cta2.link.startsWith('http') ? '_blank' : undefined} rel={slide.cta2.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="w-full sm:w-auto">
                      <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm w-full">
                        {slide.cta2.text}
                      </Button>
                    </a>
                  </div>
                </>
              )}

              {/* Slide 3: YouTube */}
              {slide.id === 3 && (
                <>
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 md:mb-6 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6 max-w-3xl mx-auto">
                    {slide.features?.map((feature, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md rounded-lg p-2 md:p-3">
                        <p className="text-white text-xs md:text-base">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gold-light mb-4 md:mb-6">
                    {slide.stats}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center w-full max-w-lg mx-auto">
                    <a href={slide.cta1.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm w-full">
                        {slide.cta1.text}
                      </Button>
                    </a>
                    <a href={slide.cta2.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm w-full">
                        {slide.cta2.text} →
                      </Button>
                    </a>
                  </div>
                </>
              )}

              {/* Slide 4: Mission Event */}
              {slide.id === 4 && (
                <>
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-2 md:mb-3 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-2xl text-gold font-serif italic mb-2">
                    {slide.subtitle}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gold-light mb-3 md:mb-4">{slide.verse}</p>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 md:p-5 mb-3 md:mb-5 max-w-2xl mx-auto">
                    <p className="text-white text-sm md:text-lg mb-1">{slide.date}</p>
                    <p className="text-white text-sm md:text-lg mb-2 md:mb-3">{slide.location}</p>
                    <div className="space-y-1 text-white/90 text-xs md:text-base">
                      {slide.activities?.map((activity, idx) => (
                        <p key={idx}>✓ {activity}</p>
                      ))}
                    </div>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-gold mb-4 md:mb-6 font-semibold">
                    {slide.tagline}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center w-full max-w-lg mx-auto">
                    <a href={slide.cta1.link} className="w-full sm:w-auto">
                      <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm w-full">
                        {slide.cta1.text}
                      </Button>
                    </a>
                    <a href={slide.cta2.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm w-full">
                        {slide.cta2.text}
                      </Button>
                    </a>
                  </div>
                </>
              )}

              {/* Slide 5: Community */}
              {slide.id === 5 && (
                <>
                  <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 md:mb-6 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-6 max-w-3xl mx-auto">
                    {Array.isArray(slide.stats) && slide.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md rounded-lg p-2 md:p-3">
                        <p className="text-white text-xs md:text-base font-semibold">{stat}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-gold mb-3 md:mb-4 font-semibold">
                    {slide.tagline}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/90 italic mb-1 max-w-3xl mx-auto">
                    {slide.verse}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-gold-light mb-4 md:mb-6">
                    {slide.verseRef}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center w-full max-w-lg mx-auto">
                    <a href={slide.cta1.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm w-full">
                        {slide.cta1.text}
                      </Button>
                    </a>
                    <a href={slide.cta2.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-4 py-3 md:px-6 md:py-4 text-xs md:text-sm w-full">
                        {slide.cta2.text} →
                      </Button>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Scroll Indicator */}
          {index === currentSlide && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-center">
              <p className="text-white/60 text-sm mb-2">Scroll to explore</p>
              <ChevronDown className="w-8 h-8 text-white/60 mx-auto" />
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot Indicators - Larger on mobile */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 md:h-3 rounded-full transition-all min-h-[44px] md:min-h-0 flex items-center ${
              index === currentSlide 
                ? "bg-gold w-8 md:w-10" 
                : "bg-white/50 w-3 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
