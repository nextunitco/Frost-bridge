import React from 'react';
import { ChevronRight, Home, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumbs: string[];
  onHomeClick: () => void;
  backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, breadcrumbs, onHomeClick, backgroundImage }: PageHeaderProps) {
  return (
    <div className={`relative bg-brand-primary text-white overflow-hidden border-b border-white/10 flex flex-col justify-center ${backgroundImage ? 'min-h-[75vh] sm:min-h-[85vh] pt-32 pb-24' : 'pt-32 pb-16'}`}>
      {/* Custom Background Image Backdrop */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 opacity-100 scale-105"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Premium gradient overlay to blend perfectly and guarantee text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/95 to-brand-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-brand-primary/45" />
        </>
      )}

      {/* Dynamic tech-grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] z-0"></div>
      
      {/* Designer UI dot grid overlay */}
      <div className="absolute inset-0 ui-dot-grid-dark opacity-40 z-0"></div>
      
      {/* Ambient color blobs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-secondary/15 rounded-full filter blur-3xl transform -translate-y-1/2 pointer-events-none z-0"></div>
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-accent/10 rounded-full filter blur-2xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col justify-between h-full">
        <div className={`flex flex-col ${backgroundImage ? 'items-center text-center max-w-4xl mx-auto space-y-6' : 'md:flex-row md:items-center md:justify-between gap-6'}`}>
          {/* Titles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={backgroundImage ? 'space-y-4' : 'space-y-2'}
          >
            <span className={`text-brand-accent text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans ${backgroundImage ? 'inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 shadow-sm' : ''}`}>
              {backgroundImage && <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse mr-2"></span>}
              {subtitle}
            </span>
            <h1 className={`font-extrabold text-white tracking-tight leading-tight font-heading ${backgroundImage ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4' : 'text-3xl sm:text-4xl md:text-5xl'}`}>
              {title}
            </h1>
            {backgroundImage && (
              <p className="text-gray-300 font-sans font-light leading-relaxed max-w-2xl text-base sm:text-lg">
                Explore our world-class operations, elite standards, and trusted logistics frameworks helping businesses scale globally.
              </p>
            )}
          </motion.div>

          {/* Breadcrumbs */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-400 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10 shadow-sm ${backgroundImage ? 'justify-center w-fit mx-auto' : 'self-start md:self-auto'}`}
          >
            <button
              onClick={onHomeClick}
              className="flex items-center space-x-1 hover:text-brand-secondary transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                <span className={idx === breadcrumbs.length - 1 ? 'text-white font-semibold' : ''}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </motion.nav>
        </div>
      </div>

      {/* Floating Animated Scroll Down Button for Large Background Header */}
      {backgroundImage && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-white opacity-60 hover:opacity-100 transition-opacity hidden md:block">
          <div className="flex flex-col items-center space-y-1">
            <span className="text-[9px] uppercase tracking-widest font-mono font-medium">Scroll to Content</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
}
