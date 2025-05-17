"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow down the video for dramatic effect
    }
  }, []);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center items-center text-center text-white">
        <motion.h2 
          className="text-3xl md:text-5xl font-serif mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          Experience Culinary Artistry
        </motion.h2>
        <motion.p 
          className="max-w-2xl text-lg md:text-xl mb-8 text-white/90"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          Every dish is crafted as a work of art, designed to captivate both the eyes and the palate.
        </motion.p>
        <motion.div
          className="flex gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
            <Link href="/reservations">Reserve a Table</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-gray-600 hover:bg-white/10">
            <Link href="/menu">View Our Menu</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}