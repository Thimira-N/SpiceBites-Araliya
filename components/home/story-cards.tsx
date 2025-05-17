"use client";

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { STORY_SECTIONS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/lib/animations';

export default function StoryCards() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Culinary Journey</h2>
          <p className="text-gray-600 text-lg">
            Discover the passion and artistry behind every dish we create.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerChildren}
        >
          {STORY_SECTIONS.map((section, index) => (
            <StoryCard 
              key={index}
              title={section.title}
              content={section.content}
              image={section.image}
            />
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 text-lg font-medium border-b-2 border-black pb-1 transition-all hover:gap-3"
          >
            Explore our full story <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface StoryCardProps {
  title: string;
  content: string;
  image: string;
}

function StoryCard({ title, content, image }: StoryCardProps) {
  return (
    <motion.div 
      className="group bg-white rounded-lg overflow-hidden shadow-md"
      variants={fadeInUp}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif mb-3">{title}</h3>
        <p className="text-gray-600 line-clamp-4">{content}</p>
      </div>
    </motion.div>
  );
}