import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StandardHeader from '@/components/StandardHeader';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Import product images
import fabricsoftener from "@/assets/productimages/fabricsoftener.jpg";
import fabricsoftenergroup from "@/assets/productimages/fabric-softenergroup.png";
import insecticide from "@/assets/productimages/insecticide.jpg";

export default function HomeCare() {
  const homeCareProducts = [
    {
      id: 1,
      name: "BREEZE FABRIC SOFTENER",
      category: "Fabric Softener",
      description: "Enhance the softness and freshness of your laundry with our premium fabric softener. Designed to reduce wrinkles, eliminate static, and leave your clothes with a long-lasting, delightful scent, our fabric softener ensures that every wash feels luxurious. Perfect for all fabrics, it adds a touch of comfort to your clothes while preserving their quality.",
      variants: ["4 Variants"],
      size: "500ml, 1,000ml",
      image: fabricsoftenergroup
    },
    {
      id: 2,
      name: "BREEZE INSECTICIDE SPRAY",
      category: "Insecticide",
      description: "Breeze Insecticide Spray, Multipurpose Insect Killer for Indoor & Perimeter with Comfort Wand kills mosquitoes, ants, cockroaches, spiders, fleas, ticks and other listed bugs; the formula is odor free with sweet scented fragrance, won't stain, and keeps listed bugs out. This spray can be used indoors and out, leaves no residue, and has no odor; people and pets may re-enter treated areas after spray has dried. Protect your home with our fast-acting insecticide spray, designed to effectively eliminate pests while being safe for your family. Its potent formula targets a wide range of insects, providing long-lasting protection and peace of mind.",
      variants: ["3 Variants"],
      size: "400ml",
      image: insecticide
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
              HOME<br />
              <span className="text-coty-navy">CARE</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto lg:mx-0 mb-12 leading-relaxed animate-fade-in-up animation-delay-0">
              Keep your home comfortable and protected with our range of home care products. From fabric softeners that make your clothes feel luxurious to insecticide sprays that keep your home pest-free.
            </p>

            <div className="mt-12 text-coty-gray font-medium mobile-center animate-fade-in-up animation-delay-1200">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">PROTECT YOUR HOME</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Home Care Collection</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              Discover our range of home care products designed to keep your home comfortable, fresh, and protected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeCareProducts.map((product) => (
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