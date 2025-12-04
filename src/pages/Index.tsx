import { EnhancedHeroSlider } from "@/components/EnhancedHeroSlider";
import { DailyVerse } from "@/components/DailyVerse";
import { QuickActions } from "@/components/QuickActions";
import { EnhancedStatsCounter } from "@/components/EnhancedStatsCounter";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { LatestSermons } from "@/components/LatestSermons";
import { GivingSection } from "@/components/GivingSection";
import { LatestBlogPost } from "@/components/LatestBlogPost";
import { Testimonials } from "@/components/Testimonials";
import { GalleryPreview } from "@/components/GalleryPreview";
import { VisionMission } from "@/components/VisionMission";
import { MinistriesPreview } from "@/components/MinistriesPreview";
import { GuestForm } from "@/components/GuestForm";
import { PrayerRequestForm } from "@/components/PrayerRequestForm";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { CampusFellowships } from "@/components/CampusFellowships";
import { VolunteerOpportunities } from "@/components/VolunteerOpportunities";
import { ChurchAnnouncements } from "@/components/ChurchAnnouncements";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <EnhancedHeroSlider />
        <DailyVerse />
        <QuickActions />
        <EnhancedStatsCounter />
        <WeeklySchedule />
        <UpcomingEvents />
        <ChurchAnnouncements />
        <MinistriesPreview />
        <CampusFellowships />
        <VolunteerOpportunities />
        <LatestSermons />
        <PrayerRequestForm />
        <GivingSection />
        <GuestForm />
        <LatestBlogPost />
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