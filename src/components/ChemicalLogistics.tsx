import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import agroAlliedWarehouseImg from '../assets/images/agro_allied_chemicals_1783198689993.jpg';
import fertilizerYardImg from '../assets/images/fertilizer_logistics_yard_1783089374810.jpg';
import polymerWarehouseImg from '../assets/images/polymer_plastics_logistics_1783198977568.jpg';
import specialtyChemicalsImg from '../assets/images/specialty_chemicals_black_technician_1783090191578.jpg';
import { 
  ShieldCheck, 
  Leaf, 
  FlaskConical, 
  Layers, 
  CheckCircle2, 
  FileText, 
  Activity, 
  Thermometer, 
  Truck, 
  HelpCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  ClipboardCheck
} from 'lucide-react';

interface SectorItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  subtitle: string;
  description: string;
  services: string[];
  additionalInfo: string;
  bgGradient: string;
  color: string;
  image: string;
}

export default function ChemicalLogistics() {
  const [activeSector, setActiveSector] = useState<string>('agro');
  const [selectedStandard, setSelectedStandard] = useState<number>(0);

  const sectors: SectorItem[] = [
    {
      id: 'agro',
      title: 'Agro-Allied Chemicals',
      icon: Leaf,
      subtitle: 'Supporting Agricultural Value Chains',
      description: 'Frost-Bridge supports the entire agricultural value chain through secure, climate-monitored storage and nationwide distribution of high-value agricultural inputs across West Africa.',
      services: [
        'Agrochemical warehousing',
        'Crop protection products storage',
        'Herbicides and pesticides containment',
        'Fungicides and insecticides management',
        'Seed treatment chemicals safety',
        'Micronutrients & liquid supplements',
        'Liquid and powdered agricultural chemicals handling',
        'Seasonal inventory buffer management',
        'Nationwide distribution to authorized distributors & agro-dealers'
      ],
      additionalInfo: 'Our logistics network helps ensure farmers receive quality agricultural inputs on time, supporting food security and increased agricultural productivity.',
      bgGradient: 'from-emerald-500/10 to-teal-500/5 hover:border-emerald-500/30',
      color: 'text-emerald-400',
      image: agroAlliedWarehouseImg
    },
    {
      id: 'fertilizer',
      title: 'Fertilizer Logistics',
      icon: TrendingUp,
      subtitle: 'Bulk & Bagged Agriculture Nutrition',
      description: 'We provide specialized integrated logistics and bulk handling systems for fertilizer manufacturers, importers, state-backed government intervention programmes, and large-scale commercial farming operations.',
      services: [
        'Bulk fertilizer raw material handling',
        'Bagged fertilizer warehousing & staking',
        'NPK fertilizer regional distribution',
        'Urea transport & protective handling',
        'DAP and MAP custom logistics',
        'Ammonium sulphate dedicated storage',
        'Real-time automated inventory control',
        'Palletized storage & moisture prevention',
        'High-capacity container de-stuffing',
        'Rapid cross-docking operations at transit yards',
        'Regional distribution hubs throughout Nigeria'
      ],
      additionalInfo: 'Our facilities are structurally engineered to preserve product quality, prevent clumping or moisture degradation, and maintain efficient inventory turnover throughout crucial planting seasons.',
      bgGradient: 'from-blue-500/10 to-cyan-500/5 hover:border-blue-500/30',
      color: 'text-blue-400',
      image: fertilizerYardImg
    },
    {
      id: 'plastics',
      title: 'Plastics & Polymer Logistics',
      icon: Layers,
      subtitle: 'Polymer Raw Material Freight',
      description: 'Frost-Bridge supports the growing plastics and synthetics manufacturing industry with high-efficiency specialized storage and rapid-transit container solutions for polymer raw materials.',
      services: [
        'Polyethylene (PE) raw pellets storage',
        'Polypropylene (PP) bags distribution',
        'PVC resins custom bulk transport',
        'PET resins food-grade storage',
        'Polystyrene shipping containers',
        'Engineering plastics protective logistics',
        'Polymer compounds custom warehousing',
        'Plastic chemical additives handling',
        'Color masterbatch sensitive transit',
        'Virgin and recycled polymer resins batching'
      ],
      additionalInfo: 'Our pristine operations minimize contamination risks during transshipment while ensuring high-volume, reliable movement from strategic ports directly to manufacturing facilities.',
      bgGradient: 'from-purple-500/10 to-indigo-500/5 hover:border-purple-500/30',
      color: 'text-purple-400',
      image: polymerWarehouseImg
    },
    {
      id: 'specialty',
      title: 'Specialty Chemicals',
      icon: FlaskConical,
      subtitle: 'High-Value Precision Engineering',
      description: 'Specialty chemicals demand rigorous levels of handling precision, strict environmental controls, comprehensive regulatory documentation, and bulletproof batch traceability.',
      services: [
        'Paint and industrial coating chemicals',
        'Adhesives, sealants & binder transport',
        'Industrial solvents climate-controlled rooms',
        'Water treatment chemicals security',
        'Food-grade chemical sanitation storage',
        'Pharmaceutical intermediates specialized transit',
        'Cosmetic raw ingredients preservation',
        'Textile chemical dyestuffs logistics',
        'Heavy-industry mining chemicals safety',
        'Oil & gas production fluid chemicals',
        'Construction chemicals & concrete additives',
        'Electronic and precision manufacturing ultra-pure chemicals'
      ],
      additionalInfo: 'Every shipment is managed under strict protocols and standard operating procedures (SOPs) designed to maintain chemical integrity and ensure maximum environmental safety.',
      bgGradient: 'from-amber-500/10 to-orange-500/5 hover:border-amber-500/30',
      color: 'text-amber-400',
      image: specialtyChemicalsImg
    }
  ];

  const standards = [
    {
      title: 'Safe Handling',
      desc: 'Engineered safety zones with specialized chemical isolation, spill containment systems, and regular air monitoring.',
      icon: ShieldCheck
    },
    {
      title: 'Compliant Standards',
      desc: 'Full alignment with national and international environmental protection laws, local environmental protection agencies, and rigorous safety audits.',
      icon: ClipboardCheck
    },
    {
      title: 'Intelligent Inventory',
      desc: 'Batch-level traceability, real-time climate monitoring, shelf-life triggers, and integration with advanced digital tracking.',
      icon: Activity
    },
    {
      title: 'Reliable Fleet',
      desc: 'Direct transport via secure containerized vehicles and trained drivers certified in hazard response and route management.',
      icon: Truck
    }
  ];

  const activeSectorData = sectors.find(s => s.id === activeSector) || sectors[0];

  return (
    <div className="bg-brand-primary text-white min-h-screen py-16 font-sans">
      
      {/* Introduction Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Tagline & Left Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Immersive Chemical Logistics Photo */}
            <div className="h-64 sm:h-72 w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1200&q=80"
                alt="Frost Bridge Chemical Logistics Terminal"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="inline-flex items-center space-x-2 bg-brand-accent/20 border border-brand-accent/30 rounded-full px-4 py-1.5 shadow-sm text-brand-accent">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">HSE & Chemical Safety Certified</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Safe. Compliant.<br />
              <span className="text-brand-secondary">Intelligent. Reliable.</span>
            </h2>

            <p className="text-gray-300 leading-relaxed text-base sm:text-lg font-light">
              Frost-Bridge Global Logistics delivers specialized logistics and warehousing solutions for the 
              chemical industry, providing end-to-end supply chain management for manufacturers, importers, 
              distributors, and industrial consumers across Nigeria and West Africa.
            </p>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Our facilities and operational processes are designed to handle industrial chemicals safely, 
              efficiently, and in full compliance with applicable regulatory and environmental standards. From 
              inbound port logistics to warehousing, inventory management, transportation, and last-mile 
              distribution, we ensure every shipment is handled with precision, traceability, and care.
            </p>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-start space-x-4">
              <Thermometer className="w-8 h-8 text-brand-secondary shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">State-of-the-Art Environmental Safeguards</h4>
                <p className="text-xs text-gray-400">
                  Whether supporting agricultural production, plastics manufacturing, food processing, 
                  pharmaceuticals, mining, or industrial manufacturing, Frost-Bridge is the trusted logistics partner 
                  for mission-critical chemical supply chains.
                </p>
              </div>
            </div>
          </div>

          {/* Standards Interactive Dashboard / Visuals */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-secondary/10 rounded-full filter blur-3xl pointer-events-none"></div>
            
            <h3 className="text-xl font-bold text-white mb-6 font-heading flex items-center space-x-2">
              <span>Operational Excellence</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
            </h3>

            <div className="space-y-4">
              {standards.map((std, idx) => {
                const IconComponent = std.icon;
                const isSelected = selectedStandard === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedStandard(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start space-x-4 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-brand-secondary/25 to-brand-secondary/5 border-brand-secondary text-white' 
                        : 'bg-white/5 border-white/5 hover:border-white/20 text-gray-300'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-brand-secondary text-white' : 'bg-white/5 text-gray-400'} shrink-0`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{std.title}</h4>
                      {isSelected && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-xs text-gray-300 mt-1.5 leading-relaxed"
                        >
                          {std.desc}
                        </motion.p>
                      )}
                      {!isSelected && (
                        <p className="text-xs text-gray-400 truncate mt-0.5 max-w-[200px] sm:max-w-xs">{std.desc}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Interactive Explorer Section */}
      <section className="bg-white/[0.01] border-y border-white/10 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/50 to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/10 border border-brand-secondary/20 px-3.5 py-1.5 rounded-full">
              Sectors We Empower
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Our Chemical Logistics Sectors
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-light">
              Providing distinct storage conditions, tailored handling pipelines, and certified distribution procedures designed precisely for specific chemical categories.
            </p>
          </div>

          {/* Tab Selection Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {sectors.map((s) => {
              const IconComponent = s.icon;
              const isActive = s.id === activeSector;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSector(s.id)}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border text-center transition-all duration-300 space-y-3 group ${
                    isActive 
                      ? 'bg-gradient-to-b from-brand-secondary/20 to-brand-primary border-brand-secondary shadow-lg shadow-brand-secondary/10' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className={`p-3 rounded-xl transition-all ${isActive ? 'bg-brand-secondary text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Sector Detailed Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-brand-primary/80 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch lg:min-h-[500px]">
                
                {/* Sector Description */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-brand-secondary/10 rounded-2xl">
                        {React.createElement(activeSectorData.icon, { className: `w-7 h-7 ${activeSectorData.color}` })}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                          {activeSectorData.title}
                        </h3>
                        <p className="text-xs text-brand-secondary font-medium tracking-wide">
                          {activeSectorData.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                      {activeSectorData.description}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                    <h5 className="text-xs uppercase tracking-wider text-brand-accent font-bold flex items-center space-x-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Integrity & Contamination Risk Safeguard</span>
                    </h5>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {activeSectorData.additionalInfo}
                    </p>
                  </div>
                </div>

                {/* Sector Dynamic Image */}
                <div className="lg:col-span-5 min-h-[320px] lg:min-h-full rounded-2xl overflow-hidden shadow-xl border border-white/10 relative group">
                  <img
                    src={activeSectorData.image}
                    alt={activeSectorData.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Services Bullet Points Grid */}
                <div className="lg:col-span-3 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">
                    Our capabilities & Services include:
                  </h4>
                  <div className="space-y-2.5">
                    {activeSectorData.services.slice(0, 8).map((service, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start space-x-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeSectorData.color}`} />
                        <span className="text-xs text-gray-300 leading-snug">{service}</span>
                      </div>
                    ))}
                    {activeSectorData.services.length > 8 && (
                      <div className="text-xs text-gray-400 pl-3 italic">
                        + {activeSectorData.services.length - 8} additional specialist procedures
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Trust & compliance CTA banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-brand-secondary/30 via-brand-primary to-brand-primary border border-brand-secondary/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-secondary/15 rounded-full filter blur-3xl pointer-events-none"></div>
          
          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="text-brand-accent text-xs font-bold tracking-widest uppercase">Empowering Chemical Chains</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Partner with Nigeria’s Elite Logistics Enterprise
            </h3>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              Let us optimize your chemical transport, raw polymer delivery, fertilizer networks, and specialty warehouse tracking with zero friction.
            </p>
          </div>

          <div className="shrink-0 relative z-10">
            <button 
              onClick={() => {
                const contactEl = document.getElementById('contact');
                if (contactEl) {
                  contactEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // Fallback navigates to contact id
                  const url = new URL(window.location.href);
                  url.hash = '#contact';
                  window.location.href = url.toString();
                  window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
              }}
              className="bg-brand-secondary hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full uppercase tracking-wider text-xs transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-brand-secondary/20 group"
            >
              <span>Get compliant solutions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
