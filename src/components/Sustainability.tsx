import React from 'react';
import { Leaf, Fuel, ShieldCheck, Zap, PackageOpen, Recycle, Warehouse } from 'lucide-react';

export default function Sustainability() {
  const initiatives = [
    {
      icon: Fuel,
      title: 'Fuel-Efficient Logistics',
      description: 'Strict fleet maintenance standards and modern tractor units keep carbon fuel consumption per ton-mile at minimal levels.',
    },
    {
      icon: Leaf,
      title: 'Optimized Shipping Routes',
      description: 'AI route optimization computes high-efficiency transit lanes to minimize idling hours and empty miles on return legs.',
    },
    {
      icon: Zap,
      title: 'Reduced Emissions Program',
      description: 'We track and analyze greenhouse emissions across all sea, road, and air operations to exceed carbon compliance goals.',
    },
    {
      icon: PackageOpen,
      title: 'Eco-Friendly Packaging',
      description: 'Providing biodegradable wrap, reusable dunnage, and structural box composites to minimize environmental waste.',
    },
    {
      icon: Recycle,
      title: 'Waste Reduction',
      description: 'Paperless digital operations eliminate shipping manifest printing waste, preventing tons of pulp consumption annually.',
    },
    {
      icon: Warehouse,
      title: 'Energy-Efficient Warehouses',
      description: 'Equipped with smart LED panels, solar panels, and specialized insulation to regulate cold room temperatures with minimal power grids.',
    },
  ];

  return (
    <section className="py-24 bg-[#E8F5E9]/30 relative overflow-hidden">
      {/* Decorative Light Green Bubble Accent */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand-success/5 rounded-full filter blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Section Top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Header left (Col-Span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center space-x-2 bg-brand-success/15 border border-brand-success/30 rounded-full px-4 py-1.5 shadow-sm">
              <Leaf className="w-4 h-4 text-brand-success" />
              <span className="text-brand-success text-xs sm:text-sm font-semibold tracking-wider uppercase font-sans">
                Eco-Conscious Corporate Policy
              </span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
              Building Green Supply Chains For Future Generations
            </h2>
            <div className="w-16 h-1.5 bg-brand-success rounded-full"></div>
          </div>

          {/* Subtext right (Col-Span-5) */}
          <div className="lg:col-span-5">
            <p className="text-gray-600 font-sans font-light leading-relaxed text-sm">
              Frost Bridge Global Logistics is strictly committed to driving sustainable trade practices. By deploying optimized route forecasting, fuel-efficient trucks, solar-supported warehouses, and a fully paperless documentation dashboard, we reduce the emissions footprint of your cargo movements.
            </p>
          </div>
        </div>

        {/* Immersive Green Sustainability Banner */}
        <div className="h-64 sm:h-80 w-full rounded-3xl overflow-hidden mb-16 relative shadow-xl border border-emerald-100">
          <img
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&q=80"
            alt="Eco-friendly infrastructure and clean energy logistics"
            className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b4332]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-white">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#A9DFBF]">Carbon Neutrality Target</p>
              <h3 className="text-lg sm:text-xl font-bold font-heading mt-0.5">Optimizing 100% of Land Logistics corridors by 2028</h3>
            </div>
            <span className="bg-[#2ECC71]/90 backdrop-blur-md text-white font-mono text-[10px] font-bold px-3.5 py-1.5 rounded-full border border-emerald-300/30 uppercase tracking-wider self-start sm:self-auto">
              ISO 14001:2015 Cert
            </span>
          </div>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((init, idx) => {
            const IconComp = init.icon;
            return (
              <div
                key={idx}
                className="group bg-white p-8 rounded-3xl border border-gray-100 hover:border-brand-success/30 hover:shadow-xl hover:shadow-brand-success/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-brand-success flex items-center justify-center mb-6 group-hover:bg-brand-success group-hover:text-white transition-all duration-300 shadow-sm">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary font-heading mb-2">
                  {init.title}
                </h3>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  {init.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
