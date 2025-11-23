import { useEffect, useState } from "react";
import { BookOpen, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Verse {
  text: string;
  reference: string;
  theme: string;
}

const verses: Verse[] = [
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    theme: "God's Love"
  },
  {
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust"
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    theme: "Strength"
  },
  {
    text: "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters.",
    reference: "Psalm 23:1-2",
    theme: "Peace"
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    theme: "Purpose"
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    theme: "Courage"
  },
  {
    text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles.",
    reference: "Isaiah 40:31",
    theme: "Hope"
  }
];

export const DailyVerse = () => {
  const [currentVerse, setCurrentVerse] = useState<Verse>(verses[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get verse for today based on day of year
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const verseIndex = dayOfYear % verses.length;
    setCurrentVerse(verses[verseIndex]);
  }, []);

  const refreshVerse = () => {
    setIsAnimating(true);
    const currentIndex = verses.indexOf(currentVerse);
    const nextIndex = (currentIndex + 1) % verses.length;
    setTimeout(() => {
      setCurrentVerse(verses[nextIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-navy/5 via-gold/5 to-navy/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-6 md:p-10 bg-white/95 backdrop-blur shadow-xl border-gold/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gold/10 rounded-full">
                <BookOpen className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-navy">Verse of the Day</h2>
                <p className="text-sm text-muted-foreground">{currentVerse.theme}</p>
              </div>
            </div>
            <Button
              onClick={refreshVerse}
              variant="ghost"
              size="icon"
              className="hover:bg-gold/10"
              disabled={isAnimating}
            >
              <RefreshCw className={`w-5 h-5 text-gold ${isAnimating ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <blockquote 
            className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            <p className="text-lg md:text-2xl font-serif text-navy/90 leading-relaxed mb-4 italic">
              "{currentVerse.text}"
            </p>
            <footer className="text-right">
              <cite className="text-base md:text-lg font-semibold text-gold not-italic">
                — {currentVerse.reference}
              </cite>
            </footer>
          </blockquote>
        </Card>
      </div>
    </section>
  );
};
