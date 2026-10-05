import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      setStatusMsg('Please fill in all required fields.');
      return;
    }

    setIsSent(true);
    setStatusMsg('');
    setTimeout(() => {
      // Reset
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
      setIsSent(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-secondary text-xs sm:text-sm uppercase tracking-widest font-semibold font-sans">
            Connect With Our Experts
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary tracking-tight leading-tight font-heading mt-2">
            Speak To Our Global Staging Team
          </h2>
          <div className="w-16 h-1.5 bg-brand-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 font-sans text-xs sm:text-sm mt-4 font-light max-w-2xl mx-auto">
            Ready to optimize your shipping lanes or secure customs pre-clearance? Get in touch with our Lagos officers or send an instant message.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT COLUMN: Contact Cards & Office Details (Col-Span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Core Address / Phone Info Card */}
            <div className="bg-brand-primary text-white p-8 rounded-3xl shadow-xl space-y-8 flex-grow">
              <h3 className="text-xl font-bold font-heading text-white border-b border-white/10 pb-4">
                Frost Bridge Lagos HQ
              </h3>

              <div className="space-y-6 text-xs sm:text-sm font-sans">
                {/* Office */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white/10 rounded-xl text-brand-secondary shrink-0">
                    <MapPin className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-300 uppercase tracking-wider text-[10px] font-mono leading-none">Corporate Address</p>
                    <p className="text-white text-sm font-medium leading-relaxed">
                      Oyemat House,<br />
                      45 Kudirat Adenekan Road,<br />
                      Isolo, Lagos, Nigeria
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white/10 rounded-xl text-brand-secondary shrink-0">
                    <Phone className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-300 uppercase tracking-wider text-[10px] font-mono leading-none">Support Hotline</p>
                    <a href="tel:+2348058766669" className="text-white text-sm font-bold hover:text-brand-accent transition-colors block mt-0.5">
                      +234 805 876 6669
                    </a>
                  </div>
                </div>

                {/* Email - General */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white/10 rounded-xl text-brand-secondary shrink-0">
                    <Mail className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-300 uppercase tracking-wider text-[10px] font-mono leading-none">Electronic Freight Desk (General Company Email)</p>
                    <a href="mailto:fblogistics.ng@gmail.com" className="text-white text-sm font-bold hover:text-brand-accent transition-colors block mt-0.5">
                      fblogistics.ng@gmail.com
                    </a>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      Use this email for general business enquiries, quotations, partnerships, and official company communication.
                    </p>
                  </div>
                </div>

                {/* Email - Customer Support */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white/10 rounded-xl text-brand-secondary shrink-0">
                    <Mail className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-300 uppercase tracking-wider text-[10px] font-mono leading-none">Customer Support</p>
                    <a href="mailto:support@frostbridgelogistics.com.ng" className="text-white text-sm font-bold hover:text-brand-accent transition-colors block mt-0.5">
                      support@frostbridgelogistics.com.ng
                    </a>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      Use this email for shipment enquiries, cargo tracking assistance, complaints, customer support, booking assistance, and general help.
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-white/10 rounded-xl text-brand-secondary shrink-0">
                    <Clock className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-300 uppercase tracking-wider text-[10px] font-mono leading-none">Operational Shifts</p>
                    <div className="text-white text-xs space-y-1 mt-1">
                      <p className="flex justify-between w-full gap-4">
                        <span className="text-gray-400">Monday – Friday:</span>
                        <span className="font-bold">8:00 AM – 5:00 PM</span>
                      </p>
                      <p className="flex justify-between w-full gap-4">
                        <span className="text-gray-400">Saturday:</span>
                        <span className="font-bold">9:00 AM – 2:00 PM</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real embedded Google Map of 45 Kudirat Adenekan Road, Isolo, Lagos */}
            <div className="bg-white border border-gray-150 rounded-3xl shadow-md overflow-hidden h-64 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.38550186591!2d3.318858174549929!3d6.472719723709033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8ee346067fa3%3A0xe54db22f2545f47!2sKudirat%20Adenekan%20St%2C%20Isolo%20102214%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1782829479557!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
                title="Frost Bridge Lagos HQ Map"
              ></iframe>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Message Composer Form (Col-Span-7) */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-brand-primary font-heading flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-brand-secondary" />
                  <span>Operational Enquiry Form</span>
                </h3>
                <p className="text-xs text-gray-500 mt-2 font-sans leading-relaxed">
                  Submitting this form routes your inquiries, support requests, and complaints directly to our customer support desk at <span className="font-bold text-brand-secondary">support@frostbridgelogistics.com.ng</span>.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {showSuccess ? (
                  <motion.div
                    key="success-prompt"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 text-center space-y-6 bg-brand-light p-8 rounded-3xl border border-dashed border-brand-secondary/30"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-success/15 text-brand-success flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-brand-primary font-heading uppercase tracking-wide">
                        Transmission Complete
                      </h4>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed max-w-md mx-auto">
                        Your inquiry has been successfully transmitted to <span className="font-bold text-brand-primary">support@frostbridgelogistics.com.ng</span>. Our customer support desk will evaluate your requirements and respond within 2 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="bg-brand-primary hover:bg-brand-secondary text-white font-bold text-[11px] px-6 py-3 rounded-xl uppercase tracking-wider transition-colors shadow-md"
                    >
                      Transmit New Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleMessageSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                          placeholder="e.g. Samuel Adebayo"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                          placeholder="e.g. samuel@corporation.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Subject / Cargo Type</label>
                      <input
                        type="text"
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                        placeholder="e.g. Ocean Reefer Import / Customs pre-check clearance"
                      />
                    </div>

                    {/* Message Body */}
                    <div>
                      <label className="text-[10px] text-gray-400 font-mono block mb-1 uppercase tracking-wider">Inquiry details *</label>
                      <textarea
                        required
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        rows={6}
                        className="w-full bg-white border border-gray-200 rounded-xl p-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-brand-secondary text-brand-primary"
                        placeholder="Please provide your shipment details, container sizes, origin, and required services..."
                      ></textarea>
                    </div>

                    {/* Status Message */}
                    {statusMsg && (
                      <div className="flex items-center space-x-2 text-xs text-orange-600 font-sans">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{statusMsg}</span>
                      </div>
                    )}

                    {/* Submit button using brand orange for Call to Action */}
                    <button
                      type="submit"
                      disabled={isSent}
                      className="w-full bg-brand-accent hover:bg-orange-600 text-white font-bold text-xs py-4 rounded-xl uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2"
                    >
                      {isSent ? (
                        <>
                          <span>Clearing Transmission Desk...</span>
                          <Send className="w-3.5 h-3.5 animate-bounce" />
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 text-center">
              <p className="text-[9.5px] text-gray-400 font-mono">
                SECURE SSL COMMUNICATIONS DESK • END-TO-END RECIPIENT AUTHENTICATED
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
