import React from "react";
import { ArrowRight, Star, Search, X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import StandardHeader from "@/components/StandardHeader";
import ScrollToTop from "@/components/ScrollToTop";
import { useTypewriter } from "@/hooks/use-typewriter";
import NewsletterService from "@/services/newsletterService";

// Import product images
import airfreshersgroup from "@/assets/productimages/airfreshersgroup.jpg";
import airfresherscat from "@/assets/productimages/airfresherscat.png";
import airfreshersviolet from "@/assets/productimages/airfreshersviolet.jpg";
import airfresherspray from "@/assets/productimages/airfresherspray.jpg";
import liquidsoupyellow from "@/assets/productimages/liquidsoupyellow.jpg";
import liquidsoup from "@/assets/productimages/liquidsoup.png";
import showergelcat from "@/assets/productimages/showergelcat.png";
import showergel2colors from "@/assets/productimages/showergel2colors.jpg";
import showergelyellow from "@/assets/productimages/showergelyellow.jpg";
import insertspray from "@/assets/productimages/insertspray.png";
import glasscleaners from "@/assets/productimages/glasscleaners.png";
import fabricsoftener from "@/assets/productimages/fabricsoftener.jpg";
import softners from "@/assets/productimages/softners.png";
import airfresher12 from "@/assets/productimages/airfresher12.jpg";
import allproducts from "@/assets/productimages/allproducts.jpg";
import perfumes from "@/assets/productimages/perfumes.jpg";
import redperf from "@/assets/productimages/redperf.png";
import sanitizer60ml from "@/assets/productimages/sanitizer-60ml.png";
import sanitizer350ml from "@/assets/productimages/sanitizer-350ml.png";

// Import hero background image
import ourbrandsBg from "@/assets/ourbrands.png";

export default function OurBrands() {
  const productCategories = [
    {
      name: "AIR FRESHENER",
      description: "Transform your living spaces with our invigorating air fresheners that create a welcoming atmosphere.",
      image: airfresherscat,
      features: ["Long-lasting fragrance", "Natural ingredients", "Multiple scents available"]
    },
    {
      name: "PERFUME & BODY SPLASH",
      description: "Luxurious perfumes and body splashes that define your personal style and leave lasting impressions.",
      image: perfumes,
      features: ["Premium fragrances", "Long-lasting scent", "Elegant packaging"]
    },
    {
      name: "LIQUID SOAP",
      description: "Multipurpose liquid soaps that provide effective cleaning while being gentle on your skin.",
      image: liquidsoup,
      features: ["Gentle formula", "Antibacterial protection", "Moisturizing properties"]
    },
    {
      name: "SHOWER GEL",
      description: "Moisturizing shower gels that keep you feeling refreshed and protected all day long.",
      image: showergelcat,
      features: ["Deep cleansing", "Skin nourishment", "Refreshing scents"]
    },
    {
      name: "INSECTICIDE SPRAY",
      description: "Effective insecticide sprays that ensure your home is always immaculate and safe.",
      image: insertspray,
      features: ["Powerful protection", "Safe for family use", "Long-lasting effect"]
    },
    {
      name: "GLASS CLEANER",
      description: "Professional-grade glass cleaners that deliver streak-free shine and crystal-clear results.",
      image: glasscleaners,
      features: ["Streak-free formula", "Quick drying", "Safe for all surfaces"]
    },
    {
      name: "FABRIC SOFTENER",
      description: "Gentle fabric softeners that keep your clothes soft, fresh, and beautifully scented.",
      image: softners,
      features: ["Softens fabrics", "Long-lasting freshness", "Color-safe formula"]
    },
    {
      name: "SANITIZER",
      description: "Protective hand sanitizers that keep you feeling refreshed and protected throughout the day.",
      image: sanitizer60ml,
      features: ["99.9% germ protection", "Non-drying formula", "Portable design"]
    }
  ];

  const bestSellers = [
    {
      name: "BR4",
      category: "Air Freshener",
      rating: 4.8,
      price: "₵25.00",
      image: airfreshersviolet
    },
    {
      name: "BR11",
      category: "Perfume",
      rating: 4.9,
      price: "₵45.00",
      image: redperf
    },
    {
      name: "BR7",
      category: "Liquid Soap",
      rating: 4.7,
      price: "₵18.00",
      image: liquidsoupyellow
    },
    {
      name: "BR1",
      category: "Shower Gel",
      rating: 4.8,
      price: "₵22.00",
      image: showergelyellow
    }
  ];

  const heroText = "OUR\nBRANDS";
  const { typewriterIndex } = useTypewriter({ 
    text: heroText, 
    speed: 200, 
    delay: 15000 
  });

  return (
    <div className="min-h-screen">
      <StandardHeader />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.9) 50%, rgba(245, 158, 11, 0.9) 100%), url("' + ourbrandsBg + '")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-coty-navy leading-tight mb-8 animate-fade-in-up animation-delay-800">
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
                              ? 'typed text-coty-navy opacity-100' 
                              : 'text-coty-navy opacity-20'
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
            
            <p className="text-xl text-coty-gray mb-8 max-w-3xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-0">
              Explore our diverse selection of products, meticulously crafted to bring convenience, 
              freshness, and luxury into your home.
            </p>

            <div className="mt-12 text-coty-gray font-medium mobile-center animate-fade-in-up animation-delay-1200">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">DISCOVER OUR PRODUCTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Scientific Expertise Section */}
      <section className="py-16 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-coty-navy mb-4">OUR PRODUCT CATEGORIES</h2>
            <p className="text-base sm:text-lg text-coty-gray max-w-3xl mx-auto">
              Discover our specialized product categories that bring freshness, cleanliness, and comfort to your home and personal care needs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Air Fresheners Card */}
            <div className="group flex flex-col items-center text-center cursor-pointer" onClick={() => window.location.href = '/air-fresheners'}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={airfresherscat}
                  alt="Air Fresheners" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-coty-navy">AIR FRESHENERS</h3>
            </div>

            {/* Perfumes & Body Care Card */}
            <div className="group flex flex-col items-center text-center cursor-pointer" onClick={() => window.location.href = '/perfumes-body-care'}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={perfumes}
                  alt="Perfumes & Body Care" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-coty-navy">PERFUMES & BODY CARE</h3>
            </div>

            {/* Cleaning Products Card */}
            <div className="group flex flex-col items-center text-center cursor-pointer" onClick={() => window.location.href = '/cleaning-products'}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={glasscleaners}
                  alt="Cleaning Products" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-coty-navy">CLEANING PRODUCTS</h3>
            </div>

            {/* Personal Care Card */}
            <div className="group flex flex-col items-center text-center cursor-pointer" onClick={() => window.location.href = '/personal-care'}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={showergelcat}
                  alt="Personal Care" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-coty-navy">PERSONAL CARE</h3>
            </div>

            {/* Home Care Card */}
            <div className="group flex flex-col items-center text-center cursor-pointer" onClick={() => window.location.href = '/home-care'}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={softners}
                  alt="Home Care" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-coty-navy">HOME CARE</h3>
            </div>

            {/* View All Products Card */}
            <div className="group flex flex-col items-center text-center cursor-pointer" onClick={() => window.location.href = '/all-products'}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={allproducts}
                  alt="View All Products" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-coty-navy">VIEW ALL PRODUCTS</h3>
            </div>
          </div>

          <div className="text-center">
            <a href="/contact-us" className="inline-flex items-center gap-2 px-6 py-3 bg-coty-navy text-white font-medium rounded-lg hover:bg-coty-gold hover:text-coty-navy transition-all duration-300 group shadow-md">
              CONTACT US FOR MORE INFO
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-coty-gray-light">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Best Selling Products</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              Discover our most popular products that customers love and trust. These are our top-performing items across all categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, index) => (
              <Card key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-2 border-transparent hover:border-coty-navy/20 group">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-coty-navy mb-2 group-hover:text-coty-navy/80 transition-colors duration-300">{product.name}</h3>
                  <p className="text-coty-gray text-sm mb-3">{product.category}</p>
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-coty-gray ml-2">({product.rating})</span>
                  </div>
                  <div className="text-sm text-coty-gray bg-coty-gray-light px-3 py-2 rounded-full inline-block">
                    Best Seller
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Promise Section */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-coty-navy mb-6">Our Quality Promise</h2>
              <p className="text-lg text-coty-gray mb-6">
                With years of experience, we specialize in creating high-quality products that exceed expectations. 
                Our commitment to excellence drives us to innovate and deliver products that bring joy and comfort 
                to daily routines.
              </p>
              <p className="text-lg text-coty-gray mb-8">
                From invigorating air fresheners that transform your living spaces to luxurious perfumes and 
                body splashes that define your personal style, our products are designed to enrich your everyday experiences.
              </p>
              <Button className="w-fit flex items-center gap-4 px-8 py-4 bg-coty-navy text-white text-md font-medium rounded-br-3xl hover:bg-transparent hover:text-coty-navy border border-coty-navy transition-colors duration-300">
                LEARN MORE
                <ArrowRight className="text-2xl" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src={allproducts}
                alt="Quality Products" 
                className="rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              />
            </div>
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
              className="flex-grow px-6 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-transparent"
              id="newsletter-email"
            />
            <button 
              className="px-8 py-4 bg-[#2E7D32] text-white font-medium rounded-br-3xl hover:bg-transparent hover:text-[#2E7D32] border border-[#2E7D32] transition-colors duration-300 whitespace-nowrap"
              onClick={() => {
                const emailInput = document.getElementById('newsletter-email') as HTMLInputElement;
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