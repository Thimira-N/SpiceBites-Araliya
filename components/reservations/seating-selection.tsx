"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { SEATING_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function SeatingSelection() {
  const [selectedSeating, setSelectedSeating] = useState<string | null>(null);
  
  return (
    <section className="mb-16">
      <motion.div 
        className="text-center mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Choose Your Setting</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Select your preferred dining environment for the perfect atmosphere.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        {SEATING_OPTIONS.map((option) => (
          <SeatingOption
            key={option.id}
            option={option}
            isSelected={selectedSeating === option.id}
            onClick={() => setSelectedSeating(option.id)}
          />
        ))}
      </motion.div>

      {/* Table view perspective */}
      {selectedSeating && (
        <motion.div 
          className="mt-10 relative h-64 md:h-80 lg:h-96 w-full rounded-lg overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Image
            src={SEATING_OPTIONS.find(o => o.id === selectedSeating)?.image || SEATING_OPTIONS[0].image}
            alt={`View from ${SEATING_OPTIONS.find(o => o.id === selectedSeating)?.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <h3 className="text-lg md:text-xl font-serif mb-2">
              View from {SEATING_OPTIONS.find(o => o.id === selectedSeating)?.name}
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              This is your perspective from the selected seating area. 
              {selectedSeating === 'window' ? ' Enjoy city views while dining.' : 
               selectedSeating === 'garden' ? ' Experience outdoor dining in our enchanted garden.' :
               selectedSeating === 'private' ? ' Private dining room for intimate gatherings.' :
               ' Watch our chefs at work while enjoying your meal.'}
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
}

interface SeatingOptionProps {
  option: typeof SEATING_OPTIONS[0];
  isSelected: boolean;
  onClick: () => void;
}

function SeatingOption({ option, isSelected, onClick }: SeatingOptionProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      className={cn(
        "relative rounded-lg overflow-hidden transition-all group",
        isSelected ? "ring-2 ring-white scale-[1.02]" : "opacity-80 hover:opacity-100"
      )}
      variants={fadeInUp}
    >
      <div className="aspect-[3/4] relative">
        <Image
          src={option.image}
          alt={option.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Capacity Tooltip */}
        <div 
          className={cn(
            "absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full",
            "text-white text-sm font-medium transition-opacity duration-200",
            showTooltip || isSelected ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 17H9V20H15V17Z" fill="currentColor" />
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C7.58172 2 4 5.58172 4 10C4 12.5493 5.31741 14.7824 7.32428 16.0039C7.8448 16.3308 8.12506 16.4942 8.29178 16.7553C8.45849 17.0164 8.5 17.3904 8.5 18.1384V18.5C8.5 14.5 15.5 14.5 15.5 18.5V18.1384C15.5 17.3904 15.5415 17.0164 15.7082 16.7553C15.8749 16.4942 16.1552 16.3308 16.6757 16.0039C18.6826 14.7824 20 12.5493 20 10C20 5.58172 16.4183 2 12 2Z" fill="currentColor" />
            </svg>
            <span>Capacity: {option.capacity}</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-start">
        <h3 className="text-lg md:text-xl font-serif mb-1">{option.name}</h3>
        <p className="text-sm text-white/80 line-clamp-2">{option.description}</p>
      </div>
    </motion.button>
  );
}