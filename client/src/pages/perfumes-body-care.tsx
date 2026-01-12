import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StandardHeader from '@/components/StandardHeader';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Import product images
import perfumes from "@/assets/productimages/perfumes.jpg";
import bodysplash from "@/assets/productimages/bodysplash.png";

export default function PerfumesBodyCare() {
  const perfumesBodyCareProducts = [
    {
      id: 1,
      name: "YES PERFUME",
      category: "Perfume",
      description: "Indulge in the luxury of our premium perfumes, each bottle a blend of exquisite, long-lasting notes that captivate and linger. Designed to complement your unique style, our perfumes offer an elegant touch for any occasion, leaving a memorable impression.",
      variants: ["PURE PASSION", "SEDUCTION", "ISLAND BOND", "MOTION", "GOLDEN ISLAND"],
      size: "50ml",
      image: perfumes
    },
    {
      id: 2,
      name: "YES BODY SPLASH",
      category: "Body Splash",
      description: "Experience the light, invigorating touch of our body splash, perfect for a quick refresh throughout the day. With its delicate scent and hydrating formula, our body splash keeps you feeling revitalized and confident, wherever you go. It is smooth on the skin and keeps your confidence up all day long.",
      variants: ["GARDEN OF ROSE", "BERRY MELLOW", "LAVENDER DRAMS", "PEACH FUZZ"],
      size: "250ml",
      image: bodysplash
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
              PERFUMES &<br />
              <span className="text-coty-navy">BODY CARE</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto lg:mx-0 mb-12 leading-relaxed animate-fade-in-up animation-delay-0">
              Discover our luxurious perfumes and refreshing body care products designed to enhance your personal style and keep you feeling confident throughout the day.
            </p>

            <div className="mt-12 text-coty-gray font-medium flex items-center justify-center lg:justify-start animate-fade-in-up animation-delay-1200">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">ELEVATE YOUR STYLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Perfumes & Body Care Collection</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              From premium perfumes to refreshing body splashes, our products are designed to complement your unique style and keep you feeling confident.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perfumesBodyCareProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-500"
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