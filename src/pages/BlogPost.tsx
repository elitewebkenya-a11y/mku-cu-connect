import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock, User, Eye, Facebook, Twitter, Link as LinkIcon, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const allBlogPosts = [
  {
    id: "gods-faithfulness-through-challenges",
    title: "God's Faithfulness Through My Darkest Moments",
    excerpt: "I came to MKU broken and lost, but God used this community to restore my faith and give me purpose.",
    author: "Sarah Njeri",
    authorBio: "Sarah is a final year Business student at MKU, passionate about sharing God's love and serving in evangelism ministry. She leads a home fellowship and mentors younger students.",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    date: "November 24, 2025",
    readTime: "8 min read",
    views: 234,
    category: "Testimonies",
    image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Faith", "Testimony", "Transformation", "MKUCU"],
  },
  {
    id: "walking-in-faith-during-exams",
    title: "Walking in Faith During Exams",
    excerpt: "Practical tips on maintaining your spiritual life and trusting God during the examination season.",
    author: "Grace Wanjiru",
    authorBio: "Grace is a third-year student balancing academics and ministry. She's passionate about helping students succeed both spiritually and academically.",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    date: "November 20, 2025",
    readTime: "5 min read",
    views: 189,
    category: "Campus Life",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Exams", "Faith", "Study Tips", "Campus Life"],
  },
  {
    id: "power-of-community-in-campus",
    title: "The Power of Community in Campus",
    excerpt: "Discover how authentic Christian fellowship can transform your university experience.",
    author: "John Kamau",
    authorBio: "John serves as a fellowship leader and is passionate about building authentic Christian community on campus.",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    date: "November 18, 2025",
    readTime: "7 min read",
    views: 312,
    category: "Teaching",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
    tags: ["Community", "Fellowship", "Campus Life"],
  },
];

