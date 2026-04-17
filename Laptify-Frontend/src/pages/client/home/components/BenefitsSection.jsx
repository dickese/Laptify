import React from "react";
import { Truck, Headphones, Award } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Miễn phí vận chuyển",
      description: (
        <>
          Miễn phí vận chuyển cho những <br /> đơn hàng trên 1.500.000đ
        </>
      ),
    },
    {
      icon: Headphones,
      title: "Chăm sóc khách hàng 24/7",
      description: (
        <>
          Đội ngũ chăm sóc khách hàng thân thiện <br /> trực tuyến 24/7
        </>
      ),
    },
    {
      icon: Award,
      title: "Cam kết hỗ trợ tận tâm",
      description: "Hoàn tiền trong vòng 30 ngày",
    },
  ];

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <benefit.icon size={30} className="text-gray-700" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-snug">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
