// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter, Playfair_Display } from 'next/font/google';
// import Header from '@/components/layout/header';
// import Footer from '@/components/layout/footer';
// import { RESTAURANT_NAME } from '@/lib/constants';

// // Fonts
// const inter = Inter({ 
//   subsets: ['latin'],
//   variable: '--font-inter',
//   display: 'swap'
// });

// const playfair = Playfair_Display({ 
//   subsets: ['latin'],
//   variable: '--font-playfair',
//   display: 'swap'
// });

// export const metadata: Metadata = {
//   title: {
//     default: `${RESTAURANT_NAME} | Artistry on a plate`,
//     template: `%s | ${RESTAURANT_NAME}`
//   },
//   description: 'Where culinary craftsmanship meets visual poetry',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
//       <body className="min-h-screen flex flex-col font-sans antialiased">
//         <Header />
//         <main className="flex-grow">
//           {children}
//         </main>
//         <Footer />
//       </body>
//     </html>
//   );
// };




import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { RESTAURANT_NAME } from '@/lib/constants';

// Font configurations
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

// Metadata configuration
export const metadata: Metadata = {
  title: {
    default: `${RESTAURANT_NAME} | Artistry on a plate`,
    template: `%s | ${RESTAURANT_NAME}`
  },
  description: 'Where culinary craftsmanship meets visual poetry',
};

// Interface for layout props
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component for the application
 * @param props - Contains children components to be rendered in the layout
 * @returns JSX for the layout structure
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};