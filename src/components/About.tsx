import React, { useState } from 'react';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  Award, 
  Heart, 
  Star, 
  Leaf, 
  CheckCircle, 
  Lightbulb, 
  Handshake 
} from 'lucide-react';
import { motion } from 'motion/react';
import aboutImage from '../assets/images/about_logistics_1782829479557.jpg';

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(3);
  const [imgSrc, setImgSrc] = useState('https://i.postimg.cc/0jzFdrZ3/team.jpg');

  const timelineEvents = [
    {
      year: '2021',
      title: 'Inception & Lagos Terminal Launch',
      description: 'Frost Bridge Global Logistics was founded with a singular focus: to bridge the gap in high-reliability transport and customs services across Nigeria, launching our first smart hub in Lagos.',
    },
    {
      year: '2023',
      title: 'Ocean & Air Freight Global Integration',
      description: 'Expanded global partnerships with elite maritime and aviation shipping carriers, enabling seamless freight operations to and from Europe, North America, and Asia.',
    },
    {
      year: '2025',
      title: 'Cold Chain & Warehousing Revolution',
      description: 'Pioneered energy-efficient refrigerated warehouses and smart cold trucks in Isolo, Lagos, strictly catering to pharmaceuticals and food-and-beverage distribution.',
    },
    {
      year: '2026',
      title: 'Trade & Forex Centre and Full Digitization',
      description: 'Launched real-time cloud inventory tracking and the live Trade & Forex dashboard to empower merchants with immediate cost estimators and exchange rates.',
    },
  ];

  const coreValues = [
    { icon: Handshake, title: 'Integrity', text: 'We do what we promise.' },
    { icon: Star, title: 'Excellence', text: 'Continuous improvement in every operation.' },
    { icon: Leaf, title: 'Sustainability', text: 'Responsible logistics for a better future.' },
    { icon: Heart, title: 'Customer First', text: 'Our customers define our success.' },
    { icon: CheckCircle, title: 'Reliability', text: 'Dependable service every time.' },
    { icon: Lightbulb, title: 'Innovation', text: 'Technology-driven logistics solutions.' },
  ];

  return (
    <section id="about" className="py-24 bg-brand-light ui-dot-grid relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Our Corporate Identity
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
            Pioneering Seamless Global Connectivity
          </h2>
          <div className="w-16 h-1 bg-brand-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Image Card with Custom Overlays (Designed by World-Class agency style) */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={imgSrc}
                alt="Frost Bridge Directors and Logistics Planners"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={() => {
                  setImgSrc('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent"></div>
              
              {/* Overlaid Floating Achievement Tag */}
              <div className="absolute bottom-6 left-6 right-6 glass-effect p-4 rounded-2xl flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-brand-accent text-white">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs text-brand-primary font-bold uppercase tracking-widest font-sans">ISO 9001:2015</p>
                  <p className="text-[10px] text-gray-500 font-sans">Compliant Global Quality Standards</p>
                </div>
              </div>
            </div>

            {/* Behind-image shadow cards to add premium complexity */}
            <div className="absolute top-8 -right-4 w-full h-full bg-brand-primary/5 rounded-3xl -z-10 transform rotate-2"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-brand-accent/10 rounded-full filter blur-xl -z-10"></div>
          </div>

          {/* Right: Company Story, Vision, Mission */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-brand-primary font-heading mb-4">
                Building Bridges Across Global Supply Chains
              </h3>
              <p className="text-gray-600 font-sans font-light leading-relaxed mb-4">
                Frost Bridge Global Logistics Limited is a Nigerian-owned logistics company delivering world-class freight forwarding, transportation, warehousing, customs brokerage, and supply chain management services.
              </p>
              <p className="text-gray-600 font-sans font-light leading-relaxed mb-4">
                Our objective is simple: To connect businesses with efficient logistics solutions while preserving product integrity, reducing operational costs, and ensuring timely delivery.
              </p>
              <p className="text-gray-600 font-sans font-light leading-relaxed">
                We combine modern logistics technology, experienced professionals, strategic partnerships, and customer-focused service to create seamless supply chain solutions for clients across multiple industries. Whether moving a single shipment or managing an entire supply chain, we become an extension of our clients' business.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mission */}
              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-brand-secondary flex flex-col space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/15 flex items-center justify-center text-brand-secondary">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-brand-primary font-heading">Our Mission</h4>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  To provide reliable, cost-effective and customer-focused logistics services through operational excellence, strategic partnerships and continuous innovation.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-brand-accent flex flex-col space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center text-brand-accent">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-brand-primary font-heading">Our Vision</h4>
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  To become Africa's preferred integrated logistics provider delivering innovative, sustainable and technology-driven supply chain solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-extrabold text-brand-primary font-heading uppercase tracking-tight">Our Core Values</h3>
            <p className="text-xs text-gray-400 mt-1 font-sans">The guiding principles that define our commitment to excellence</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div key={idx} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-150 flex items-start space-x-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-3 bg-brand-primary/5 rounded-xl text-brand-secondary shrink-0 group-hover:bg-brand-secondary group-hover:text-white transition-all">
                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-brand-primary font-heading">{val.title}</h4>
                    <p className="text-xs text-gray-500 font-sans leading-relaxed">{val.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Interactive Component */}
        <div className="mt-24 bg-brand-primary rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-secondary/20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h4 className="text-xs text-brand-secondary font-bold uppercase tracking-wider font-sans">Our Strategic Roadmap</h4>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading mt-1 text-white">Frost Bridge Growth Timeline</h3>
            </div>

            {/* Timeline Progress Bar Line */}
            <div className="relative">
              <div className="absolute top-[28px] left-4 right-4 h-0.5 bg-white/10 hidden md:block"></div>
              
              {/* Timeline Horizontal Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
                {timelineEvents.map((evt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTimeline(idx)}
                    className="flex flex-col items-center md:items-center text-center p-4 rounded-2xl focus:outline-none transition-all duration-300"
                  >
                    {/* Circle Step indicator */}
                    <div
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-heading font-bold text-lg transition-all shadow-md mb-3 ${
                        activeTimeline === idx
                          ? 'bg-brand-accent border-brand-accent text-white scale-110 shadow-orange-500/20'
                          : 'bg-brand-primary border-white/20 text-gray-400 hover:border-white'
                      }`}
                    >
                      {evt.year}
                    </div>
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold ${
                        activeTimeline === idx ? 'text-brand-accent' : 'text-gray-400'
                      }`}
                    >
                      {evt.title.split(' & ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Display selected event details with beautiful transition overlay */}
            <div className="mt-8 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl text-center md:text-left transition-all duration-300">
              <h4 className="text-lg font-bold text-brand-secondary font-heading mb-2">
                {timelineEvents[activeTimeline].title} — {timelineEvents[activeTimeline].year}
              </h4>
              <p className="text-sm text-gray-300 font-sans leading-relaxed font-light">
                {timelineEvents[activeTimeline].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
