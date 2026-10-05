import React, { useState, useEffect } from 'react';
import { MapPin, FileCheck, Cloud, BarChart3, Package, BellRing, Laptop, Cpu, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import inventoryImg from '../assets/images/inventory_management_black_professional_1783167003342.jpg';
import notificationsImg from '../assets/images/customer_notifications_black_1783167132284.jpg';
import digitalDocsImg from '../assets/images/digital_documentation_black_1783167298736.jpg';

export default function Technology() {
  const [activeTab, setActiveTab] = useState('gps');
  const [sysLog, setSysLog] = useState<string[]>([]);
  const [ping, setPing] = useState(24);

  // Simple telemetry updates
  useEffect(() => {
    const intervals = [
      'SECURE_GPS_SAT_LINK_ESTABLISHED [ID: FB-901]',
      'ENCRYPTED_CLOUD_METADATA_SYNCED',
      'ANALYTICS_CORE_CALCULATED [99.8% ACCURACY]',
      'WMS_INVENTORY_STAGING_OK [ZONE_3_REEFER]',
      'SMS_GATEWAY_STANDBY',
    ];
    setSysLog([intervals[0], intervals[1]]);

    const timer = setInterval(() => {
      const randomLine = intervals[Math.floor(Math.random() * intervals.length)];
      setSysLog((prev) => [randomLine, ...prev.slice(0, 3)]);
      setPing(Math.floor(Math.random() * 8) + 18);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const techs = [
    {
      id: 'gps',
      name: 'GPS Tracking',
      icon: MapPin,
      tag: 'Real-Time Telemetry',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80',
      desc: 'Sleek active tracking transponders fitted on every Frost Bridge vehicle stream live spatial coordinates, highway speeds, and mechanical cargo states 24/7.',
    },
    {
      id: 'docs',
      name: 'Digital Documentation',
      icon: FileCheck,
      tag: 'Frictionless Paperless Portal',
      image: digitalDocsImg,
      desc: 'All customs clearing sheets, marine manifests, Form M files, and transit insurance policies are securely cataloged and digitally accessible to clients instantly.',
    },
    {
      id: 'cloud',
      name: 'Cloud Operations',
      icon: Cloud,
      tag: 'Decentralized Architecture',
      image: 'https://images.unsplash.com/photo-1690627931320-16ac56eb2588?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdWQlMjBvcGVyYXRpb25zfGVufDB8fDB8fHww',
      desc: 'Distributed dispatch portals prevent data loss. Our network operates flawlessly even during regional fiber outages, ensuring seamless logistics schedules.',
    },
    {
      id: 'analytics',
      name: 'Shipment Analytics',
      icon: BarChart3,
      tag: 'AI Route Forecasting',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      desc: 'Advanced statistical algorithms calculate port congestion spikes, monsoon waves, and highway delays to automatically reroute high-priority cargo.',
    },
    {
      id: 'inventory',
      name: 'Inventory Management',
      icon: Package,
      tag: 'Intelligent Warehouse Management',
      image: inventoryImg,
      desc: 'Real-time pallet indexing, barcode scanning, FIFO rotation assistance, and temperature monitoring inside modern Isolo cold warehouse stacks.',
    },
    {
      id: 'notifs',
      name: 'Customer Notifications',
      icon: BellRing,
      tag: 'SMS & Email Dispatch Sync',
      image: notificationsImg,
      desc: 'Clients receive instant notification triggers during cargo load-in, customs departure, state borders entry, and ultimate last-mile dropoffs.',
    },
  ];

  return (
    <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
      {/* Background World Map Vector Grid Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Logistics 4.0 Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading mt-2">
            Technological Controls for Modern Logistics
          </h2>
          <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-300 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
            We replace manual uncertainty with structured software intelligence, enabling full compliance and predictable freight movements across global boundaries.
          </p>
        </div>

        {/* Dynamic Control Room Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Tech Selector Panel (Col-Span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-heading mb-4 flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-brand-secondary" />
                <span>Frost Bridge Digital Modules</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-2.5">
                {techs.map((tc) => {
                  const IconC = tc.icon;
                  const isActive = activeTab === tc.id;
                  return (
                    <button
                      key={tc.id}
                      onClick={() => setActiveTab(tc.id)}
                      className={`flex items-center space-x-4 p-4 rounded-xl text-left border transition-all duration-300 ${
                        isActive
                          ? 'bg-brand-secondary border-brand-secondary text-white shadow-lg translate-x-1.5'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-brand-primary text-white' : 'bg-white/5 text-brand-secondary'}`}>
                        <IconC className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-xs sm:text-sm">{tc.name}</p>
                        <p className={`text-[10px] mt-0.5 ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>
                          {tc.tag}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Live telemetry readout log at bottom */}
            <div className="bg-black/40 border border-white/10 p-4.5 rounded-2xl font-mono text-[10px] space-y-1 text-green-400">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-2">
                <span className="text-gray-400 text-[9px] uppercase tracking-widest">Digital Dispatch Telemetry</span>
                <span className="inline-flex items-center text-[9px] bg-green-950 text-green-400 px-2 py-0.5 rounded border border-green-500/20">
                  Ping: {ping}ms
                </span>
              </div>
              {sysLog.map((log, lIdx) => (
                <div key={lIdx} className="truncate">
                  <span className="text-gray-500 font-bold">&gt;&nbsp;</span>
                  {log}
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Dynamic Tech Mock Dashboard Preview Panel (Col-Span-7) */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Glossy top detail */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/15 rounded-full filter blur-3xl pointer-events-none"></div>

            <div className="space-y-6">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-xs text-gray-400 font-mono pl-2">FB_CONTROL_CONSOLE // active</span>
                </div>
                <Laptop className="w-4 h-4 text-brand-secondary" />
              </div>

              {/* Active Technology Visual Display */}
              <div className="h-32 sm:h-40 w-full rounded-2xl overflow-hidden border border-white/10 relative shadow-inner">
                <img
                  src={techs.find((t) => t.id === activeTab)?.image}
                  alt={techs.find((t) => t.id === activeTab)?.name}
                  className="w-full h-full object-cover opacity-80 mix-blend-screen transform hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest font-mono text-brand-secondary bg-black/50 border border-white/10 px-2 py-0.5 rounded">
                  {techs.find((t) => t.id === activeTab)?.tag}
                </span>
              </div>

              {/* Console Body depending on activeTab */}
              {activeTab === 'gps' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-bold font-heading text-white">Lagos-Kano Cargo Corridor Route</h4>
                    <span className="text-[10px] font-mono text-green-400 animate-pulse bg-green-950 px-2 py-0.5 rounded border border-green-500/10">● LIVE VEHICLE REF: FBL-810</span>
                  </div>
                  
                  {/* Simulated Map Visual */}
                  <div className="relative bg-black/60 h-48 rounded-xl border border-white/10 overflow-hidden p-4">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      {/* Grid lines */}
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="80" r="40" stroke="white" strokeWidth="0.5" fill="none" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke="white" strokeWidth="0.5" />
                      </svg>
                    </div>

                    {/* Simulation Path */}
                    <div className="absolute top-1/2 left-[10%] w-[80%] h-0.5 bg-dashed border-t border-brand-secondary/40"></div>
                    {/* Pulsing indicator */}
                    <div className="absolute top-[49%] left-[45%] flex items-center space-x-2">
                      <span className="relative flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-brand-accent"></span>
                      </span>
                      <span className="text-[10px] font-mono bg-brand-primary border border-white/15 px-2 py-0.5 rounded">Lokoja Hub Passed</span>
                    </div>

                    {/* Stats Readout Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 grid grid-cols-3 gap-2 bg-brand-primary/95 border border-white/10 p-2.5 rounded-lg text-center font-mono text-[9px]">
                      <div>
                        <span className="text-gray-400">SPEED</span>
                        <p className="font-bold text-white text-xs">74 KM/H</p>
                      </div>
                      <div>
                        <span className="text-gray-400">TEMP STATUS</span>
                        <p className="font-bold text-brand-success text-xs">4.2°C OK</p>
                      </div>
                      <div>
                        <span className="text-gray-400">ETA KANO</span>
                        <p className="font-bold text-brand-accent text-xs">5H 14M</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold font-heading text-white">Client Document Vault Storage</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex items-center space-x-3 text-xs">
                      <div className="p-2 bg-brand-secondary/20 text-brand-secondary rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold">Form_M_FBL912.pdf</p>
                        <p className="text-[10px] text-gray-400 font-mono">Size: 4.1MB // Approved NCS</p>
                      </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex items-center space-x-3 text-xs">
                      <div className="p-2 bg-brand-secondary/20 text-brand-secondary rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold">Ocean_BOL_MAERSK_01.pdf</p>
                        <p className="text-[10px] text-gray-400 font-mono">Size: 1.2MB // Signed Vessel</p>
                      </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex items-center space-x-3 text-xs">
                      <div className="p-2 bg-brand-secondary/20 text-brand-secondary rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold">ColdChain_Audit_Zone3.csv</p>
                        <p className="text-[10px] text-gray-400 font-mono">Size: 12KB // GPS Sync Ok</p>
                      </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex items-center space-x-3 text-xs">
                      <div className="p-2 bg-brand-secondary/20 text-brand-secondary rounded-lg">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold">Customs_PAAR_FB_LND.pdf</p>
                        <p className="text-[10px] text-gray-400 font-mono">Size: 840KB // Certified Valid</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'cloud' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold font-heading text-white">Distributed Server Cluster Sync</h4>
                  <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>Lagos Hub Endpoint:</span>
                      <span className="text-green-400 font-bold">ONLINE & ACCELERATED</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>Port Harcourt Terminal:</span>
                      <span className="text-green-400 font-bold">ONLINE & SYNCED</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>London Forwarding Agent:</span>
                      <span className="text-green-400 font-bold">ONLINE & COOPERATIVE</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>Houston Clearing Center:</span>
                      <span className="text-green-400 font-bold">ONLINE & SYNCED</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold font-heading text-white">Dynamic Freight Performance Dashboard</h4>
                  
                  {/* Custom Simulated Bar Graph */}
                  <div className="bg-black/40 border border-white/10 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-mono text-gray-400">On-Time Performance Rate by Lane (Q1-Q2)</span>
                      <span className="text-[10px] font-bold text-brand-secondary uppercase">Average: 98.2%</span>
                    </div>
                    
                    <div className="space-y-2.5 font-mono text-[9px]">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Air Cargo Priority</span>
                          <span>99.6%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-secondary rounded-full" style={{ width: '99.6%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Lagos-Kano Land Road</span>
                          <span>96.8%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-accent rounded-full" style={{ width: '96.8%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Marine Reefer Containers</span>
                          <span>98.1%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-secondary rounded-full" style={{ width: '98.1%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold font-heading text-white">Isolo Cold-Warehouse Stacking</h4>
                  <div className="p-4 bg-black/40 border border-white/10 rounded-xl grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-[9px] text-gray-400 block font-mono">ZONE A (PHARMA)</span>
                      <span className="text-sm font-bold text-white block mt-1">4.2°C</span>
                      <span className="text-[8px] bg-green-950 text-green-400 border border-green-500/20 px-1 py-0.5 rounded block mt-1.5 font-mono">STABLE</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-[9px] text-gray-400 block font-mono">ZONE B (AGRI)</span>
                      <span className="text-sm font-bold text-white block mt-1">12.5°C</span>
                      <span className="text-[8px] bg-green-950 text-green-400 border border-green-500/20 px-1 py-0.5 rounded block mt-1.5 font-mono">STABLE</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-[9px] text-gray-400 block font-mono">ZONE C (FREEZER)</span>
                      <span className="text-sm font-bold text-white block mt-1">-18.4°C</span>
                      <span className="text-[8px] bg-green-950 text-green-400 border border-green-500/20 px-1 py-0.5 rounded block mt-1.5 font-mono">STABLE</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifs' && (
                <div className="space-y-4">
                  <h4 className="text-base font-bold font-heading text-white">Frictionless Client Notification Loops</h4>
                  <div className="p-4 bg-black/40 border border-white/10 rounded-xl space-y-3 font-mono text-[10px]">
                    <div className="border-l-2 border-brand-accent pl-3">
                      <span className="text-brand-accent font-bold">[CLIENT SMS SENT]</span>
                      <p className="text-white mt-1">"FBL-109 has passed Nigeria-Benin Border. Customs clearance has been logged and finalized. Expected ETA: 4 hours."</p>
                    </div>
                    <div className="border-l-2 border-brand-secondary pl-3">
                      <span className="text-brand-secondary font-bold">[CLIENT EMAIL DISPATCHED]</span>
                      <p className="text-white mt-1">"Subject: Cargo Milestone Reached - Bill of Lading Signed at Apapa Seaport. Download compliance PDFs via your Portal."</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom info link */}
            <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-gray-400 font-sans">
                {techs.find((t) => t.id === activeTab)?.desc}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
