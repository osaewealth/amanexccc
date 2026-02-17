import { useState, useEffect } from "react";
import { ShieldCheck, Users, Leaf, Heart, Award, ArrowRight, Zap, TrendingUp, School, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import StandardHeader from "@/components/StandardHeader";
import ScrollToTop from "@/components/ScrollToTop";
import ourimpactBg from "@/assets/ourimpact.png";

export default function CSRPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroText = "CORPORATE\nSOCIAL\nRESPONSIBILITY";

  const initiatives = [
    {
      title: "Education Support",
      description: "Providing hygiene products and learning materials to schools across Ghana",
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      impact: "50+ schools supported, 15,000+ students受益"
    },
    {
      title: "Community Health",
      description: "Supporting healthcare facilities and community health programs in rural areas",
      icon: <Heart className="w-8 h-8 text-red-600" />,
      impact: "8 health centers supported, 20,000+ people受益"
    },
    {
      title: "Environmental Protection",
      description: "Implementing recycling programs and eco-friendly practices",
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      impact: "15+ recycling projects, 50,000+ plastic bottles recycled"
    },
    {
      title: "Economic Empowerment",
      description: "Creating job opportunities and supporting local entrepreneurs",
      icon: <Users className="w-8 h-8 text-purple-600" />,
      impact: "200+ jobs created, 500+ entrepreneurs trained"
    }
  ];

  return (
    <div className="min-h-screen">
      <StandardHeader />

      {/* Hero Section - Matching other pages style */}
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coty-navy/10 text-coty-navy text-sm font-bold mb-8 animate-fade-in-up">
              <Zap size={16} /> OUR COMMITMENT TO GHANA
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-coty-navy leading-tight mb-8 animate-fade-in-up animation-delay-800">
              <div className="typewriter-text min-h-[1.2em]">
                {heroText.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex} className="typewriter-line mb-2">
                    {line}
                  </div>
                ))}
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto lg:mx-0 mb-12 leading-relaxed animate-fade-in-up animation-delay-0">
              Building stronger communities through strategic partnerships and sustainable initiatives. 
              We invest in the future of Ghana beyond our products.
            </p>
            <div className="mt-12 text-coty-gray font-medium flex items-center justify-center lg:justify-start animate-fade-in-up animation-delay-1200">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide">DISCOVER OUR IMPACT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Investment Commitment</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              We're committed to reinvesting 15% of our annual profits back into community development projects across Ghana.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-coty-navy mb-2">₵2.5M+</div>
              <div className="text-gray-600 font-medium">Annual Investment</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-purple-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-coty-navy mb-2">50+</div>
              <div className="text-gray-600 font-medium">Active Projects</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-red-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-coty-navy mb-2">100,000+</div>
              <div className="text-gray-600 font-medium">Lives Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-20 bg-coty-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Key Initiatives</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              Focused programs delivering measurable impact to communities across Ghana
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((initiative, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100"
              >
                <div className="mb-6 transition-transform duration-300 group-hover:scale-110">
                  {initiative.icon}
                </div>
                <h3 className="text-xl font-bold text-coty-navy mb-4 group-hover:text-coty-navy/80 transition-colors duration-300">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {initiative.description}
                </p>
                <div className="text-sm font-medium text-coty-navy border-t pt-4">
                  {initiative.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Areas of Impact</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              How we're making a difference across Ghana
            </p>
          </div>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-6 p-8 bg-blue-50 rounded-2xl hover:shadow-md transition-shadow">
              <ShieldCheck className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-coty-navy mb-3">Health & Safety</h3>
                <p className="text-gray-600 leading-relaxed">
                  Providing essential hygiene products to schools, healthcare facilities, and communities. 
                  Reducing infection rates by 40% in high-traffic public areas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 p-8 bg-green-50 rounded-2xl hover:shadow-md transition-shadow">
              <Leaf className="w-10 h-10 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-coty-navy mb-3">Environmental Stewardship</h3>
                <p className="text-gray-600 leading-relaxed">
                  Implementing eco-friendly packaging and supporting community recycling initiatives. 
                  15+ projects reducing plastic waste and promoting sustainability.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 p-8 bg-purple-50 rounded-2xl hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-coty-navy mb-3">Community Empowerment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Creating micro-entrepreneur opportunities and skills training programs. 
                  200+ jobs created and 500+ entrepreneurs trained through our distribution network.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 p-8 bg-red-50 rounded-2xl hover:shadow-md transition-shadow">
              <Heart className="w-10 h-10 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-coty-navy mb-3">Social Development</h3>
                <p className="text-gray-600 leading-relaxed">
                  Supporting education, healthcare access, and social welfare programs. 
                  Investing ₵500K+ annually in community development projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-coty-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coty-navy to-coty-navy/90"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.03) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.03) 75%)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
              
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-bold mb-8 border border-white/20">
              <Heart className="w-5 h-5 text-coty-gold" />
              <span>JOIN OUR MISSION</span>
            </div>
                  
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Partner With Us to <span className="text-coty-gold">Build a Better Ghana</span>
            </h2>
                  
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Together, we can amplify our impact and create lasting positive change for communities across Ghana. 
              Whether you're a school, healthcare facility, or community organization, we want to hear from you.
            </p>
          </div>
                
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-coty-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <School className="w-8 h-8 text-coty-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Schools & Education</h3>
              <p className="text-blue-100 text-sm">
                Partner with us to provide hygiene education and essential supplies to students across Ghana
              </p>
            </div>
                  
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-coty-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-coty-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Healthcare Facilities</h3>
              <p className="text-blue-100 text-sm">
                Collaborate with us to improve healthcare access and support medical infrastructure in underserved areas
              </p>
            </div>
                  
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-coty-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-coty-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community Groups</h3>
              <p className="text-blue-100 text-sm">
                Work with us on environmental initiatives, economic empowerment, and social development programs
              </p>
            </div>
          </div>
                
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-6 items-center justify-center mb-12">
              <a 
                href="/contact-us" 
                className="px-10 py-4 bg-coty-gold text-coty-navy rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-coty border-2 border-coty-gold flex items-center gap-3"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-5 h-5" />
              </a>
                    
              <div className="text-white text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-blue-200">Support Available</div>
              </div>
            </div>
                  
            <div className="flex flex-wrap justify-center gap-8 text-blue-200 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-coty-gold" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-coty-gold" />
                <span>Custom Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-coty-gold" />
                <span>Long-term Partnership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}