const blogContent: Record<string, string> = {
  "gods-faithfulness-through-challenges": `
    <p class="text-xl leading-relaxed text-muted-foreground mb-8">
      When I first stepped onto the MKU campus three years ago, I was carrying burdens that felt too heavy for anyone to bear. Depression, anxiety, and a deep sense of purposelessness had become my constant companions. Little did I know that God was about to write the most beautiful chapter of my life.
    </p>

    <h2>The Breaking Point</h2>
    
    <p>My second semester at MKU was the hardest time of my life. I had lost my father just before joining university, and the weight of family expectations, financial struggles, and academic pressure was crushing me. I felt completely alone, even in a campus of thousands of students bustling around me every day.</p>

    <p>The loneliness was suffocating. I would sit in lectures surrounded by people, yet feel utterly isolated. My grades were slipping, my mental health was deteriorating, and I couldn't see a way forward. Some nights, I didn't even want to wake up the next morning.</p>

    <p>One Tuesday afternoon, as I sat alone in my hostel room contemplating giving up on everything, I heard singing from outside my window. It was a group of students from the Christian Union having their weekly fellowship in the courtyard below. Something inside me stirred – a small voice urging me to go check it out.</p>

    <blockquote class="my-8 pl-6 border-l-4 border-gold italic text-lg text-muted-foreground">
      "I didn't know it then, but that decision to walk out of my room and join that fellowship would change the entire trajectory of my life."
    </blockquote>

    <h2>Finding Family in Unexpected Places</h2>

    <p>The warmth and genuine love I encountered at MKU CU was unlike anything I had experienced before. These weren't people putting on a religious show or judging newcomers. They were authentically walking with Jesus, and it showed in how they loved each other and welcomed strangers like me with open arms.</p>

    <p>I remember Grace, one of the fellowship leaders, approached me after that first meeting. She didn't ask invasive questions or give me a religious speech. She simply said, "I'm really glad you came. Would you like to grab tea tomorrow?" That simple invitation marked the beginning of my healing journey.</p>

    <p>Within weeks, I had found not just friends, but a family. People who prayed for me at 2 AM when I texted them in crisis. People who checked on me when I missed fellowship. People who walked with me through my darkest moments without judgment or platitudes. More importantly, through them, I encountered Jesus in a personal, transformative way.</p>

    <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80" alt="People in fellowship" class="w-full rounded-lg my-8" />

    <h2>The Transformation Journey</h2>

    <p>The change didn't happen overnight. Healing never does. It was a journey marked by small victories and occasional setbacks. But through it all, I was never alone. My transformation involved:</p>

    <ul class="my-6 space-y-3">
      <li><strong>Learning to pray:</strong> Moving beyond rote prayers to experiencing God's actual presence and having real conversations with Him</li>
      <li><strong>Being discipled:</strong> Mature believers invested time in my growth, teaching me how to study the Bible and apply it to my life</li>
      <li><strong>Discovering my identity:</strong> Understanding that I'm a daughter of the King, not defined by my circumstances or failures</li>
      <li><strong>Healing from trauma:</strong> Through counseling sessions and prayer ministry, God healed wounds I thought were permanent</li>
      <li><strong>Finding purpose:</strong> Discovering joy in serving others and sharing the love that had been freely given to me</li>
    </ul>

    <p>Today, I stand as a living testimony of God's faithfulness. The girl who once felt worthless now knows she's precious in God's eyes. The one who saw no future now has hope and purpose. The one who was shattered is being made whole, day by day, piece by piece.</p>

    <h2>Lessons I've Learned</h2>

    <p>Looking back on my journey, there are several truths that have anchored my faith:</p>

    <p><strong>1. You don't have to have it all together to come to God.</strong> I came broken, confused, and doubting. God met me right where I was.</p>

    <p><strong>2. Community is not optional.</strong> We need each other. Isolation is one of the enemy's greatest weapons, but authentic fellowship breaks its power.</p>

    <p><strong>3. Healing takes time.</strong> There's no microwave spirituality. God is more interested in lasting transformation than quick fixes.</p>

    <p><strong>4. Your story matters.</strong> What God has done in your life can bring hope to someone else who's struggling right now.</p>

    <blockquote class="my-8 pl-6 border-l-4 border-gold italic text-lg text-muted-foreground">
      "God specializes in turning our messes into messages and our tests into testimonies."
    </blockquote>

    <h2>My Message to You</h2>

    <p>If you're reading this and you're going through a difficult season, I want you to know something important: God sees you. He hasn't forgotten you. The pain you're feeling right now is real and valid, but it doesn't have to be the end of your story.</p>

    <p>The same God who transformed my life can transform yours too. The same community that embraced me is ready to embrace you. You don't have to pretend to have it all together. You don't have to fix yourself before coming to Jesus. Come as you are.</p>

    <p>MKU CU became the vessel through which God reached me, but it's His love and power that changed everything. Don't give up. Take that step of faith. Reach out for help. Join a fellowship. Let people walk with you. Your breakthrough is coming, and it might be closer than you think.</p>

    <div class="bg-gold-light/20 border-l-4 border-gold p-6 rounded-lg my-8">
      <p class="text-lg font-medium text-navy mb-2">A Final Encouragement</p>
      <p class="text-muted-foreground italic">
        Three years later, I'm now serving in leadership at MKU CU, helping to create the same loving, transformative environment that saved my life. If God can use my story to bring hope to even one person reading this, it's all worth it. To God be all the glory! If you need someone to talk to, please don't hesitate to reach out to any MKU CU leader. We're here for you.
      </p>
    </div>
  `,
  "walking-in-faith-during-exams": `
    <p class="text-xl leading-relaxed text-muted-foreground mb-8">
      Exam season can be one of the most stressful times for university students. But what if I told you that this season could also be one of the most spiritually enriching? Here's how to maintain your faith while crushing your exams.
    </p>

    <h2>Start Your Day Right</h2>
    
    <p>Before you open that first textbook, spend time with God. Even 15 minutes of prayer and Bible reading can set the tone for your entire day. Remember, "Seek first His kingdom and His righteousness, and all these things will be given to you as well" (Matthew 6:33).</p>

    <p>I know what you're thinking: "But I don't have time!" Here's the truth – you don't have time NOT to pray. Those 15 minutes with God will give you clarity, peace, and focus that will make the rest of your study time far more productive.</p>

    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80" alt="Student praying" class="w-full rounded-lg my-8" />

    <h2>Study Smart, Not Just Hard</h2>

    <p>God gave you a brain – use it wisely! Create a study schedule, take regular breaks, and don't pull all-nighters. Your body is a temple, and that includes getting enough sleep. Trust that God honors preparation and diligence.</p>

    <ul class="my-6 space-y-3">
      <li><strong>Use the Pomodoro Technique:</strong> Study for 25 minutes, then take a 5-minute break</li>
      <li><strong>Get 7-8 hours of sleep:</strong> Your brain consolidates information during sleep</li>
      <li><strong>Eat properly:</strong> Your brain needs fuel to function optimally</li>
      <li><strong>Exercise:</strong> Even a 15-minute walk can boost your cognitive function</li>
    </ul>

    <blockquote class="my-8 pl-6 border-l-4 border-gold italic text-lg text-muted-foreground">
      "Trust in the Lord with all your heart and lean not on your own understanding." - Proverbs 3:5
    </blockquote>

    <h2>Prayer Partnerships</h2>

    <p>Find a prayer partner or study group within the fellowship. Studying together and praying for each other creates accountability and spiritual support during this intense season. There's something powerful about gathering in Jesus' name before hitting the books.</p>

    <h2>Remember Your Identity</h2>

    <p>Your identity isn't defined by your grades. You're a child of God first, a student second. Do your best, trust God with the results, and don't forget that He has amazing plans for your life regardless of how your exams go!</p>

    <div class="bg-gold-light/20 border-l-4 border-gold p-6 rounded-lg my-8">
      <p class="text-lg font-medium text-navy mb-2">Prayer for Exam Season</p>
      <p class="text-muted-foreground italic">
        "Lord, I commit this exam season into Your hands. Give me wisdom, focus, and peace. Help me to study diligently while trusting in Your sovereignty. Remind me that my worth is not in my grades but in being Your beloved child. In Jesus' name, Amen."
      </p>
    </div>
  `,
  "power-of-community-in-campus": `
    <p class="text-xl leading-relaxed text-muted-foreground mb-8">
      University life can be incredibly isolating. You're surrounded by thousands of students, yet it's easy to feel alone. But God never intended for us to walk this journey alone.
    </p>

    <h2>Why Community Matters</h2>
    
    <p>When you join MKU CU, you're not just attending events—you're becoming part of a family. Hebrews 10:24-25 urges us: "Let us consider how we may spur one another on toward love and good deeds, not giving up meeting together... but encouraging one another."</p>

    <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80" alt="Fellowship community" class="w-full rounded-lg my-8" />

    <h2>Beyond Sunday Services</h2>

    <p>Real community happens in the small moments. It's the home fellowship on Monday evenings where you study God's Word together. It's the late-night conversations after midweek service. It's the friend who texts to check if you're okay when you miss a meeting.</p>

    <blockquote class="my-8 pl-6 border-l-4 border-gold italic text-lg text-muted-foreground">
      "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up." — Ecclesiastes 4:9-10
    </blockquote>

    <h2>Finding Your Tribe</h2>

    <p>MKU CU has over 20 home fellowships across different areas. Each one is a small community where you can be known, loved, and challenged to grow. Don't just attend—dive in. Share your struggles, celebrate your victories, and allow others to speak into your life.</p>

    <div class="bg-gold-light/20 border-l-4 border-gold p-6 rounded-lg my-8">
      <p class="text-lg font-medium text-navy mb-2">Join a Home Fellowship</p>
      <p class="text-muted-foreground">
        Ready to experience authentic community? Visit our contact page to find a home fellowship near you. Don't walk this journey alone!
      </p>
    </div>
  `
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = allBlogPosts.find(p => p.id === slug);

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, we couldn't find that blog post.</p>
          <Link to="/blog">
            <Button className="bg-navy hover:bg-navy-light">
              Back to Blog
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = allBlogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-muted border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-block mb-6">
                <Button variant="ghost" className="text-navy-light hover:text-navy hover:bg-navy/10">
                  ← Back to Blog
                </Button>
              </Link>
              
              <Badge className="mb-4 bg-gold text-navy text-sm">{post.category}</Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <img 
                    src={post.authorImage} 
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-foreground">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <div className="w-full bg-muted">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full aspect-[2/1] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Sidebar - Share */}
                <aside className="lg:col-span-2">
                  <div className="lg:sticky lg:top-24">
                    <h3 className="font-bold text-sm mb-4 text-muted-foreground uppercase tracking-wide">Share</h3>
                    <div className="flex lg:flex-col gap-2">
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="flex-1 lg:w-full justify-start hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2]"
                        onClick={shareOnFacebook}
                      >
                        <Facebook className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline">Facebook</span>
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="flex-1 lg:w-full justify-start hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2]"
                        onClick={shareOnTwitter}
                      >
                        <Twitter className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline">Twitter</span>
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="flex-1 lg:w-full justify-start hover:bg-navy hover:text-white hover:border-navy"
                        onClick={copyLink}
                      >
                        <LinkIcon className="w-4 h-4 lg:mr-2" />
                        <span className="hidden lg:inline">Copy</span>
                      </Button>
                    </div>
                  </div>
                </aside>

                {/* Article Content */}
                <div className="lg:col-span-10">
                  <div 
                    className="prose prose-lg max-w-none
                      prose-headings:font-serif prose-headings:font-bold prose-headings:text-navy
                      prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:leading-tight
                      prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground
                      prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:pl-6 
                      prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:my-8 prose-blockquote:text-muted-foreground
                      prose-ul:my-6 prose-ul:space-y-3
                      prose-li:text-lg prose-li:leading-relaxed prose-li:text-foreground
                      prose-strong:text-navy prose-strong:font-semibold
                      prose-a:text-navy-light prose-a:no-underline hover:prose-a:underline
                      prose-img:rounded-lg prose-img:shadow-md"
                    dangerouslySetInnerHTML={{ __html: blogContent[post.id] || '<p>Content coming soon...</p>' }}
                  />

                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-sm font-bold mb-4 text-muted-foreground uppercase tracking-wide">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-muted hover:bg-muted/80 text-foreground">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Author Bio */}
                  <Card className="mt-12 p-6 md:p-8 bg-muted border-0">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img 
                        src={post.authorImage} 
                        alt={post.author}
                        className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">About {post.author}</h3>
                        <p className="text-muted-foreground leading-relaxed">{post.authorBio}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 md:py-20 bg-muted">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 md:mb-12">
                  Related Articles
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <Badge className="mb-3 bg-navy text-white w-fit">{relatedPost.category}</Badge>
                          <h3 className="text-xl font-bold mb-3 group-hover:text-navy-light transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{relatedPost.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{relatedPost.readTime}</span>
                            </div>
                          </div>
                          <Button variant="link" className="p-0 text-navy-light w-fit mt-4">
                            Read More <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link to="/blog">
                    <Button className="bg-navy hover:bg-navy-light">
                      View All Articles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
