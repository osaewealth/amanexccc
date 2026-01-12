import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Find the footer element to exclude it from scroll calculation
      const footer = document.querySelector('footer');
      const footerTop = footer ? footer.offsetTop : document.documentElement.scrollHeight;
      
      // Check if footer is visible on screen
      const footerRect = footer ? footer.getBoundingClientRect() : null;
      const isFooterVisible = footerRect ? footerRect.top < window.innerHeight : false;
      
      // Calculate scrollable height excluding footer
      const scrollableHeight = footerTop - window.innerHeight;
      const progress = Math.min((scrollTop / scrollableHeight) * 100, 100);
      
      // Show component when past 50% of the scrollable content AND footer is not visible
      setIsVisible(progress > 50 && !isFooterVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Desktop version - Full button with text */}
      <Button 
        onClick={scrollToTop}
        className="hidden lg:flex items-center gap-4 px-8 py-4 bg-coty-navy text-white text-md font-medium rounded-br-3xl hover:bg-transparent hover:text-coty-navy border border-coty-navy transition-colors duration-300 shadow-lg hover:shadow-xl"
      >
        BACK TO TOP
        <ArrowUp className="text-2xl" />
      </Button>
      
      {/* Mobile/Tablet version - Just arrow icon */}
      <Button 
        onClick={scrollToTop}
        className="lg:hidden w-12 h-12 bg-coty-navy text-white rounded-full hover:bg-transparent hover:text-coty-navy border border-coty-navy transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <ArrowUp className="text-xl" />
      </Button>
    </div>
  );
} 