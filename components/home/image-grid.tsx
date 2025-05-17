"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GALLERY_IMAGES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { imageZoom } from '@/lib/animations';

export default function ImageGrid() {
  const [selectedImage, setSelectedImage] = useState<null | {url: string, alt: string}>(null);

  return (
    <section className="py-16 px-4 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-12">
          Culinary Moments
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={index}
              className="aspect-square overflow-hidden cursor-pointer relative"
              whileHover="hover"
              variants={imageZoom}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition-transform"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <p className="text-white text-center font-medium text-sm md:text-base">{image.alt}</p>
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