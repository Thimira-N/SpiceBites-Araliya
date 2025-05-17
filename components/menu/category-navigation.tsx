"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MENU_CATEGORIES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function CategoryNavigation() {
  const [selectedCategory, setSelectedCategory] = useState(MENU_CATEGORIES[0].id);
  
  return (
    <section className="bg-black py-8 sticky top-0 z-30 backdrop-blur-md bg-black/80">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          {MENU_CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    image: string;
    description: string;
  };
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function CategoryCard({ category, isSelected, onClick, index }: CategoryCardProps) {
  return (
    <motion.button
      className={cn(
        "relative aspect-video overflow-hidden rounded-lg cursor-pointer transition-all",
        isSelected ? "ring-4 ring-white scale-[1.02]" : "opacity-70 hover:opacity-90"
      )}
      onClick={onClick}
      custom={index * 0.1}
      variants={fadeInUp}
    >
      <div className="absolute inset-0">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      <div className="relative h-full flex flex-col justify-end p-3 text-white text-start">
        <h3 className="text-lg md:text-xl font-serif">{category.name}</h3>
        <p className="text-sm opacity-80 line-clamp-1">{category.description}</p>
      </div>
    </motion.button>
  );
}