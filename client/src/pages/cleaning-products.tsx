import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StandardHeader from '@/components/StandardHeader';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Import product images
import liquidsoupyellow from "@/assets/productimages/liquidsoupyellow.jpg";
import liquidsoup from "@/assets/productimages/liquidsoup.png";
import liquidsoap750ml from "@/assets/productimages/liquidsoap750 ml.jpg";
import classcleaner from "@/assets/productimages/classcleaner.jpg";

export default function CleaningProducts() {
  const cleaningProducts = [
    {
      id: 1,
      name: "BREEZE MULTIPURPOSE SOAP",
      category: "Liquid Soap",
      description: "Keep your home spotless with our multipurpose liquid soap, a powerful yet gentle formula that tackles dirt and grime on any surface. Ideal for kitchens, bathrooms, and more, this versatile cleaner leaves everything sparkling clean and fresh. Breeze Multipurpose Liquid Soap will leave your dishes and surfaces squeaky clean every time. Get your ultimate clean and be the house Hero with Breeze Multipurpose Liquid Soap.",
      variants: ["LEMON", "FANTASY", "ROSE", "OCEAN"],
      size: "200ml, 500ml, 750ml",
      image: liquidsoap750ml
    },
    {
      id: 2,
      name: "BREEZE MULTIPURPOSE SOAP-5LTR",
      category: "Liquid Soap",
      description: "Keep your home spotless with our multipurpose liquid soap, a powerful yet gentle formula that tackles dirt and grime on any surface. Ideal for kitchens, bathrooms, and more, this versatile cleaner leaves everything sparkling clean and fresh. Breeze Multipurpose Liquid Soap will leave your dishes and surfaces squeaky clean every time. Get your ultimate clean and be the house Hero with Breeze Multipurpose Liquid Soap.",
      variants: ["LEMON", "FANTASY", "ROSE", "OCEAN"],
      size: "5 Litre",
      image: liquidsoup
    },
    {
      id: 3,
      name: "ORIGINAL HAND WASH",
      category: "Hand Wash",
      description: "Wash your hand with our original hand wash soap, a powerful yet gentle formula that tackles dirt and grime on your hands. Ideal for kitchens, restaurants, and more, this versatile cleaner leaves your hands clean and fresh.",
      variants: ["3 Variants"],
      size: "350ml",
      image: liquidsoup
    },
    {
      id: 4,
      name: "GLASS SHINE",
      category: "Glass Cleaner",
      description: "Achieve a crystal-clear shine with our streak-free glass cleaner, expertly formulated to remove smudges and fingerprints. Ideal for windows, mirrors, and glass surfaces, this cleaner leaves behind nothing but a spotless, sparkling finish. No matter what type of glass you've got or any diet surfaces, Glass Shine will leave your glasses and surfaces squeaky clean every time. Get your ultimate clean and be the glass Hero with Glass Shine.",
      variants: ["1 Variant"],
      size: "750ml",
      image: classcleaner
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
              CLEANING<br />
              <span className="text-coty-navy">PRODUCTS</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto lg:mx-0 mb-12 leading-relaxed animate-fade-in-up animation-delay-0">
              Keep your home spotless with our range of powerful yet gentle cleaning products. From multipurpose soaps to specialized cleaners, our products ensure every surface sparkles with cleanliness.
            </p>

            <div className="mt-12 text-coty-gray font-medium flex items-center justify-center lg:justify-start animate-fade-in-up animation-delay-1200">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">CLEAN WITH CONFIDENCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Cleaning Products Collection</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              Discover our range of cleaning products designed to tackle dirt and grime while being gentle on surfaces and your hands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cleaningProducts.map((product) => (
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