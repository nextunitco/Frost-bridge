import React, { useState } from 'react';
import { Plane, Ship, Truck, Snowflake, Warehouse, ClipboardList, Package, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import lastMileDeliveryImg from '../assets/images/last_mile_delivery_van_1783325055567.jpg';
import roadTransportationImg from '../assets/images/services_supply_chain_new_1783326602291.jpg';

export default function Services() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const servicesData = [
    {
      id: 'air',
      icon: Plane,
      title: 'Air Freight',
      tag: 'Fast & Secure',
      image: 'https://i.postimg.cc/YCHYQZCJ/Air.jpg',
      shortDesc: 'Fast, secure and reliable air cargo services connecting Nigeria with major international markets.',
      features: [
        'Import Air Freight',
        'Export Air Freight',
        'Express Cargo',
        'Consolidated Cargo',
        'Charter Services',
        'Airport Handling'
      ],
      idealFor: ['Pharmaceuticals', 'Electronics', 'Perishable Goods', 'High Value Cargo'],
      leadTime: '2–4 Business Days',
      coverage: 'Nigeria to Global Markets',
    },
    {
      id: 'ocean',
      icon: Ship,
      title: 'Ocean Freight',
      tag: 'Global Port Routes',
      image: 'https://i.postimg.cc/PJCZ6LVf/ocean-freight.jpg',
      shortDesc: 'Comprehensive sea freight services through trusted global shipping partners.',
      features: [
        'Full Container Load (FCL)',
        'Less than Container Load (LCL)',
        'Break Bulk Cargo',
        'Project Cargo',
        'RORO (Roll-on/Roll-off)',
        'Heavy Equipment'
      ],
      leadTime: '20–28 Business Days',
      coverage: 'Global Ocean Trade Lanes',
    },
    {
      id: 'road',
      icon: Truck,
      title: 'Road Transportation',
      tag: 'Nationwide Haulage',
      image: roadTransportationImg,
      shortDesc: 'Efficient nationwide haulage using modern fleet management systems.',
      features: [
        'Long haul transportation',
        'Local distribution',
        'Retail deliveries',
        'Industrial logistics',
        'Heavy cargo movement'
      ],
      leadTime: '1–3 Business Days',
      coverage: 'All 36 States in Nigeria',
    },
    {
      id: 'cold',
      icon: Snowflake,
      title: 'Cold Chain Logistics',
      tag: 'Temperature Controlled',
      image: 'https://images.unsplash.com/photo-1761307234387-d9291985eaf9?w=800&auto=format&fit=crop&q=80',
      shortDesc: 'One of our specialist divisions. We provide temperature-controlled logistics solutions designed for industries where product integrity is critical.',
      features: [
        'Frozen',
        'Chilled',
        'Ambient Controlled',
        'Multi-temperature'
      ],
      productsHandled: ['Fresh Produce', 'Frozen Foods', 'Vaccines', 'Pharmaceuticals', 'Dairy Products', 'Seafood', 'Meat', 'Flowers'],
      leadTime: 'Real-time Monitored',
      coverage: 'Nationwide Specialized Cold Fleet',
    },
    {
      id: 'warehousing',
      icon: Warehouse,
      title: 'Warehousing & Distribution',
      tag: 'Secure Storage',
      image: 'https://i.postimg.cc/QVGDFpsb/Gemini-Generated-Image-dqscnodqscnodqsc.png',
      shortDesc: 'Modern storage facilities providing secure inventory management and order fulfillment.',
      features: [
        'Inventory Management',
        'Order Fulfilment',
        'Cross Docking',
        'Packaging',
        'Labelling',
        'Pallet Storage',
        'Stock Monitoring',
        'Distribution'
      ],
      leadTime: 'Immediate Retrieval',
      coverage: 'High-security Facilities',
    },
    {
      id: 'freight_fwd',
      icon: Package,
      title: 'Freight Forwarding',
      tag: 'Multimodal Cargo',
      image: 'https://images.unsplash.com/photo-1606964212858-c215029db704?auto=format&fit=crop&w=800&q=80',
      shortDesc: 'Complete international freight management coordinating custom operations seamlessly.',
      features: [
        'Supplier Coordination',
        'Documentation',
        'Cargo Insurance',
        'Booking',
        'Tracking',
        'Delivery'
      ],
      leadTime: 'Optimized Routing SLA',
      coverage: 'Worldwide Multimodal Network',
    },
    {
      id: 'customs',
      icon: ClipboardList,
      title: 'Customs Brokerage',
      tag: 'Cleared & Compliant',
      image: 'https://i.postimg.cc/hjnWKTRn/brokage.jpg',
      shortDesc: 'Our customs specialists simplify complex import and export procedures for stress-free clearances.',
      features: [
        'Import Documentation',
        'Duty Assessment',
        'Regulatory Compliance',
        'Cargo Examination',
        'Port Clearance',
        'Regulatory Advisory'
      ],
      leadTime: '24–48 Hours Port Clearance',
      coverage: 'All Ports & Airports',
    },
    {
      id: 'lastmile',
      icon: Truck,
      title: 'Last Mile Delivery',
      tag: 'Final Destination Handover',
      image: 'https://i.postimg.cc/brSDx7dP/Van.jpg',
      shortDesc: 'Reliable final delivery solutions for businesses and retailers ensuring customer success.',
      features: [
        'Retail Distribution',
        'Corporate Deliveries',
        'B2B Logistics',
        'E-commerce Fulfilment',
        'Same Day Delivery',
        'Scheduled Delivery'
      ],
      leadTime: 'Same-day / Next-day Scheduled',
      coverage: 'Metropolitan Area Delivery Hubs',
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-light ui-dot-grid relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Our Service Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
            Integrated Solutions To Power Global Trade
          </h2>
          <div className="w-16 h-1 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
            Explore our world-class supply chain capabilities. Click any service card to view advanced technical specs, routing coverages, and custom features.
          </p>
        </div>

        {/* Expandable Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((srv) => {
            const IconComponent = srv.icon;
            const isExpanded = expandedCard === srv.id;

            return (
              <motion.div
                key={srv.id}
                layout
                className={`bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'ring-2 ring-brand-secondary md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Edge-to-Edge Visual Image */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
                </div>

                <div className="p-8">
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="p-4 rounded-2xl bg-brand-primary/5 text-brand-primary">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-semibold text-brand-secondary tracking-widest uppercase font-mono bg-brand-secondary/10 px-3 py-1 rounded-full">
                      {srv.tag}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-brand-primary font-heading">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-sans mt-2 leading-relaxed">
                      {srv.shortDesc}
                    </p>
                  </div>

                  {/* Accordion Expand Link */}
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : srv.id)}
                    className="mt-6 flex items-center space-x-1.5 text-xs font-bold text-brand-accent hover:text-orange-600 tracking-wider uppercase focus:outline-none transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Logistics Details' : 'Expand Technical Specs'}</span>
                    <ChevronDown className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expanded Content Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-6">
                          {/* Key Capabilities */}
                          <div>
                            <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-3">
                              Core Capabilities Include:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {srv.features.map((feat, idx) => (
                                <div key={idx} className="flex items-start space-x-2 text-xs text-gray-600 font-sans">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0"></span>
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Ideal For / Products Handled */}
                          {srv.idealFor && (
                            <div>
                              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
                                Ideal For:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {srv.idealFor.map((item, idx) => (
                                  <span key={idx} className="bg-brand-secondary/5 text-brand-secondary font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wide">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {srv.productsHandled && (
                            <div>
                              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-2">
                                Temperature Sensitive Products Handled:
                              </h4>
                              <div className="flex flex-wrap gap-1.5">
                                {srv.productsHandled.map((item, idx) => (
                                  <span key={idx} className="bg-brand-accent/5 text-brand-accent font-semibold text-[10px] px-2 py-0.5 rounded-md">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quick Facts Specs */}
                          <div className="grid grid-cols-2 gap-4 bg-brand-light p-4 rounded-2xl border border-gray-100">
                            <div>
                              <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Average Lead Time</p>
                              <p className="text-xs font-bold text-brand-primary font-heading mt-0.5">{srv.leadTime}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Network Coverage</p>
                              <p className="text-xs font-bold text-brand-primary font-heading mt-0.5">{srv.coverage}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
