import React from "react";
import { Link } from "react-router-dom";
import CategorySidebar from "./components/CategorySidebar";
import FeaturedShowcase from "./components/FeaturedShowcase";
import BestSellingSection from "./components/BestSellingSection";
import KeyboardShowcase from "./components/KeyboardShowcase";
import TrendingProductsSection from "./components/TrendingProductsSection";
import BenefitsSection from "./components/BenefitsSection";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section 1: Hero + Category Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Category Sidebar */}
          <CategorySidebar />

          {/* Hero Banner - ASUS ROG Promo */}
          <div className="lg:col-span-3">
            <div className="bg-black rounded-lg overflow-hidden flex items-center justify-between h-full relative">
              {/* Left Content */}
              <div className="z-10 text-white flex-1 p-8 md:p-12">
                {/* Brand Header: Logo + Text */}
                <div className="flex items-center gap-3 mb-4 opacity-90">
                  {/* Logo Container */}
                  <img
                    src="/src/assets/rog-strix-logo.png"
                    alt="ROG Logo"
                    className="w-8 h-8 object-contain" // Điều chỉnh kích thước logo tại đây
                  />
                  {/* Brand Text */}
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    ASUS Rog Strix Scar
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Voucher giảm
                  <br />
                  đến 10%
                </h2>

                {/* CTA Button */}
                <Link
                  to="/products/search"
                  className="inline-flex items-center text-white font-semibold text-base hover:text-red-500 transition"
                >
                  Mua ngay
                  <span className="ml-2 text-xl">→</span>
                </Link>
              </div>

              {/* Right Image Container */}
              <div className="hidden md:block relative flex-1 h-full">
                <img
                  src="/src/assets/asus-rog-strix.png"
                  alt="ASUS ROG Strix Scar"
                  className="absolute -right-21 top-1/2 -translate-y-1/2 h-[120%] w-auto max-w-none object-contain"
                />
              </div>

              {/* Carousel Dots */}
              {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Section 2: Featured Showcase */}
        <FeaturedShowcase />

        {/* Section 3: Best Selling Products */}
        <BestSellingSection />

        {/* Section 4: Keyboard Showcase */}
        <KeyboardShowcase />

        {/* Section 5: Trending/Random Products */}
        <TrendingProductsSection />

        {/* Section 6: Benefits */}
        <BenefitsSection />
      </div>
    </div>
  );
};

export default HomePage;
