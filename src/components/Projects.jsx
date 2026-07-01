import { useState, lazy, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, CheckCircle2, Layout, Award } from 'lucide-react';

const DeveloperScene3D = lazy(() => import('./DeveloperScene3D'));

const projects = [
  {
    id: 1,
    title: 'QuickAI',
    tagline: 'Full-Stack AI Web Application',
    description: 'Designed and built a robust full-stack AI web app featuring image generation, object removal, resume review, title generator, and article/blog writing tools.',
    tech: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Neon DB', 'Clerk Auth', 'Render'],
    bullets: [
      'Engineered a suite of 6 core AI features including image generation, object removal, and writing assistants.',
      'Designed RESTful APIs in Express.js connected to Neon Serverless Postgres for user data and activity logs.',
      'Implemented secure auth and session states with Clerk and environment configuration for live deployment.'
    ],
    image: '/quickai.png',
    github: 'https://github.com/ChiragGoyall-17/QuickAI',
    demo: 'https://quickai-frontend-rz6e.onrender.com',
    accent: 'indigo',
    accentClass: 'text-indigo-400',
    borderClass: 'border-indigo-500/30 hover:border-indigo-500/60',
    bgGlow: 'bg-indigo-500/5',
    pillClass: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
  },
  {
    id: 2,
    title: 'Wanderlust',
    tagline: 'Property Listing & Booking Platform',
    description: 'A full-scale lodging marketplace allowing users to register, login, host property listings, and manage bookings with strict security controls.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Passport.js', 'JavaScript', 'MVC'],
    bullets: [
      'Constructed a property hosting and booking platform with secure reviews and image uploads.',
      'Utilized the Model-View-Controller (MVC) architecture to ensure modular, clean, and highly maintainable code.',
      'Deployed session-based authentication using Passport.js and hashed passwords for robust user security.'
    ],
    image: '/wanderlust.png',
    github: 'https://github.com/ChiragGoyall-17/WandurLust',
    demo: 'https://chirag-project-onp6.onrender.com/listings',
    accent: 'emerald',
    accentClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/30 hover:border-emerald-500/60',
    bgGlow: 'bg-emerald-500/5',
    pillClass: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
  }
];

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [subTab, setSubTab] = useState('overview'); // 'overview' | 'contributions'
  const cardRef = useRef(null);

  const activeProject = projects[activeIdx];
  const isIndigo = activeProject.accent === 'indigo';

  const handlePrev = () => {
    setSubTab('overview');
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setSubTab('overview');
    setActiveIdx((prev) => (prev + 1) % projects.length);
  };

  // 3D Parallax Tilt Hover Effect
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 16;
    const rotateY = (x - centerX) / 16;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow decorators */}
      <div className={`absolute right-10 bottom-1/4 w-[400px] h-[400px] rounded-full filter blur-[120px] pointer-events-none transition-all duration-700 -z-10 ${
        isIndigo ? 'bg-indigo-900/10' : 'bg-emerald-900/10'
      }`} />
      <div className={`absolute left-10 top-1/4 w-[350px] h-[350px] rounded-full filter blur-[120px] pointer-events-none transition-all duration-700 -z-10 ${
        isIndigo ? 'bg-cyan-900/5' : 'bg-teal-900/5'
      }`} />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Explore live production builds of my applications. Click through the profiles below, inspect details tabs, and view the background stack adjust dynamically.
          </p>
        </div>

        {/* 3D Core Dev Scene Component (Color synced) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Suspense fallback={<div className="h-[340px] sm:h-[420px] lg:h-[500px]" />}>
            <DeveloperScene3D accent={activeProject.accent} />
          </Suspense>
        </motion.div>

        {/* Project Selector Navigation Header */}
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-8 bg-slate-900/35 border border-slate-900/80 p-2 rounded-2xl backdrop-blur-md shadow-lg">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95 cursor-pointer shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 sm:space-x-6">
            {projects.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => {
                  setSubTab('overview');
                  setActiveIdx(idx);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                  idx === activeIdx
                    ? isIndigo
                      ? 'bg-indigo-500/10 border border-indigo-500/40 text-indigo-300 shadow-sm'
                      : 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 shadow-sm'
                    : 'border border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 transition-all active:scale-95 cursor-pointer shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Active Project Explorer Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45 }}
            className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 md:p-8 rounded-3xl border ${activeProject.borderClass} ${activeProject.bgGlow} backdrop-blur-md transition-all duration-500 shadow-2xl overflow-hidden`}
          >
            
            {/* Visual glow indicator */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[50px] opacity-10 ${
              isIndigo ? 'bg-indigo-500' : 'bg-emerald-500'
            }`} />

            {/* LEFT: 3D-Tilt Mockup Image Frame */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-950 relative shadow-xl transition-transform duration-150 ease-out cursor-pointer group"
              >
                <img
                  src={activeProject.image}
                  alt={`${activeProject.title} screenshot`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-slate-950/25 group-hover:bg-slate-950/0 transition-colors duration-300" />
                
                {/* Tech Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 opacity-90">
                  {activeProject.tech.slice(0, 3).map((t) => (
                    <span 
                      key={t}
                      className="px-2 py-0.5 rounded bg-slate-950/95 border border-slate-800 text-[10px] font-semibold text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                  {activeProject.tech.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-slate-950/95 border border-slate-800 text-[10px] font-semibold text-slate-400">
                      +{activeProject.tech.length - 3} More
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Multi-Tab Info Panel */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                {/* Title & Tagline */}
                <div className="space-y-1">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${activeProject.accentClass}`}>
                    {activeProject.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activeProject.title}
                  </h3>
                </div>

                {/* Sub-tab Navigation Header */}
                <div className="flex border-b border-slate-900">
                  <button
                    onClick={() => setSubTab('overview')}
                    className={`flex items-center space-x-2 pb-2.5 px-1 text-xs font-bold transition-all relative cursor-pointer ${
                      subTab === 'overview' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span>Overview</span>
                    {subTab === 'overview' && (
                      <motion.div
                        layoutId="activeSubTabLine"
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${isIndigo ? 'bg-indigo-500' : 'bg-emerald-500'}`}
                      />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setSubTab('contributions')}
                    className={`flex items-center space-x-2 pb-2.5 px-1 ml-6 text-xs font-bold transition-all relative cursor-pointer ${
                      subTab === 'contributions' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Contributions</span>
                    {subTab === 'contributions' && (
                      <motion.div
                        layoutId="activeSubTabLine"
                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${isIndigo ? 'bg-indigo-500' : 'bg-emerald-500'}`}
                      />
                    )}
                  </button>
                </div>

                {/* Details Tab Panels */}
                <div className="min-h-[160px]">
                  <AnimatePresence mode="wait">
                    {subTab === 'overview' ? (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                          {activeProject.description}
                        </p>
                        
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                            Built With
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProject.tech.map((t) => (
                              <span 
                                key={t}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${activeProject.pillClass}`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="contributions"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        {activeProject.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                            <CheckCircle2 className={`w-4 h-4 mr-2.5 mt-0.5 shrink-0 ${activeProject.accentClass}`} />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Link Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-900/60">
                <a 
                  href={activeProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center space-x-2 text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                  <span>Code Repository</span>
                </a>

                <a 
                  href={activeProject.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-4 py-2.5 rounded-xl text-slate-950 flex items-center space-x-2 text-xs font-bold transition-all shadow-lg active:scale-95 cursor-pointer ${
                    isIndigo 
                      ? 'bg-gradient-to-r from-blue-400 to-indigo-400 hover:from-blue-300 hover:to-indigo-300 shadow-indigo-600/10' 
                      : 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-emerald-600/10'
                  }`}
                >
                  <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  <span>Launch Live App</span>
                </a>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
