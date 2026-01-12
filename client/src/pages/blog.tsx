import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, Calendar, User, Tag, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import StandardHeader from '@/components/StandardHeader';
import ScrollToTop from '@/components/ScrollToTop';

// Import blog images
import yesperfumesblog from "@/assets/productimages/yesperfumesblog.jpg";
import airfreshers from "@/assets/productimages/airfreshers.png";
import liquidsoup from "@/assets/productimages/liquidsoup.png";
import fabricsoftenergroup from "@/assets/productimages/fabric-softenergroup.png";

export default function Blog() {
  const [expandedArticles, setExpandedArticles] = useState<Set<number>>(new Set());

  // Default blog articles
  const defaultBlogArticles = [
    {
      id: 1,
      category: "Company News",
      date: "January 15, 2025",
      title: "Amanex Ghana: Pioneering Personal Care Excellence in West Africa",
      excerpt: "Discover how Amanex Ghana has become a leading force in personal care and home care products, bringing premium quality and innovative solutions to homes across West Africa.",
      content: `
        <p>Amanex Ghana has established itself as a cornerstone of personal care and home care excellence in West Africa. Our journey began with a simple mission: to provide premium quality products that enhance the daily lives of families across the region.</p>
        <p>Through continuous innovation and unwavering commitment to quality, we have developed a comprehensive range of products that meet the diverse needs of our customers. From air fresheners that transform living spaces to personal care products that promote wellness, every item in our portfolio is crafted with care and precision.</p>
        <p>Our success is built on three core principles: quality, innovation, and customer satisfaction. We invest heavily in research and development to ensure our products not only meet but exceed international standards.</p>
      `,
      author: "Amanex Team",
      image: yesperfumesblog
    },
    {
      id: 2,
      category: "Home Care Tips",
      date: "January 10, 2025",
      title: "Transform Your Home with Amanex: The Complete Guide to Fresh Living",
      excerpt: "Learn how to create a fresh, inviting home environment using Amanex's comprehensive range of air fresheners, cleaning products, and fabric care solutions.",
      content: `
        <p>Creating a fresh and inviting home environment is essential for your well-being and the comfort of your family. With Amanex's comprehensive range of products, achieving this goal has never been easier.</p>
        <p>Our air fresheners are designed to eliminate odors and create pleasant atmospheres that last throughout the day. Whether you prefer floral, citrus, or woody scents, we have options to suit every preference and space.</p>
        <p>For cleaning, our products are formulated to be effective yet gentle, ensuring your surfaces remain spotless without damage. Our fabric care solutions keep your clothes and linens fresh, soft, and beautifully scented.</p>
      `,
      author: "Home Care Expert",
      image: airfreshers
    },
    {
      id: 3,
      category: "Health & Wellness",
      date: "January 5, 2025",
      title: "The Science of Clean: How Amanex Products Keep Your Home Healthier",
      excerpt: "Discover the scientific approach behind Amanex's cleaning and personal care products, and learn how they contribute to a healthier, safer home environment.",
      content: `
        <p>Cleanliness is not just about appearance—it's about health and safety. At Amanex, we understand the science behind effective cleaning and have developed our products accordingly.</p>
        <p>Our cleaning formulations are designed to target specific types of dirt, bacteria, and viruses, ensuring comprehensive protection for your family. We use advanced technology to create products that are both powerful and safe for everyday use.</p>
        <p>Regular use of our products helps maintain a healthy indoor environment, reducing the risk of illness and creating a more comfortable living space. Our commitment to safety means all our products meet or exceed health and safety standards.</p>
      `,
      author: "Health Specialist",
      image: liquidsoup
    }
  ];

  const [blogArticles, setBlogArticles] = useState<any[]>(defaultBlogArticles);

  // Load blog posts from localStorage or use defaults
  useEffect(() => {
    const savedBlogs = localStorage.getItem('amanexBlogs');
    if (savedBlogs && JSON.parse(savedBlogs).length > 0) {
      setBlogArticles(JSON.parse(savedBlogs));
    } else {
      setBlogArticles(defaultBlogArticles);
    }
  }, []);

  const toggleArticle = (articleId: number) => {
    const newExpanded = new Set(expandedArticles);
    if (newExpanded.has(articleId)) {
      newExpanded.delete(articleId);
    } else {
      newExpanded.add(articleId);
    }
    setExpandedArticles(newExpanded);
  };


  return (
    <div className="min-h-screen w-full">
      <StandardHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center" style={{ paddingTop: '4rem', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-coty-mint-light to-coty-gray-light"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-coty-navy mb-8 animate-fade-in-up animation-delay-800">
            AMANEX INSIGHTS
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-0">
            Discover expert tips, company updates, and insights from Amanex Ghana. 
            Learn how our products transform everyday routines into luxurious experiences.
          </p>
          <p className="text-lg text-gray-500 animate-fade-in-up animation-delay-1200">SCROLL TO EXPLORE</p>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="py-20 bg-gray-50" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="w-full px-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => {
              const isExpanded = expandedArticles.has(article.id);
              return (
                <article key={article.id} id={`article-${article.id}`} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Small Circular Image */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="px-3 py-1 bg-coty-navy text-white text-xs font-medium rounded-full">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-coty-navy mb-3 line-clamp-2">{article.title}</h2>
                    <p className={`text-gray-600 text-sm mb-4 ${!isExpanded ? 'line-clamp-3' : ''}`}>
                      {article.excerpt}
                    </p>
                    
                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-6 pt-6 border-t border-gray-200 article-content article-expanded">
                        <div 
                          className="prose prose-sm max-w-none text-gray-700"
                          dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <button 
                        onClick={() => toggleArticle(article.id)}
                        className="text-coty-navy hover:text-coty-gray text-sm font-medium transition-colors duration-200 flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            <ArrowUp className="w-3 h-3" />
                            Collapse
                          </>
                        ) : (
                          <>
                            Read More
                            <ArrowRight className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>







      <Footer />
      <ScrollToTop />
    </div>
  );
}