import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StandardHeader from '@/components/StandardHeader';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Import product images
import sanitizer60ml from "@/assets/productimages/sanitizer-60ml.png";
import sanitizer350ml from "@/assets/productimages/sanitizer-350ml.png";
import fabricsoftenergroup from "@/assets/productimages/fabric-softenergroup.png";
import liquidsoup from "@/assets/productimages/liquidsoup.png";
import liquidsoap750ml from "@/assets/productimages/liquidsoap750 ml.jpg";
import airfreshers from "@/assets/productimages/airfreshers.png";
import airfreshersgroup from "@/assets/productimages/airfreshersgroup.png";
import airfreshercanyellow from "@/assets/productimages/airfreshercanyellow.jpg";
import airfreshcan from "@/assets/productimages/airfreshcan.jpg";
import airfresherspray from "@/assets/productimages/airfresherspray.jpg";
import airfresher12 from "@/assets/productimages/airfresher12.jpg";
import airfresherblack from "@/assets/productimages/airfresherblack.jpg";
import airfresherblue from "@/assets/productimages/airfresherred.jpg";
import airfresherred from "@/assets/productimages/airfresherred.jpg";
import showergel from "@/assets/productimages/showergel.jpg";
import showergel2colors from "@/assets/productimages/showergel2colors.jpg";
import showergelyellow from "@/assets/productimages/showergelyellow.jpg";
import perfumes from "@/assets/productimages/perfumes.jpg";
import bodysplash from "@/assets/productimages/bodysplash.png";
import redperf from "@/assets/productimages/redperf.png";
import sanitizer from "@/assets/productimages/sanitizer.png";
import fabricsoftener from "@/assets/productimages/fabricsoftener.jpg";
import fabricsoftenerblue from "@/assets/productimages/fabricsoftenerblue.jpg";
import fabricsofteneryellow from "@/assets/productimages/fabricsofteneryellow.jpg";
import insecticide from "@/assets/productimages/insecticide.jpg";
import classcleaner from "@/assets/productimages/classcleaner.jpg";
import liquidsoupyellow from "@/assets/productimages/liquidsoupyellow.jpg";
import liquidsoup2 from "@/assets/productimages/liquidsoup2.jpeg";

