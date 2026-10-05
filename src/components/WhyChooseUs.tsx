import React, { useState } from 'react';
import { 
  MapPin, 
  Globe, 
  Zap, 
  Compass, 
  Users, 
  ShieldCheck, 
  DollarSign, 
  Headset, 
  ArrowRight,
  X,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PointDetail {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  description: string;
  detailedInfo: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
}

export default function WhyChooseUs() {
  const [selectedPoint, setSelectedPoint] = useState<PointDetail | null>(null);

  const points: PointDetail[] = [
    {
      id: 'strategic-location',
      icon: MapPin,
      title: 'Strategic Location',
      subtitle: 'Lagos Corridor & Port Access Gateways',
      description: "We are well positioned to serve Nigeria's major ports, airports and commercial centers.",
      detailedInfo: "Frost Bridge is strategically anchored with modern logistics staging warehouses in Isolo and Apapa, Lagos. This offers immediate highway access to the major maritime ports of Apapa and Tin Can Island, as well as rapid transit corridors to Murtala Muhammed International Airport (MMIA).",
      bullets: [
        "Under 45 minutes dispatch time to major industrial zones in Isolo, Ikeja, and mainland depots.",
        "Pre-staged customs processing booths directly adjacent to harbor terminal gates.",
        "Bonded terminal partnerships for off-dock container release and temporary storage."
      ],
      metrics: [
        { label: "Transit to Port", value: "12 km" },
        { label: "Airport Access", value: "15 mins" },
        { label: "Staging Capacity", value: "5,000+ sqm" }
      ],
      tags: ['Lagos Corridor', 'Port Access', 'Isolo Hub', 'Apapa']
    },
    {
      id: 'global-network',
      icon: Globe,
      title: 'Global Network',
      subtitle: 'Direct Far East & European Alliances',
      description: 'Trusted international partners across major trade routes.',
      detailedInfo: "We connect Nigerian businesses with premier international manufacturing hubs. Our verified global partner network spans China (Guangzhou, Ningbo, Shanghai), the United Kingdom, Western Europe, and North America, ensuring unbroken door-to-door transit integrity.",
      bullets: [
        "Secured block space agreements (BSAs) with top-tier ocean carriers and international air fleets.",
        "Strategic consolidating warehouses at key origins to merge LCL cargo and optimize costs.",
        "End-to-end multi-modal tracking with direct local agents at every major port of exit."
      ],
      metrics: [
        { label: "Partner Origins", value: "45+ Countries" },
        { label: "Weekly Sailings", value: "12 Lanes" },
        { label: "Consolidations", value: "150+/mo" }
      ],
      tags: ['Global Trade', 'LCL Consolidation', 'Sea Alliances', 'Air BSAs']
    },
    {
      id: 'fast-turnaround',
      icon: Zap,
      title: 'Fast Turnaround',
      subtitle: 'Pre-Arrival Clearing & Automated Routing',
      description: 'Efficient cargo movement with reduced delays.',
      detailedInfo: "Time is money in logistics. We cut through bureaucratic administrative lag by initiating customs PAAR (Pre-Arrival Assessment Report) and Form M filings at origin, enabling container clearance within 48 hours of vessel berthing.",
      bullets: [
        "Advanced documentation pre-assessment prevents costly terminal storage penalties.",
        "Express green-channel clearance for compliant corporate manifests.",
        "Dedicated truck fleets on standby for immediate port evacuation upon release."
      ],
      metrics: [
        { label: "Avg. Clearing", value: "48 Hours" },
        { label: "Demurrage Rate", value: "0.2% Peak" },
        { label: "Evacuation Time", value: "<6 Hours" }
      ],
      tags: ['Pre-Clearance', 'PAAR Process', 'Port Evacuation', 'Agile Logistics']
    },
    {
      id: 'real-time-tracking',
      icon: Compass,
      title: 'Real-Time Tracking',
      subtitle: 'High-Fidelity Telemetry & Milestones',
      description: 'Shipment visibility from origin to destination.',
      detailedInfo: "Complete cargo transparency at your fingertips. Our centralized container tracking dashboard provides up-to-the-minute updates on vessel positioning, sea-state forecasts, customs clearance stages, and last-mile container transport status.",
      bullets: [
        "Automated SMS and email milestone notifications for every cargo state change.",
        "Temperature-logged reefer sensors for cold-chain pharmaceuticals and foods.",
        "Real-time coordinate mapping for active inland truck transit."
      ],
      metrics: [
        { label: "SLA Compliance", value: "99.4%" },
        { label: "Reefer Monitoring", value: "24/7 Live" },
        { label: "Update Interval", value: "5 Mins" }
      ],
      tags: ['IoT Sensors', 'Live Tracking', 'Cargo Visibility', 'Milestones']
    },
    {
      id: 'experienced-team',
      icon: Users,
      title: 'Experienced Team',
      subtitle: 'Certified Maritime & Customs Specialists',
      description: 'Industry professionals committed to operational excellence.',
      detailedInfo: "Logistics is run by people. Our teams consist of seasoned maritime legal advisors, NAFDAC regulatory specialists, certified customs agents, and highly trained warehouse safety professionals with decades of hands-on West African experience.",
      bullets: [
        "In-house compliance officers specialized in tariff optimization and HS Code assignments.",
        "Expert reefer technicians monitoring cold storage parameters and FIFO rotations.",
        "Dedicated port dispatchers with active access to terminal operations yards."
      ],
      metrics: [
        { label: "Specialists", value: "120+ Staff" },
        { label: "Avg. Experience", value: "12+ Years" },
        { label: "Regulatory Audits", value: "100% Pass" }
      ],
      tags: ['In-House Compliance', 'HS Code Experts', 'Reefer Engineers', 'Port Dispatch']
    },
    {
      id: 'safe-secure',
      icon: ShieldCheck,
      title: 'Safe & Secure',
      subtitle: 'Comprehensive Security & Asset Protection',
      description: 'Cargo protection through best practice handling procedures.',
      detailedInfo: "Your cargo's physical integrity is protected at every turn. From double-sealed high-security container bolts to active GPS geo-fenced inland convoys and fully insured transit liability, we treat security as a non-negotiable standard.",
      bullets: [
        "Full door-to-door transit marine insurance coverage with premier underwriters.",
        "Armed escort support for priority high-value cargo transport across inland networks.",
        "24/7 CCTV-monitored secure staging yards and access-controlled warehouses."
      ],
      metrics: [
        { label: "Incidents Rate", value: "0.01% Historic" },
        { label: "Insurance Cover", value: "100% Comprehensive" },
        { label: "CCTV Coverage", value: "100% Yard" }
      ],
      tags: ['Marine Insurance', 'Inland Escort', 'Geo-Fencing', 'Secure Yards']
    },
    {
      id: 'competitive-pricing',
      icon: DollarSign,
      title: 'Competitive Pricing',
      subtitle: 'Value Optimization & Transparent Costing',
      description: 'Transparent pricing with exceptional value.',
      detailedInfo: "We believe in honest, predictable logistics. We provide fully unbundled, upfront quotes without hidden local administrative surcharges, terminal transfer tricks, or surprise demurrage fees, ensuring your finance team can plan with confidence.",
      bullets: [
        "All-inclusive, single-invoice pricing options for end-to-end clearing and delivery.",
        "Volume-tier container discount programs for consistent manufacturing importers.",
        "No hidden administrative, local agency, or processing surcharges."
      ],
      metrics: [
        { label: "Pricing Accuracy", value: "99.8%" },
        { label: "Cost Reduction", value: "Avg. 15%" },
        { label: "Hidden Fees", value: "Zero" }
      ],
      tags: ['Transparent Quotes', 'Volume Discounts', 'Unbundled Rates', 'No Hidden Fees']
    },
    {
      id: 'dedicated-support',
      icon: Headset,
      title: 'Dedicated Customer Support',
      subtitle: 'Personal Account Desk & Rapid Response',
      description: 'Professional support throughout every shipment.',
      detailedInfo: "No automated phone trees or generic tickets. Every Frost Bridge corporate client is assigned a dedicated senior account manager who oversees your entire import-export portfolio and is accessible 24/7 via phone and email.",
      bullets: [
        "Single point of contact for rapid booking, rate checks, and clearance inquiries.",
        "Proactive alerts on global shipping disruptions, terminal labor actions, and storm reroutes.",
        "Daily consolidated manifest reports sent directly to your treasury or operations email."
      ],
      metrics: [
        { label: "Response SLA", value: "<15 Mins" },
        { label: "Client Retention", value: "98.7%" },
        { label: "Satisfaction Score", value: "4.9/5.0" }
      ],
      tags: ['Personal Account Desk', '24/7 Hotline', 'Proactive Alerts', 'Consolidated Reporting']
    }
  ];

  return (
    <section className="py-24 bg-white ui-dot-grid relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Why Frost Bridge?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
            Logistics Built Around Your Business
          </h2>
          <div className="w-16 h-1 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you're importing industrial equipment, exporting agricultural produce, transporting pharmaceuticals, or managing retail distribution, Frost Bridge delivers customized logistics solutions with speed, reliability, and complete transparency.
          </p>
        </div>

        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {points.map((pt, idx) => {
            const IconComponent = pt.icon;
            return (
              <div
                key={idx}
                onClick={() => setSelectedPoint(pt)}
                className="group relative bg-brand-light p-8 rounded-3xl border border-gray-100 hover:bg-brand-primary transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/10 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                {/* Visual Accent Hover Bar */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-brand-accent rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-white/10 flex items-center justify-center text-brand-secondary group-hover:text-brand-accent shadow-sm transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-primary group-hover:text-white font-heading transition-colors duration-200">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-gray-500 group-hover:text-gray-300 font-sans leading-relaxed transition-colors duration-200">
                    {pt.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-xs font-semibold text-brand-secondary group-hover:text-white transition-colors">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-1">Operational edge</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operational Edge Details Lightbox Modal */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-brand-primary/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col shadow-2xl relative border border-gray-150 overflow-hidden"
            >
              
              {/* Header Visual Stripe */}
              <div className="h-1.5 bg-brand-accent w-full shrink-0"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedPoint(null)}
                className="absolute top-4 right-4 bg-gray-50 hover:bg-brand-accent hover:text-white text-brand-primary p-2 rounded-full transition-all duration-200 z-10 shadow-sm"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-5">
                {/* Icon & Titles */}
                <div className="flex items-start space-x-3.5 pr-8">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                    {React.createElement(selectedPoint.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
                  </div>
                  <div>
                    <span className="text-[9px] text-brand-secondary font-mono font-bold uppercase tracking-wider bg-brand-secondary/5 px-2 py-0.5 rounded-md">
                      Operational Edge
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-brand-primary font-heading mt-1 leading-tight">
                      {selectedPoint.title}
                    </h2>
                    <p className="text-[11px] text-gray-400 font-sans mt-0.5 font-medium leading-none">
                      {selectedPoint.subtitle}
                    </p>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="bg-brand-light/50 border border-brand-primary/5 rounded-xl p-4 text-xs text-gray-600 font-sans leading-relaxed">
                  {selectedPoint.detailedInfo}
                </div>

                {/* Key Bullet Points */}
                <div className="space-y-2">
                  <h4 className="text-[10px] text-brand-primary font-mono uppercase tracking-wider font-bold">
                    Key Features & Protocols
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedPoint.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start space-x-2 text-xs text-gray-650 leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Operational Metrics */}
                <div className="space-y-2">
                  <h4 className="text-[10px] text-brand-primary font-mono uppercase tracking-wider font-bold">
                    Performance Indicators
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedPoint.metrics.map((metric, midx) => (
                      <div key={midx} className="bg-brand-light p-2.5 rounded-lg border border-gray-100 text-center">
                        <span className="block text-sm sm:text-base font-black text-brand-secondary font-heading leading-none">
                          {metric.value}
                        </span>
                        <span className="block text-[8px] sm:text-[9px] text-gray-400 font-sans mt-0.5 leading-tight font-medium">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Footer */}
                <div className="border-t border-gray-100 pt-4 flex flex-wrap gap-1.5 items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {selectedPoint.tags.map((tag) => (
                      <span key={tag} className="text-[8px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSelectedPoint(null)}
                    className="text-[10px] font-bold text-brand-secondary hover:text-brand-primary transition-colors font-mono uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
