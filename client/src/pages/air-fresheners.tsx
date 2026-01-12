import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StandardHeader from '@/components/StandardHeader';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Import air freshener images
import airfreshersgroup from "@/assets/productimages/airfreshersgroup.jpg";
import airfreshers from "@/assets/productimages/airfreshers.jpg";
import airfresherspray from "@/assets/productimages/airfresherspray.jpg";
import airfresher12 from "@/assets/productimages/airfresher12.jpg";
import airfresherblack from "@/assets/productimages/airfresherblack.jpg";
import airfresherblue from "@/assets/productimages/airfresherblue.jpg";

export default function AirFresheners() {
  const airFreshenerProducts = [
    {
      id: 1,
      name: "BREEZE AIR FRESHENER",
      category: "Air Freshener",
      description: "Breeze Air Fresheners is formulated to freshen rooms and enclosed places by releasing fragrances to combat undesirable odors and smells. Breeze Air Freshers are long-lasting air fresheners, expertly crafted to eliminate odors and fill your home with a refreshing, inviting scent. Available in a variety of fragrances, our air fresheners ensure that every room feels clean and vibrant, day after day.",
      variants: ["OCEANIC", "VANILLA", "STRAWBERRY", "ORIENTAL ROSE", "BOUQUET", "BREEZER", "ICEY"],
      size: "250ml",
      image: airfreshers
    },
    {
      id: 2,
      name: "BREEZE AIR FRESHENER-EXTRA STRONG",
      category: "Air Freshener",
      description: "Breeze Air Fresheners is formulated to freshen rooms and enclosed places by releasing fragrances to combat undesirable odors and smells. Breeze Air Freshers are long-lasting air fresheners, expertly crafted to eliminate odors and fill your home with a refreshing, inviting scent. Available in a variety of fragrances, our air fresheners ensure that every room feels clean and vibrant, day after day.",
      variants: ["OCEANIC", "VANILLA", "STRAWBERRY", "ORIENTAL ROSE", "BOUQUET", "BREEZER", "ICEY"],
      size: "275ml",
      image: airfresherspray
    },
    {
      id: 3,
      name: "BREEZE GEL AIR FRESHENER",
      category: "Gel Air Freshener",
      description: "Breeze Gel Air fresheners are great at masking unpleasant odors while infusing your car or space with a fresh clean scent. It keeps your space fresh and inviting with our range of air fresheners, available in multiple scents to suit every preference.",
      variants: ["BLUE BERRY", "SUMMER", "LEMON", "LAVENDER", "PEACH", "STRAWBERRY", "FLORA", "TUITY FRUITY", "VANILLA", "BLACK BERRY"],
      size: "100g",
      image: airfresher12
    },
    {
      id: 4,
      name: "YES AIR FRESHENER",
      category: "Air Freshener",
      description: "Yes Air fresheners are a great way to make your home smell beautiful. Yes Air fresheners are great at masking unpleasant odors while infusing your space with a fresh clean scent.",
      variants: ["GOLDEN ISLAND", "SANDAL WOOD", "ARABIAN ROSE"],
      size: "250ml",
      image: airfresherblack
    },
    {
      id: 5,
      name: "ORIGINAL AIR FRESHENER",
      category: "Air Freshener",
      description: "Original Air fresheners are great at masking unpleasant odors while infusing your space with a fresh clean scent.",
      variants: ["LAVENDER", "STRAWBERRY", "PEACH", "SUMMER", "VANILLA"],
      size: "300ml",
      image: airfresherblue
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
              AIR<br />
              <span className="text-coty-navy">FRESHENERS</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto lg:mx-0 mb-12 leading-relaxed animate-fade-in-up animation-delay-0">
              Transform your living spaces with our invigorating air fresheners that create a welcoming atmosphere. 
              From long-lasting room fresheners to convenient gel options, our products eliminate odors and fill your home with refreshing, inviting scents.
            </p>

            <div className="mt-12 text-coty-gray font-medium flex items-center justify-center lg:justify-start animate-fade-in-up animation-delay-1200">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">FRESHEN YOUR SPACE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Air Freshener Collection</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              Discover our range of air fresheners designed to eliminate odors and create a fresh, inviting atmosphere in any space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airFreshenerProducts.map((product) => (
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