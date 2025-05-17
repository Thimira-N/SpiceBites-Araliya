"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/lib/animations';
import { CHEF_PROFILES } from '@/lib/constants';

export default function ChefProfile() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Meet Our Chefs</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The talented culinary artists behind our visual and gastronomic creations.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          {CHEF_PROFILES.map((chef, index) => (
            <ChefCard 
              key={index}
              chef={chef}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ChefCardProps {
  chef: {
    name: string;
    title: string;
    image: string;
    quote: string;
    background: string;
  };
}

function ChefCard({ chef }: ChefCardProps) {
  return (
    <motion.div 
      className="relative group rounded-lg overflow-hidden"
      variants={fadeInUp}
    >
      <div className="aspect-[3/4] relative">
        <Image
          src={chef.image}
          alt={chef.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 500px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-serif mb-1">{chef.name}</h3>
        <p className="text-white/70 mb-4">{chef.title}</p>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white/90 italic mb-4">"{chef.quote}"</p>
          <p className="text-white/70 text-sm line-clamp-3">{chef.background}</p>
        </div>
      </div>
    </motion.div>
  );
}