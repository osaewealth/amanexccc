import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import StandardHeader from '@/components/StandardHeader';
import ScrollToTop from '@/components/ScrollToTop';

// Import product images
import airfreshersgroup from "@/assets/productimages/airfreshersgroup.jpg";
import airfreshers from "@/assets/productimages/airfreshers.png";
import airfresherspray from "@/assets/productimages/airfresherspray.jpg";
import airfresher12 from "@/assets/productimages/airfresher12.jpg";
import airfresherblack from "@/assets/productimages/airfresherblack.jpg";
import airfresherblue from "@/assets/productimages/airfresherblue.jpg";
import fabricsoftener from "@/assets/productimages/fabricsoftener.jpg";
import fabricsoftenergroup from "@/assets/productimages/fabric-softenergroup.png";
import perfumes from "@/assets/productimages/perfumes.png";
import bodysplash from "@/assets/productimages/bodysplash.png";
import insecticide from "@/assets/productimages/insecticide.jpg";
import liquidsoupyellow from "@/assets/productimages/liquidsoupyellow.jpg";
import liquidsoup from "@/assets/productimages/liquidsoup.png";
import liquidsoap750ml from "@/assets/productimages/liquidsoap750 ml.jpg";
import showergel2colors from "@/assets/productimages/showergel2colors.jpg";
import showergel from "@/assets/productimages/showergel.jpg";
import classcleaner from "@/assets/productimages/classcleaner.jpg";
import sanitizer60ml from "@/assets/productimages/sanitizer-60ml.png";
import sanitizer350ml from "@/assets/productimages/sanitizer-350ml.png";

