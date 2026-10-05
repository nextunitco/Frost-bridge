import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Users, ShieldAlert, CheckCircle2, X, Send, User, Mail, Phone, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { JobOpening } from '../types';

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Application Form States
  const [appName, setAppName] = useState('');
  const [appEmail, setAppEmail] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appNotes, setAppNotes] = useState('');

  const jobsData: JobOpening[] = [
    {
      id: 'ops_mgr',
      title: 'Operations Coordinator',
      department: 'Logistics Operations',
      location: 'Isolo, Lagos Head Office',
      type: 'Full-Time',
      description: 'Supervise daily container movement manifests, coordinate harbor dispatch drivers, and clear transit logs through our cloud tracking dashboards.',
      requirements: [
        '3+ years experience in maritime or air cargo freight operations.',
        'Knowledge of Nigeria Customs clearing documentation and port schedules.',
        'Excellent coordination and computerized logistics management system literacy.',
      ],
      image: 'https://i.postimg.cc/59qGGCZG/operations.jpg',
    },
    {
      id: 'driver_heavy',
      title: 'Heavy trailer Interstate Driver',
      department: 'Road Haulage Fleet',
      location: 'Lagos Hub / Nationwide',
      type: 'Full-Time',
      description: 'Operate long-haul containerized tractor trailers safely along key interstate trade corridors, maintaining strict schedule compliance.',
      requirements: [
        'Valid Class G professional commercial driving permit.',
        '5+ years clean record of operating multi-axle trailers over long distances.',
        'Commitment to highway security protocols and driver safety standards.',
      ],
      image: 'https://i.postimg.cc/pLNFFmdr/trailer-(1).jpg',
    },
    {
      id: 'warehouse_spec',
      title: 'Warehouse Staging Officer',
      department: 'Cold Chain & Warehousing',
      location: 'Isolo Terminal, Lagos',
      type: 'Full-Time',
      description: 'Manage cold storage refrigeration parameters, supervise pharmaceutical container stacking, and process FIFO barcode inventories.',
      requirements: [
        'Experience managing cold warehouses or pharmaceutical supplies.',
        'Proficiency with smart Warehouse Management Systems (WMS).',
        'Strict attention to cleanliness, safety audits, and storage compliance.',
      ],
      image: 'https://i.postimg.cc/5tyFCTz9/officer.jpg',
    },
    {
      id: 'client_rep',
      title: 'Customer Service Representative',
      department: 'Client Relations Dept',
      location: 'Isolo, Lagos Head Office',
      type: 'Full-Time',
      description: 'Serve as the primary liaison for high-value corporate accounts, resolving customs clearing updates and tracking milestones.',
      requirements: [
        'Superb written and spoken English communication capabilities.',
        'High empathy and immediate problem-solving skills under tight delivery slots.',
        'Experience with CRM platforms and global logistics status reporting.',
      ],
      image: 'https://i.postimg.cc/XJM7Yzk0/customer-service.jpg',
    },
    {
      id: 'freight_expert',
      title: 'International Freight Specialist',
      department: 'Global Forwarding Team',
      location: 'Isolo, Lagos Head Office',
      type: 'Full-Time',
      description: 'Negotiate carrier ocean block-space allocations, manage overseas agent networks, and coordinate intermodal shipping routes.',
      requirements: [
        'In-depth knowledge of IATA and maritime ocean transport compliance.',
        'Strong carrier network relationships and freight rate negotiation capability.',
        'Fluency in global貿易 commercial guidelines (Incoterms 2020).',
      ],
      image: 'https://i.postimg.cc/MG2hM2ND/freight-specialist.jpg',
    },
  ];

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setIsSubmitted(false);
    setAppName('');
    setAppEmail('');
    setAppPhone('');
    setAppNotes('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName || !appEmail) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setSelectedJob(null);
      setIsSubmitted(false);
    }, 2500);
  };

  return (
    <section id="careers" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Build the Future of Trade
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
            Join Frost Bridge Global Logistics
          </h2>
          <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
            Become part of Nigeria's leading corporate logistics network. We operate with world-class professional standards, extreme safety focus, and competitive compensation.
          </p>
        </div>

        {/* Careers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobsData.map((job) => (
            <div
              key={job.id}
              className="bg-brand-light p-8 rounded-3xl border border-gray-100 hover:border-brand-secondary/30 hover:shadow-xl hover:shadow-brand-secondary/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {job.image && (
                  <div className="h-44 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group/img mb-4">
                    <img
                      src={job.image}
                      alt={job.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                )}
                <span className="text-[10px] font-bold text-brand-secondary tracking-widest uppercase font-mono bg-brand-secondary/10 px-3 py-1 rounded-full inline-block">
                  {job.department}
                </span>
                <h3 className="text-lg font-bold text-brand-primary font-heading leading-snug">
                  {job.title}
                </h3>
                
                {/* Meta details */}
                <div className="flex items-center space-x-4 text-[11px] text-gray-400 font-sans">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{job.type}</span>
                  </span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed font-sans font-light">
                  {job.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleApplyClick(job)}
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs py-3 rounded-xl uppercase tracking-wider transition-colors shadow-sm"
                >
                  Apply For Role
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Callout Box at bottom */}
        <div className="mt-16 bg-brand-primary rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-brand-secondary/20 rounded-full filter blur-3xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="space-y-1 relative z-10 max-w-xl">
            <h4 className="text-lg font-bold font-heading">Don't see your specific expertise?</h4>
            <p className="text-xs text-gray-300 font-sans font-light leading-relaxed">
              We are constantly seeking outstanding customs specialists, specialized heavy drivers, and global cargo logistics agents. Share your comprehensive CV directory to our careers team.
            </p>
          </div>
          <a
            href="mailto:info@fblogistics.com.ng?subject=Spontaneous Application - FB Logistics"
            className="bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs px-6 py-4.5 rounded-xl uppercase tracking-wider transition-all duration-300 shadow-lg relative z-10 whitespace-nowrap text-center"
          >
            Submit General CV
          </a>
        </div>
      </div>

      {/* Modern Apply Application Modal Form (Agency Level) */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-primary text-white p-6 relative">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest font-mono">
                  Application Portal
                </span>
                <h3 className="text-xl font-bold font-heading mt-1">{selectedJob.title}</h3>
                <p className="text-xs text-gray-300 font-sans font-light mt-0.5">{selectedJob.department}</p>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
                {isSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-brand-success/15 text-brand-success flex items-center justify-center mx-auto animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold font-heading text-brand-primary">Application Transmitted!</h4>
                    <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed">
                      Thank you for applying. Our talent staging department will audit your credentials and contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {selectedJob.image && (
                      <div className="h-44 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative mb-4">
                        <img
                          src={selectedJob.image}
                          alt={selectedJob.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-white bg-brand-primary/85 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                          Active Dispatch Command Center
                        </div>
                      </div>
                    )}
                    {/* Brief checklist of requirements */}
                    <div className="bg-brand-light p-4 rounded-2xl border border-gray-100 space-y-2">
                      <h5 className="text-[10px] font-bold text-brand-primary uppercase tracking-wider flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-brand-secondary" />
                        <span>Core Requirements Audit:</span>
                      </h5>
                      <ul className="space-y-1">
                        {selectedJob.requirements.map((req, rIdx) => (
                          <li key={rIdx} className="text-[10.5px] text-gray-500 font-sans flex items-start space-x-2">
                            <span className="w-1 h-1 rounded-full bg-brand-accent mt-1.5 shrink-0"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={appName}
                          onChange={(e) => setAppName(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            required
                            value={appEmail}
                            onChange={(e) => setAppEmail(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Phone Number</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input
                            type="tel"
                            required
                            value={appPhone}
                            onChange={(e) => setAppPhone(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Resume Upload Area */}
                    <div>
                      <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Resume / Curriculum Vitae (CV)</label>
                      <div className="border border-dashed border-gray-200 hover:border-brand-secondary bg-brand-light p-5 rounded-xl text-center cursor-pointer transition-all">
                        <FileText className="w-7 h-7 text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-brand-primary font-bold block">Upload PDF, DOCX or TXT</span>
                        <span className="text-[10px] text-gray-400 font-sans block mt-0.5">Drag-and-drop or tap to select file (Max: 10MB)</span>
                      </div>
                    </div>

                    {/* Short Cover Notes */}
                    <div>
                      <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Short Cover Note (Optional)</label>
                      <textarea
                        value={appNotes}
                        onChange={(e) => setAppNotes(e.target.value)}
                        rows={3}
                        className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                        placeholder="Detail briefly why you are an ideal fit..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs py-4 rounded-xl uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2"
                    >
                      <span>Transmit Application</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
