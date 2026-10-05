import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Clock, 
  ChevronRight, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  Filter, 
  X,
  Share2,
  Bookmark,
  ThumbsUp,
  Inbox,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ncsNewsImage from '../assets/images/ncs_news.png';

interface Article {
  id: string;
  title: string;
  category: 'Trade Policy' | 'Exchange Rates' | 'Port Operations' | 'Logistics Strategy' | 'Cold Chain';
  author: string;
  role: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
  content: string[];
  tags: string[];
}

const ARTICLES_DATABASE: Article[] = [
  {
    id: 'art-007',
    title: 'Nigeria Customs Service Announces Vehicle Import Levy Reductions & Green Tax Surcharge',
    category: 'Trade Policy',
    author: 'Amara Nwachukwu',
    role: 'Senior Customs Compliance Director',
    date: 'July 1, 2026',
    readTime: '4 min read',
    summary: 'Starting 1st July 2026, the Nigeria Customs Service is implementing a new Green Tax Surcharge alongside a major reduction in import levies for both new and used vehicles to ease importation costs.',
    image: 'https://i.postimg.cc/DZcJNRJ5/Nigeria-customer-service.jpg',
    content: [
      'Effective July 1, 2026, the Nigeria Customs Service (NCS) is rolling out significant fiscal revisions as part of the 2026 Fiscal Policy Measures. These updates aim to strike a balance between promoting environmental sustainability and easing the financial burden of vehicle importation for businesses and citizens across Nigeria.',
      'Under the newly announced measures, the import levy on new vehicles has been slashed by half, dropping from 20% to 10%. Similarly, the import levy on used vehicles has been reduced from 15% to 5%. This massive reduction is expected to significantly lower the capital requirements for automotive logistics and commercial fleet expansion.',
      'To support environmental sustainability and pave the way for a greener future, the NCS is concurrently introducing the Green Tax Surcharge. This surcharge is designed to encourage eco-friendly transport options and fund national sustainable trade initiatives, aligning Nigeria with global green logistics benchmarks.',
      'At Frost Bridge Global Logistics, our compliance desks are already updating our digital customs clearance pipelines to reflect these new rates. Importers can immediately leverage our Trade & Forex Centre to simulate their updated landing costs under the new NCS framework, ensuring maximum clearance velocity and cost efficiency.'
    ],
    tags: ['Customs Policy', 'Vehicle Import', 'Green Tax', 'NCS Updates', 'Nigeria Trade']
  },
  {
    id: 'art-001',
    title: 'Naira Spot Rate Projections: Navigating Central Bank Revisions',
    category: 'Exchange Rates',
    author: 'Kelechi Amadi',
    role: 'Chief Treasury Desk Officer',
    date: 'June 28, 2026',
    readTime: '6 min read',
    summary: 'An in-depth analysis of the Central Bank of Nigeria\'s latest FX liquid allocation cycles, projecting trading bounds for importers and trade planning through autumn.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    content: [
      'The foreign exchange landscape in West Africa is undergoing structural adjustments aimed at improving liquidity and reducing the spread between parallel markets and official spot rates.',
      'For Nigerian importers and global manufacturers, understanding these weekly allocation patterns is critical to forecasting procurement costs. Our desk has tracked the flow of dollar allocations, identifying a stabilization band of ₦1,500 to ₦1,530.',
      'We recommend that importers engage in structured forward contracts where possible or leverage Frost Bridge\'s integrated Trade & Forex Centre rate tables to hedge raw material pricing.',
      'Furthermore, the recent bilateral agreements in ECOWAS trade corridors are expected to facilitate smoother regional clearance, potentially relieving pressure on local currency reserves for regional sourcing.'
    ],
    tags: ['Naira', 'Central Bank', 'FX Spot', 'Import Planning']
  },
  {
    id: 'art-002',
    title: 'Lagos Seaports: Terminal Clearance Velocity Declines to 2.2 Days',
    category: 'Port Operations',
    author: 'Capt. Ibrahim Musa',
    role: 'Lagos Port Operations Director',
    date: 'June 25, 2026',
    readTime: '4 min read',
    summary: 'A look at the automation upgrades and pre-filing customs clearances at Apapa and Tin Can Island terminals that are driving faster container turnaround times.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    content: [
      'Operational bottlenecks at the Lagos maritime gates are easing. Driven by the deployment of the Single Window System and pre-arrival assessment reports (PAAR), waiting times have plummeted.',
      'Vessel turnaround times at the Apapa terminals now average 2.2 days, a historic benchmark that enables importers to avoid hefty terminal storage demurrage fees.',
      'Frost Bridge has fully integrated its customs brokerage workflows with these new digital clearing pipelines, allowing cargo documents to be cleared up to 48 hours before vessel berthing.',
      'As terminal operators prepare for peak autumn cargo volumes, we advise clients to stage their digital manifests early to maintain rapid gate-out delivery schedules.'
    ],
    tags: ['Apapa Port', 'Customs Clearance', 'Demurrage', 'Lagos Logistics']
  },
  {
    id: 'art-003',
    title: 'Understanding Incoterms 2020: A Guide for West African Importers',
    category: 'Logistics Strategy',
    author: 'Sarah Jenkins',
    role: 'VP of Global Trade Compliance',
    date: 'June 22, 2026',
    readTime: '8 min read',
    summary: 'Clear clarification on FOB vs. CIF vs. DDP, and how choosing the right contract terms impacts your total landing cost and supply chain liability.',
    image: 'https://plus.unsplash.com/premium_photo-1723809616710-32afb9dcd0ef?auto=format&fit=crop&w=800&q=80',
    content: [
      'Incoterms define the precise moment when risk, liability, and costs transfer from the seller to the buyer. Misunderstanding these definitions often results in unexpected customs clearance delays or transit disputes.',
      'While CIF (Cost, Insurance, and Freight) is popular, it leaves the importer responsible for clearing destination port terminal costs, customs brokerage, and local transport, which are often unpredictable.',
      'DDP (Delivered Duty Paid) offers the buyer complete peace of mind, as the seller handles all transport and duties. However, Frost Bridge recommends DAP (Delivered at Place) for larger manufacturers, giving them control over local clearing speed while outsourcing the global freight leg.',
      'Our team has prepared a detailed matrix within the Frost Bridge Trade & Forex Centre to help importers simulate total landing costs under various Incoterms contracts.'
    ],
    tags: ['Incoterms', 'Global Trade', 'Risk Management', 'Compliance']
  },
  {
    id: 'art-004',
    title: 'Yuan Spot Rate Projections: Preparing for Autumn Industrial Peaks',
    category: 'Exchange Rates',
    author: 'Kelechi Amadi',
    role: 'Chief Treasury Desk Officer',
    date: 'June 18, 2026',
    readTime: '5 min read',
    summary: 'As manufacturing output peaks across Ningbo-Zhoushan hubs, we analyze yuan-to-naira trading indices and their direct impact on sourcing costs.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    content: [
      'Sourcing from Chinese industrial hubs continues to represent over 40% of manufacturing inputs in Nigeria. Sourcing agents are closely watching the Chinese Yuan (CNY) and US Dollar movements.',
      'With autumn shipping seasons fast approaching, high manufacturing output in Ningbo and Yiwu hubs is expected to drive minor freight rate fluctuations.',
      'Our financial desk projects CNY-to-NGN trading rates to experience moderate adjustments. Planning procurement batches 30 to 45 days in advance is the safest defense against peak season surges.',
      'Frost Bridge\'s logistics desks provide direct consolidated groupage services from Shanghai and Guangzhou, matching local payment corridors to minimize conversion losses.'
    ],
    tags: ['China Sourcing', 'Yuan CNY', 'Manufacturing', 'Groupage']
  },
  {
    id: 'art-005',
    title: 'Pharmaceutical Cold Chain: Maintaining Product Integrity in Africa',
    category: 'Cold Chain',
    author: 'Dr. Chima Nwachukwu',
    role: 'QA Director & Cold Chain Lead',
    date: 'June 14, 2026',
    readTime: '7 min read',
    summary: 'Essential best practices for temperature-controlled reefer transportation, GDP compliance, and last-mile cold storage delivery in tropical regions.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
    content: [
      'The preservation of biological materials, life-saving pharmaceuticals, and cold-chain foods in sub-Saharan climates requires flawless mechanical and operational planning.',
      'Good Distribution Practice (GDP) guidelines demand continuous temperature monitoring from the manufacturing plant to final clinical warehouse arrival.',
      'Frost Bridge has deployed refrigerated reefer fleets fitted with dual-redundant power compressors and real-time satellite telemetry sensors, maintaining precise +2°C to +8°C bands.',
      'We also utilize specialized vacuum-insulated active containers that preserve therapeutic integrity even during extended custom border stages, shielding products from tropical ambient temperatures.'
    ],
    tags: ['Cold Chain', 'Pharmaceuticals', 'GDP Compliance', 'Sensors']
  },
  {
    id: 'art-006',
    title: 'Eco-Routing Algorithms: Reducing Freight Carbon and Fuel Costs',
    category: 'Logistics Strategy',
    author: 'Sarah Jenkins',
    role: 'VP of Global Trade Compliance',
    date: 'June 10, 2026',
    readTime: '5 min read',
    summary: 'How Frost Bridge uses predictive routing algorithms to minimize interstate highway transit emissions while cutting fuel surcharges for corporate clients.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80',
    content: [
      'Sustainability is no longer an optional corporate responsibility program; it is a vital strategy for supply chain cost reduction.',
      'By analyzing highway elevations, traffic cycles, and border queuing delays via predictive machine-learning engines, Frost Bridge is able to optimize truck routes across West Africa.',
      'Optimized green routing has reduced fuel consumption by 14% on our Lagos-Accra corridors, translating to reduced transport emissions and directly lowering fuel surcharge indices for our contract shippers.',
      'Our clients now receive detailed green-accounting certificates with monthly invoices, documenting their carbon reduction footprint under ISO 14001 guidelines.'
    ],
    tags: ['Sustainability', 'Eco-Routing', 'Fuel Surcharge', 'Tech Logistics']
  }
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const categories = ['All', 'Trade Policy', 'Exchange Rates', 'Port Operations', 'Logistics Strategy', 'Cold Chain'];

  // Filter articles based on search & category
  const filteredArticles = ARTICLES_DATABASE.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-brand-primary text-white pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://plus.unsplash.com/premium_photo-1723809616710-32afb9dcd0ef?auto=format&fit=crop&w=1920&q=80"
            alt="Frost Bridge Global Trade Intelligence"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/90 to-brand-primary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-brand-primary/30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-brand-secondary/20 border border-brand-secondary/30 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-secondary animate-pulse" />
            <span className="text-brand-secondary text-[10px] sm:text-xs font-semibold tracking-wider uppercase font-mono">
              Market Intelligence Desk
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading max-w-4xl mx-auto"
          >
            Trade Insights & News Bulletin
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-xs sm:text-sm md:text-base text-gray-300 font-sans font-light leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Stay ahead of global trade corridors, local port turnaround velocities, dynamic currency estimates, and customs regulatory guidelines written directly by our desk experts.
          </motion.p>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="bg-brand-light py-8 border-b border-gray-150 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:items-center justify-between">
            
            {/* Category Selectors */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none scroll-smooth">
              <span className="text-gray-400 text-xs flex items-center gap-1 shrink-0 mr-1.5">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 uppercase tracking-wide ${
                    selectedCategory === cat
                      ? 'bg-brand-secondary text-white shadow-sm'
                      : 'bg-white hover:bg-gray-100 text-brand-primary border border-gray-150'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, keywords, tags..."
                className="block w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-white text-brand-primary placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-brand-accent"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Articles Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-brand-light border border-dashed border-gray-200 rounded-3xl max-w-2xl mx-auto">
              <BookOpen className="w-12 h-12 text-gray-350 mx-auto mb-4" />
              <h3 className="text-base font-bold text-brand-primary font-heading uppercase tracking-wide">
                No matching insights found
              </h3>
              <p className="text-xs text-gray-400 font-sans mt-2">
                Try revising your keywords or resetting the category filter to search our global trade archive.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-5 bg-brand-primary text-white text-xs font-bold px-5 py-2.5 rounded-xl uppercase tracking-wider"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedArticle(article);
                  }}
                  className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Image Area */}
                    <div 
                      className="h-52 overflow-hidden relative"
                      onClick={() => {
                        setSelectedArticle(article);
                      }}
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent"></div>
                      
                      {/* Hover overlay with visual cue */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="bg-white/90 text-brand-primary text-[10px] font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <BookOpen className="w-4 h-4 text-brand-secondary" />
                          <span className="uppercase tracking-wider">Read Insight</span>
                        </div>
                      </div>

                      <span className="absolute top-4 left-4 bg-brand-primary/90 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center space-x-3.5 text-[10px] text-gray-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{article.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-brand-primary font-heading group-hover:text-brand-secondary transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs text-gray-500 font-sans leading-relaxed line-clamp-3 font-light">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  {/* Read Link */}
                  <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                    <span className="font-semibold text-brand-primary">{article.author}</span>
                    <span className="text-brand-accent group-hover:translate-x-1.5 transition-transform duration-300 font-bold flex items-center gap-1 uppercase tracking-wider">
                      <span>Read Insight</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Featured Newsletter Section (Inside Blog) */}
      <section className="bg-brand-primary text-white py-16 relative overflow-hidden border-t border-brand-secondary/20">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:2rem_2rem] z-0"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-secondary/15 text-brand-secondary flex items-center justify-center mx-auto">
            <Inbox className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
            Direct Circular Intelligence Delivery
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
            Get hourly rate revisions, Central Bank customs briefings, regional seaport demurrage warnings, and logistics trend papers straight to your mailbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter corporate email address"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-secondary text-white placeholder-gray-500"
              disabled={subscribed}
            />
            <button
              type="submit"
              disabled={subscribed}
              className="bg-brand-accent hover:bg-orange-600 disabled:bg-orange-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors"
            >
              {subscribed ? 'Verification Sent' : 'Subscribe Desk'}
            </button>
          </form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-brand-secondary font-mono font-medium"
            >
              Subscription logged! Check your inbox for confirmation.
            </motion.p>
          )}
        </div>
      </section>

      {/* Article Detail Modal View (High Fidelity Lightbox) */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-brand-primary/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-gray-150"
            >
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-10 bg-brand-primary/90 text-white hover:bg-brand-accent p-2.5 rounded-full transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Image */}
              <div 
                className="h-64 sm:h-80 w-full relative cursor-zoom-in group/modal"
                onClick={() => setLightboxImage(selectedArticle.image)}
              >
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover group-hover/modal:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-brand-primary/30"></div>
                
                {/* Visual Cue inside Detail Modal */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/modal:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                  <div className="bg-white/95 text-brand-primary text-[10px] font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg">
                    <ZoomIn className="w-4 h-4 text-brand-secondary" />
                    <span className="uppercase tracking-wider">View Full Resolution</span>
                  </div>
                </div>

                <span className="absolute bottom-6 left-6 bg-brand-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
              </div>

              {/* Main Text Content Container */}
              <div className="p-6 sm:p-10 space-y-6">
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-5 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary font-black text-sm uppercase">
                      {selectedArticle.author.slice(0, 2)}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-brand-primary block leading-none">
                        {selectedArticle.author}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono block mt-1">
                        {selectedArticle.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-[10px] text-gray-450 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{selectedArticle.date}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{selectedArticle.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Article Title */}
                <h1 className="text-lg sm:text-2xl font-black text-brand-primary font-heading leading-tight tracking-tight">
                  {selectedArticle.title}
                </h1>

                {/* Main Content paragraphs */}
                <div className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed space-y-4 font-light">
                  {selectedArticle.content.map((p, pidx) => (
                    <p key={pidx}>{p}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-4 flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-brand-light text-brand-primary text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Modal Utility Bar */}
                <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-brand-accent transition-colors font-mono">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful (14)</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-brand-accent transition-colors font-mono">
                      <Bookmark className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                  <button className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-brand-secondary transition-colors font-mono">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-between p-4 select-none"
          >
            {/* Top Bar with title and controls */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 z-[110] bg-black/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/5 shadow-xl max-w-5xl mt-2">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[#1E88E5] font-mono text-[10px] tracking-widest uppercase font-bold">Ultra-HD Document Viewer</span>
                <span className="text-white text-xs sm:text-sm font-sans font-light truncate max-w-xs sm:max-w-md">4K Precision High-Resolution Render</span>
              </div>

              {/* Floating Zoom Controls & Reset & Close */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Zoom Out Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(prev => Math.max(0.5, prev - 0.25));
                  }}
                  className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white p-2.5 rounded-xl border border-white/10 transition-all cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Current Scale Display */}
                <span className="text-white font-mono text-xs font-bold bg-white/5 px-3 py-2 rounded-xl border border-white/5 min-w-[60px] text-center">
                  {Math.round(zoomScale * 100)}%
                </span>

                {/* Zoom In Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(prev => Math.min(4, prev + 0.25));
                  }}
                  className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white p-2.5 rounded-xl border border-white/10 transition-all cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Reset Zoom Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomScale(1);
                  }}
                  className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white p-2.5 rounded-xl border border-white/10 transition-all cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Divider */}
                <div className="w-[1px] h-6 bg-white/20 self-center hidden sm:block"></div>

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(null);
                    setZoomScale(1);
                  }}
                  className="bg-[#F57C00] hover:bg-orange-600 text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/20"
                  aria-label="Close lightbox"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Immersive Scrollable Viewport */}
            <div 
              onClick={() => {
                setLightboxImage(null);
                setZoomScale(1);
              }}
              className="flex-1 w-full flex items-center justify-center overflow-auto p-4 sm:p-8 cursor-zoom-out"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="relative flex items-center justify-center transition-all duration-300 ease-out"
                style={{
                  width: zoomScale > 1 ? `${100 * zoomScale}%` : 'auto',
                  height: zoomScale > 1 ? `${100 * zoomScale}%` : 'auto',
                }}
              >
                <img
                  src={lightboxImage}
                  alt="Enlarged 4K news graphic"
                  style={{
                    transform: `scale(${zoomScale})`,
                    transformOrigin: 'center center',
                  }}
                  className="max-w-[95vw] max-h-[80vh] w-auto h-auto object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 transition-transform duration-200 ease-out select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Footer tips for 4K viewing */}
            <div className="text-[10px] text-gray-500 font-mono py-2 tracking-wide uppercase text-center">
              Tip: Use zoom controls above or double click to expand images up to 400% scale
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
