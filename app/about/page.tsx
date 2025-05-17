import { Metadata } from 'next';
import ChefProfile from '@/components/about/chef-profile';
import StoryGallery from '@/components/about/story-gallery';
import { RESTAURANT_NAME } from '@/lib/constants';
import ParallaxImage from '@/components/shared/parallax-image';

export const metadata: Metadata = {
  title: `Our Story | ${RESTAURANT_NAME}`,
  description: 'The journey and philosophy behind our culinary artistry',
};

export default function AboutPage() {
  return (
    <>
      <div className="h-[50vh] w-full relative bg-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-xl opacity-90">
            The passion and vision behind {RESTAURANT_NAME}
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Origins section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Our Origins</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2018 by acclaimed chef Emilia Laurent, Lumière began as a passion 
                project dedicated to elevating food photography alongside culinary excellence. 
              </p>
              
              <div className="my-6 pl-4 border-l-4 border-amber-400">
                <p className="text-lg italic text-gray-800">
                  "What began as a small supper club has evolved into a visual feast for all the senses."
                </p>
              </div>
              
              <p className="text-gray-700 mb-4">
                What started as a small supper club has evolved into one of the city's most 
                visually stunning dining destinations, where every dish is conceived with 
                both flavor and visual presentation in mind.
              </p>
              
              <div className="flex items-center mt-4 mb-6">
                <div className="h-px bg-gray-300 flex-grow"></div>
                <div className="px-4">
                  <span className="text-amber-600 font-serif text-xl">Est. 2018</span>
                </div>
                <div className="h-px bg-gray-300 flex-grow"></div>
              </div>
              
              <p className="text-gray-700">
                Our restaurant was born from the belief that dining should be a feast for 
                all senses, with the visual component playing a crucial role in the overall 
                experience.
              </p>
            </div>
            <ParallaxImage
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Restaurant interior"
              className="aspect-[4/3] rounded-lg shadow-xl"
              strength={50}
            />
          </div>
          
          {/* Philosophy section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 items-center">
            <ParallaxImage
              src="https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Chef plating a dish"
              className="aspect-[4/3] rounded-lg shadow-xl md:order-last"
              strength={50}
            />
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Our Philosophy</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
                <h3 className="text-xl font-serif text-gray-800 mb-2">The Multisensory Experience</h3>
                <p className="text-gray-700">
                  At Lumière, we believe dining is a multisensory art form. Our approach begins 
                  with stunning visual presentation, complemented by aroma, texture, and of 
                  course, exceptional flavor.
                </p>
              </div>
              
              <p className="text-gray-700 mb-4">
                Each dish is conceived as a complete sensory experience, with careful 
                attention paid to color, composition, and the interplay of elements on the plate.
              </p>
              
              <div className="my-6 pl-4 border-l-4 border-amber-400">
                <p className="text-lg italic text-gray-800">
                  "We draw inspiration from art, nature, and culture, translating these influences 
                  into culinary creations that tell a story."
                </p>
              </div>
              
              <p className="text-gray-700">
                We translate these influences into culinary creations that tell a story and evoke 
                emotion through their visual impact.
              </p>
            </div>
          </div>
          
          {/* Ingredients section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Farm to Table</h2>
              <p className="text-gray-700 mb-4">
                We partner exclusively with local farmers and artisanal producers who share 
                our commitment to sustainable, ethical practices.
              </p>
              
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <h4 className="font-serif text-amber-800 mb-1">Local</h4>
                  <p className="text-sm text-gray-700">Ingredients sourced within 50 miles</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <h4 className="font-serif text-amber-800 mb-1">Seasonal</h4>
                  <p className="text-sm text-gray-700">Menu changes with nature's rhythm</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                Our chefs visit farms and markets personally, seeking out the most vibrant, 
                fresh, and visually striking ingredients to feature in our seasonal menus.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm my-6">
                <p className="text-gray-700 font-medium">
                  This commitment to ingredient quality ensures that our dishes start from a 
                  foundation of natural beauty, which we then enhance through our culinary techniques.
                </p>
              </div>
            </div>
            <ParallaxImage
              src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Fresh ingredients"
              className="aspect-[4/3] rounded-lg shadow-xl"
              strength={50}
            />
          </div>
        </div>
      </div>
      
      <StoryGallery />
      <ChefProfile />
    </>
  );
}