// All products data from across the site
const allProducts = [
  // Air Fresheners
  {
    id: 1,
    name: "BREEZE AIR FRESHENER",
    category: "Air Freshener",
    description: "Breeze Air Fresheners is formulated to freshen rooms and enclosed places by releasing fragrances to combat undesirable odors and smells. Breeze Air Fresheners are long-lasting air fresheners, expertly crafted to eliminate odors and fill your home with a refreshing, inviting scent. Available in a variety of fragrances, our air fresheners ensure that every room feels clean and vibrant, day after day.",
    variants: ["OCEANIC", "VANILLA", "STRAWBERRY", "ORIENTAL ROSE", "BOUQUET", "BREEZER", "ICEY"],
    size: "250ml",
    image: airfresher12,
    page: "/air-fresheners"
  },
  {
    id: 2,
    name: "BREEZE AIR FRESHENER-EXTRA STRONG",
    category: "Air Freshener",
    description: "Breeze Air Fresheners is formulated to freshen rooms and enclosed places by releasing fragrances to combat undesirable odors and smells. Breeze Air Fresheners are long-lasting air fresheners, expertly crafted to eliminate odors and fill your home with a refreshing, inviting scent. Available in a variety of fragrances, our air fresheners ensure that every room feels clean and vibrant, day after day.",
    variants: ["OCEANIC", "VANILLA", "STRAWBERRY", "ORIENTAL ROSE", "BOUQUET", "BREEZER", "ICEY"],
    size: "275ml",
    image: airfresherspray,
    page: "/air-fresheners"
  },
  {
    id: 3,
    name: "BREEZE GEL AIR FRESHENER",
    category: "Gel Air Freshener",
    description: "Breeze Gel Air fresheners are great at masking unpleasant odors while infusing your car or space with a fresh clean scent. It keeps your space fresh and inviting with our range of air fresheners, available in multiple scents to suit every preference.",
    variants: ["BLUE BERRY", "SUMMER", "LEMON", "LAVENDER", "PEACH", "STRAWBERRY", "FLORA", "TUITY FRUITY", "VANILLA", "BLACK BERRY"],
    size: "100g",
    image: airfreshercanyellow,
    page: "/air-fresheners"
  },
  {
    id: 4,
    name: "YES AIR FRESHENER",
    category: "Air Freshener",
    description: "Yes Air fresheners are a great way to make your home smell beautiful. Yes Air fresheners are great at masking unpleasant odors while infusing your space with a fresh clean scent.",
    variants: ["GOLDEN ISLAND", "SANDAL WOOD", "ARABIAN ROSE"],
    size: "250ml",
    image: airfresherred,
    page: "/air-fresheners"
  },
  {
    id: 5,
    name: "ORIGINAL AIR FRESHENER",
    category: "Air Freshener",
    description: "Original Air fresheners are great at masking unpleasant odors while infusing your space with a fresh clean scent.",
    variants: ["LAVENDER", "STRAWBERRY", "PEACH", "SUMMER", "VANILLA"],
    size: "300ml",
    image: airfresherblue,
    page: "/air-fresheners"
  },
  // Perfumes & Body Care
  {
    id: 6,
    name: "YES PERFUME",
    category: "Perfume",
    description: "Indulge in the luxury of our premium perfumes, each bottle a blend of exquisite, long-lasting notes that captivate and linger. Designed to complement your unique style, our perfumes offer an elegant touch for any occasion, leaving a memorable impression.",
    variants: ["PURE PASSION", "SEDUCTION", "ISLAND BOND", "MOTION", "GOLDEN ISLAND"],
    size: "50ml",
    image: perfumes,
    page: "/perfumes-body-care"
  },
  {
    id: 7,
    name: "YES BODY SPLASH",
    category: "Body Splash",
    description: "Experience the light, invigorating touch of our body splash, perfect for a quick refresh throughout the day. With its delicate scent and hydrating formula, our body splash keeps you feeling revitalized and confident, wherever you go. It is smooth on the skin and keeps your confidence up all day long.",
    variants: ["GARDEN OF ROSE", "BERRY MELLOW", "LAVENDER DRAMS", "PEACH FUZZ"],
    size: "250ml",
    image: bodysplash,
    page: "/perfumes-body-care"
  },
  // Cleaning Products
  {
    id: 8,
    name: "BREEZE MULTIPURPOSE SOAP",
    category: "Liquid Soap",
    description: "Keep your home spotless with our multipurpose liquid soap, a powerful yet gentle formula that tackles dirt and grime on any surface. Ideal for kitchens, bathrooms, and more, this versatile cleaner leaves everything sparkling clean and fresh. Breeze Multipurpose Liquid Soap will leave your dishes and surfaces squeaky clean every time. Get your ultimate clean and be the house Hero with Breeze Multipurpose Liquid Soap.",
    variants: ["LEMON", "FANTASY", "ROSE", "OCEAN"],
    size: "200ml, 500ml, 750ml",
    image: liquidsoap750ml,
    page: "/cleaning-products"
  },
  {
    id: 9,
    name: "BREEZE MULTIPURPOSE SOAP-5LTR",
    category: "Liquid Soap",
    description: "Keep your home spotless with our multipurpose liquid soap, a powerful yet gentle formula that tackles dirt and grime on any surface. Ideal for kitchens, bathrooms, and more, this versatile cleaner leaves everything sparkling clean and fresh. Breeze Multipurpose Liquid Soap will leave your dishes and surfaces squeaky clean every time. Get your ultimate clean and be the house Hero with Breeze Multipurpose Liquid Soap.",
    variants: ["LEMON", "FANTASY", "ROSE", "OCEAN"],
    size: "5 Litre",
    image: liquidsoup,
    page: "/cleaning-products"
  },
  {
    id: 10,
    name: "ORIGINAL HAND WASH",
    category: "Hand Wash",
    description: "Wash your hand with our original hand wash soap, a powerful yet gentle formula that tackles dirt and grime on your hands. Ideal for kitchens, restaurants, and more, this versatile cleaner leaves your hands clean and fresh.",
    variants: ["3 Variants"],
    size: "350ml",
    image: liquidsoup,
    page: "/cleaning-products"
  },
  {
    id: 11,
    name: "GLASS SHINE",
    category: "Glass Cleaner",
    description: "Achieve a crystal-clear shine with our streak-free glass cleaner, expertly formulated to remove smudges and fingerprints. Ideal for windows, mirrors, and glass surfaces, this cleaner leaves behind nothing but a spotless, sparkling finish. No matter what type of glass you've got or any diet surfaces, Glass Shine will leave your glasses and surfaces squeaky clean every time. Get your ultimate clean and be the glass Hero with Glass Shine.",
    variants: ["1 Variant"],
    size: "750ml",
    image: classcleaner,
    page: "/cleaning-products"
  },
  // Personal Care
  {
    id: 12,
    name: "BREEZE SHOWER GEL-BIG SIZE",
    category: "Shower Gel",
    description: "Pamper your skin with our luxurious shower gel, enriched with nourishing ingredients that cleanse and moisturize. Infused with a captivating fragrance, it transforms your daily shower into a spa-like experience, leaving your skin soft and smooth. Dive into the long-lasting, refreshing scent of watery hyacinth, sandalwood, and freesia in Breeze Shower Gel that will leave you feeling fresh long after you shower. This moisturizing body wash/shower gel is made with fragrances as beautiful as Bath and Body Works.",
    variants: ["COCONUT", "BLUE SKY", "LEMON", "VANILLA"],
    size: "1000ml",
    image: showergel2colors,
    page: "/personal-care"
  },
  {
    id: 13,
    name: "BREEZE SHOWER GEL",
    category: "Shower Gel",
    description: "Pamper your skin with our luxurious shower gel, enriched with nourishing ingredients that cleanse and moisturize. Infused with a captivating fragrance, it transforms your daily shower into a spa-like experience, leaving your skin soft and smooth. Dive into the long-lasting, refreshing scent of watery hyacinth, sandalwood, and freesia in Breeze Shower Gel that will leave you feeling fresh long after you shower. This moisturizing body wash/shower gel is made with fragrances as beautiful as Bath and Body Works.",
    variants: ["COCONUT", "BLUE SKY", "LEMON", "VANILLA"],
    size: "500ml",
    image: showergel,
    page: "/personal-care"
  },
  {
    id: 14,
    name: "BREEZE HAND SANITIZER",
    category: "Hand Sanitizer",
    description: "Stay protected with our hand sanitizer, formulated to kill 99.9% of germs without drying out your skin. Its fast-absorbing, non-sticky formula makes it the perfect on-the-go solution for maintaining hygiene and safety anytime, anywhere.",
    variants: ["1 Variant"],
    size: "60ml, 100ml",
    image: sanitizer60ml,
    page: "/personal-care"
  },
  {
    id: 15,
    name: "BREEZE HAND SANITIZER-BIG SIZE",
    category: "Hand Sanitizer",
    description: "Stay protected with our hand sanitizer, formulated to kill 99.9% of germs without drying out your skin. Its fast-absorbing, non-sticky formula makes it the perfect on-the-go solution for maintaining hygiene and safety anytime, anywhere.",
    variants: ["1 Variant"],
    size: "350ml",
    image: sanitizer350ml,
    page: "/personal-care"
  },
  // Home Care
  {
    id: 16,
    name: "BREEZE FABRIC SOFTENER",
    category: "Fabric Softener",
    description: "Enhance the softness and freshness of your laundry with our premium fabric softener. Designed to reduce wrinkles, eliminate static, and leave your clothes with a long-lasting, delightful scent, our fabric softener ensures that every wash feels luxurious. Perfect for all fabrics, it adds a touch of comfort to your clothes while preserving their quality.",
    variants: ["4 Variants"],
    size: "500ml, 1,000ml",
    image: fabricsoftenergroup,
    page: "/home-care"
  },
  {
    id: 17,
    name: "BREEZE INSECTICIDE SPRAY",
    category: "Insecticide",
    description: "Breeze Insecticide Spray, Multipurpose Insect Killer for Indoor & Perimeter with Comfort Wand kills mosquitoes, ants, cockroaches, spiders, fleas, ticks and other listed bugs; the formula is odor free with sweet scented fragrance, won't stain, and keeps listed bugs out. This spray can be used indoors and out, leaves no residue, and has no odor; people and pets may re-enter treated areas after spray has dried. Protect your home with our fast-acting insecticide spray, designed to effectively eliminate pests while being safe for your family. Its potent formula targets a wide range of insects, providing long-lasting protection and peace of mind.",
    variants: ["3 Variants"],
    size: "400ml",
    image: insecticide,
    page: "/home-care"
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(allProducts);
  const [isSearching, setIsSearching] = useState(false);

  // Get search query from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    setSearchQuery(query);
    if (query) {
      performSearch(query);
    }
  }, []);

  const performSearch = (query: string) => {
    setIsSearching(true);
    
    if (!query.trim()) {
      setSearchResults(allProducts);
      setIsSearching(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = allProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.variants.some(variant => variant.toLowerCase().includes(lowerQuery)) ||
        product.size.toLowerCase().includes(lowerQuery)
      );
    });

    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
    // Update URL
    const newUrl = searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '/search';
    window.history.pushState({}, '', newUrl);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(allProducts);
    window.history.pushState({}, '', '/search');
  };

  return (
    <div className="min-h-screen">
      <StandardHeader />

      {/* Search Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-coty-mint-light to-coty-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-coty-gray">
              <a href="/" className="hover:text-coty-navy transition-colors">HOMEPAGE</a>
              <span>&lt;</span>
              <span className="text-coty-navy font-medium">SEARCH</span>
            </nav>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full px-6 py-4 text-lg border-b-2 border-coty-navy bg-transparent outline-none placeholder-coty-gray focus:border-coty-gold transition-colors"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-coty-gray" />
                  </button>
                )}
                <button
                  type="submit"
                  className="p-2 hover:bg-coty-navy hover:text-white rounded-full transition-colors"
                >
                  <Search className="w-6 h-6" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-coty-navy">
                {isSearching ? 'Searching...' : `${searchResults.length} RESULTS`}
              </h2>
              {searchQuery && (
                <p className="text-coty-gray">
                  Showing results for "<span className="font-medium">{searchQuery}</span>"
                </p>
              )}
            </div>
            <div className="w-full h-px bg-coty-navy mt-4"></div>
          </div>

          {/* Results Grid */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-coty-gray text-sm font-medium">{product.category}</span>
                      <span className="text-coty-navy text-sm font-bold">{product.size}</span>
                    </div>
                    <h3 className="text-lg font-bold text-coty-navy mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-coty-gray text-sm mb-3 line-clamp-3">{product.description}</p>
                    <div className="mb-3">
                      <h4 className="text-sm font-bold text-coty-navy mb-1">Variants:</h4>
                      <div className="flex flex-wrap gap-1">
                        {product.variants.slice(0, 3).map((variant, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-coty-navy text-white text-xs rounded-md"
                          >
                            {variant}
                          </span>
                        ))}
                        {product.variants.length > 3 && (
                          <span className="inline-block px-2 py-1 bg-coty-gray text-white text-xs rounded-md">
                            +{product.variants.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <a
                      href={product.page}
                      className="inline-flex items-center text-coty-navy font-medium hover:text-coty-gold transition-colors"
                    >
                      View Product
                      <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-coty-gray-light rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-coty-gray" />
              </div>
              <h3 className="text-2xl font-bold text-coty-navy mb-4">No results found</h3>
              <p className="text-coty-gray mb-8">
                We couldn't find any products matching "<span className="font-medium">{searchQuery}</span>"
              </p>
              <Button
                onClick={clearSearch}
                className="px-8 py-3 bg-coty-navy text-white hover:bg-transparent hover:text-coty-navy border border-coty-navy transition-colors"
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
} 