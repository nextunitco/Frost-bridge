import React, { useState } from 'react';
import { Leaf, Pill, ShoppingBag, Factory, Flame, HardHat, Car, ForkKnife, ShieldCheck, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import pharmaImage from '../assets/images/pharma_black_technician_1783091183764.jpg';
import oilGasTerminalImage from '../assets/images/oil_gas_terminal_1783348585349.jpg';

export default function Industries() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const industries = [
    {
      id: 'pharma',
      name: 'Pharmaceuticals',
      icon: Pill,
      tagline: 'GDP-Compliant Sterile Supply Chains',
      illustration: '🧬',
      image: pharmaImage,
      description: 'Handling sensitive medicines, clinical trials, and active ingredients with certified cold chain parameters, active tracking, and fast clearances.',
      features: [
        'Temperature-controlled logistics (+2°C to +8°C & +15°C to +25°C)',
        'Regulatory compliance and active NAFDAC clearance assistance',
        'Sensitive cargo handling with full-path audit trail logs',
      ],
      achievement: 'Cleared & dispatched 50+ tons of essential vaccines in 2025.'
    },
    {
      id: 'agri',
      name: 'Agriculture',
      icon: Leaf,
      tagline: 'Farm-to-Table Export Infrastructure',
      illustration: '🌱',
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
      description: 'Connecting Nigerian farmers with global markets. Transporting cash crops (cocoa, cashew nuts, sesame seeds) with temperature-controlled marine containers.',
      features: [
        'Export logistics coordination for international ocean lanes',
        'Cold chain logistics preserving cash crops at farm origins',
        'Produce transportation across local and global borders',
      ],
      achievement: 'Successfully forwarded 1,200+ reefer containers globally.'
    },
    {
      id: 'food_bev',
      name: 'Food & Beverage',
      icon: ForkKnife,
      tagline: 'Hygienic Temperature-Sensitive Transit',
      illustration: '🍎',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      description: 'Preserving freshness and taste. Certified sanitary refrigeration for processed foods, dairy products, beverages, and raw concentrates.',
      features: [
        'Cold storage facilities and temperature zoning',
        'Distribution logistics from production centers to distributors',
        'Inventory management with absolute batch control and tracking',
      ],
      achievement: 'Zero-spoilage rate maintained across all food line clients.'
    },
    {
      id: 'retail',
      name: 'Retail',
      icon: ShoppingBag,
      tagline: 'SLA-Driven Fast Retail Replenishment',
      illustration: '🛍️',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      description: 'Keeping consumer shelves stocked. Managed distribution and metropolitan last-mile logistics designed for fast-moving consumer products.',
      features: [
        'Warehousing and smart inventory zoning',
        'Distribution routing for metropolitan and rural retailers',
        'Inventory control with real-time digital balance monitors',
      ],
      achievement: 'Fulfilled over 40,000+ individual store dispatches.'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: Factory,
      tagline: 'Just-In-Time Raw Material Supply',
      illustration: '⚙️',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      description: 'Serving industrial sectors by streamlining the import of machinery parts, raw inputs, and structural components directly to assembly floors.',
      features: [
        'Raw material logistics from port to assembly floor',
        'Industrial transport for machinery and heavy parts',
        'Supply chain management for seamless assembly workflows',
      ],
      achievement: 'Guaranteed 99.4% uptime for 12 major industrial factories.'
    },
    {
      id: 'energy',
      name: 'Oil & Gas',
      icon: Flame,
      tagline: 'High-Value Offshore Support Logistics',
      illustration: '⚓',
      image: oilGasTerminalImage,
      description: 'Supporting Nigeria’s petroleum and gas hubs. Specialized heavy-lift movements, drill pipe logistics, and high-security oilfield terminal clearance.',
      features: [
        'Project logistics for offshore and remote locations',
        'Heavy lifting logistics and heavy rigging support',
        'Equipment transportation under armed escort controls',
      ],
      achievement: 'Zero safety incidents across 300+ deep-sea platform transfers.'
    },
    {
      id: 'construction',
      name: 'Construction',
      icon: HardHat,
      tagline: 'Heavy Equipment & Material Logistics',
      illustration: '🏗️',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      description: 'Transporting structural steel, tower cranes, earthmovers, and building panels to massive development sites across the country.',
      features: [
        'Heavy equipment movement using specialized multi-axle trailers',
        'Project cargo logistics with synchronized crane releases',
        'Site logistics planning and remote area destination routing',
      ],
      achievement: 'Transported over 80,000 tons of structural steel safely.'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: Car,
      tagline: 'Finished Vehicles & Parts Distribution',
      illustration: '🚗',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      description: 'Coordinating high-security roll-on/roll-off (RoRo) ship clearances and auto component distribution networks to assembly plants.',
      features: [
        'Parts distribution network and local delivery paths',
        'Vehicle logistics utilizing specialized multi-car haulers',
        'Tyre and lubricant supply chain integration',
      ],
      achievement: 'Cleared and transported 3,500+ luxury and fleet vehicles.'
    },
  ];

  return (
    <section id="industries" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Industries Served
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
            Tailored Logistics For Complex Verticals
          </h2>
          <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
            Each sector demands unique regulatory compliance and specialized handling. Select an industry below to examine our dedicated logistical protocols and proven metrics.
          </p>
        </div>

        {/* Interactive Industry Selector & Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Interactive Button Grid (Col-Span-5) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {industries.map((ind, idx) => {
              const IconComp = ind.icon;
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`flex items-center space-x-4 p-4.5 rounded-2xl text-left border transition-all duration-300 ${
                    isSelected
                      ? 'bg-brand-primary border-brand-primary text-white shadow-lg translate-x-1.5'
                      : 'bg-brand-light border-gray-100 text-brand-primary hover:bg-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl ${
                      isSelected ? 'bg-brand-accent text-white' : 'bg-white text-brand-secondary shadow-sm'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <p className="font-heading font-bold text-sm tracking-wide">{ind.name}</p>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                      {ind.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Detailed Display Panel (Col-Span-7) with Slide/Fade Transition */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-light border border-gray-150 rounded-3xl p-8 sm:p-10 h-full flex flex-col justify-between relative overflow-hidden"
              >
                {/* Floating Huge Illustration icon in background to look gorgeous */}
                <div className="absolute -right-8 -bottom-8 text-[140px] opacity-10 select-none pointer-events-none">
                  {industries[selectedIdx].illustration}
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Industry Showcase Image */}
                  <div className="h-48 sm:h-56 w-full rounded-2xl overflow-hidden shadow-md">
                    <img
                      src={industries[selectedIdx].image}
                      alt={industries[selectedIdx].name}
                      className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Badge & Title */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase font-mono border border-brand-accent/20 rounded-full px-3.5 py-1">
                      Vertical Protocol
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-primary font-heading mt-2">
                      {industries[selectedIdx].name} Supply Chain
                    </h3>
                    <p className="text-brand-secondary text-xs sm:text-sm font-semibold tracking-wide font-sans">
                      {industries[selectedIdx].tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 font-sans font-light leading-relaxed">
                    {industries[selectedIdx].description}
                  </p>

                  {/* Core Standards Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                      Strategic Handling Protocols:
                    </h4>
                    <div className="space-y-2.5">
                      {industries[selectedIdx].features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-gray-600 font-sans">
                          <ShieldCheck className="w-4 h-4 text-brand-success shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics / Proven Accomplishment Section */}
                <div className="mt-8 pt-6 border-t border-gray-200 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Sector Metric</p>
                    <p className="text-xs font-bold text-brand-primary font-heading mt-0.5">
                      {industries[selectedIdx].achievement}
                    </p>
                  </div>
                  <button className="self-start sm:self-auto inline-flex items-center space-x-2 text-xs font-bold text-brand-secondary hover:text-brand-accent uppercase tracking-wider transition-colors">
                    <span>Inquire Verticals</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
