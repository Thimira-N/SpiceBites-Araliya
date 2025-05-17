"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { RESERVATION_TIMES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function TimeSelection() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState(RESERVATION_TIMES[3].value); // Default to 7:00 PM
  
  return (
    <section className="mb-16">
      <motion.div 
        className="text-center mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Select Your Time</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Choose when you'd like to join us. Our ambiance changes throughout the evening.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <motion.div 
          className="col-span-1 bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h3 className="text-xl text-white mb-4 font-medium">Date</h3>
          <div className="flex flex-col space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </motion.div>

        <motion.div 
          className="col-span-1 md:col-span-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl text-white mb-4 font-medium">Time</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {RESERVATION_TIMES.map((time) => (
              <TimeOption
                key={time.value}
                time={time}
                isSelected={selectedTime === time.value}
                onClick={() => setSelectedTime(time.value)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ambient preview based on selected time */}
      <motion.div 
        className="relative h-64 md:h-80 lg:h-96 w-full rounded-lg overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        transition={{ delay: 0.4 }}
      >
        <Image
          src={RESERVATION_TIMES.find(t => t.value === selectedTime)?.image || RESERVATION_TIMES[0].image}
          alt={`Restaurant ambiance at ${selectedTime}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
          <h3 className="text-lg md:text-xl font-serif mb-2">
            Restaurant Ambiance at {RESERVATION_TIMES.find(t => t.value === selectedTime)?.label}
          </h3>
          <p className="text-white/80 text-sm md:text-base">
            Experience our unique atmosphere as the day transitions into evening.
            {parseInt(selectedTime) >= 19 ? " Enjoy the subtle lighting and intimate setting of our dinner service." : 
             " Catch the warm glow of early evening as you begin your dining experience."}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

interface TimeOptionProps {
  time: typeof RESERVATION_TIMES[0];
  isSelected: boolean;
  onClick: () => void;
}

function TimeOption({ time, isSelected, onClick }: TimeOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative h-20 rounded-lg overflow-hidden transition-all",
        isSelected ? "ring-2 ring-white scale-[1.02]" : "opacity-70 hover:opacity-100"
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={time.image}
          alt={time.label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative h-full flex items-center justify-center text-white">
        <span className="text-lg font-medium">{time.label}</span>
      </div>
    </button>
  );
}