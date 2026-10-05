import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Globe, TrendingUp, Ship, UserCheck, ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Industries from './components/Industries';
import Process from './components/Process';
import Technology from './components/Technology';
import Sustainability from './components/Sustainability';
import TradeForex from './components/TradeForex';
import Tracking from './components/Tracking';
import Blog from './components/Blog';
import Careers from './components/Careers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PageHeader from './components/PageHeader';
import Operations from './components/Operations';
import ChemicalLogistics from './components/ChemicalLogistics';
import aboutHeroBg from './assets/images/about_network_map_1783074298228.jpg';
const servicesHeroBg = 'https://i.postimg.cc/Y0F8CFd4/services.jpg';
import industriesHeroBg from './assets/images/industries_network_globe_1783074724646.jpg';
import chemicalLogisticsBg from './assets/images/chemical_logistics_bg_1783075087797.jpg';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll height to show back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync state with URL Hash to enable standard multi-page browser behaviors (Refresh, Back/Forward, direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'about', 'services', 'chemical-logistics', 'industries', 'forex', 'tracking', 'blog', 'careers', 'contact', 'admin'];
      
      if (hash && validPages.includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection('home');
      }
      
      // Auto-scroll instantly to top on page load/transition
      window.scrollTo(0, 0);
    };

    // Run on initial load
    handleHashChange();

    // Listen to hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash to navigate to specific webpage
  const handlePageNavigation = (pageId: string) => {
    window.location.hash = pageId;
  };

  // Render webpage templates dynamically
  const renderPageContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-0"
          >
            {/* Full-bleed Premium Hero Landing Section */}
            <Hero onActionClick={handlePageNavigation} />

            {/* Strategic Value Proposition (Why Choose Us) */}
            <WhyChooseUs />

            {/* Testimonials section */}
            <Testimonials />

            {/* Premium DP World-inspired Operations & Infrastructure Showcase */}
            <Operations />

            {/* Corporate Eco Sustainability Section */}
            <Sustainability />
          </motion.div>
        );

      case 'about':
        return (
          <motion.div
            key="about-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Pioneering Seamless Global Connectivity"
              subtitle="Our Corporate Identity & Legacy"
              breadcrumbs={['About Story']}
              onHomeClick={() => handlePageNavigation('home')}
              backgroundImage={aboutHeroBg}
            />
            <About />
            <WhyChooseUs />
            <Sustainability />
          </motion.div>
        );

      case 'services':
        return (
          <motion.div
            key="services-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Sovereign Supply Chain Solutions"
              subtitle="Core Portfolios & Specialized Freight Fleet"
              breadcrumbs={['Core Portfolios']}
              onHomeClick={() => handlePageNavigation('home')}
              backgroundImage={servicesHeroBg}
            />
            <Services />
            <Process />
            <Technology />
          </motion.div>
        );

      case 'chemical-logistics':
        return (
          <motion.div
            key="chemical-logistics-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Chemical Logistics & Warehousing"
              subtitle="Safe. Compliant. Intelligent. Reliable."
              breadcrumbs={['Specialized Logistics', 'Chemicals & Polymers']}
              onHomeClick={() => handlePageNavigation('home')}
              backgroundImage={chemicalLogisticsBg}
            />
            <ChemicalLogistics />
          </motion.div>
        );

      case 'industries':
        return (
          <motion.div
            key="industries-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Sectors We Empower Globally"
              subtitle="Targeted Sector Logistics Solutions"
              breadcrumbs={['Industries Served']}
              onHomeClick={() => handlePageNavigation('home')}
              backgroundImage={industriesHeroBg}
            />
            <Industries />
            <Technology />
          </motion.div>
        );

      case 'forex':
        return (
          <motion.div
            key="forex-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Global Trade & Forex Treasury"
              subtitle="Central Bank Rate Tickers & Estimator"
              breadcrumbs={['Trade & Forex Centre']}
              onHomeClick={() => handlePageNavigation('home')}
            />
            <TradeForex />
          </motion.div>
        );

      case 'tracking':
        return (
          <motion.div
            key="tracking-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Satellite-Linked Cargo Tracking"
              subtitle="Real-Time Position Verification Desk"
              breadcrumbs={['Shipment Tracking']}
              onHomeClick={() => handlePageNavigation('home')}
            />
            <Tracking />
          </motion.div>
        );

      case 'blog':
        return (
          <motion.div
            key="blog-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Trade Insights & Market Intelligence"
              subtitle="Regulatory circulars & logistics analyses"
              breadcrumbs={['Blog Circulars']}
              onHomeClick={() => handlePageNavigation('home')}
            />
            <Blog />
          </motion.div>
        );

      case 'careers':
        return (
          <motion.div
            key="careers-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Join Our Global Staging Team"
              subtitle="Careers Portal & Dynamic Opportunities"
              breadcrumbs={['Careers Portal']}
              onHomeClick={() => handlePageNavigation('home')}
            />
            <Careers />
          </motion.div>
        );

      case 'contact':
        return (
          <motion.div
            key="contact-page"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <PageHeader
              title="Speak to Our Global Staging Team"
              subtitle="Direct Desks"
              breadcrumbs={['Connect Support']}
              onHomeClick={() => handlePageNavigation('home')}
            />
            <Contact />
          </motion.div>
        );

      case 'admin':
        return (
          <motion.div
            key="admin-dashboard-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AdminDashboard />
          </motion.div>
        );

      default:
        return (
          <div className="py-24 text-center">
            <p className="text-gray-500">Page not found.</p>
            <button onClick={() => handlePageNavigation('home')} className="mt-4 bg-brand-accent text-white px-6 py-2 rounded-lg">
              Return Home Terminal
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-brand-bg text-brand-text font-sans selection:bg-brand-secondary/30 selection:text-brand-primary min-h-screen flex flex-col justify-between">
      <div>
        {/* Sticky Premium Navbar */}
        <Navbar onNavigate={handlePageNavigation} activeSection={activeSection} />

        {/* Dynamic Multi-Webpage Content Slot with Transition Animation */}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {renderPageContent()}
          </AnimatePresence>
        </main>
      </div>

      {/* Global sitemap Footer */}
      <Footer onNavigate={handlePageNavigation} />

      {/* Premium Back to Top Floating Trigger */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-brand-accent hover:bg-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none border border-brand-accent/20 cursor-pointer"
            title="Back to Top"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
