import React, { useState } from 'react';
import { PhoneCall, Map, FileText, Compass, Eye, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Consultation',
      subtitle: 'Requirement Analysis',
      icon: PhoneCall,
      description: 'We analyze your cargo specifications, weight factors, urgency, and temperature constraints to match you with optimal freight routes and appropriate tariff structures.',
      details: [
        'Understand origin/destination ports',
        'Analyze special cargo requirements (reefers, dangerous goods)',
        'Provide comprehensive initial cost estimation breakdowns',
      ],
    },
    {
      title: 'Planning',
      subtitle: 'Multimodal Route Optimization',
      icon: Map,
      description: 'Our digital route simulators select the fastest oceanic pathways, air carriers, and interstate land roads to coordinate bulk transfers without delay.',
      details: [
        'Assess transit times and carrier space options',
        'Configure warehouse staging checkpoints',
        'Build contingency transport pathways for unexpected events',
      ],
    },
    {
      title: 'Documentation',
      subtitle: 'Regulatory Compliance & Custom Filings',
      icon: FileText,
      description: 'Our professional customs brokers manage the tedious compliance filings (Form M, PAAR, bills of lading, sanitary declarations) for instant clearing.',
      details: [
        'Secure regulatory endorsements (SON, NAFDAC, Customs)',
        'Compile pre-clearing tax and custom classifications',
        'Draft final sea/air transport manifests and export permits',
      ],
    },
    {
      title: 'Transportation',
      subtitle: 'Secure Multi-Fleet Loading & Dispatch',
      icon: Compass,
      description: 'Your cargo is securely packed, containerized, and dispatched under strict oversight via elite air, marine, or secure highway transit fleets.',
      details: [
        'Verify container seals and transport security factors',
        'Perform multi-point structural loading inspections',
        'Establish security support systems for valuable cross-country lanes',
      ],
    },
    {
      title: 'Tracking',
      subtitle: 'Live Telemetry & Status Monitoring',
      icon: Eye,
      description: 'Monitor cargo progress globally. Clients receive instantaneous access to GPS telemetry, maritime position updates, and regional status logs.',
      details: [
        'Access 24/7 client telemetry dashboards',
        'Configure automatic milestone alerts (SLA checking)',
        'Receive proactive status reports regarding maritime/road speeds',
      ],
    },
    {
      title: 'Delivery',
      subtitle: 'Final Handover & Verification',
      icon: CheckCircle2,
      description: 'Your cargo is delivered directly to your commercial plant, retail outlet, or warehouse terminal with transparent Proof of Delivery (POD) scanning.',
      details: [
        'Conduct full cargo unloading checks',
        'Verify structural container status upon handover',
        'Scan digital Proof of Delivery documents for billing resolution',
      ],
    },
  ];

  return (
    <section className="py-24 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Operational Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
            The Frost Bridge Shipping Journey
          </h2>
          <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
            From initial consultation to final delivery handover, we combine technological tracking with rigid physical checks to guarantee supply chain integrity.
          </p>
        </div>

        {/* Dynamic Timeline Steps Horizontal Selector */}
        <div className="relative mb-12">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-[32px] left-[60px] right-[60px] h-1 bg-gray-200 hidden lg:block z-0">
            <div
              className="h-full bg-brand-accent transition-all duration-500"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {steps.map((st, idx) => {
              const IconComp = st.icon;
              const isSelected = activeStep === idx;
              const isPassed = idx < activeStep;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="flex flex-col items-center focus:outline-none group p-3 rounded-2xl transition-all"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-brand-accent border-brand-accent text-white scale-110'
                        : isPassed
                        ? 'bg-brand-primary border-brand-primary text-white'
                        : 'bg-white border-gray-200 text-gray-400 hover:border-brand-secondary'
                    }`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-brand-primary font-heading mt-3 text-center transition-colors">
                    {idx + 1}. {st.title}
                  </span>
                  <span className="text-[9px] text-gray-400 font-sans text-center truncate w-full mt-0.5">
                    {st.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed active step card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Step Graphic (Col-Span-4) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-brand-light rounded-2xl relative overflow-hidden text-center min-h-[260px]">
            {/* Massive step number */}
            <span className="text-8xl font-extrabold text-brand-primary/5 font-heading absolute top-2 right-4 select-none">
              0{activeStep + 1}
            </span>
            
            <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-sm mb-4 relative z-10">
              {React.createElement(steps[activeStep].icon, { className: 'w-10 h-10' })}
            </div>
            <h3 className="text-2xl font-black text-brand-primary font-heading relative z-10">
              {steps[activeStep].title}
            </h3>
            <p className="text-xs text-brand-secondary font-mono uppercase tracking-widest mt-1 relative z-10">
              {steps[activeStep].subtitle}
            </p>
          </div>

          {/* Step details (Col-Span-8) */}
          <div className="lg:col-span-8 space-y-6">
            <p className="text-base text-gray-600 font-sans font-light leading-relaxed">
              {steps[activeStep].description}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                Strategic Benchmarks & Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {steps[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start space-x-2.5 text-xs text-gray-600 font-sans">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-secondary shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Step Suggestion Button */}
            <div className="pt-4 flex justify-between items-center">
              <span className="text-[10px] text-gray-400 font-mono">
                Stage {activeStep + 1} of 6 in our standard protocol
              </span>
              {activeStep < 5 && (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-brand-accent hover:text-orange-600 uppercase tracking-wider transition-colors"
                >
                  <span>Observe next phase</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
