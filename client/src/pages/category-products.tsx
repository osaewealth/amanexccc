import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import StandardHeader from "@/components/StandardHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { ProductService } from "@/services/productService";

export default function CategoryProducts() {
  const [, params] = useRoute("/category/:id");
  const categoryId = params?.id;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!categoryId) return;

    ProductService.getCategoryProducts(categoryId)
      .then(res => {
        const activeProducts = res.data.filter((p: any) => p.is_active);
        setProducts(activeProducts)
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handleProductClick = (productId: string) => {
    setLocation(`/product/${productId}`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer" onClick={() => handleProductClick(product.id)}>
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-coty-gray text-sm font-medium">{product.product_type}</span>
                    <span className="text-coty-navy text-sm font-bold">{product.size}</span>
                  </div>
                  <h3 className="text-xl font-bold text-coty-navy mb-3">{product.name}</h3>
                  <p className="text-coty-gray mb-4 text-sm leading-relaxed">{product.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-coty-navy mb-2">Variants:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.variants.map((variant: any) => (
                        <span
                          key={variant.id}
                          className="inline-block px-2 py-1 bg-coty-navy text-white text-xs rounded-md"
                        >
                          {variant.name}
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
