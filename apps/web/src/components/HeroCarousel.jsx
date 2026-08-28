import collage1 from '../assets/charity/collage1.webp';
import collage2 from '../assets/charity/collage2.jpg';
import collage3 from '../assets/charity/collage3.webp';
import collage4 from '../assets/charity/collage4.jpg';
import collage5 from '../assets/charity/collage5.jpg';
import collage6 from '../assets/charity/collage6.webp';
import collage7 from '../assets/charity/collage7.webp';
import collage8 from '../assets/charity/collage8.jpg';
import collage9 from '../assets/charity/collage9.jpg';
import collage10 from '../assets/charity/collage10.webp';

export default function HeroCarousel() {
  return (
    <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#092B22] shadow-2xl flex flex-col lg:flex-row items-stretch border border-[#164336]">
      
      {/* Left Text Content */}
      <div className="p-8 lg:p-12 lg:w-2/5 z-10 flex flex-col justify-center bg-gradient-to-br from-[#092B22] to-[#0A2921] h-full min-h-[420px]">
        <div className="inline-flex items-center gap-2 bg-[#0F9F76]/20 border border-[#0F9F76]/30 text-[#34D399] text-[10px] font-black px-3.5 py-1.5 rounded-full w-fit mb-6 uppercase tracking-widest shadow-sm">
          <span className="text-sm">🌱</span> RescueBite Dhaka
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.1]">
          Every Meal <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34D399] to-[#0F9F76]">
            Finds a Home.
          </span>
        </h1>
        
        <p className="text-stone-300/90 text-sm md:text-base mt-6 leading-relaxed font-medium max-w-md">
          Bridging the gap between surplus food and the community. Join us in reducing waste and nourishing families and shelters across the city.
        </p>
        
        {/* Decorative Heroes Tag */}
        <div className="mt-10 flex items-center gap-3">
          <div className="flex -space-x-3">
            <img src={collage4} className="w-10 h-10 rounded-full border-2 border-[#092B22] object-cover shadow-sm" alt="hero" />
            <img src={collage8} className="w-10 h-10 rounded-full border-2 border-[#092B22] object-cover shadow-sm" alt="hero" />
            <img src={collage10} className="w-10 h-10 rounded-full border-2 border-[#092B22] object-cover shadow-sm" alt="hero" />
          </div>
          <div className="text-xs text-stone-300 font-medium">
            Join <span className="text-white font-bold">500+</span> Volunteers
          </div>
        </div>
      </div>

      {/* Right Collage Grid (Perfect Masonry Alignment) */}
      <div className="p-3 lg:p-4 lg:w-3/5 bg-[#08241C] w-full flex items-center justify-center">
        <div className="grid grid-cols-4 gap-2.5 w-full h-full">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-2.5 col-span-1">
            <div className="overflow-hidden rounded-[1.25rem] h-32"><img src={collage1} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
            <div className="overflow-hidden rounded-[1.25rem] h-44"><img src={collage2} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
            <div className="overflow-hidden rounded-[1.25rem] h-28"><img src={collage3} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
          </div>
          
          {/* Column 2 & 3 (Wider Center Focus) */}
          <div className="flex flex-col gap-2.5 col-span-2">
            <div className="overflow-hidden rounded-[1.25rem] h-40"><img src={collage4} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="overflow-hidden rounded-[1.25rem] h-32"><img src={collage5} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
              <div className="overflow-hidden rounded-[1.25rem] h-32"><img src={collage6} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
            </div>
            <div className="overflow-hidden rounded-[1.25rem] h-32"><img src={collage7} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-2.5 col-span-1">
            <div className="overflow-hidden rounded-[1.25rem] h-28"><img src={collage8} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
            <div className="overflow-hidden rounded-[1.25rem] h-44"><img src={collage9} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
            <div className="overflow-hidden rounded-[1.25rem] h-32"><img src={collage10} alt="Food Rescue" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" /></div>
          </div>

        </div>
      </div>
      
    </div>
  );
}