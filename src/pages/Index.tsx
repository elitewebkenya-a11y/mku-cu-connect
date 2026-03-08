import { EnhancedHeroSlider } from "@/components/EnhancedHeroSlider";
import { DailyVerse } from "@/components/DailyVerse";
import { QuickActions } from "@/components/QuickActions";
import { EnhancedStatsCounter } from "@/components/EnhancedStatsCounter";
import { LatestSermons } from "@/components/LatestSermons";
import { GivingSection } from "@/components/GivingSection";
import { LatestBlogPost } from "@/components/LatestBlogPost";
import { GalleryPreview } from "@/components/GalleryPreview";
import { VisionMission } from "@/components/VisionMission";
import { MinistriesPreview } from "@/components/MinistriesPreview";
import { GuestForm } from "@/components/GuestForm";
import { PrayerRequestForm } from "@/components/PrayerRequestForm";
import { UpcomingEvents } from "@/components/UpcomingEvents";
import { CampusFellowships } from "@/components/CampusFellowships";
import { ChurchAnnouncements } from "@/components/ChurchAnnouncements";
import { LeadersPreview } from "@/components/LeadersPreview";
import { ConnectWithUs } from "@/components/ConnectWithUs";
import { ServiceTimes } from "@/components/ServiceTimes";
import { SchedulePreview } from "@/components/SchedulePreview";
import { EventCalendarPopup } from "@/components/EventCalendarPopup";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <EnhancedHeroSlider />
        
        <AnimatedSection animation="fade-up">
          <DailyVerse />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up" delay={100}>
          <QuickActions />
        </AnimatedSection>
        
        <AnimatedSection animation="scale">
          <EnhancedStatsCounter />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <ServiceTimes />
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <SchedulePreview />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <UpcomingEvents />
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <EventCalendarPopup />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <ChurchAnnouncements />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <VisionMission />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <LeadersPreview />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <MinistriesPreview />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <CampusFellowships />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <LatestSermons />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <PrayerRequestForm />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <GivingSection />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <GuestForm />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <LatestBlogPost />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <GalleryPreview />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <ConnectWithUs />
        </AnimatedSection>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;