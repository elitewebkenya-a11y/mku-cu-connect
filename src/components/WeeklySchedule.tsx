import { Calendar, Clock, MapPin, User, BookOpen, Heart, Mic, MessageCircle, Moon, Book, Flame, ChevronDown, ChevronUp, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const weeklyEvents = [
  {
    day: "SUNDAY",
    date: "November 24, 2025",
    color: "blue",
    borderColor: "border-l-blue-500",
    icon: Heart,
    events: [
      {
        title: "SUNDAY SERVICE",
        time: "7:00 AM - 12:45 PM",
        venue: "Auditorium (MKCC)",
        host: "Pst. Dennis Mutwiri",
        theme: "Living the Knowledge of God",
        scripture: "John 17:2-3",
        services: [
          "First Service: 7:00 - 9:00 AM",
          "Second Service: 9:00 - 11:00 AM",
          "Third Service: 11:00 AM - 12:45 PM"
        ],
        hasLive: true,
      },
      {
        title: "FOUNDATION CLASSES",
        time: "4:00 PM - 6:00 PM",
        venue: "MLT Hall B",
        description: "For new believers and those seeking to strengthen their faith foundation",
        topics: [
          "Salvation & Assurance",
          "Prayer & Bible Study",
          "Living the Christian Life"
        ],
      },
    ],
  },
  {
    day: "MONDAY",
    date: "November 25, 2025",
    color: "green",
    borderColor: "border-l-green-500",
    icon: BookOpen,
    events: [
      {
        title: "BIBLE STUDY",
        time: "7:00 PM - 9:00 PM",
        venue: "Various Home Fellowships",
        description: "Join a Home Fellowship near you",
        fellowships: [
          "Kiganjo/Kiang'ombe",
          "Runda Fellowship",
          "Biafra Fellowship",
          "Mukiriti/Zwni/Town",
          "Starehe Fellowship",
          "School Area Fellowship"
        ],
      },
    ],
  },
  {
    day: "TUESDAY",
    date: "November 26, 2025",
    color: "purple",
    borderColor: "border-l-purple-500",
    icon: BookOpen,
    events: [
      {
        title: "NURTURE CLASS",
        time: "7:00 PM - 9:00 PM",
        venue: "CT Hall",
        subtitle: "Growing in Discipleship",
        topics: [
          "Spiritual Disciplines",
          "Character Development",
          "Ministry & Service",
          "Witnessing & Evangelism"
        ],
        perfectFor: [
          "New Christians",
          "Those wanting to grow deeper",
          "Future ministry leaders"
        ],
      },
    ],
  },
  {
    day: "WEDNESDAY",
    date: "November 27, 2025",
    color: "yellow",
    borderColor: "border-l-yellow-500",
    icon: Mic,
    events: [
      {
        title: "MIDWEEK SERVICE",
        time: "4:00 PM - 6:00 PM",
        venue: "CT Hall",
        description: "A powerful midweek encounter with God's Word",
      },
      {
        title: "DEBATE SESSION",
        time: "6:30 PM - 8:30 PM",
        venue: "CC Hall",
        topic: "Should Christians use psychology and therapy or solely rely on prayer and Scripture?",
        description: "Join us for thoughtful, biblical discussion. All perspectives welcome in love",
      },
      {
        title: "MIDNIGHT PRAYERS",
        time: "11:00 PM - 5:00 AM",
        venue: "CT Hall",
        theme: "Strengthened in the Might of the Spirit",
        scripture: "Ephesians 3:16",
        description: "A powerful night of intercession and seeking God's face",
        bring: [
          "Your Bible",
          "Notebook for journaling",
          "Expectant heart"
        ],
        isSpecial: true,
      },
    ],
  },
  {
    day: "THURSDAY",
    date: "November 28, 2025",
    color: "teal",
    borderColor: "border-l-teal-500",
    icon: Book,
    events: [
      {
        title: "DISCOVERY BIBLE STUDY",
        time: "4:00 PM - 6:00 PM",
        venue: "MLT Hall A",
        description: "Dive deeper into God's Word through interactive discussions, inductive study methods, and life application",
      },
      {
        title: "BEST-P",
        subtitle: "Bible Exposition Self-Training",
        time: "7:00 PM - 9:00 PM",
        venue: "CT Hall",
        topics: [
          "Biblical interpretation",
          "Sermon preparation",
          "Teaching skills",
          "Expository preaching"
        ],
        description: "For those called to teach and preach God's Word",
      },
    ],
  },
  {
    day: "FRIDAY",
    date: "November 29, 2025",
    color: "orange",
    borderColor: "border-l-orange-500",
    icon: Flame,
    events: [
      {
        title: "FELLOWSHIP NIGHT",
        time: "7:00 PM - 9:00 PM",
        venue: "CT Hall",
        description: "End your week in God's presence",
        includes: [
          "Extended worship",
          "Testimonies",
          "Prayer",
          "Fellowship"
        ],
        tagline: "Bring a friend and experience community!",
      },
    ],
  },
  {
    day: "SATURDAY",
    date: "November 30, 2025",
    color: "pink",
    borderColor: "border-l-pink-500",
    icon: Calendar,
    events: [
      {
        title: "SPECIAL EVENT",
        description: "Check back for special Saturday events",
        upcoming: [
          "Ladies/Gents Forums",
          "Care Days",
          "Sports Events",
          "Community Outreach",
          "Leadership Training"
        ],
      },
    ],
  },
];

const DayCard = ({ daySchedule, dayIndex }: { daySchedule: typeof weeklyEvents[0], dayIndex: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const addToCalendar = (event: any, dayName: string) => {
    // Create Google Calendar link
    const eventDate = "20251124"; // November 24, 2025
    const startTime = event.time?.split('-')[0].trim().replace(':', '') + '00' || '070000';
    const endTime = event.time?.split('-')[1]?.trim().split(' ')[0].replace(':', '') + '00' || '180000';
    
    const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
    googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.append('text', event.title);
    googleCalendarUrl.searchParams.append('details', event.description || event.theme || 'MKU CU Event');
    googleCalendarUrl.searchParams.append('location', event.venue || 'MKU Campus, Thika');
    googleCalendarUrl.searchParams.append('dates', `${eventDate}T${startTime}/${eventDate}T${endTime}`);
    
    // Open in new tab
    window.open(googleCalendarUrl.toString(), '_blank');
    
    toast.success(`Opening Google Calendar...`);
  };

  return (
    <div className="animate-fade-in" style={{ animationDelay: `${dayIndex * 50}ms` }}>
      <Card className={`border-l-4 ${daySchedule.borderColor} overflow-hidden hover:shadow-lg transition-shadow`}>
        {/* Compact Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 md:p-6 flex items-start justify-between gap-4 hover:bg-muted/20 transition-colors text-left"
        >
          <div className="flex items-start gap-3 flex-1">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-${daySchedule.color}-500/10 flex items-center justify-center flex-shrink-0`}>
              <daySchedule.icon className={`w-5 h-5 md:w-6 md:h-6 text-${daySchedule.color}-600`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-bold mb-1">{daySchedule.day}</h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-3">{daySchedule.date}</p>
              
              {/* Compact Event Preview */}
              <div className="space-y-2">
                {daySchedule.events.slice(0, isExpanded ? undefined : 2).map((event, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="flex items-start gap-2 mb-1">
                      {event.hasLive && <Badge className="bg-red-500 text-white text-xs h-5">🔴 LIVE</Badge>}
                      <span className="font-semibold line-clamp-1">{event.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      {event.time && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                      )}
                      {event.venue && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Expand/Collapse Button */}
          <div className="flex-shrink-0 pt-1">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="px-4 pb-4 md:px-6 md:pb-6 border-t pt-4 space-y-6">
            {daySchedule.events.map((event, eventIndex) => (
              <div key={eventIndex} className="pb-6 last:pb-0 border-b last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="text-base md:text-lg font-bold">{event.title}</h4>
                      {event.hasLive && (
                        <Badge className="bg-red-500 text-white animate-pulse text-xs">
                          🔴 LIVE
                        </Badge>
                      )}
                      {event.isSpecial && (
                        <Badge className="bg-gold text-navy text-xs">
                          ✨ Special
                        </Badge>
                      )}
                    </div>
                    {event.subtitle && (
                      <p className="text-xs md:text-sm text-muted-foreground italic mb-2">{event.subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {event.time && (
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  {event.venue && (
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                  )}
                  {event.host && (
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span>{event.host}</span>
                    </div>
                  )}
                  {event.theme && (
                    <div className="flex items-center gap-2 text-xs md:text-sm">
                      <BookOpen className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="line-clamp-1">{event.theme}</span>
                    </div>
                  )}
                </div>

                {event.scripture && (
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">
                    <span className="font-semibold">Scripture:</span> {event.scripture}
                  </p>
                )}

                {event.description && (
                  <p className="text-xs md:text-sm text-muted-foreground mb-3">{event.description}</p>
                )}

                {event.topic && (
                  <div className="bg-muted/50 p-3 md:p-4 rounded-lg mb-3">
                    <p className="text-xs md:text-sm font-semibold mb-1">This Week's Topic:</p>
                    <p className="text-xs md:text-sm italic">"{event.topic}"</p>
                  </div>
                )}

                {event.services && (
                  <div className="mb-3">
                    <p className="text-sm md:text-base font-semibold mb-2">Three Services Available:</p>
                    <ul className="space-y-1">
                      {event.services.map((service, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-muted-foreground">• {service}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.topics && (
                  <div className="mb-3">
                    <p className="text-sm md:text-base font-semibold mb-2">Topics covered:</p>
                    <ul className="grid sm:grid-cols-2 gap-1">
                      {event.topics.map((topic, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-muted-foreground">• {topic}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.fellowships && (
                  <div className="mb-3">
                    <p className="text-sm md:text-base font-semibold mb-2">Home Fellowships:</p>
                    <ul className="grid sm:grid-cols-2 gap-1">
                      {event.fellowships.map((fellowship, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-muted-foreground">• {fellowship}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.perfectFor && (
                  <div className="mb-3">
                    <p className="text-sm md:text-base font-semibold mb-2">Perfect for:</p>
                    <ul className="space-y-1">
                      {event.perfectFor.map((item, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-muted-foreground">✓ {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.includes && (
                  <div className="mb-3">
                    <ul className="grid sm:grid-cols-2 gap-1">
                      {event.includes.map((item, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-muted-foreground">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.bring && (
                  <div className="mb-3">
                    <p className="text-sm md:text-base font-semibold mb-2">What to bring:</p>
                    <ul className="space-y-1">
                      {event.bring.map((item, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-muted-foreground">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.upcoming && (
                  <div className="mb-3">
                    <p className="text-sm md:text-base font-semibold mb-2">Upcoming activities include:</p>
                    <ul className="grid sm:grid-cols-2 gap-1">
                      {event.upcoming.map((item, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-muted-foreground">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.tagline && (
                  <p className="text-xs md:text-sm italic text-navy-light mt-3">{event.tagline}</p>
                )}

                <div className="flex flex-wrap gap-2 md:gap-3 mt-4">
                  {event.hasLive && (
                    <a href="https://www.youtube.com/live/2nKqPUZFPCE?si=aS38jGEpbkIwBpHc" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white text-xs md:text-sm">
                        🔴 Watch Live
                      </Button>
                    </a>
                  )}
                  <a href="https://wa.me/254115475543?text=I%20want%20more%20details%20about%20this%20event" target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="text-xs md:text-sm">
                      View Details
                    </Button>
                  </a>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-xs md:text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCalendar(event, daySchedule.day);
                    }}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Add to Calendar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export const WeeklySchedule = () => {
  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 md:mb-4">
              Happening This Week at MKU CU
            </h2>
            <p className="text-base md:text-xl text-muted-foreground">
              November 24 - 30, 2025
            </p>
          </div>

          {/* Weekly Events - Compact Cards */}
          <div className="space-y-4 md:space-y-6">
            {weeklyEvents.map((daySchedule, dayIndex) => (
              <DayCard key={dayIndex} daySchedule={daySchedule} dayIndex={dayIndex} />
            ))}
          </div>

          {/* View Full Schedule CTA */}
          <div className="text-center mt-8 md:mt-12">
            <Button size="lg" className="bg-navy hover:bg-navy-light text-white text-sm md:text-base">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              View Full Week Schedule
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
