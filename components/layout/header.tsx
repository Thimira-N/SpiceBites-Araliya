"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RESTAURANT_NAME } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll events to change header transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md py-3 shadow-md" 
          : "bg-gradient-to-b from-black/70 to-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-white font-serif text-2xl md:text-3xl tracking-wider"
        >
          {RESTAURANT_NAME}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/menu">Menu</NavLink>
          <NavLink href="/reservations">Reservations</NavLink>
          <NavLink href="/order">Order</NavLink>
          <NavLink href="/about">Our Story</NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-6 text-center">
          <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="/menu" onClick={() => setIsMenuOpen(false)}>Menu</MobileNavLink>
          <MobileNavLink href="/reservations" onClick={() => setIsMenuOpen(false)}>Reservations</MobileNavLink>
          <MobileNavLink href="/order" onClick={() => setIsMenuOpen(false)}>Order</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>Our Story</MobileNavLink>
        </nav>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-white/90 hover:text-white text-sm uppercase tracking-wider font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileNavLink({ href, onClick, children }: MobileNavLinkProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="text-white text-2xl font-light tracking-widest py-2 transition-transform hover:scale-110"
    >
      {children}
    </Link>
  );
}