import HeroCarousel from '@/components/home/hero-carousel';
import FeaturedDishes from '@/components/home/featured-dishes';
import ImageGrid from '@/components/home/image-grid';
import VideoBackground from '@/components/home/video-background';
import StoryCards from '@/components/home/story-cards';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FeaturedDishes />
      <VideoBackground />
      <ImageGrid />
      <StoryCards />
    </>
  );
}