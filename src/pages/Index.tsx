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
        
        <AnimatedSection animation="slide-left">
          <WeeklySchedule />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <UpcomingEvents />
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <EventCalendarPopup />
        </AnimatedSection>
        
        <AnimatedSection animation="slide-right">
          <ChurchAnnouncements />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <LeadersPreview />
        </AnimatedSection>
        
        <AnimatedSection animation="scale">
          <MinistriesPreview />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <CampusFellowships />
        </AnimatedSection>
        
        <AnimatedSection animation="slide-left">
          <LatestSermons />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <PrayerRequestForm />
        </AnimatedSection>
        
        <AnimatedSection animation="slide-right">
          <GivingSection />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <GuestForm />
        </AnimatedSection>
        
        <AnimatedSection animation="scale">
          <LatestBlogPost />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <Testimonials />
        </AnimatedSection>
        
        <AnimatedSection animation="slide-left">
          <GalleryPreview />
        </AnimatedSection>
        
        <AnimatedSection animation="fade-up">
          <ConnectWithUs />
        </AnimatedSection>
        
        <AnimatedSection animation="scale">
          <VisionMission />
        </AnimatedSection>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
