import { Metadata } from 'next';
import VisualMenu from '@/components/menu/visual-menu';
import CategoryNavigation from '@/components/menu/category-navigation';
import { RESTAURANT_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Menu | ${RESTAURANT_NAME}`,
  description: 'Experience our artfully crafted dishes through visual storytelling',
};

export default function MenuPage() {
  return (
    <>
      <div className="h-[40vh] w-full relative bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">Our Menu</h1>
          <p className="text-xl md:text-2xl max-w-xl opacity-90">
            A visual journey through our culinary artistry
          </p>
        </div>
      </div>
      
      <CategoryNavigation />
      <VisualMenu />
    </>
  );
}