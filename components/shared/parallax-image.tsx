"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  className, 
  strength = 100 
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || !imgRef.current) return;
      
      const { top, height } = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const percentageInView = 1 - (top / windowHeight);
      
      // Apply parallax effect only when element is in viewport
      if (percentageInView > 0 && percentageInView < 2) {
        const parallaxOffset = strength * (percentageInView - 0.5);
        imgRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial positioning
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength]);

  return (
    <div 
      ref={ref} 
      className={cn("relative overflow-hidden", className)}
    >
      <div 
        ref={imgRef} 
        className="relative h-[calc(100%+200px)] -top-[100px] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}