import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import testimonialImg1 from '../assets/images/african_male_professional_1_1783091218786.jpg';
import testimonialImg2 from '../assets/images/african_female_professional_1_1783091230867.jpg';
import testimonialImg3 from '../assets/images/african_male_professional_2_1783091245482.jpg';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  industry: string;
  rating: number;
  review: string;
  image: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "Manufacturing Client",
    role: "Verified Partner",
    company: "Industrial Sector",
    industry: "Manufacturing",
    rating: 5,
    review: "Professional, dependable and always on schedule.",
    image: testimonialImg1
  },
  {
    id: 2,
    name: "Food Distributor",
    role: "Verified Partner",
    company: "Supply Chain Client",
    industry: "Food & Beverage",
    rating: 5,
    review: "Their cold chain logistics exceeded our expectations.",
    image: testimonialImg2
  },
  {
    id: 3,
    name: "Import & Export Client",
    role: "Verified Partner",
    company: "Global Trade Client",
    industry: "Global Freight",
    rating: 5,
    review: "Excellent customer support and outstanding communication.",
    image: testimonialImg3
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-24 bg-brand-light relative overflow-hidden border-y border-gray-100">
      {/* Floating abstract decorative vector rings */}
      <div className="absolute top-1/2 left-4 w-64 h-64 bg-brand-secondary/5 rounded-full filter blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Trusted Partnership Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
            What Our Shippers Say
          </h2>
          <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Carousel Card Staging */}
        <div className="relative min-h-[360px] sm:min-h-[280px] md:min-h-[220px] flex items-center justify-center">
          
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-150 relative"
            >
              {/* Giant Watermark Quote Icon */}
              <Quote className="absolute right-8 top-8 w-16 h-16 text-gray-50 opacity-70 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Client Info Area (Col Span 4) */}
                <div className="md:col-span-4 flex flex-col items-center text-center space-y-3.5 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shadow-sm">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-brand-primary font-heading tracking-tight">
                      {current.name}
                    </h4>
                    <span className="text-xs text-brand-secondary font-semibold block mt-1">
                      {current.role}
                    </span>
                  </div>
                </div>

                {/* Review Narrative Area (Col Span 8) */}
                <div className="md:col-span-8 space-y-4 text-center md:text-left">
                  
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 justify-center md:justify-start">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>

                  {/* Company & Sector Specs */}
                  <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                    <span className="bg-brand-secondary/5 text-brand-secondary text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                      {current.company}
                    </span>
                    <span className="bg-gray-100 text-gray-500 text-[9px] font-mono px-2 rounded-md uppercase">
                      {current.industry}
                    </span>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-base sm:text-lg text-gray-700 font-sans font-medium leading-relaxed italic">
                    "{current.review}"
                  </p>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls Overlay */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white hover:bg-brand-primary hover:text-white border border-gray-200 hover:border-brand-primary text-brand-primary shadow-md hover:shadow-xl transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex space-x-2">
              {TESTIMONIALS_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-6 bg-brand-accent' : 'w-2 bg-gray-300 hover:bg-gray-450'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white hover:bg-brand-primary hover:text-white border border-gray-200 hover:border-brand-primary text-brand-primary shadow-md hover:shadow-xl transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
