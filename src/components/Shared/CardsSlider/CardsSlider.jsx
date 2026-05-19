import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/free-mode";

const dummyProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 120,
    discountPrice: 65,
    stock: 5,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 180,
    discountPrice: 99,
    stock: 3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 60,
    discountPrice: 29,
    stock: 8,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
  },
  {
    id: 4,
    name: "Sneakers",
    price: 140,
    discountPrice: 75,
    stock: 2,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
];

const doubledProducts = [...dummyProducts, ...dummyProducts];

const CardsSlider = () => {
  return (
    // Added explicit horizontal padding to prevent cards from hitting the absolute screen edge
    <div className="mt-16 px-6 py-10 slider-container overflow-hidden">
      <style>{`
        /* 1. Keeps the marquee moving at a perfectly fixed, linear pace */
        .slider-container .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        /* 2. CRITICAL: Prevents cards and their hover shadows from being clipped at the top, bottom, left, or right */
        .slider-container .swiper {
          overflow: visible !important;
        }
      `}</style>

      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={20}
        loop={true}
        freeMode={true}
        speed={6000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        className="swiper-smooth py-6"
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
      >
        {doubledProducts.map((product, index) => (
          <SwiperSlide key={`${product.id}-${index}`} className="h-auto">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white shadow-lg rounded-2xl p-5 border cursor-pointer h-full flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-cover rounded-xl mb-4"
                />

                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>

                <div className="mt-2 flex gap-2 items-center">
                  <p className="line-through text-gray-400">${product.price}</p>
                  <p className="text-green-600 font-bold text-lg">
                    ${product.discountPrice}
                  </p>
                </div>

                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded-full font-medium">
                    🔥 Today Only
                  </span>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 text-xs rounded-full font-medium">
                    ⏳ Ending Soon
                  </span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full font-medium">
                    Only {product.stock} left
                  </span>
                </div>
              </div>

              {/* Pushes the progress bar cleanly to the bottom of the card uniformly */}
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${product.stock * 10}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardsSlider;
