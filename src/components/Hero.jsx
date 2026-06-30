import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Terminal, FileCode, ChevronRight, Play, Sparkles } from 'lucide-react';

const roles = [
  'Full-Stack Developer',
  'MERN / PERN Stack Expert',
  'DSA (Java) Specialist',
  'AI Integration Engineer'
];

const terminalFiles = {
  'info.json': `{
  "name": "Chirag Goyal",
  "role": "Software Developer",
  "location": "New Delhi, India",
  "availability": "Open to Opportunities",
  "interests": ["Scalable APIs", "Clean Architecture", "UI/UX"]
}`,
  'skills.js': `const technicalSkills = {
  languages: ['JavaScript', 'Java', 'HTML5', 'CSS3'],
  frontend: ['React.js', 'Bootstrap', 'Responsive Design'],
  backend: ['Node.js', 'Express.js', 'JWT', 'RBAC', 'MVC'],
  databases: ['MongoDB', 'PostgreSQL', 'Neon', 'MySQL'],
  aiTools: ['Claude AI', 'ChatGPT APIs', 'Prompt Eng.']
};`,
  'experience.md': `# NCOG Limited (Freelance)
- Built 4+ new features for live web applications.
- Optimized database queries to speed up slow API calls.
- Integrated session-based auth and JWT/RBAC role structures.
- Tested endpoints via Postman before production delivery.`
};

