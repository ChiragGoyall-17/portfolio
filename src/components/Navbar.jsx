import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Code, Briefcase, FolderGit2, GraduationCap, Mail } from 'lucide-react';

const navItems = [
  { label: 'Home', id: 'home', icon: Terminal },
  { label: 'Skills', id: 'skills', icon: Code },
  { label: 'Experience', id: 'experience', icon: Briefcase },
  { label: 'Projects', id: 'projects', icon: FolderGit2 },
  { label: 'Coding', id: 'coding', icon: Code },
  { label: 'Education', id: 'education', icon: GraduationCap },
  { label: 'Contact', id: 'contact', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const scrollPosition = window.scrollY + 180;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 transition-all duration-300">
      {/* Floating Pill Container */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className={`max-w-5xl mx-auto rounded-2xl transition-all duration-500 border ${
          scrolled 
            ? 'glassmorphism shadow-xl shadow-indigo-950/15 py-2.5 px-6 border-slate-800/80' 
            : 'bg-transparent py-4 px-4 border-transparent'
        }`}
      >
        <div className="flex justify-between items-center">
          
          {/* Logo with dynamic hover animation */}
          <button 
            onClick={() => scrollTo('home')}
            className="group flex items-center space-x-2.5 text-lg font-extrabold tracking-tight cursor-pointer"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-650 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20"
            >
              CG
            </motion.div>
            <span className="text-white group-hover:text-indigo-400 transition-colors hidden sm:inline-block">
              Chirag Goyal
            </span>
          </button>

          {/* Desktop Nav Items with Framer Motion sliding highlight */}
          <div className="hidden md:flex items-center space-x-1 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer select-none ${
                    isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-xl -z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Direct Shortcut Action (e.g. GitHub & LeetCode quick button) */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="https://github.com/ChiragGoyall-17" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all hover:scale-105"
              title="GitHub Quick Connect"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
            
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('contact');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 cursor-pointer"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 cursor-pointer focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl border border-slate-800/80 bg-slate-950/95 py-4 px-4 shadow-2xl backdrop-blur-xl z-50"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
