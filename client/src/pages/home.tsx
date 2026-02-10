import { useState, useEffect } from "react";
import { Search, Menu, ArrowRight, ChevronDown, X, Phone, Briefcase, Globe, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import HomeHeader from "@/components/HomeHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { useTypewriter } from "@/hooks/use-typewriter";
import jdImage from "@/assets/jd.png";
import banner1Image from "@/assets/Banner1.jpg";
import banner2Image from "@/assets/Banner2.jpg";
import banner3Image from "@/assets/Banner3.jpg";
import banner4Image from "@/assets/productimages/Banner4.jpg";
import banner5Image from "@/assets/Banner5.jpg";

// Import product images
import airfresherscat from "@/assets/productimages/airfresherscat.png";
import airfreshersgroup from "@/assets/productimages/airfreshersgroup.jpg";
import perfumes from "@/assets/productimages/perfumes.jpg";
import glasscleaners from "@/assets/productimages/glasscleaners.png";
import showergel2colors from "@/assets/productimages/showergel2colors.jpg";
import redperf from "@/assets/productimages/redperf.png";
import liquidsoup from "@/assets/productimages/liquidsoup.png";
import donation1 from "@/assets/productimages/donation-1.jpg";
import softners from "@/assets/productimages/softners.png";
import fabricsoftener from "@/assets/productimages/fabricsoftener.jpg";
import fabricsoftenergroup from "@/assets/productimages/fabric-softenergroup.png";
import insertspray from "@/assets/productimages/insertspray.png";
import showergelcat from "@/assets/productimages/showergelcat.png";
import sanitizer60ml from "@/assets/productimages/sanitizer-60ml.png";

// Import Instagram carousel images
import insta1 from '@/assets/insta1.jpg';
import insta2 from '@/assets/insta2.jpg';

import NewsletterService from "@/services/newsletterService";

import { CategoryService } from "@/services/categoryService";

import { useLocation } from "wouter";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentInstaIndex, setCurrentInstaIndex] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const [categories, setCategories] = useState<any[]>([]);

  const [, navigate] = useLocation();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const heroText = "WE ARE\nAMANEX";
  const { typewriterIndex } = useTypewriter({ 
    text: heroText, 
    speed: 200, 
    delay: 15000 
  });

  const heroImages = [
    banner1Image,
    banner2Image,
    banner3Image,
    jdImage
  ];

  // Update this to use mobile and desktop images
  const instaImages = [
    {
      mobile: insta1, // Replace with insta1Mobile when you have mobile-specific images
      desktop: insta1
    },
    {
      mobile: insta2, // Replace with insta2Mobile when you have mobile-specific images
      desktop: insta2
    }
  ];

  useEffect(() => {
    CategoryService.getAll().then(res => {
      // Only active categories
      const activeCategories = res.data.filter((c: any) => c.is_active);
      setCategories(activeCategories);
    })
    .catch(() => {
      setError("Failed to load categories");
    })
    .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log("Home component mounted");
  }, []);

  // Auto-slide effect for hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Auto-slide effect for Instagram carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInstaIndex((prevIndex) => 
        prevIndex === instaImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [instaImages.length]);


  // Product categories data (only first 6)
  // const productCategories = [
  //   {
  //     name: "AIR FRESHENERS",
  //     image: airfresherscat,
  //     link: "/air-fresheners"
  //   },
  //   {
  //     name: "PERFUMES & BODY CARE",
  //     image: perfumes,
  //     link: "/perfumes-body-care"
  //   },
  //   {
  //     name: "CLEANING PRODUCTS",
  //     image: glasscleaners,
  //     link: "/cleaning-products"
  //   },
  //   {
  //     name: "PERSONAL CARE",
  //     image: showergelcat,
  //     link: "/personal-care"
  //   },
  //   {
  //     name: "HOME CARE",
  //     image: insertspray,
  //     link: "/home-care"
  //   },
  //   {
  //     name: "FABRIC SOFTENER",
  //     image: softners,
  //     link: "/fabric-softener"
  //   }
  // ];


  const productCategories = categories.map((category: any) => ({
    id: category.id,
    name: category.name,
    image: category.image,
    link: category.name === "VIEW ALL PRODUCTS"
      ? "/our-brands"
      : `/category/${category.id}`
  }));
  

  // Create infinite loop by duplicating categories
  const infiniteCategories = [...productCategories, ...productCategories];

  // Auto-slide effect for category carousel
  useEffect(() => {

    if (productCategories.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentCategoryIndex(prev => (prev + 1) % productCategories.length);
    }, 6000); // Change category every 6 seconds

    return () => clearInterval(interval);
  }, [productCategories.length]);

  // Touch/swipe handlers for category carousel
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe left - go to next category
      setCurrentCategoryIndex(prev => (prev + 1) % productCategories.length);
    } else if (isRightSwipe) {
      // Swipe right - go to previous category
      setCurrentCategoryIndex(prev => (prev - 1 + productCategories.length) % productCategories.length);
    }
  };


  return (
    <div className="min-h-screen">
      <HomeHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden animate-fade-in">
        {/* Background Images with Auto-Slide */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="text-center lg:text-left w-full">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-8 animate-fade-in-up animation-delay-800 drop-shadow-lg">
              <div className="typewriter-text min-h-[1.2em]">
                {heroText.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex} className="typewriter-line mb-2">
                    {line.split('').map((char, charIndex) => {
                      const totalCharIndex = lineIndex === 0 ? charIndex : lineIndex * line.length + charIndex;
                      const isTyped = totalCharIndex < typewriterIndex;
                      return (
                        <span 
                          key={charIndex} 
                          className={`typewriter-char ${
                            isTyped 
                              ? 'typed text-white opacity-100' 
                              : 'text-white opacity-20'
                          }`}
                        >
                          {char}
                        </span>
                      );
                    })}

                  </div>
                ))}
              </div>
            </h1>
            
            <p className="text-xl text-white mb-8 opacity-90 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-0 drop-shadow-md">
              Discover our diverse selection of products, meticulously crafted to bring convenience, 
              freshness, and luxury into your home.
            </p>
            
            <a 
              href="/about-us" 
              className="bg-transparent text-white px-10 py-6 font-medium hover:bg-white hover:text-coty-navy border-2 border-white transition-all duration-300 flex items-center group w-fit mx-auto lg:mx-0 rounded-br-3xl animate-fade-in-up animation-delay-1200 hover:scale-105"
            >
              WHO WE ARE
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <div className="mt-12 text-white font-medium flex items-center justify-center animate-fade-in-up animation-delay-1600">
              <div className="w-8 h-px bg-white mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">SCROLL UP</span>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20 animate-fade-in-up animation-delay-1200">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Product Categories Carousel Section */}
      <section className="py-16 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-coty-navy mb-4 tracking-tight">OUR TOP PRODUCTS</h2>
            <p className="text-base sm:text-lg text-coty-gray max-w-3xl mx-auto leading-relaxed">
              Discover our specialized product categories that bring freshness, cleanliness, and comfort to your home and personal care needs.
            </p>
          </div>

          {loading && (
            <div className="min-h-screen flex items-center justify-center text-coty-navy font-semibold">
              Loading categories...
            </div>
          )}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Category Carousel with Arrows */}
          <div className="relative w-full mb-12">
            {/* Left Arrow - hidden on mobile */}
            <button
              onClick={() => setCurrentCategoryIndex(prev => (prev - 1 + productCategories.length) % productCategories.length)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-coty-navy rounded-full p-3 shadow-lg transition-all duration-300 ml-2 hidden sm:block"
              aria-label="Previous categories"
            >
              <ChevronDown className="w-6 h-6 text-coty-navy hover:text-white rotate-90 transition-colors duration-300" />
            </button>

            {/* Carousel Content */}
            <div 
              className="overflow-hidden px-12"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCategoryIndex * (100 / (window.innerWidth < 640 ? 2 : 4))}%)` }}
              >
                {infiniteCategories.map((category, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-1/2 sm:w-1/4 px-4"
                  >
                    <div 
                      className="group flex flex-col items-center text-center cursor-pointer"
                      onClick={() => navigate(category.link)}
                    >
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center shadow-coty group-hover:shadow-lg transition-all duration-300 card-elevated">
                        <img 
                          src={category.image}
                          alt={category.name} 
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-coty-navy mt-2">{category.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow - hidden on mobile */}
            <button
              onClick={() => setCurrentCategoryIndex(prev => (prev + 1) % productCategories.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-coty-navy rounded-full p-3 shadow-lg transition-all duration-300 mr-2 hidden sm:block"
              aria-label="Next categories"
            >
              <ChevronDown className="w-6 h-6 text-coty-navy hover:text-white -rotate-90 transition-colors duration-300" />
            </button>
          </div>

          <div className="text-center">
            <a href="/our-brands" className="inline-flex items-center gap-2 px-6 py-3 bg-coty-navy text-white font-medium rounded-lg hover:bg-coty-gold hover:text-coty-navy transition-all duration-300 group shadow-coty">
              VIEW ALL PRODUCTS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Instagram Carousel Section */}
      <section className="w-full pt-2 mb-8">
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
          {instaImages.map((imageSet, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentInstaIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Mobile Image */}
              <img 
                src={imageSet.mobile} 
                alt={`Carousel image ${index + 1} - Mobile`}
                className="w-full h-full object-contain sm:hidden"
              />
              {/* Desktop Image */}
              <img 
                src={imageSet.desktop} 
                alt={`Carousel image ${index + 1} - Desktop`}
                className="hidden sm:block w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission Section - Inspired by Homedede */}
      <section className="bg-red-50 py-16 px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start max-w-7xl mx-auto">
          {/* Image */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <img 
              src={banner4Image} 
              alt="Our Mission" 
              className="w-full h-[300px] md:h-[400px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 object-cover" 
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
            <h2 className="text-4xl font-bold text-coty-navy mb-6 tracking-tight">Our Mission</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              Continuous quality improvement, employment creation,<br />
              and sustainable growth in the manufacturing sector.
            </p>
            <a href="/our-story#mission" className="w-fit flex items-center gap-4 mt-8 px-8 py-4 bg-coty-navy text-white text-md font-medium rounded-br-3xl hover:bg-coty-gold hover:text-coty-navy border border-coty-navy transition-colors duration-300 shadow-coty">
              Learn More
              <ArrowRight className="text-2xl" />
            </a>
          </div>
        </div>
      </section>

      {/* Our Vision Section - Inspired by Homedede */}
      <section className="bg-red-50 py-16 px-4">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-6">
            <h2 className="text-4xl font-bold text-coty-navy mb-6 tracking-tight">Our Vision</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              To become one of Africa's leading household,<br />
              cosmetics, and plastic manufacturers.
            </p>
            <a href="/our-impact#vision" className="w-fit flex items-center gap-4 mt-8 px-8 py-4 bg-coty-navy text-white text-md font-medium rounded-br-3xl hover:bg-coty-gold hover:text-coty-navy border border-coty-navy transition-colors duration-300 shadow-coty">
              Learn More
              <ArrowRight className="text-2xl" />
            </a>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <img 
              src={banner5Image} 
              alt="Our Vision" 
              className="w-full h-[300px] md:h-[400px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 object-cover" 
            />
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section className="py-16 px-4 bg-white relative overflow-hidden">
        {/* Decorative leaf elements */}
        <div className="absolute top-0 left-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M20,20 Q40,5 50,20 T80,20 Q95,40 80,50 T80,80 Q60,95 50,80 T20,80 Q5,60 20,50 Z" 
              fill="none" 
              stroke="#D4A017" 
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M20,20 Q40,5 50,20 T80,20 Q95,40 80,50 T80,80 Q60,95 50,80 T20,80 Q5,60 20,50 Z" 
              fill="none" 
              stroke="#D4A017" 
              strokeWidth="1"
            />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-base text-gray-700 mb-2">Our Newsletter</h3>
            <h2 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter to <span className="text-[#D4A017]">Get Updates on Our Latest Offers</span>
            </h2>
            <p className="text-gray-600 text-sm">
              Be the first to get notified when we have a new product just by subscribing to our newsletter
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter Email Address" 
              className="flex-grow px-6 py-4 rounded-lg border border-gray-3300 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent"
              id="homepage-newsletter-email"
            />
            <button 
              className="px-8 py-4 bg-coty-green text-white font-medium rounded-br-3xl hover:bg-coty-gold hover:text-coty-navy border border-coty-green transition-colors duration-300 whitespace-nowrap shadow-coty"
              onClick={() => {
                const emailInput = document.getElementById('homepage-newsletter-email') as HTMLInputElement;
                if (emailInput && emailInput.value) {
                  // Basic email validation
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (emailRegex.test(emailInput.value)) {
                    const newSubscriber = NewsletterService.addSubscriber(emailInput.value);
                    alert(`Thank you for subscribing with ${emailInput.value}!`);
                    emailInput.value = '';
                    window.dispatchEvent(new CustomEvent('newsletterSubscribed', { detail: newSubscriber }));
                    console.log('New subscriber:', newSubscriber);
                  } else {
                    alert('Please enter a valid email address.');
                  }
                } else {
                  alert('Please enter a valid email address.');
                }
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
