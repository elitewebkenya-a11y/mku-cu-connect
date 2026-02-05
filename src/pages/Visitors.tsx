import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GuestForm } from "@/components/GuestForm";
import { 
  Heart, MapPin, Clock, Users, BookOpen, 
  MessageCircle, Calendar, Gift, ArrowRight
} from "lucide-react";

const welcomeSteps = [
  {
    icon: Heart,
    title: "We're Glad You're Here",
    description: "Whether you're exploring faith or looking for a church family, you're welcome here."
  },
  {
    icon: Users,
    title: "Meet Our Community",
    description: "Experience genuine fellowship with students who share your journey and support your growth."
  },
  {
    icon: BookOpen,
    title: "Grow in Faith",
    description: "Join Bible studies, discipleship programs, and meaningful worship experiences."
  },
  {
    icon: Gift,
    title: "Discover Your Purpose",
    description: "Find your gifts and use them to serve others through our various ministries."
  }
];

const serviceInfo = [
  {
    title: "Sunday Service",
    time: "Starting at 9:00 AM",
    location: "Auditorium",
    description: "Our main weekly gathering for worship, Word, and fellowship"
  },
  {
    title: "Morning Devotions",
    time: "5:00 AM - 6:00 AM",
    location: "MLT Hall B",
    description: "Start your day with prayer and devotion (Mon-Fri)"
  },
  {
    title: "Lunch Hour Service",
    time: "12:30 PM - 1:30 PM",
    location: "PEFA Church / MLT Block",
    description: "Midday fellowship and teaching (Mon-Fri)"
  },
  {
    title: "Bible Study",
    time: "Various times",
    location: "NC-002 / MLT Building",
    description: "Deep dive into Scripture throughout the week"
  }
];

const faqs = [
  {
    question: "What should I wear?",
    answer: "Come as you are! We welcome everyone regardless of attire. Most students dress casually."
  },
  {
    question: "Where do I park/sit?",
    answer: "Arrive a few minutes early and our ushers will help guide you to a seat. Feel free to sit anywhere!"
  },
  {
    question: "What about my kids?",
    answer: "Children are welcome in our services. We create a family-friendly environment."
  },
  {
    question: "I'm not a Christian, can I still come?",
    answer: "Absolutely! We welcome everyone regardless of their faith background. Come explore and ask questions."
  }
];

const Visitors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h20v20H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M10%2010m-1%200a1%201%200%201%201%202%200a1%201%200%201%201-2%200%22%20fill%3D%22currentColor%22%20opacity%3D%220.05%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-accent text-accent-foreground">Welcome!</Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            New Here? <span className="text-primary">We're So Glad!</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            MKU Christian Union is a vibrant community of believers passionate about 
            knowing Christ and making Him known on campus and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#guest-form">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Let Us Know You're Coming
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline">
                View Service Times
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Welcome Steps */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {welcomeSteps.map((step, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow bg-card">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Join Us</Badge>
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              When We Meet
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We have multiple opportunities throughout the week to gather, worship, and grow together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {serviceInfo.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-card border-l-4 border-l-primary">
                <h3 className="text-xl font-bold text-card-foreground mb-3">{service.title}</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{service.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{service.location}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Common Questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6 bg-card">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-card-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Form */}
      <section id="guest-form" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4">Connect With Us</Badge>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                Plan Your Visit
              </h2>
              <p className="text-muted-foreground">
                Let us know you're coming and we'll make sure someone is there to welcome you!
              </p>
            </div>
            <Card className="p-6 md:p-8 bg-card">
              <GuestForm />
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Have More Questions?
          </h2>
          <p className="mb-6 opacity-90 max-w-xl mx-auto">
            We'd love to hear from you! Reach out to us via WhatsApp or email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/254704021286" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary">
                Chat on WhatsApp
              </Button>
            </a>
            <a href="mailto:mkucuthika@gmail.com">
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Send Email
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Visitors;
