"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { X, Clock, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
// Simple notification function
const showNotification = (message: string) => {
  // Could be implemented with a custom notification system
  alert(message);
};

// Order item type
type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations: string;
};

export default function OrderSummary() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  
  // Load cart items from localStorage when component mounts
  useEffect(() => {
    const loadCartItems = () => {
      try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const parsedCart = JSON.parse(cartData);
          setOrderItems(parsedCart);
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        // Handle error case
        showNotification("There was a problem loading your order items");
      }
    };

    // Load items on mount
    loadCartItems();
    
    // Add event listener for cart updates
    const handleOrderUpdate = () => {
      loadCartItems();
    };
    
    window.addEventListener('orderUpdated', handleOrderUpdate);
    
    // Cleanup
    return () => {
      window.removeEventListener('orderUpdated', handleOrderUpdate);
    };
  }, []);
  
  const removeItem = (id: number) => {
    try {
      // Remove from state
      setOrderItems(prev => prev.filter(item => item.id !== id));
      
      // Update localStorage
      const updatedCart = orderItems.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      showNotification("Item has been removed from your order");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      showNotification("There was a problem removing the item from your order");
    }
  };
  
  // Calculate totals
  const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.085; // 8.5% tax
  const deliveryFee = orderItems.length > 0 ? 5.99 : 0;
  const total = subtotal + tax + deliveryFee;
  
  // Estimated delivery time
  const now = new Date();
  const deliveryTime = new Date(now.getTime() + 45 * 60000); // 45 minutes later
  const deliveryTimeStr = deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  const handleCheckout = () => {
    showNotification("Your order has been placed successfully!");
    
    // Clear cart
    setOrderItems([]);
    localStorage.removeItem('cart');
  };
  
  return (
    <section className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-white">
      <motion.div 
        className="mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl font-serif mb-2">Your Order</h2>
        {orderItems.length > 0 ? (
          <div className="flex items-center gap-2 text-white/70">
            <Clock size={16} />
            <span>Estimated delivery by {deliveryTimeStr}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white/70">
            <ShoppingCart size={16} />
            <span>Your cart is empty</span>
          </div>
        )}
      </motion.div>

      {/* Order items */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {orderItems.length > 0 ? (
          orderItems.map(item => (
            <motion.div 
              key={item.id}
              className="flex gap-3 bg-white/5 p-3 rounded-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{item.name}</h3>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-white/60 hover:text-white/90"
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-white/70 mt-1">
                  {item.customizations}
                </p>
                <div className="flex justify-between mt-2">
                  <span>Qty: {item.quantity}</span>
                  <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="text-center py-8 text-white/70"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            Add items from the menu to get started
          </motion.div>
        )}
      </div>

      {/* Order summary */}
      {orderItems.length > 0 && (
        <motion.div
          className="space-y-3 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between">
            <span className="text-white/70">Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Tax</span>
            <span>Rs. {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Delivery Fee</span>
            <span>Rs. {deliveryFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-white/10 pt-3 flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
        </motion.div>
      )}

      {/* Checkout button */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        transition={{ delay: 0.3 }}
      >
        <Button 
          className="w-full" 
          disabled={orderItems.length === 0}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </motion.div>
    </section>
  );
}