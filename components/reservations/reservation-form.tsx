"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function ReservationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  if (isSuccess) {
    return (
      <motion.div 
        className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center text-white"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h3 className="text-2xl font-serif mb-4">Reservation Confirmed</h3>
        <p className="mb-6 text-white/80">
          Thank you for your reservation. We look forward to welcoming you to Lumière.
          A confirmation has been sent to your email address.
        </p>
        <Button onClick={() => setIsSuccess(false)}>Make Another Reservation</Button>
      </motion.div>
    );
  }
  
  return (
    <section>
      <motion.div 
        className="text-center mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Complete Your Reservation</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Fill in your details to secure your table.
        </p>
      </motion.div>

      <motion.div 
        className="max-w-2xl mx-auto bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 md:p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <form onSubmit={handleSubmit} className="space-y-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your name" 
                required 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                required 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                placeholder="(555) 123-4567" 
                required 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Input 
                id="guests" 
                type="number" 
                min="1" 
                max="12" 
                defaultValue="2" 
                required 
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Occasion (Optional)</Label>
            <RadioGroup defaultValue="none" className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="cursor-pointer">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="birthday" id="birthday" />
                <Label htmlFor="birthday" className="cursor-pointer">Birthday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anniversary" id="anniversary" />
                <Label htmlFor="anniversary" className="cursor-pointer">Anniversary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="business" id="business" />
                <Label htmlFor="business" className="cursor-pointer">Business</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-requests">Special Requests (Optional)</Label>
            <Textarea 
              id="special-requests" 
              placeholder="Let us know if you have any dietary restrictions or special requests" 
              rows={4}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
          </div>

          <motion.div 
            className="mt-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-medium py-6 text-lg shadow-lg shadow-amber-500/20 rounded-md transition-all duration-300 transform" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Confirming..." : "Confirm Reservation"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
}