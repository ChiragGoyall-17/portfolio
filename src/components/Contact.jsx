import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, Copy, Check, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [copyEmailSuccess, setCopyEmailSuccess] = useState(false);
  const [copyPhoneSuccess, setCopyPhoneSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const formEndpoint = formspreeId?.startsWith('http')
    ? formspreeId
    : `https://formspree.io/f/${formspreeId}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("chiraggoyal985@gmail.com");
    setCopyEmailSuccess(true);
    setTimeout(() => setCopyEmailSuccess(false), 2000);
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("+919667481335");
    setCopyPhoneSuccess(true);
    setTimeout(() => setCopyPhoneSuccess(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    try {
      if (!formspreeId || formspreeId === 'YOUR_FORMSPREE_ID_HERE') {
        throw new Error('Missing VITE_FORMSPREE_ID');
      }

      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact — ' + formData.name,
          message: formData.message,
          _replyto: formData.email,
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error('Formspree error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const formFields = [
    { label: 'Your Name', id: 'name', type: 'text', placeholder: 'John Doe', required: true },
    { label: 'Email Address', id: 'email', type: 'email', placeholder: 'john@example.com', required: true },
    { label: 'Subject', id: 'subject', type: 'text', placeholder: 'Collaboration Opportunities', required: false }
  ];

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute left-1/4 bottom-0 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute right-1/4 top-1/4 w-[400px] h-[400px] rounded-full bg-purple-900/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white"
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Have a project in mind, looking to collaborate, or just want to connect? Let's construct something remarkable together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Contact Information (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6 text-left">
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span>Contact Details</span>
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Reach out directly via quick click-to-copy buttons, standard calls, or drop a query using the workspace message portal. I usually reply within 24 hours.
              </p>

              {/* Info Cards */}
              <div className="space-y-4">
                
                {/* Email Address Link Card with Copy Tooltip */}
                <div className="relative group">
                  <a 
                    href="mailto:chiraggoyal985@gmail.com"
                    onClick={(e) => {
                      if (e.target.closest('.copy-btn')) e.preventDefault();
                    }}
                    className="flex items-center space-x-4 p-4 rounded-2xl border border-slate-900/80 bg-slate-900/10 hover:border-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 group"
                  >
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Address</span>
                      <span className="text-sm text-slate-300 font-semibold group-hover:text-white transition-colors truncate block">
                        chiraggoyal985@gmail.com
                      </span>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      title="Copy Email"
                      className="copy-btn p-2 rounded-lg bg-slate-950/80 border border-slate-900 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
                    >
                      {copyEmailSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </a>
                  
                  {/* Copy Alert Tooltip */}
                  <AnimatePresence>
                    {copyEmailSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: -2 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-4 -top-8 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400 font-bold shadow-lg"
                      >
                        Copied to Clipboard!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone Call Card with Copy Tooltip */}
                <div className="relative group">
                  <a 
                    href="tel:+919667481335"
                    onClick={(e) => {
                      if (e.target.closest('.copy-btn')) e.preventDefault();
                    }}
                    className="flex items-center space-x-4 p-4 rounded-2xl border border-slate-900/80 bg-slate-900/10 hover:border-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5 group"
                  >
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phone Call</span>
                      <span className="text-sm text-slate-300 font-semibold group-hover:text-white transition-colors truncate block">
                        +91 96674 81335
                      </span>
                    </div>
                    <button
                      onClick={handleCopyPhone}
                      type="button"
                      title="Copy Phone Number"
                      className="copy-btn p-2 rounded-lg bg-slate-950/80 border border-slate-900 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer shadow-md"
                    >
                      {copyPhoneSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </a>

                  {/* Copy Alert Tooltip */}
                  <AnimatePresence>
                    {copyPhoneSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: -2 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-4 -top-8 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400 font-bold shadow-lg"
                      >
                        Copied to Clipboard!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Location Card */}
                <div className="flex items-center space-x-4 p-4 rounded-2xl border border-slate-900/80 bg-slate-900/10">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Current Location</span>
                    <span className="text-sm text-slate-300 font-semibold">New Delhi, India</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Connect + Copyright Info */}
            <div className="pt-8 border-t border-slate-900/80 text-left text-xs text-slate-500 space-y-3">
              <p className="font-medium">© 2026 Chirag Goyal. All rights reserved.</p>
              <div className="flex items-center space-x-3">
                <a 
                  href="https://github.com/ChiragGoyall-17" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center space-x-1 font-semibold"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  <span>GitHub</span>
                </a>
                <span>•</span>
                <a 
                  href="https://leetcode.com/u/chirag_goyal2002/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors font-semibold"
                >
                  LeetCode
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT: Modern Glassmorphic Form Card (7 columns) */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-3xl border border-slate-900 bg-slate-900/10 backdrop-blur-md relative h-full flex flex-col justify-between shadow-2xl overflow-hidden min-h-[480px]">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  
                  // Success Celebration Screen
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-6 my-auto"
                  >
                    {/* SVG Drawing Checkmark path */}
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <svg className="w-10 h-10" viewBox="0 0 52 52">
                        <circle className="stroke-emerald-500/30" cx="26" cy="26" r="25" fill="none" strokeWidth="2.5"/>
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.65, ease: 'easeOut' }}
                          d="M14 27l8 8 16-16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-2xl font-extrabold text-white">Message Transmitted!</h4>
                      <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. Your communication has been securely sent. I will inspect the log and respond shortly.
                      </p>
                    </div>
                    
                    <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-650 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-lg shadow-sm">
                      Formspree Connection Active
                    </div>
                  </motion.div>

                ) : status === 'error' ? (

                  // Error Screen
                  <motion.div 
                    key="error"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="flex flex-col items-center justify-center text-center py-16 space-y-5 my-auto"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-3xl">
                      !
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-xl font-bold text-white">Submission Failed</h4>
                      <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                        There was an error routing your email. Please verify your variables or connect directly via phone/email link.
                      </p>
                    </div>
                  </motion.div>

                ) : (

                  // Main Interactive Form
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    className="space-y-5 text-left h-full flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Custom Animated Fields */}
                        {formFields.map((field) => (
                          <div key={field.id} className="space-y-1.5">
                            <label 
                              htmlFor={field.id} 
                              className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                                focusedField === field.id ? 'text-indigo-400' : 'text-slate-500'
                              }`}
                            >
                              {field.label} {field.required && <span className="text-rose-500">*</span>}
                            </label>
                            
                            <div className={`relative rounded-xl overflow-hidden transition-all duration-300 border ${
                              focusedField === field.id 
                                ? 'border-indigo-500 shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20' 
                                : 'border-slate-900 bg-slate-950/60'
                            }`}>
                              <input
                                type={field.type}
                                id={field.id}
                                name={field.id}
                                required={field.required}
                                disabled={status === 'loading'}
                                value={formData[field.id]}
                                onChange={handleChange}
                                onFocus={() => setFocusedField(field.id)}
                                onBlur={() => setFocusedField(null)}
                                className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-650 focus:outline-none text-sm"
                                placeholder={field.placeholder}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Textarea Field with Character Count */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label 
                            htmlFor="message" 
                            className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                              focusedField === 'message' ? 'text-indigo-400' : 'text-slate-500'
                            }`}
                          >
                            Your Message <span className="text-rose-500">*</span>
                          </label>
                          <span className="text-[10px] font-mono text-slate-500">
                            {formData.message.length}/1000 Max
                          </span>
                        </div>
                        
                        <div className={`relative rounded-xl overflow-hidden transition-all duration-300 border ${
                          focusedField === 'message' 
                            ? 'border-indigo-500 shadow-md shadow-indigo-500/5 ring-1 ring-indigo-500/20' 
                            : 'border-slate-900 bg-slate-950/60'
                        }`}>
                          <textarea
                            id="message"
                            name="message"
                            rows="4"
                            maxLength={1000}
                            required
                            disabled={status === 'loading'}
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-3 bg-transparent text-white placeholder-slate-650 focus:outline-none text-sm resize-none"
                            placeholder="Hi Chirag, let's connect and discuss collab opportunities..."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer ${
                        status === 'loading'
                          ? 'bg-slate-900 border border-slate-850 text-slate-500 shadow-none pointer-events-none'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-650/35 transform hover:-translate-y-0.5 active:translate-y-0'
                      }`}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                          <span>Transmitting Securely...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>

                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
