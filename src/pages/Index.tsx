import { EnhancedHeroSlider } from "@/components/EnhancedHeroSlider";
import { DailyVerse } from "@/components/DailyVerse";
import { QuickActions } from "@/components/QuickActions";
import { EnhancedStatsCounter } from "@/components/EnhancedStatsCounter";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { LatestSermons } from "@/components/LatestSermons";
import { GivingSection } from "@/components/GivingSection";
import { TodayTestimony } from "@/components/TodayTestimony";
import { Testimonials } from "@/components/Testimonials";
import { GalleryPreview } from "@/components/GalleryPreview";
import { VisionMission } from "@/components/VisionMission";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <EnhancedHeroSlider />
        <DailyVerse />
        <QuickActions />
        <EnhancedStatsCounter />
        <WeeklySchedule />
        <LatestSermons />
        <GivingSection />
        <TodayTestimony />
        <Testimonials />
        <GalleryPreview />
        <VisionMission />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
