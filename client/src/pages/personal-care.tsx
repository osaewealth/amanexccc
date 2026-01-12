import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StandardHeader from '@/components/StandardHeader';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Import product images
import showergel2colors from "@/assets/productimages/showergel2colors.jpg";
import airfresher12 from "@/assets/productimages/airfresher12.jpg";
import sanitizer60ml from "@/assets/productimages/sanitizer-60ml.png";
import sanitizer350ml from "@/assets/productimages/sanitizer-350ml.png";

export default function PersonalCare() {
  const personalCareProducts = [
    {
      id: 1,
      name: "BREEZE SHOWER GEL-BIG SIZE",
      category: "Shower Gel",
      description: "Pamper your skin with our luxurious shower gel, enriched with nourishing ingredients that cleanse and moisturize. Infused with a captivating fragrance, it transforms your daily shower into a spa-like experience, leaving your skin soft and smooth. Dive into the long-lasting, refreshing scent of watery hyacinth, sandalwood, and freesia in Breeze Shower Gel that will leave you feeling fresh long after you shower. This moisturizing body wash/shower gel is made with fragrances as beautiful as Bath and Body Works.",
      variants: ["COCONUT", "BLUE SKY", "LEMON", "VANILLA"],
      size: "1000ml",
      image: showergel2colors
    },
    {
      id: 2,
      name: "BREEZE SHOWER GEL",
      category: "Shower Gel",
      description: "Pamper your skin with our luxurious shower gel, enriched with nourishing ingredients that cleanse and moisturize. Infused with a captivating fragrance, it transforms your daily shower into a spa-like experience, leaving your skin soft and smooth. Dive into the long-lasting, refreshing scent of watery hyacinth, sandalwood, and freesia in Breeze Shower Gel that will leave you feeling fresh long after you shower. This moisturizing body wash/shower gel is made with fragrances as beautiful as Bath and Body Works.",
      variants: ["COCONUT", "BLUE SKY", "LEMON", "VANILLA"],
      size: "500ml",
      image: showergel2colors
    },
    {
      id: 3,
      name: "BREEZE HAND SANITIZER",
      category: "Hand Sanitizer",
      description: "Stay protected with our hand sanitizer, formulated to kill 99.9% of germs without drying out your skin. Its fast-absorbing, non-sticky formula makes it the perfect on-the-go solution for maintaining hygiene and safety anytime, anywhere.",
      variants: ["1 Variant"],
      size: "60ml, 100ml",
      image: sanitizer60ml
    },
    {
      id: 4,
      name: "BREEZE HAND SANITIZER-BIG SIZE",
      category: "Hand Sanitizer",
      description: "Stay protected with our hand sanitizer, formulated to kill 99.9% of germs without drying out your skin. Its fast-absorbing, non-sticky formula makes it the perfect on-the-go solution for maintaining hygiene and safety anytime, anywhere.",
      variants: ["1 Variant"],
      size: "350ml",
      image: sanitizer350ml
    }
  ];

  return (
    <div className="min-h-screen">
      <StandardHeader />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)'
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-coty-navy leading-tight mb-8 animate-fade-in-up animation-delay-800">
              PERSONAL<br />
              <span className="text-coty-navy">CARE</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto lg:mx-0 mb-12 leading-relaxed animate-fade-in-up animation-delay-0">
              Pamper yourself with our luxurious personal care products designed to keep you feeling fresh, clean, and protected throughout the day.
            </p>

            <div className="mt-12 text-coty-gray font-medium flex items-center justify-center lg:justify-start animate-fade-in-up animation-delay-1200">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">PAMPER YOURSELF</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Personal Care Collection</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              From luxurious shower gels to protective hand sanitizers, our personal care products are designed to keep you feeling fresh and confident.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalCareProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-coty-gray text-sm font-medium">{product.category}</span>
                    <span className="text-coty-navy text-sm font-bold">{product.size}</span>
                  </div>
                  <h3 className="text-xl font-bold text-coty-navy mb-3">{product.name}</h3>
                  <p className="text-coty-gray mb-4 text-sm leading-relaxed">{product.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-coty-navy mb-2">Variants:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.variants.map((variant, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-coty-navy text-white text-xs rounded-md"
                        >
                          {variant}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
} 