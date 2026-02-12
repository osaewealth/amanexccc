import { useState, useEffect } from "react";
import { ShieldCheck, School, Store, UserPlus, ArrowRight, Zap, CheckCircle2, Users, Heart, Leaf, Award, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import Footer from "@/components/Footer";
import StandardHeader from "@/components/StandardHeader";
import ScrollToTop from "@/components/ScrollToTop";

// Import images
import schoolDonationImg from "@/assets/productimages/donation-1.jpg"; 
import marketCleanupImg from "@/assets/ourimpact.png";
import ourimpactBg from "@/assets/ourimpact.png"; 

export default function CSRPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stories = [
    {
      id: "school-safety",
      title: "Oshiyie School Hygiene Initiative",
      subtitle: "Protecting our neighbors' future through education",
      category: "Education & Health",
      icon: <School className="w-8 h-8 text-blue-600" />,
      image: marketCleanupImg,
      description: "As Ghana's leading hygiene product manufacturer, we're committed to supporting education in our local community. Our partnership with Oshiyie Basic School ensures students have access to essential hygiene products and learning materials.",
      actions: [
        "Monthly supply of 500+ bottles of hand wash for all student restrooms",
        "Donation of 150+ mono-desks and educational materials in 2024",
        "Quarterly hygiene workshops reaching 800+ students on proper sanitation",
        "Provision of water purification tablets for school drinking water"
      ],
      stats: { value: "1,500+", label: "Students Benefited" },
      impact: "Reduced school absenteeism by 35% due to improved hygiene"
    },
    {
      id: "market-drive",
      title: "Greater Accra Market Sanitation Program",
      subtitle: "Keeping trade hubs safe and hygienic for all",
      category: "Community Sanitation",
      icon: <Store className="w-8 h-8 text-emerald-600" />,
      image: marketCleanupImg,
      description: "Building on Ghana's national sanitation initiatives, we've expanded our community impact program to support public health in major marketplaces across Greater Accra, reaching thousands of traders and customers.",
      actions: [
        "Weekly disinfection of 25+ market stalls in Makola and Madina markets",
        "Installation of 40 hand-washing stations with our sanitizing products",
        "Distribution of 1,000+ mosquito-repellent units to rural traders",
        "Training 200+ market vendors on proper sanitation practices"
      ],
      stats: { value: "25+", label: "Markets Sanitized" },
      impact: "Improved health outcomes for 10,000+ daily market users"
    },
    {
      id: "community-health",
      title: "Rural Health Outreach Program",
      subtitle: "Bringing healthcare closer to underserved communities",
      category: "Healthcare Access",
      icon: <Heart className="w-8 h-8 text-red-600" />,
      image: ourimpactBg,
      description: "Partnering with local health authorities, we're addressing healthcare gaps in rural Ghana by providing essential medical supplies and supporting community health workers in remote areas.",
      actions: [
        "Monthly medical supply donations to 8 rural health centers",
        "Distribution of 500+ hygiene kits to nursing mothers and children",
        "Sponsorship of mobile health clinics serving 3,000+ remote residents",
        "Training programs for 150+ community health volunteers"
      ],
      stats: { value: "8", label: "Health Centers Supported" },
      impact: "Increased healthcare access for 15,000+ rural residents"
    }
  ];

  return (
    <div className="min-h-screen">
      <StandardHeader />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, rgba(220, 252, 231, 0.9) 0%, rgba(187, 247, 208, 0.9) 50%, rgba(134, 239, 172, 0.9) 100%), url("' + ourimpactBg + '")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 transform translate-x-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex items-center min-h-screen">
          <div className="text-center lg:text-left w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 text-xs font-bold tracking-widest mb-6 animate-fade-in-up">
              <Zap size={14} /> ACTIVE INITIATIVES 2024-2026
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-coty-navy mb-6 animate-fade-in-up animation-delay-300">
              Beyond the <span className="text-coty-gold">Bottle</span>
            </h1>
            <p className="text-xl text-coty-gray max-w-2xl leading-relaxed font-light mb-8 animate-fade-in-up animation-delay-600">
              We don't just manufacture products in Ghana; we invest in the hands that use them. 
              From Oshiyie to the heart of Accra, our CSR is personal.
            </p>
            <div className="mt-8 text-coty-gray font-medium animate-fade-in-up animation-delay-900">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse inline-block"></div>
              <span className="text-sm tracking-wide">DISCOVER OUR IMPACT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-24">
          {stories.map((story, index) => (
            <div key={story.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-coty-gold/10 rounded-[2.5rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="relative rounded-[2rem] shadow-2xl w-full h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-8 right-8 bg-white p-6 rounded-2xl shadow-xl border-t-4 border-coty-gold transform transition-all duration-300 group-hover:-translate-y-2">
                    <div className="text-3xl font-bold text-coty-navy">{story.stats.value}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{story.stats.label}</div>
                    {story.impact && (
                      <div className="text-xs text-coty-navy font-medium mt-2 border-t pt-2">{story.impact}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="p-3 bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">{story.icon}</div>
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">{story.category}</span>
                </div>
                <h2 className="text-4xl font-bold text-coty-navy animate-fade-in-up" style={{ animationDelay: `${index * 200 + 200}ms` }}>{story.title}</h2>
                <p className="text-lg text-coty-gray leading-relaxed italic animate-fade-in-up" style={{ animationDelay: `${index * 200 + 400}ms` }}>"{story.subtitle}"</p>
                <p className="text-coty-gray leading-relaxed animate-fade-in-up" style={{ animationDelay: `${index * 200 + 600}ms` }}>{story.description}</p>
                
                <div className="space-y-4 pt-4 animate-fade-in-up" style={{ animationDelay: `${index * 200 + 800}ms` }}>
                  {story.actions.map((action, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-coty-gray font-medium group-hover:text-coty-navy transition-colors duration-200">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product-Impact Connection */}
      <section className="py-24 bg-coty-gray-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">The Amanex Impact Framework</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">How our products and initiatives create sustainable community transformation.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <Card className="p-8 border-none bg-blue-50/50 rounded-3xl h-full hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-coty-navy/20">
                <ShieldCheck className="w-12 h-12 text-blue-600 mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-coty-navy mb-3 group-hover:text-coty-navy/80 transition-colors duration-300">Health Security</h3>
                <p className="text-sm text-coty-gray">Deploying our 70% alcohol-based sanitizers in 50+ schools and healthcare facilities, reducing infection rates by 40% in high-traffic public areas.</p>
              </Card>
            </div>
            
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Card className="p-8 border-none bg-emerald-50/50 rounded-3xl h-full hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-coty-navy/20">
                <Users className="w-12 h-12 text-emerald-600 mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-coty-navy mb-3 group-hover:text-coty-navy/80 transition-colors duration-300">Community Empowerment</h3>
                <p className="text-sm text-coty-gray">Creating 200+ micro-entrepreneur opportunities through our wholesale distribution network, enabling local businesses to thrive.</p>
              </Card>
            </div>
            
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Card className="p-8 border-none bg-purple-50/50 rounded-3xl h-full hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-coty-navy/20">
                <Leaf className="w-12 h-12 text-purple-600 mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-coty-navy mb-3 group-hover:text-coty-navy/80 transition-colors duration-300">Environmental Stewardship</h3>
                <p className="text-sm text-coty-gray">Implementing eco-friendly packaging solutions and supporting 15+ community recycling initiatives to reduce plastic waste.</p>
              </Card>
            </div>
            
            <div className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <Card className="p-8 border-none bg-amber-50/50 rounded-3xl h-full hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-coty-navy/20">
                <Award className="w-12 h-12 text-amber-600 mb-6 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-coty-navy mb-3 group-hover:text-coty-navy/80 transition-colors duration-300">Sustainable Growth</h3>
                <p className="text-sm text-coty-gray">Investing 15% of annual profits into community development projects, creating lasting positive impact across Greater Accra region.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-coty-navy to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 animate-fade-in-up">Want to suggest a community for our next initiative?</h2>
          <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-300">We're always looking for schools, marketplaces, and communities across Ghana that need hygiene support and sustainable development.</p>
          <a href="/contact-us" className="inline-flex items-center gap-3 bg-coty-green text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:bg-coty-gold hover:text-coty-navy border border-coty-green animate-fade-in-up animation-delay-600">
            GET IN TOUCH <ArrowRight size={20} />
          </a>
          <div className="mt-12 text-blue-200 font-medium animate-fade-in-up animation-delay-900">
            <div className="w-8 h-px bg-blue-200 mx-auto mb-3 animate-pulse"></div>
            <span className="text-sm tracking-wide">TOGETHER WE BUILD A BETTER GHANA</span>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}