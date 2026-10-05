import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  const quickLinks = [
    { label: 'Home Terminal', id: 'home' },
    { label: 'About Story', id: 'about' },
    { label: 'Industries Served', id: 'industries' },
    { label: 'Chemical Logistics', id: 'chemical-logistics' },
    { label: 'Trade & Forex Centre', id: 'forex' },
    { label: 'Blog Circulars', id: 'blog' },
    { label: 'Careers Portal', id: 'careers' },
    { label: 'Connect Support', id: 'contact' },
  ];

  const servicesLinks = [
    { label: 'Air Freight Cargo', id: 'services' },
    { label: 'Ocean Container FCL', id: 'services' },
    { label: 'Road Interstate Fleet', id: 'services' },
    { label: 'Cold Chain Reefers', id: 'services' },
    { label: 'Chemical & Polymers', id: 'chemical-logistics' },
    { label: 'Customs Clearance Broker', id: 'services' },
    { label: 'Secure Warehousing Stack', id: 'services' },
  ];

  return (
    <footer className="bg-brand-primary text-white pt-20 pb-8 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Brand Credentials (Col-Span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-xl p-1.5 shadow-md border border-white/10 shrink-0">
                <Logo variant="icon" className="w-full h-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-lg leading-none tracking-wider font-heading">
                  FROST BRIDGE
                </span>
                <span className="text-brand-accent text-[8px] tracking-widest uppercase font-sans font-bold mt-1 leading-none">
                  Global Logistics Limited
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Frost Bridge Global Logistics Limited provides customized, highly integrated global cargo transportation, pharmaceutical cold chain, secure container storage, and tariff clearance solutions, helping enterprises trade flawlessly across Nigeria and worldwide borders.
            </p>
          </div>

          {/* Column 2: Quick Links (Col-Span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent font-heading">Sitemap Terminal</h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-400 hover:text-white transition-all py-0.5 hover:translate-x-1.5 transform duration-200 block text-left w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services sitemap (Col-Span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent font-heading">Core Portfolios</h4>
            <ul className="space-y-2 text-xs">
              {servicesLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-400 hover:text-white transition-all py-0.5 hover:translate-x-1.5 transform duration-200 block text-left w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Subscriber (Col-Span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-accent font-heading">Trade Circular Sign-up</h4>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              Subscribe to receive weekly Central Bank of Nigeria FX spot revisions, ocean freight tariff indices, and regional customs compliance guidelines.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5 pt-1">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-secondary text-white placeholder-gray-500"
                  placeholder="name@business.com"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-1"
              >
                <span>{isSubscribed ? 'Subscribed' : 'Join circular'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright & compliance bar */}
        <div className="mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-sans">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© 2026 Frost Bridge Global Logistics Limited. All Rights Reserved. RC: 9643928.</p>
            <span className="hidden sm:inline text-gray-600">|</span>
            <p>
              Created by{' '}
              <a
                href="https://nexunit-digital-solutions-2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-secondary hover:text-brand-accent transition-colors font-semibold underline underline-offset-2"
              >
                Nexunit
              </a>
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-secondary" />
              <span>NCS Certified Broker</span>
            </span>
            <span className="flex items-center space-x-1">
              <Award className="w-3.5 h-3.5 text-brand-secondary" />
              <span>GDP compliant Reefer Chain</span>
            </span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Trading Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
