"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HERO_IMAGES } from '@/lib/constants';
import { fadeIn, fadeInDown } from '@/lib/animations';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
        setIsTransitioning(false);
      }, 500); // Match the transition duration
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500); // Match the transition duration
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Carousel Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-full w-full">
            <Image
              src={HERO_IMAGES[currentIndex].url}
              alt={HERO_IMAGES[currentIndex].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-serif max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={fadeInDown}
        >
          {HERO_IMAGES[currentIndex].title}
        </motion.h1>
        <motion.p 
          className="mt-4 text-xl md:text-2xl font-light max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {HERO_IMAGES[currentIndex].subtitle}
        </motion.p>
        
        {/* Call-to-Action Button */}
        <motion.div
          className="mt-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <a 
            href={HERO_IMAGES[currentIndex].ctaLink || "/reservations"}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {HERO_IMAGES[currentIndex].ctaText || "Reserve a Table"}
          </a>
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentIndex === index 
                ? "bg-white scale-110" 
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}