import { Metadata } from 'next';
import GalleryMenu from '@/components/order/gallery-menu';
import FoodCustomizer from '@/components/order/food-customizer';
import OrderSummary from '@/components/order/order-summary';
import { RESTAURANT_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Order Online | ${RESTAURANT_NAME}`,
  description: 'Order our culinary creations for delivery or pickup',
};

export default function OrderPage() {
  return (
    <>
      <div className="h-[40vh] w-full relative bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5175645/pexels-photo-5175645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">Order Online</h1>
          <p className="text-xl md:text-2xl max-w-xl opacity-90">
            Enjoy our culinary artistry in the comfort of your home
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-b from-black to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <GalleryMenu />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            <div className="lg:col-span-2">
              <FoodCustomizer />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}