export default function Fragrance() {
  const fragranceProducts = [
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
      size: "250ml",
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
    },
    {
      id: 6,
      name: "BREEZE FABRIC SOFTENER",
      category: "Fabric Softener",
      description: "Enhance the softness and freshness of your laundry with our premium fabric softener. Designed to reduce wrinkles, eliminate static, and leave your clothes with a long-lasting, delightful scent, our fabric softener ensures that every wash feels luxurious. Perfect for all fabrics, it adds a touch of comfort to your clothes while preserving their quality.",
      variants: ["4 Variants"],
      size: "500ml, 1,000ml",
      image: fabricsoftenergroup
    },
    {
      id: 7,
      name: "YES PERFUME",
      category: "Perfume",
      description: "Indulge in the luxury of our premium perfumes, each bottle a blend of exquisite, long-lasting notes that captivate and linger. Designed to complement your unique style, our perfumes offer an elegant touch for any occasion, leaving a memorable impression.",
      variants: ["PURE PASSION", "SEDUCTION", "ISLAND BOND", "MOTION", "GOLDEN ISLAND"],
      size: "50ml",
      image: perfumes
    },
    {
      id: 8,
      name: "YES BODY SPLASH",
      category: "Body Splash",
      description: "Experience the light, invigorating touch of our body splash, perfect for a quick refresh throughout the day. With its delicate scent and hydrating formula, our body splash keeps you feeling revitalized and confident, wherever you go. It is smooth on the skin and keeps your confidence up all day long.",
      variants: ["GARDEN OF ROSE", "BERRY MELLOW", "LAVENDER DRAMS", "PEACH FUZZ"],
      size: "250ml",
      image: bodysplash
    },
    {
      id: 9,
      name: "BREEZE INSECTICIDE SPRAY",
      category: "Insecticide",
      description: "Breeze Insecticide Spray, Multipurpose Insect Killer for Indoor & Perimeter with Comfort Wand kills mosquitoes, ants, cockroaches, spiders, fleas, ticks and other listed bugs; the formula is odor free with sweet scented fragrance, won't stain, and keeps listed bugs out. This spray can be used indoors and out, leaves no residue, and has no odor; people and pets may re-enter treated areas after spray has dried. Protect your home with our fast-acting insecticide spray, designed to effectively eliminate pests while being safe for your family. Its potent formula targets a wide range of insects, providing long-lasting protection and peace of mind.",
      variants: ["3 Variants"],
      size: "400ml",
      image: insecticide
    },
    {
      id: 10,
      name: "BREEZE MULTIPURPOSE SOAP",
      category: "Liquid Soap",
      description: "Keep your home spotless with our multipurpose liquid soap, a powerful yet gentle formula that tackles dirt and grime on any surface. Ideal for kitchens, bathrooms, and more, this versatile cleaner leaves everything sparkling clean and fresh. Breeze Multipurpose Liquid Soap will leave your dishes and surfaces squeaky clean every time. Get your ultimate clean and be the house Hero with Breeze Multipurpose Liquid Soap.",
      variants: ["LEMON", "FANTASY", "ROSE", "OCEAN"],
      size: "200ml, 500ml, 750ml",
      image: liquidsoap750ml
    },
    {
      id: 11,
      name: "BREEZE MULTIPURPOSE SOAP-5LTR",
      category: "Liquid Soap",
      description: "Keep your home spotless with our multipurpose liquid soap, a powerful yet gentle formula that tackles dirt and grime on any surface. Ideal for kitchens, bathrooms, and more, this versatile cleaner leaves everything sparkling clean and fresh. Breeze Multipurpose Liquid Soap will leave your dishes and surfaces squeaky clean every time. Get your ultimate clean and be the house Hero with Breeze Multipurpose Liquid Soap.",
      variants: ["LEMON", "FANTASY", "ROSE", "OCEAN"],
      size: "5 Litre",
      image: liquidsoup
    },
    {
      id: 12,
      name: "ORIGINAL HAND WASH",
      category: "Hand Wash",
      description: "Wash your hand with our original hand wash soap, a powerful yet gentle formula that tackles dirt and grime on your hands. Ideal for kitchens, restaurants, and more, this versatile cleaner leaves your hands clean and fresh.",
      variants: ["3 Variants"],
      size: "350ml",
      image: liquidsoup
    },
    {
      id: 13,
      name: "BREEZE SHOWER GEL-BIG SIZE",
      category: "Shower Gel",
      description: "Pamper your skin with our luxurious shower gel, enriched with nourishing ingredients that cleanse and moisturize. Infused with a captivating fragrance, it transforms your daily shower into a spa-like experience, leaving your skin soft and smooth. Dive into the long-lasting, refreshing scent of watery hyacinth, sandalwood, and freesia in Breeze Shower Gel that will leave you feeling fresh long after you shower. This moisturizing body wash/shower gel is made with fragrances as beautiful as Bath and Body Works.",
      variants: ["COCONUT", "BLUE SKY", "LEMON", "VANILLA"],
      size: "1000ml",
      image: showergel2colors
    },
    {
      id: 14,
      name: "BREEZE SHOWER GEL",
      category: "Shower Gel",
      description: "Pamper your skin with our luxurious shower gel, enriched with nourishing ingredients that cleanse and moisturize. Infused with a captivating fragrance, it transforms your daily shower into a spa-like experience, leaving your skin soft and smooth. Dive into the long-lasting, refreshing scent of watery hyacinth, sandalwood, and freesia in Breeze Shower Gel that will leave you feeling fresh long after you shower. This moisturizing body wash/shower gel is made with fragrances as beautiful as Bath and Body Works.",
      variants: ["COCONUT", "BLUE SKY", "LEMON", "VANILLA"],
      size: "500ml",
      image: showergel
    },
    {
      id: 15,
      name: "GLASS SHINE",
      category: "Glass Cleaner",
      description: "Achieve a crystal-clear shine with our streak-free glass cleaner, expertly formulated to remove smudges and fingerprints. Ideal for windows, mirrors, and glass surfaces, this cleaner leaves behind nothing but a spotless, sparkling finish. No matter what type of glass you've got or any diet surfaces, Glass Shine will leave your glasses and surfaces squeaky clean every time. Get your ultimate clean and be the glass Hero with Glass Shine.",
      variants: ["1 Variant"],
      size: "750ml",
      image: classcleaner
    },
    {
      id: 16,
      name: "BREEZE HAND SANITIZER",
      category: "Hand Sanitizer",
      description: "Stay protected with our hand sanitizer, formulated to kill 99.9% of germs without drying out your skin. Its fast-absorbing, non-sticky formula makes it the perfect on-the-go solution for maintaining hygiene and safety anytime, anywhere.",
      variants: ["1 Variant"],
      size: "60ml, 100ml",
      image: sanitizer60ml
    },
    {
      id: 17,
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
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl md:text-8xl font-bold text-coty-navy mb-8">
              ALL PRODUCTS
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto lg:mx-0 mb-12 leading-relaxed">
              Discover our comprehensive range of products including fragrances, cleaning solutions, personal care items, and home care essentials. 
              From air fresheners to shower gels, each product is carefully formulated to provide freshness, cleanliness, and comfort for your home and personal care needs.
            </p>
            <div className="mt-12 text-coty-gray font-medium flex items-center justify-center lg:justify-start">
              <div className="w-8 h-px bg-coty-gray mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">EXPLORE OUR PRODUCTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-4">Our Product Collection</h2>
            <p className="text-lg text-coty-gray max-w-3xl mx-auto">
              Explore our complete range of air fresheners, cleaning solutions, personal care products, and fragrances designed to keep your spaces fresh and you feeling confident.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fragranceProducts.map((product) => (
              <Card key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-coty-gray text-sm font-medium">{product.category}</span>
                    <span className="text-coty-navy text-sm font-bold">{product.size}</span>
                  </div>
                  <h3 className="text-xl font-bold text-coty-navy mb-3">{product.name}</h3>
                  <p className="text-coty-gray mb-4 text-sm leading-relaxed">{product.description}</p>
                  
                  {/* Variants Section */}
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