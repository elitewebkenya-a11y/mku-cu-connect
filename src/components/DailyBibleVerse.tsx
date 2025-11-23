import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, RefreshCw } from "lucide-react";

const verses = [
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    theme: "Love & Salvation"
  },
  {
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust & Guidance"
  },
  {
    text: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
    theme: "Strength & Courage"
  },
  {
    text: "The LORD is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
    theme: "Peace & Rest"
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    theme: "Hope & Purpose"
  },
  {
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    reference: "Philippians 4:6",
    theme: "Peace & Prayer"
  },
  {
    text: "The LORD is close to the brokenhearted and saves those who are crushed in spirit.",
    reference: "Psalm 34:18",
    theme: "Comfort & Hope"
  },
];

export const DailyBibleVerse = () => {
  const [verseIndex, setVerseIndex] = useState(0);

  useEffect(() => {
    // Change verse based on day of year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setVerseIndex(dayOfYear % verses.length);
  }, []);

  const currentVerse = verses[verseIndex];

  const getNextVerse = () => {
    setVerseIndex((prev) => (prev + 1) % verses.length);
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-navy via-navy-light to-navy text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm md:text-base font-semibold">Verse of the Day</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
              Today's Word
            </h2>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-gold/20 p-8 md:p-12 text-center">
            <div className="mb-6">
              <span className="inline-block bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold mb-4">
                {currentVerse.theme}
              </span>
            </div>
            
            <blockquote className="text-lg md:text-2xl leading-relaxed mb-6 italic">
              "{currentVerse.text}"
            </blockquote>
            
            <p className="text-gold text-lg md:text-xl font-bold mb-8">
              — {currentVerse.reference}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={getNextVerse}
                variant="outline" 
                className="border-2 border-gold text-gold hover:bg-gold hover:text-navy"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Next Verse
              </Button>
              <Button className="bg-gold hover:bg-gold/90 text-navy">
                <BookOpen className="w-4 h-4 mr-2" />
                Read Full Bible
              </Button>
            </div>
          </Card>

          <p className="text-center text-gold-light text-sm mt-6">
            Verse changes daily. Come back tomorrow for a new word from God!
          </p>
        </div>
      </div>
    </section>
  );
};
