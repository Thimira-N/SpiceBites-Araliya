"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { FEATURED_DISHES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CheckCircle, PlusCircle, MinusCircle, Utensils } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
// Simple notification function
const showNotification = (message: string) => {
  // Could be implemented with a custom notification system
  alert(message);
};

// Customization options
const SIZE_OPTIONS = [
  { id: 'regular', name: 'Regular', priceAdjustment: 0 },
  { id: 'large', name: 'Large', priceAdjustment: 250 }
];

const SPICE_OPTIONS = [
  { id: 'mild', name: 'Mild' },
  { id: 'medium', name: 'Medium' },
  { id: 'spicy', name: 'Spicy' }
];

const ADDON_OPTIONS = [
  { id: 'truffle', name: 'Add Truffle Shavings', price: 250 },
  { id: 'foiegras', name: 'Add Foie Gras', price: 300 },
  { id: 'caviar', name: 'Add Caviar', price: 350 }
];

export default function FoodCustomizer() {
  // Using the first dish as an example
  const [selectedDish, setSelectedDish] = useState(FEATURED_DISHES[0]);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0].id);
  const [selectedSpice, setSelectedSpice] = useState(SPICE_OPTIONS[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddonChange = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };
  
  // Calculate total price
  const basePrice = parseFloat(selectedDish.price.replace('Rs.', ''));
  const sizeAdjustment = SIZE_OPTIONS.find(size => size.id === selectedSize)?.priceAdjustment || 0;
  const addonsTotal = selectedAddons.reduce((total, addonId) => {
    const addon = ADDON_OPTIONS.find(addon => addon.id === addonId);
    return total + (addon?.price || 0);
  }, 0);
  
  const itemPrice = basePrice + sizeAdjustment + addonsTotal;
  const totalPrice = itemPrice * quantity;

  // Generate customization string
  const getCustomizationString = () => {
    const size = SIZE_OPTIONS.find(size => size.id === selectedSize)?.name || '';
    const spice = SPICE_OPTIONS.find(spice => spice.id === selectedSpice)?.name || '';
    
    const addons = selectedAddons.map(addonId => {
      const addon = ADDON_OPTIONS.find(addon => addon.id === addonId);
      return addon?.name.replace('Add ', '') || '';
    }).join(', ');
    
    let customString = `${size} size, ${spice} spice`;
    if (addons) customString += `, ${addons}`;
    
    return customString;
  };
  
  const handleAddToOrder = () => {
    // Create the order item
    const newItem = {
      id: Date.now(), // Using timestamp as unique ID
      name: selectedDish.name,
      price: itemPrice,
      quantity: quantity,
      image: selectedDish.image,
      customizations: getCustomizationString()
    };

    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add new item to cart
    const updatedCart = [...existingCart, newItem];
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Show success notification
    showNotification(`${quantity}x ${selectedDish.name} added to your order`);
    
    // Reset form
    setSelectedSize(SIZE_OPTIONS[0].id);
    setSelectedSpice(SPICE_OPTIONS[0].id);
    setSelectedAddons([]);
    setQuantity(1);
    
    // Dispatch custom event to notify OrderSummary component
    const updateEvent = new CustomEvent('orderUpdated');
    window.dispatchEvent(updateEvent);
  };
  
  return (
    <section className="relative mb-16">
      {/* Visual indicator that makes the section stand out */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full p-4 shadow-lg shadow-orange-500/30 z-10">
        <Utensils size={28} className="text-white" />
      </div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-600/20 rounded-xl blur-xl opacity-70"></div>
      
      <div className="bg-black/30 backdrop-blur-sm border border-orange-500/30 rounded-lg p-6 pt-10 relative z-0">
        <motion.div 
          className="mb-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-orange-300 text-sm font-medium mb-4">
            Personal Touch
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-2 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 font-bold">
              Customize Your Dish
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Personalize your selection with options and additions for a unique dining experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual preview */}
          <motion.div 
            className="relative rounded-lg overflow-hidden aspect-square border border-orange-500/20 shadow-lg shadow-orange-500/10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Image
              src={selectedDish.image}
              alt={selectedDish.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl md:text-2xl font-serif mb-2">{selectedDish.name}</h3>
              <p className="text-white/80 text-sm mb-4 line-clamp-2">{selectedDish.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-medium text-orange-300">Rs. {totalPrice.toFixed(2)}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleDecreaseQuantity} 
                    disabled={quantity <= 1}
                    className="text-white/80 disabled:text-white/40 hover:text-orange-300"
                  >
                    <MinusCircle size={24} />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <button 
                    onClick={handleIncreaseQuantity} 
                    disabled={quantity >= 10}
                    className="text-white/80 disabled:text-white/40 hover:text-orange-300"
                  >
                    <PlusCircle size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customization options */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="size" className="text-white">
              <TabsList className="w-full grid grid-cols-3 mb-6 bg-white/10">
                <TabsTrigger value="size" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Size</TabsTrigger>
                <TabsTrigger value="spice" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Spice Level</TabsTrigger>
                <TabsTrigger value="addons" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Add-ons</TabsTrigger>
              </TabsList>
              
              <TabsContent value="size" className="space-y-4">
                <div className="text-lg mb-4">Select Size</div>
                <RadioGroup 
                  value={selectedSize} 
                  onValueChange={setSelectedSize}
                  className="grid grid-cols-1 gap-4"
                >
                  {SIZE_OPTIONS.map((size) => (
                    <div key={size.id} className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-4 border border-white/10">
                      <RadioGroupItem value={size.id} id={`size-${size.id}`} className="mt-1 text-orange-500 border-orange-500" />
                      <div className="flex-1">
                        <Label htmlFor={`size-${size.id}`} className="text-lg font-medium cursor-pointer">
                          {size.name}
                        </Label>
                        <p className="text-white/70 text-sm mt-1">
                          {size.id === 'regular' 
                            ? 'Standard portion, perfect for one person.' 
                            : 'Larger portion, ideal for sharing or hearty appetites.'}
                        </p>
                      </div>
                      <div className="text-right font-medium text-orange-300">
                        {size.priceAdjustment > 0 ? `+Rs. ${size.priceAdjustment.toFixed(2)}` : 'Included'}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>
              
              <TabsContent value="spice" className="space-y-4">
                <div className="text-lg mb-4">Select Spice Level</div>
                <RadioGroup 
                  value={selectedSpice} 
                  onValueChange={setSelectedSpice}
                  className="grid grid-cols-1 gap-4"
                >
                  {SPICE_OPTIONS.map((spice) => (
                    <div key={spice.id} className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-4 border border-white/10">
                      <RadioGroupItem value={spice.id} id={`spice-${spice.id}`} className="mt-1 text-orange-500 border-orange-500" />
                      <div className="flex-1">
                        <Label htmlFor={`spice-${spice.id}`} className="text-lg font-medium cursor-pointer">
                          {spice.name}
                        </Label>
                        <p className="text-white/70 text-sm mt-1">
                          {spice.id === 'mild' 
                            ? 'Subtle flavors with minimal heat.' 
                            : spice.id === 'medium'
                            ? 'Balanced heat that enhances the flavors.'
                            : 'Bold, intense heat for spice enthusiasts.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>
              
              <TabsContent value="addons" className="space-y-4">
                <div className="text-lg mb-4">Select Add-ons</div>
                <div className="grid grid-cols-1 gap-4">
                  {ADDON_OPTIONS.map((addon) => (
                    <div key={addon.id} className="flex items-start gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-4 border border-white/10">
                      <Checkbox 
                        id={`addon-${addon.id}`} 
                        checked={selectedAddons.includes(addon.id)} 
                        onCheckedChange={() => handleAddonChange(addon.id)} 
                        className="mt-1 text-orange-500 border-orange-500 data-[state=checked]:bg-orange-500"
                      />
                      <div className="flex-1">
                        <Label htmlFor={`addon-${addon.id}`} className="text-lg font-medium cursor-pointer">
                          {addon.name}
                        </Label>
                        <p className="text-white/70 text-sm mt-1">
                          Elevate your dish with this premium addition.
                        </p>
                      </div>
                      <div className="text-right font-medium text-orange-300">
                        +Rs. {addon.price.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <Button 
                className="w-full py-6 text-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 border-none shadow-lg shadow-orange-600/20" 
                size="lg" 
                onClick={handleAddToOrder}
              >
                Add to Order
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}