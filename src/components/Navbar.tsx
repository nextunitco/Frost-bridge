import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Chemical Logistics', id: 'chemical-logistics' },
    { label: 'Industries', id: 'industries' },
    { label: 'Trade & Forex', id: 'forex' },
    { label: 'Blog', id: 'blog' },
    { label: 'Careers', id: 'careers' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-4 pointer-events-none">
        <nav
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 pointer-events-auto ${
            isScrolled || activeSection !== 'home'
              ? 'bg-brand-primary/90 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(11,60,93,0.15)] py-2.5 px-6'
              : 'bg-brand-primary/50 backdrop-blur-sm border border-white/5 py-4 px-6'
          }`}
        >
          <div className="relative">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div
                className="flex items-center space-x-2.5 cursor-pointer"
                onClick={() => handleLinkClick('home')}
              >
                <div className="relative flex items-center justify-center w-11 h-11 bg-white rounded-xl p-1.5 shadow-md border border-white/10 shrink-0">
                  <Logo variant="icon" className="w-full h-full" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-black text-base leading-none tracking-wider font-heading">
                    FROST BRIDGE
                  </span>
                  <span className="text-brand-accent text-[8px] tracking-widest uppercase font-sans font-bold mt-1 leading-none">
                    Global Logistics Limited
                  </span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 uppercase ${
                      activeSection === item.id
                        ? 'text-brand-accent bg-white/10 border border-white/10'
                        : 'text-gray-200 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleLinkClick('tracking')}
                  className="ml-4 bg-brand-accent hover:bg-orange-600 text-white font-semibold text-xs px-5 py-2.5 rounded-full uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-orange-500/20 flex items-center space-x-1 group"
                >
                  <span>Track Cargo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-brand-accent focus:outline-none p-1.5 bg-white/5 rounded-xl border border-white/10"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Compact Mobile Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 w-64 bg-brand-primary/95 backdrop-blur-md border border-white/10 rounded-2xl p-3 mt-3 shadow-2xl space-y-1 lg:hidden z-50"
                >
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleLinkClick(item.id)}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                        activeSection === item.id
                          ? 'text-white bg-brand-accent'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  <div className="h-px bg-white/10 my-1.5"></div>
                  
                  <button
                    onClick={() => handleLinkClick('contact')}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-xl text-center transition-all uppercase tracking-widest text-[10px] flex items-center justify-center space-x-1"
                  >
                    <span>Request a Quote</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </>
  );
}
