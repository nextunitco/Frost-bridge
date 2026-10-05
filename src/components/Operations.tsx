import React, { useState, useEffect } from 'react';
import { Ship, Warehouse, Compass, ArrowRight, Layers, CheckCircle, BarChart, Server, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
const airCargoImage = 'https://i.postimg.cc/YCHYQZCJ/Air.jpg';
const haulageImage = 'https://i.postimg.cc/Y0F8CFd4/services.jpg';
import forkliftImage from '../assets/images/warehouse_forklift_1783067364923.jpg';
import portImage from '../assets/images/wilmington_port_vessel_1783068109553.jpg';
import portTerminalsImage from '../assets/images/frost_bridge_port_1783348201423.jpg';

interface OperationalView {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  primaryImage: string;
  imageGallery: {
    url: string;
    caption: string;
  }[];
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
  specifications: string[];
  ctaText: string;
}

export default function Operations() {
  const [activeTab, setActiveTab] = useState<string>('freight');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const pillars: OperationalView[] = [
    {
      id: 'freight',
      num: '01',
      title: 'Multimodal Freight & Cargo Network',
      subtitle: 'Global Ocean, Air & Land Corridors',
      description: 'Frost Bridge coordinates global trade lanes using a fleet of modern ocean container vessels, commercial air cargo carriers, and heavy-duty highway haulage trucks. We seamlessly bridge the gap between international suppliers and African commercial markets with unified logistics pipelines.',
      primaryImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=90',
      imageGallery: [
        {
          url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=90',
          caption: 'Container Vessels & Maritime Trade'
        },
        {
          url: airCargoImage,
          caption: 'Air Cargo Operations'
        },
        {
          url: haulageImage,
          caption: 'Intermodal Freight Haulage'
        }
      ],
      metrics: [
        { label: 'Annual Cargo Volume', value: '18,500+ TEU', sub: 'Dry & Reefer Units' },
        { label: 'Weekly Departures', value: '14 Lanes', sub: 'To/From Major Global Hubs' },
        { label: 'Customs SLA Compliance', value: '99.2%', sub: 'Pre-arrival clearance rate' }
      ],
      specifications: [
        'Full Container Load (FCL) & Less Than Container Load (LCL) consolidation.',
        'High-security block space agreements with tier-1 ocean carrier alliances.',
        'Dedicated bonded trucking fleet for immediate terminal evacuation.',
        'Sovereign customs pre-assessments and seamless HS code classification.'
      ],
      ctaText: 'Explore Freight Solutions'
    },
    {
      id: 'warehousing',
      num: '02',
      title: 'State-of-the-Art Warehousing',
      subtitle: 'Fulfillment & Cold Chain Infrastructure',
      description: 'Our high-density warehousing facilities in Lagos feature advanced pallet racking systems, precision electric forklifts, smart inventory tracking, and dedicated sealed loading docks. We specialize in temperature-controlled pharmaceutical storage and secure dry-bulk fulfillment.',
      primaryImage: 'https://i.postimg.cc/QVGDFpsb/Gemini-Generated-Image-dqscnodqscnodqsc.png',
      imageGallery: [
        {
          url: 'https://i.postimg.cc/QVGDFpsb/Gemini-Generated-Image-dqscnodqscnodqsc.png',
          caption: 'State-of-the-art Storage & Racking'
        },
        {
          url: forkliftImage,
          caption: 'Advanced Electric Forklifts'
        },
        {
          url: 'https://i.postimg.cc/fkn3MtrH/Gemini-Generated-Image-mmpd6ammpd6ammpd.png',
          caption: 'Loading Bays & Inbound Logistics'
        }
      ],
      metrics: [
        { label: 'Total Storage Capacity', value: '15,000+ sqm', sub: 'High-density modern racking' },
        { label: 'Cold Chain Accuracy', value: '±0.5°C', sub: 'Continuous real-time logging' },
        { label: 'Inventory Accuracy', value: '99.98%', sub: 'RFID & cloud system tracked' }
      ],
      specifications: [
        'Advanced pallet racking with high-density vertical configurations.',
        'Climate-controlled chambers (2°C to 8°C & -20°C freezer lines) for pharmaceuticals.',
        'Live warehouse inventory dashboard with API integrations for merchants.',
        'Secure loading bays equipped with hydraulic dock levelers.'
      ],
      ctaText: 'Book Storage Space'
    },
    {
      id: 'locations',
      num: '03',
      title: 'Strategic Port Locations & Terminals',
      subtitle: 'Lagos Corridor Maritime Gateway',
      description: 'Frost Bridge operates directly adjacent to West Africa’s primary maritime trade arteries, establishing secure staging yards near Apapa Port and Tin Can Island Port. This immediate proximity guarantees rapid vessel discharge, swift customs clearing, and efficient national distributions.',
      primaryImage: portTerminalsImage,
      imageGallery: [
        {
          url: portTerminalsImage,
          caption: 'Container Terminals & Cranes'
        },
        {
          url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=90',
          caption: 'Port Operations Yard'
        },
        {
          url: portImage,
          caption: 'Maritime Customs Gates'
        }
      ],
      metrics: [
        { label: 'Port Transit Distance', value: '12 km', sub: 'Apapa & Tin Can gate access' },
        { label: 'Vessel Berthing Clearing', value: '<48 Hours', sub: 'Accelerated PAAR processing' },
        { label: 'Secure Staging Area', value: '8,500 sqm', sub: '24/7 CCTV and armed patrol' }
      ],
      specifications: [
        'Direct corridors linking marine terminals with highway distribution networks.',
        'Dedicated port dispatch office inside maritime customs yards.',
        'Off-dock container release partnerships for zero-delay terminal handovers.',
        'Staging yards equipped with high-mast lighting and perimeter sensors.'
      ],
      ctaText: 'View Terminal Network'
    }
  ];

  const activePillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveImageIndex((prev) => (prev + 1) % activePillar.imageGallery.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [activeImageIndex, activeTab, activePillar.imageGallery.length]);

  return (
    <section className="py-24 bg-[#0B3C5D] text-white overflow-hidden relative border-y border-white/5">
      {/* Structural Background Accents inspired by DP World's modern blueprint grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#1E88E5]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-[#F57C00]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-white/10">
          <div className="max-w-3xl">
            <span className="text-[#1E88E5] font-mono text-xs uppercase tracking-widest font-semibold block mb-2">
              Our Infrastructure & Network
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-heading text-white">
              Core Global Logistics Operations
            </h2>
          </div>
          <div className="mt-4 lg:mt-0 lg:max-w-md">
            <p className="text-gray-300 font-sans text-xs sm:text-sm font-light">
              We operate end-to-end supply chain infrastructure. Engineered with state-of-the-art technology and strategic seaway integration to drive commercial growth.
            </p>
          </div>
        </div>

        {/* DP World-inspired Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: Tab Selectors & Pillar Specs */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex flex-col space-y-4">
              {pillars.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`group w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-start space-x-5 cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-white/5 border-[#1E88E5] shadow-lg shadow-black/20'
                      : 'bg-transparent border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className={`font-mono text-sm font-bold tracking-wider leading-none mt-1 ${
                    activeTab === item.id ? 'text-[#F57C00]' : 'text-gray-500'
                  }`}>
                    {item.num}
                  </span>
                  <div className="flex-1 space-y-1">
                    <h3 className={`text-lg font-bold font-heading transition-colors ${
                      activeTab === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-sans line-clamp-1 font-light">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-xl transition-all ${
                    activeTab === item.id ? 'bg-[#F57C00] text-white' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
                  }`}>
                    {item.id === 'freight' && <Ship className="w-5 h-5" />}
                    {item.id === 'warehousing' && <Warehouse className="w-5 h-5" />}
                    {item.id === 'locations' && <Compass className="w-5 h-5" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Pillar Technical Specifications */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#F57C00]"></div>
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-200">
                  Technical Specifications
                </h4>
              </div>
              
              <ul className="space-y-4">
                {activePillar.specifications.map((spec, sidx) => (
                  <li key={sidx} className="flex items-start space-x-3 text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[#1E88E5] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive High-Res Media Viewer & Operational Metrics */}
          <div className="lg:col-span-7 space-y-8">
            {/* Massive Display Terminal Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 group aspect-[16/10]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activePillar.imageGallery[activeImageIndex].url}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  src={activePillar.imageGallery[activeImageIndex].url}
                  alt={activePillar.imageGallery[activeImageIndex].caption}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Dynamic Overlay Shadow Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/95 via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10"></div>

              {/* Left Navigation Arrow */}
              <button
                onClick={() => setActiveImageIndex((prev) => (prev - 1 + activePillar.imageGallery.length) % activePillar.imageGallery.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#F57C00] border border-white/10 text-white p-2.5 rounded-full opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Navigation Arrow */}
              <button
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % activePillar.imageGallery.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-[#F57C00] border border-white/10 text-white p-2.5 rounded-full opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 flex items-center justify-center"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Top-Right Info Badge */}
              <div className="absolute top-6 right-6 bg-[#0B3C5D]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-mono tracking-wide z-20">
                <span>View {activeImageIndex + 1} of {activePillar.imageGallery.length}</span>
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
                <div className="space-y-1">
                  <span className="text-[#1E88E5] text-[10px] uppercase tracking-widest font-bold font-mono">
                    ACTIVE DIVISION
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold font-heading text-white leading-tight">
                    {activePillar.imageGallery[activeImageIndex].caption}
                  </h4>
                </div>

                {/* Micro Thumbnail Selectors inside image overlay */}
                <div className="flex space-x-2">
                  {activePillar.imageGallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-12 h-12 rounded-xl overflow-hidden border transition-all duration-300 relative cursor-pointer ${
                        activeImageIndex === index
                          ? 'border-[#F57C00] ring-2 ring-[#F57C00]/30 scale-105'
                          : 'border-white/20 hover:border-white/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Slideshow Progress Indicator Bar at Bottom of the Card */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
                <motion.div
                  key={`${activeTab}-${activeImageIndex}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="h-full bg-[#F57C00]"
                />
              </div>
            </div>

            {/* Description Text */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
              <p className="text-gray-300 font-sans text-xs sm:text-sm leading-relaxed font-light">
                {activePillar.description}
              </p>

              {/* Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                {activePillar.metrics.map((metric, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block">
                      {metric.label}
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-white font-heading block tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-[10px] text-gray-400 font-sans block leading-tight">
                      {metric.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