export default function Hero() {
  const [roleText, setRoleText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Terminal active file state
  const [activeFile, setActiveFile] = useState('info.json');
  const [terminalContent, setTerminalContent] = useState('');
  const [isTerminalTyping, setIsTerminalTyping] = useState(false);

  // Typing effect for the Hero roles subtitle
  useEffect(() => {
    let timer;
    const currentFullRole = roles[roleIdx];

    if (isDeleting) {
      // Deleting characters
      timer = setTimeout(() => {
        setRoleText((prev) => prev.slice(0, -1));
        setTypingSpeed(50);
      }, typingSpeed);
    } else {
      // Adding characters
      timer = setTimeout(() => {
        setRoleText((prev) => currentFullRole.slice(0, prev.length + 1));
        setTypingSpeed(120);
      }, typingSpeed);
    }

    // Handle role switches
    if (!isDeleting && roleText === currentFullRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before starting delete
    } else if (isDeleting && roleText === '') {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
      setTypingSpeed(150);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIdx, typingSpeed]);

  // Typing effect for the Terminal Simulator content
  useEffect(() => {
    setIsTerminalTyping(true);
    setTerminalContent('');
    let idx = 0;
    const fullText = terminalFiles[activeFile];

    const interval = setInterval(() => {
      if (idx < fullText.length) {
        setTerminalContent((prev) => prev + fullText.charAt(idx));
        idx++;
      } else {
        clearInterval(interval);
        setIsTerminalTyping(false);
      }
    }, 8); // Fast typing speed for code snippet

    return () => clearInterval(interval);
  }, [activeFile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const leetcodeIcon = (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a1.375 1.375 0 0 0 0 1.945l1.9 1.9a1.375 1.375 0 0 0 1.945 0l9.777-9.777a1.375 1.375 0 0 0 0-1.945l-1.9-1.9A1.374 1.374 0 0 0 13.483 0zM22.613 6.943a1.375 1.375 0 0 0-1.945 0l-1.9 1.9a1.375 1.375 0 0 0 0 1.945l1.9 1.9a1.375 1.375 0 0 0 1.945 0l1.9-1.9a1.375 1.375 0 0 0 0-1.945l-1.9-1.9z" />
    </svg>
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-950"
    >
      {/* Background Animated Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl animate-pulse-slow" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-slate-900 pointer-events-none" />

      {/* Radial overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950 pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto px-4 md:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Panel: Bio Info (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Tagline Pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs md:text-sm font-semibold tracking-wide uppercase"
            >
              <Terminal className="w-4 h-4" />
              <span>Open to Opportunities</span>
            </motion.div>

            {/* Name */}
            <div className="space-y-3">
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none"
              >
                Chirag <span className="text-gradient">Goyal</span>
              </motion.h1>

              {/* Dynamic typing role */}
              <motion.div
                variants={itemVariants}
                className="h-8 sm:h-10 text-xl sm:text-2xl font-bold text-slate-350 flex items-center"
              >
                <span>I am a&nbsp;</span>
                <span className="text-indigo-400 font-mono">
                  {roleText}
                  <span className="animate-pulse">|</span>
                </span>
              </motion.div>
            </div>

            {/* Brief Bio text */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed"
            >
              B.Tech in Computer Science graduate specializing in building premium full-stack applications with high reliability. Strong foundation in Java Data Structures & Algorithms.
            </motion.p>

            {/* Location & Info */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 text-slate-500 text-sm"
            >
              <MapPin className="w-4 h-4 text-indigo-500" />
              <span>New Delhi, India (Graduation: 2025)</span>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 py-2"
            >
              <a
                href="https://github.com/ChiragGoyall-17"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 text-slate-400 transition-all duration-300 hover:shadow-indigo-500/10 hover:shadow-lg"
                title="GitHub Profile"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>

              <a
                href="https://leetcode.com/u/chirag_goyal2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 text-slate-400 transition-all duration-300 hover:shadow-indigo-500/10 hover:shadow-lg"
                title="LeetCode Profile"
              >
                {leetcodeIcon}
              </a>

              <a
                href="mailto:chiraggoyal985@gmail.com"
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 text-slate-400 transition-all duration-300 hover:shadow-indigo-500/10 hover:shadow-lg"
                title="Email Chirag"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="tel:+919667481335"
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 text-slate-400 transition-all duration-300 hover:shadow-indigo-500/10 hover:shadow-lg"
                title="Call Chirag"
              >
                <Phone className="w-5 h-5" />
              </a>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 pt-4"
            >
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-semibold flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                <span>Contact Details</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Right Panel: Interactive Terminal Simulator (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-5 w-full bg-[#070b14]/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden shadow-indigo-500/5 hover:border-slate-750 transition-all duration-300"
          >
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-900/60 select-none">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-mono">
                <Terminal className="w-3 h-3 text-indigo-400" />
                <span>chiraggoyal@macbook:~</span>
              </div>
              <div className="w-12" /> {/* alignment spacer */}
            </div>

            {/* File explorer / Tabs Selector */}
            <div className="flex bg-slate-950/40 border-b border-slate-900 select-none font-mono text-xs overflow-x-auto scrollbar-none">
              {Object.keys(terminalFiles).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => !isTerminalTyping && setActiveFile(fileName)}
                  disabled={isTerminalTyping}
                  className={`flex items-center space-x-2 px-4 py-2 border-r border-slate-900/60 transition-colors cursor-pointer ${activeFile === fileName
                      ? 'bg-slate-900/60 text-indigo-400 border-t-2 border-t-indigo-500 font-semibold'
                      : 'text-slate-500 hover:text-slate-350 bg-slate-950/20'
                    }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>{fileName}</span>
                </button>
              ))}
            </div>

            {/* Code Output Area */}
            <div className="p-5 font-mono text-[11px] sm:text-xs text-left h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              <div className="flex items-center space-x-2 text-slate-500 mb-3 select-none">
                <ChevronRight className="w-3 h-3 text-emerald-400" />
                <span>cat {activeFile}</span>
                {isTerminalTyping && <Sparkles className="w-3 h-3 text-indigo-400 animate-spin" />}
              </div>

              <pre className="text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                <code>
                  {terminalContent}
                  <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-indigo-500 animate-pulse" />
                </code>
              </pre>
            </div>

            {/* Terminal Actions Bottom Panel */}
            <div className="px-4 py-2.5 bg-slate-950/40 border-t border-slate-900/60 flex items-center justify-between text-[10px] text-slate-500 font-mono select-none">
              <span>Interactive Resume Simulator</span>
              <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                <Play className="w-2.5 h-2.5" />
                <span>status: ready</span>
              </span>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
