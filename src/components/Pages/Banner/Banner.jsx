import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1600&q=80",
    title: "Exclusive Discounts",
    description:
      "Upgrade your entire wardrobe today . For a limited time only, we are offering discount on our latest fashion items",
  },
  {
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1600&q=80",
    title: "Trending Fashion",
    description:
      "Trending outfits for men, women & children. Street wear-inspired relaxed fits dominate, soft romantic layers.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
    title: "Essentials Offers",
    description:
      "Transform your living space for less with massive promotions on smart organization, kitchenware, and luxury bedding.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Hot Deals",
    description:
      "Turn up the savings with our handpicked Hot Deals section, featuring the deepest discounts of the season on our most wanted products.",
  },
];

const textAnimation = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      effect="fade"
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay, EffectFade]}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      className="h-[65vh] sm:h-[75vh] md:h-[85vh] w-full"
    >
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-center bg-cover"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/80" />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10">
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      variants={textAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="text-center backdrop-blur-md bg-white/10 border border-white/20 
                      p-6 sm:p-8 md:p-12 
                      rounded-2xl sm:rounded-3xl 
                      shadow-2xl 
                      max-w-xs sm:max-w-xl md:max-w-3xl"
                    >
                      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-snug">
                        {slide.title}
                      </h2>

                      <p className="text-sm sm:text-lg md:text-xl text-gray-200">
                        {slide.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Banner;
