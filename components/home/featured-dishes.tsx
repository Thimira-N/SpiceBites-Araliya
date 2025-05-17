"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FEATURED_DISHES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/animations';

export default function FeaturedDishes() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Roughly the width of one card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'right' 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Signature Dishes</h2>
          <p className="text-gray-600 text-lg">
            Visual poetry on a plate, crafted with passion and precision.
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <div className="hidden md:flex justify-end gap-2 mb-6">
          <button 
            onClick={() => scroll('left')} 
            className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dishes scroll container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory hide-scrollbar"
        >
          {FEATURED_DISHES.map((dish, index) => (
            <DishCard 
              key={dish.id}
              dish={dish}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface DishCardProps {
  dish: typeof FEATURED_DISHES[0];
  index: number;
}

function DishCard({ dish, index }: DishCardProps) {
  return (
    <motion.div 
      className="min-w-[320px] max-w-[320px] snap-start bg-white rounded-lg overflow-hidden shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      custom={index * 0.1}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="320px"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col space-y-4">
        <h3 className="text-xl font-serif">{dish.name}</h3>
        <p className="text-gray-600 flex-grow line-clamp-3">{dish.description}</p>
        <div className="pt-2 flex justify-between items-center">
          <span className="text-lg font-medium">{dish.price}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dish.tags.map((tag, i) => (
            <span 
              key={i} 
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-transform hover:scale-105",
                tag === "Vegetarian" ? "bg-green-100 text-green-800" :
                tag === "Gluten-Free" ? "bg-yellow-100 text-yellow-800" :
                tag === "Signature" ? "bg-purple-100 text-purple-800" :
                tag === "Chef's Choice" ? "bg-blue-100 text-blue-800" :
                "bg-gray-100 text-gray-800"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}