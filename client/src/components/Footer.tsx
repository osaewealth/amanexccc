import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-coty-navy text-white" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <div className="w-full px-4 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Amanex Company Limited</h3>
            <p className="text-gray-300 mb-4">
              Leading manufacturer and distributor of premium personal care, home care, and fragrance products across Africa.
            </p>
              <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/amanexcompanyltd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/amanexcompanyltd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/amanex-company-limited" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/AmanexCompany" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links and Products - Side by side on mobile/tablet */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-2 gap-8">
              {/* Quick Links */}
            <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/about-us" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/our-story" className="text-gray-300 hover:text-white transition-colors">Our Story</a></li>
                  <li><a href="/our-brands" className="text-gray-300 hover:text-white transition-colors">Our Brands</a></li>
                  <li><a href="/our-impact" className="text-gray-300 hover:text-white transition-colors">Our Impact</a></li>
                  <li><a href="/contact-us" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog & Insights</a></li>
              </ul>
            </div>

              {/* Products */}
            <div>
                <h4 className="text-lg font-semibold mb-4">Products</h4>
                <ul className="space-y-2">
                  <li><a href="/personal-care" className="text-gray-300 hover:text-white transition-colors">Personal Care</a></li>
                  <li><a href="/home-care" className="text-gray-300 hover:text-white transition-colors">Home Care</a></li>
                  <li><a href="/fragrance" className="text-gray-300 hover:text-white transition-colors">Fragrance</a></li>
                  <li><a href="/air-fresheners" className="text-gray-300 hover:text-white transition-colors">Air Fresheners</a></li>
                  <li><a href="/cleaning-products" className="text-gray-300 hover:text-white transition-colors">Cleaning Products</a></li>
              </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-6 lg:mb-0">
              <p>© 2025, Amanex Company Limited.</p>
              <p>All rights reserved.</p>
            </div>

            <div className="flex items-center gap-6">
              {/* Amanex Logo */}
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Amanex Logo" 
                  className="h-12 w-auto filter brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 