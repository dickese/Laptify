import React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const FeatureCard = ({
  title,
  description,
  imagePath,
  buttonText,
  buttonLink,
  isLarge,
  showSparkle,
}) => {
  return (
    <Link
      to={buttonLink}
      className={`relative bg-black rounded-lg overflow-hidden group ${
        isLarge ? "lg:row-span-2" : ""
      } h-full min-h-[300px] lg:min-h-auto flex flex-col justify-between`}
    >
      {/* Black background with image overlay */}
      <div className="absolute inset-0 bg-black">
        {imagePath && (
          <img
            src={imagePath}
            alt={title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        )}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 p-6 md:p-8 text-white flex flex-col justify-between h-full">
        <div></div>

        {/* Title and Description (bottom positioned) */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-red-400 transition">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-300 mb-4 line-clamp-3">
              {description}
            </p>
          )}
          <Link
            to={buttonLink}
            className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-red-400 transition border-b border-white hover:border-red-400 pb-1"
          >
            {buttonText}
            {showSparkle && <Sparkles size={14} />}
          </Link>
        </div>
      </div>
    </Link>
  );
};

const FeaturedShowcase = () => {
  const cards = [
    {
      title: "Lenovo Legion 5",
      description:
        "Lenovo Legion 5: Where stylish design meets savage gaming power.",
      imagePath: "/src/assets/lenovo-legion-5.png",
      buttonText: "Mua ngay",
      buttonLink: "/products/search",
      isLarge: true,
    },
    {
      title: "AULA F75",
      description:
        "Experience ultimate typing comfort and creamy acoustics with AULA F75.",
      imagePath: "/src/assets/aula-f75.png",
      buttonText: "Mua ngay",
      buttonLink: "/products/search",
      isLarge: false,
      showSparkle: true,
    },
    {
      title: "Headphones",
      description: "Immersive Audio Experience",
      imagePath: "/src/assets/soundpeast-space-po.png",
      buttonText: "Mua ngay",
      buttonLink: "/products/search",
      isLarge: false,
    },
    {
      title: "Mice",
      description: "Ergonomic Daily Comfort",
      imagePath: "/src/assets/logitech.png",
      buttonText: "Mua ngay",
      buttonLink: "/products/search",
      isLarge: false,
    },
  ];

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-red-600 rounded"></div>
          <span className="text-red-600 font-bold text-sm">Tiêu biểu</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900">Sản phẩm mới</h2>
      </div>

      {/* Grid Layout: 1x2 left side (large), 2x1 right side (smaller) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Large card - left side, spans 2 rows on desktop */}
        <div className="lg:col-span-1 lg:row-span-2">
          <FeatureCard {...cards[0]} />
        </div>

        {/* Top right card */}
        <div className="lg:col-span-2">
          <FeatureCard {...cards[1]} />
        </div>

        {/* Bottom right cards - 2 columns */}
        <div className="lg:col-span-1">
          <FeatureCard {...cards[2]} />
        </div>
        <div className="lg:col-span-1">
          <FeatureCard {...cards[3]} />
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center">
        <button className="bg-red-600 text-white px-12 py-3 rounded-lg font-semibold hover:bg-red-700 transition text-base">
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default FeaturedShowcase;
