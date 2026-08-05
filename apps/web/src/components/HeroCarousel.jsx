import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Volunteers distributing food to community members'
  },
  {
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80',
    alt: 'Surplus food rescue and donation'
  },
  {
    url: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=80',
    alt: 'Community sharing and caring'
  },
  {
    url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80',
    alt: 'Fresh food donation drive'
  }
];

const INTERVAL_MS = 4500;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const preloadImages = useCallback(() => {
    SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.url;
    });
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const getPosition = (index) => {
    if (index === current) return 0;
    if (index === (current + 1) % SLIDES.length) return 1;
    if (index === (current - 1 + SLIDES.length) % SLIDES.length) return -1;
    return null;
  };

  return (
    <div className="relative w-full h-[360px] md:h-[400px] rounded-2xl overflow-hidden">
      {SLIDES.map((slide, index) => {
        const position = getPosition(index);
        if (position === null) return null;

        return (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out ${
              position === 0
                ? 'translate-x-0'
                : position === 1
                  ? 'translate-x-full'
                  : '-translate-x-full'
            }`}
            style={{ zIndex: position === 0 ? 2 : 1 }}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        );
      })}

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? 'w-3 h-3 bg-white shadow-md'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
