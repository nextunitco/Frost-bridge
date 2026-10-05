import React, { useState, useEffect } from 'react';
import { ArrowDown, Ship, Plane, Truck, Warehouse, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import heroImage from '../assets/images/frost_bridge_hero_1782829464053.jpg';

// Dynamic Counter Utility
function Counter({ end, suffix = '', duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

interface HeroProps {
  onActionClick: (sectionId: string) => void;
}

export default function Hero({ onActionClick }: HeroProps) {
  const [imgSrc, setImgSrc] = useState(heroImage);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-primary pt-24 pb-16">
      {/* Background Image with Dark Blue & Teal Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={imgSrc}
          alt="Frost Bridge Global Cargo Terminal"
          className="w-full h-full object-cover scale-105"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          referrerPolicy="no-referrer"
          onError={() => {
            setImgSrc('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80');
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-primary/75 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-brand-primary/30"></div>
      </div>

      {/* Floating Interactive Logistics Icons (World-Class agency touch) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="absolute top-[25%] left-[10%] opacity-15 text-white animate-float hidden md:block">
          <Ship className="w-12 h-12" />
        </div>
        <div className="absolute top-[35%] right-[15%] opacity-20 text-white animate-float-delayed hidden md:block">
          <Plane className="w-16 h-16" />
        </div>
        <div className="absolute bottom-[30%] left-[18%] opacity-15 text-white animate-float-delayed hidden md:block">
          <Truck className="w-10 h-10" />
        </div>
        <div className="absolute bottom-[20%] right-[25%] opacity-10 text-white animate-float hidden md:block">
          <Warehouse className="w-14 h-14" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between h-full pt-12">
        <div className="text-center max-w-4xl mt-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="text-brand-accent text-xs font-semibold tracking-wider uppercase font-sans">
              Nigeria's Elite Global Logistics Enterprise
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] font-heading mb-6"
          >
            Your Trusted Partner in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-blue-300">Global Logistics</span> & Supply Chain Solutions
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed max-w-3xl mx-auto mb-10"
          >
            From international freight forwarding to cold chain logistics, warehousing, customs clearance, and last-mile delivery, Frost Bridge Global Logistics provides integrated logistics solutions that keep businesses moving efficiently across Nigeria and the world.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => onActionClick('contact')}
              className="w-full sm:w-auto bg-brand-accent hover:bg-orange-600 text-white font-bold text-sm px-10 py-4 rounded-xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider font-heading border border-brand-accent"
            >
              Request a Quote
            </button>
            <button
              onClick={() => onActionClick('contact')}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm px-10 py-4 rounded-xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wider font-heading"
            >
              Speak to an Expert
            </button>
          </motion.div>
        </div>

        {/* Dynamic Live Counter Section - Redesigned as Bento Grid Panels */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-6xl relative"
        >
          {/* Subtle glow background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-secondary/5 rounded-full filter blur-3xl -z-10 pointer-events-none"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
              <div className="text-brand-accent font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2 flex justify-center items-center group-hover:scale-105 transition-transform duration-300">
                <Counter end={20} suffix="+" />
              </div>
              <p className="text-gray-300 font-sans text-xs uppercase tracking-widest font-semibold">Countries Served</p>
              <div className="w-8 h-0.5 bg-brand-secondary/45 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="text-center relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
              <div className="text-brand-accent font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2 flex justify-center items-center group-hover:scale-105 transition-transform duration-300">
                <Counter end={500} suffix="+" />
              </div>
              <p className="text-gray-300 font-sans text-xs uppercase tracking-widest font-semibold">Successful Deliveries</p>
              <div className="w-8 h-0.5 bg-brand-secondary/45 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="text-center relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
              <div className="text-brand-accent font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2 flex justify-center items-center group-hover:scale-105 transition-transform duration-300">
                <Counter end={98} suffix="%" />
              </div>
              <p className="text-gray-300 font-sans text-xs uppercase tracking-widest font-semibold">On-Time Rate</p>
              <div className="w-8 h-0.5 bg-brand-secondary/45 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="text-center relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg">
              <div className="text-brand-accent font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl mb-2 flex justify-center items-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-brand-accent">24/7</span>
              </div>
              <p className="text-gray-300 font-sans text-xs uppercase tracking-widest font-semibold">Customer Support</p>
              <div className="w-8 h-0.5 bg-brand-secondary/45 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Animated Scroll Down Button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer text-white hover:text-brand-accent transition-colors hidden md:block" onClick={() => onActionClick('about')}>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-[10px] uppercase tracking-widest font-mono font-medium opacity-60">Scroll Explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
