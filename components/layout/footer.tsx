import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { RESTAURANT_NAME, SOCIAL_LINKS, OPENING_HOURS, CONTACT_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-black text-white/90 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Logo and social links */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-white font-serif text-3xl tracking-wider">
                {RESTAURANT_NAME}
              </h2>
            </Link>
            <p className="max-w-xs text-white/70">
              A culinary journey through exceptional flavors and visual artistry.
            </p>
            <div className="flex space-x-4">
              <SocialLink href={SOCIAL_LINKS[0].url} aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS[1].url} aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </SocialLink>
              <SocialLink href={SOCIAL_LINKS[2].url} aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </SocialLink>
            </div>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">Opening Hours</h3>
            <ul className="space-y-4">
              {OPENING_HOURS.map((item) => (
                <li key={item.day} className="flex justify-between">
                  <span className="text-white/70">{item.day}</span>
                  <span className="text-white">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-white">Contact Us</h3>
            <address className="not-italic space-y-4 text-white/70">
              <p>{CONTACT_INFO.address}</p>
              <p>Phone: {CONTACT_INFO.phone}</p>
              <p>Email: {CONTACT_INFO.email}</p>
            </address>
          </div>
        </div>

        {/* Bottom links and copyright */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
            <FooterLink href="/menu">Menu</FooterLink>
            <FooterLink href="/reservations">Reservations</FooterLink>
            <FooterLink href="/order">Order Online</FooterLink>
            <FooterLink href="/about">Our Story</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
          </div>
          <div className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} {RESTAURANT_NAME}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  'aria-label': string;
}

function SocialLink({ href, children, ...props }: SocialLinkProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-white/20"
      {...props}
    >
      {children}
    </a>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-white/70 hover:text-white text-sm transition-colors"
    >
      {children}
    </Link>
  );
}