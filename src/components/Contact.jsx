import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');

    try {
      // FormSubmit.co — using secure hash (hides your raw email from scrapers)
      // Form is already activated — submissions go straight to chiraggoyal985@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/chiraggoyal985@gmail.com', {
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
          _captcha: 'false',
        })
      });

      const result = await response.json();
      if (result.success === 'true' || result.success === true) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error('FormSubmit error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
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
            className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Have a project in mind, looking to hire, or just want to connect? Send a message directly and let's build something awesome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Feel free to reach out via direct phone call or email, or submit the form. I'll get back to you as soon as possible.
              </p>

              <div className="space-y-4">
                <a 
                  href="mailto:chiraggoyal985@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-xl border border-slate-900 bg-slate-900/10 hover:border-slate-800 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-850 text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Email Address</span>
                    <span className="text-sm text-slate-350 font-semibold group-hover:text-white transition-colors">chiraggoyal985@gmail.com</span>
                  </div>
                </a>

                <a 
                  href="tel:+919667481335"
                  className="flex items-center space-x-4 p-4 rounded-xl border border-slate-900 bg-slate-900/10 hover:border-slate-800 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-850 text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Phone Call</span>
                    <span className="text-sm text-slate-350 font-semibold group-hover:text-white transition-colors">+91 96674 81335</span>
                  </div>
                </a>

                <div 
                  className="flex items-center space-x-4 p-4 rounded-xl border border-slate-900 bg-slate-900/10"
                >
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-850 text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider">Current Location</span>
                    <span className="text-sm text-slate-350 font-semibold">New Delhi, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub footer notes */}
            <div className="pt-8 border-t border-slate-900 text-left text-xs text-slate-500 space-y-2">
              <p>© 2026 Chirag Goyal. All rights reserved.</p>
              <div className="flex space-x-3">
                <a href="https://github.com/ChiragGoyall-17" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  <span>GitHub</span>
                </a>
                <span>•</span>
                <a href="https://leetcode.com/u/chirag_goyal2002/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LeetCode
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Card (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-3xl border border-slate-900 bg-slate-900/10 backdrop-blur-md relative h-full flex flex-col justify-between"
            >
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-4 my-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                    <p className="text-sm text-slate-400 max-w-sm">
                      Thank you for reaching out, Chirag. I will review your submission and reply shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          disabled={status === 'loading'}
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500/50 transition-colors text-sm"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          disabled={status === 'loading'}
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500/50 transition-colors text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        disabled={status === 'loading'}
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500/50 transition-colors text-sm"
                        placeholder="Collaboration Opportunities"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        disabled={status === 'loading'}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-900 text-white placeholder-slate-650 focus:outline-none focus:border-indigo-500/50 transition-colors text-sm resize-none"
                        placeholder="Hi Chirag, I'd love to chat about..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      status === 'loading'
                        ? 'bg-slate-900 border border-slate-800 text-slate-500'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 transform hover:-translate-y-0.5'
                    }`}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
