import { useRoute } from "wouter";
import { useState, useEffect } from "react";
import StandardHeader from "@/components/StandardHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ProductService } from "@/services/productService";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    if (!productId) return;

    ProductService.getOne(productId)
      .then((res) => {
        setProduct(res.data);
        // Set default main image to product image
        setMainImage(res.data.image || "");
        // Set first variant as selected if available
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  useEffect(() => {
    // Update main image when selected variant changes
    if (selectedVariant && selectedVariant.image) {
      setMainImage(selectedVariant.image);
    } else if (product) {
      setMainImage(product.image || "");
    }
  }, [selectedVariant, product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <StandardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mt-14 mb-8 text-sm text-gray-500">
          <a href="/" className="transition-colors hover:underline hover:text-gray-700">Home</a> /{" "}
          <a href="/all-products" className="transition-colors hover:underline hover:text-gray-700">All Products</a> /{" "}
          <span>{product.name}</span>
        </nav>

        {/* Product Detail Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={`${product.name}${selectedVariant ? ` - ${selectedVariant.name}` : ''}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-gray-400">No image available</div>
              )}
            </div>

            {/* Variant Images Thumbnails - if available */}
            {product.variants && product.variants.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {product.variants.map((variant: any, index: number) => (
                  <button
                    key={variant.id}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border-2 ${
                      selectedVariant && selectedVariant.id === variant.id
                        ? "border-coty-navy"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.image ? (
                      <img
                        src={variant.image}
                        alt={`${product.name} - ${variant.name}`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 text-xs text-center p-1">No image</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-coty-navy mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-coty-gray text-sm">{product.product_type}</span>
                <span className="text-coty-navy font-bold">{product.size}</span>
              </div>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">{product.rating}</span>
                </div>
              )}
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-coty-navy mb-4">Available Variants</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedVariant && selectedVariant.id === variant.id
                          ? "bg-coty-navy text-white border-coty-navy"
                          : "bg-white text-coty-navy border-coty-navy hover:bg-coty-navy hover:text-white"
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}