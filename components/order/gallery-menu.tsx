"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { FEATURED_DISHES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryMenu() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredDishes = activeCategory === 'all' 
    ? FEATURED_DISHES 
    : FEATURED_DISHES.filter(dish => dish.category === activeCategory);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Roughly the width of one card + gap
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
    <section>
      <motion.div 
        className="text-center mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Visual Menu</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Browse our dishes through stunning photography. Scroll horizontally to see more.
        </p>
      </motion.div>

      {/* Category buttons */}
      <div className="flex justify-center mb-8 gap-3 flex-wrap">
        <CategoryButton 
          name="All Items" 
          isActive={activeCategory === 'all'} 
          onClick={() => setActiveCategory('all')} 
        />
        <CategoryButton 
          name="Starters" 
          isActive={activeCategory === 'starters'} 
          onClick={() => setActiveCategory('starters')} 
        />
        <CategoryButton 
          name="Main Courses" 
          isActive={activeCategory === 'mains'} 
          onClick={() => setActiveCategory('mains')} 
        />
        <CategoryButton 
          name="Desserts" 
          isActive={activeCategory === 'desserts'} 
          onClick={() => setActiveCategory('desserts')} 
        />
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end gap-2 mb-6">
        <button 
          onClick={() => scroll('left')} 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => scroll('right')} 
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Scrolling gallery */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredDishes.map((dish, index) => (
          <motion.div 
            key={dish.id}
            className="min-w-[300px] md:min-w-[350px] snap-start rounded-lg overflow-hidden cursor-pointer group relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            custom={index * 0.1}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 350px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-serif mb-1">{dish.name}</h3>
              <p className="text-sm text-white/80 line-clamp-1">{dish.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-medium">{dish.price}</span>
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Add to cart</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

interface CategoryButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

function CategoryButton({ name, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-2 rounded-full transition-all text-sm",
        isActive 
          ? "bg-white text-black font-medium" 
          : "bg-white/10 text-white hover:bg-white/20"
      )}
    >
      {name}
    </button>
  );
}