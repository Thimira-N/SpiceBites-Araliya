"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, imageReveal } from '@/lib/animations';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GALLERY_IMAGES } from '@/lib/constants';

export default function StoryGallery() {
  const [selectedImage, setSelectedImage] = useState<null | {url: string, alt: string}>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Our Visual Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A photo documentary of our culinary artistry and the experiences we create.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Large hero image */}
          <motion.div 
            className="md:col-span-2 md:row-span-2 relative cursor-pointer group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageReveal}
            onClick={() => setSelectedImage(GALLERY_IMAGES[0])}
          >
            <div className="aspect-square md:aspect-auto md:h-full relative rounded-lg overflow-hidden">
              <Image
                src={GALLERY_IMAGES[0].url}
                alt={GALLERY_IMAGES[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-lg">{GALLERY_IMAGES[0].alt}</h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Smaller images */}
          {GALLERY_IMAGES.slice(1, 5).map((image, index) => (
            <motion.div 
              key={index} 
              className="relative cursor-pointer group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={imageReveal}
              custom={index * 0.1}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-lg">{image.alt}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {GALLERY_IMAGES.slice(5).map((image, index) => (
            <motion.div 
              key={index} 
              className="relative cursor-pointer group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={imageReveal}
              custom={index * 0.1}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-lg">{image.alt}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden p-0 bg-black border-none">
          {selectedImage && (
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                <p className="text-white text-lg">{selectedImage.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}