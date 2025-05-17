import { Metadata } from 'next';
import TimeSelection from '@/components/reservations/time-selection';
import SeatingSelection from '@/components/reservations/seating-selection';
import ReservationForm from '@/components/reservations/reservation-form';
import { RESTAURANT_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Reservations | ${RESTAURANT_NAME}`,
  description: 'Reserve your table for an unforgettable culinary experience',
};

export default function ReservationsPage() {
  return (
    <>
      <div className="h-[40vh] w-full relative bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">Reservations</h1>
          <p className="text-xl md:text-2xl max-w-xl opacity-90">
            Secure your table for an exceptional dining experience
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-b from-black to-gray-900 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <TimeSelection />
          <SeatingSelection />
          <ReservationForm />
        </div>
      </div>
    </>
  );
}