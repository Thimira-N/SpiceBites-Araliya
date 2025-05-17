"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { FEATURED_DISHES, MENU_CATEGORIES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fadeInUp, scaleUp } from '@/lib/animations';
import { ZoomIn, ZoomOut, RotateCw, Shrink, Maximize2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VisualMenu() {
  const [selectedDish, setSelectedDish] = useState<typeof FEATURED_DISHES[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(MENU_CATEGORIES[0].id);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  
  const filteredDishes = FEATURED_DISHES.filter(
    dish => dish.category === selectedCategory
  );

  const handleZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoomLevel < 2) {
      setZoomLevel(prev => prev + 0.25);
    } else if (direction === 'out' && zoomLevel > 1) {
      setZoomLevel(prev => prev - 0.25);
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setIsRotating(false);
  };

  const toggleRotate = () => {
    setIsRotating(!isRotating);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      {MENU_CATEGORIES.map(category => (
        <div key={category.id} id={category.id} className="mb-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">{category.name}</h2>
              <p className="text-white/70 max-w-2xl mx-auto">{category.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {FEATURED_DISHES.filter(dish => dish.category === category.id).map((dish, index) => (
                <DishCard 
                  key={dish.id}
                  dish={dish}
                  onClick={() => setSelectedDish(dish)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Dish Detail Dialog */}
      <Dialog open={!!selectedDish} onOpenChange={(open) => !open && setSelectedDish(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-black border-gray-800">
          {selectedDish && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative w-full md:w-3/5 h-64 md:h-auto overflow-hidden">
                <div className={cn(
                  "relative w-full h-full transition-transform duration-700",
                  isRotating && "animate-[spin_8s_linear_infinite]"
                )}>
                  <Image
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    fill
                    className="object-cover"
                    style={{ transform: `scale(${zoomLevel})` }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw"
                  />
                </div>
                
                {/* Image controls */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button 
                    onClick={() => handleZoom('in')} 
                    className="p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
                    aria-label="Zoom in"
                  >
                    <ZoomIn size={18} />
                  </button>
                  <button 
                    onClick={() => handleZoom('out')} 
                    className="p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
                    aria-label="Zoom out"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button 
                    onClick={toggleRotate} 
                    className={cn(
                      "p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors",
                      isRotating && "bg-white/30 hover:bg-white/50"
                    )}
                    aria-label="Rotate view"
                  >
                    <RotateCw size={18} />
                  </button>
                  <button 
                    onClick={resetZoom} 
                    className="p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors"
                    aria-label="Reset view"
                  >
                    <Shrink size={18} />
                  </button>
                </div>
              </div>
              
              <div className="w-full md:w-2/5 p-6 bg-black text-white">
                <h3 className="text-2xl font-serif mb-2">{selectedDish.name}</h3>
                <p className="text-white/70 mb-4">{selectedDish.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-medium">{selectedDish.price}</span>
                  <div className="flex gap-1">
                    {selectedDish.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className={cn(
                          "px-2 py-1 text-xs rounded-full",
                          tag === "Vegetarian" ? "bg-green-900 text-green-200" :
                          tag === "Gluten-Free" ? "bg-yellow-900 text-yellow-200" :
                          tag === "Signature" ? "bg-purple-900 text-purple-200" :
                          tag === "Chef's Choice" ? "bg-blue-900 text-blue-200" :
                          "bg-gray-800 text-gray-200"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h4 className="text-lg font-medium mb-2">Preparation</h4>
                  <p className="text-white/70 text-sm">
                    Each {selectedDish.name} is meticulously crafted by our expert chefs 
                    using locally-sourced ingredients. The dish is prepared to order, ensuring
                    the freshest possible experience.
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

interface DishCardProps {
  dish: typeof FEATURED_DISHES[0];
  onClick: () => void;
  index: number;
}

function DishCard({ dish, onClick, index }: DishCardProps) {
  return (
    <motion.div 
      className="group bg-black rounded-lg overflow-hidden cursor-pointer shadow-md shadow-black/50 border border-gray-800"
      onClick={onClick}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={scaleUp}
      custom={index * 0.1}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Modal indicator icon */}
        <div className="absolute bottom-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="p-4 text-white">
        <h3 className="text-xl font-serif group-hover:text-white/90">{dish.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-medium">{dish.price}</span>
          <div className="flex items-center gap-1 text-sm text-white/70">
            <span>View details</span>
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}