import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Globe, Cpu, Database, Settings, Sparkles, BookOpen, RotateCcw, Move } from 'lucide-react';
import Skills3DCanvas from './Skills3DCanvas';

const skillsData = [
  {
    category: 'Languages',
    icon: Terminal,
    color: 'from-blue-500 to-cyan-400',
    borderColor: 'group-hover:border-blue-500/50',
    glowColor: '#3b82f6',
    description: 'Core programming languages used to build software systems, backend logics, scripts, and computational structures.',
    skills: [
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'Java', level: 85 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 88 }
    ]
  },
  {
    category: 'Frontend',
    icon: Globe,
    color: 'from-cyan-400 to-indigo-500',
    borderColor: 'group-hover:border-cyan-500/50',
    glowColor: '#06b6d4',
    description: 'Developing responsive, user-friendly, and pixel-perfect layouts with modern libraries, styles, and tools.',
    skills: [
      { name: 'React.js', level: 92 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 80 }
    ]
  },
  {
    category: 'Backend & Security',
    icon: Cpu,
    color: 'from-violet-500 to-purple-500',
    borderColor: 'group-hover:border-violet-500/50',
    glowColor: '#8b5cf6',
    description: 'Designing backend architecture, security rules, access controls, RESTful APIs, and MVC frameworks.',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 90 },
      { name: 'JWT Auth', level: 92 },
      { name: 'RBAC (Access Control)', level: 85 },
      { name: 'MVC Architecture', level: 88 }
    ]
  },
  {
    category: 'Databases',
    icon: Database,
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'group-hover:border-emerald-500/50',
    glowColor: '#10b981',
    description: 'Managing schemas, writing queries, and designing databases for high efficiency and scalability.',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'Mongoose ODM', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MySQL', level: 85 }
    ]
  },
  {
    category: 'Tools & Cloud',
    icon: Settings,
    color: 'from-amber-500 to-orange-500',
    borderColor: 'group-hover:border-amber-500/50',
    glowColor: '#f59e0b',
    description: 'Deployment pipelines, automated setups, authorization integrations, and hosting resources.',
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'Render & Vercel', level: 88 },
      { name: 'Clerk Auth', level: 85 },
      { name: 'VS Code & CLI Tools', level: 95 }
    ]
  },
  {
    category: 'AI & ML Integrations',
    icon: Sparkles,
    color: 'from-pink-500 to-rose-500',
    borderColor: 'group-hover:border-pink-500/50',
    glowColor: '#ec4899',
    description: 'Developing applications integrated with AI, orchestrating prompt models, and implementing AI API pipelines.',
    skills: [
      { name: 'Claude AI', level: 90 },
      { name: 'ChatGPT APIs', level: 88 },
      { name: 'Prompt Engineering', level: 92 },
      { name: 'AI API Integration', level: 85 }
    ]
  },
  {
    category: 'Core CS Subjects',
    icon: BookOpen,
    color: 'from-red-500 to-purple-500',
    borderColor: 'group-hover:border-red-500/50',
    glowColor: '#ef4444',
    description: 'Foundational computer science principles essential for writing high-performance, robust, and clean systems.',
    skills: [
      { name: 'Data Structures & Algorithms', level: 85 },
      { name: 'OOP Concepts (Java)', level: 90 },
      { name: 'DBMS Concepts', level: 88 },
      { name: 'Operating Systems & Networks', level: 82 }
    ]
  }
];

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState(1); // Default to Frontend (index 1)
  const [resetKey, setResetKey] = useState(0); // Trigger to reload canvas position

  const handleResetCamera = () => {
    setResetKey(prev => prev + 1);
  };

  const activeCategoryData = skillsData[activeIdx];
  const ActiveIcon = activeCategoryData.icon;

  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow decorators */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none z-0" />

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
            Technical <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            Explore my interactive skills cloud. Click and drag the 3D space to rotate the constellation, and click nodes to view depth and proficiency metrics.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: 3D Constellation Canvas Area */}
          <div className="lg:col-span-7 h-[420px] sm:h-[480px] lg:h-[600px] relative rounded-2xl overflow-hidden border border-slate-900 bg-slate-950/40 backdrop-blur-md shadow-2xl flex flex-col justify-between p-4 group">
            
            {/* 3D WebGL Canvas Component */}
            <div className="absolute inset-0 z-0">
              <Skills3DCanvas
                key={resetKey}
                skillsData={skillsData}
                activeIdx={activeIdx}
                setActiveIdx={setActiveIdx}
              />
            </div>

            {/* Top Overlay: Interaction Status Panel */}
            <div className="relative z-10 flex items-center justify-between pointer-events-none">
              <div className="flex items-center space-x-2 bg-slate-950/80 border border-slate-800/80 backdrop-blur px-3 py-1.5 rounded-xl shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-300">
                  3D Constellation Active
                </span>
              </div>
              
              <div className="flex items-center space-x-1.5 bg-slate-950/85 border border-slate-800/85 backdrop-blur px-3 py-1.5 rounded-xl shadow-lg text-[10px] sm:text-xs font-mono text-slate-400">
                <Move className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Drag to Rotate • Click to Inspect</span>
              </div>
            </div>

            {/* Bottom Overlay: Reset controls */}
            <div className="relative z-10 flex justify-end items-center mt-auto">
              <button
                onClick={handleResetCamera}
                title="Reset Camera View"
                className="flex items-center justify-center p-2 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur text-slate-400 hover:text-white hover:border-slate-700 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT: Dashboard Panel & Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            {/* Grid of category tabs for quick selector */}
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2">
              {skillsData.map((item, idx) => {
                const Icon = item.icon;
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`flex items-center space-x-2 px-3 py-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer text-xs font-semibold ${
                      isActive
                        ? `bg-indigo-500/10 border-indigo-500/60 text-indigo-300 shadow-md shadow-indigo-500/5`
                        : 'bg-slate-900/40 border-slate-900/60 hover:bg-slate-900/70 hover:border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="truncate">{item.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Category detailed Info Card */}
            <div className="flex-1 rounded-2xl border border-slate-900 bg-slate-900/10 backdrop-blur-md p-6 flex flex-col justify-between min-h-[300px] shadow-xl relative overflow-hidden group">
              {/* Category indicator line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${activeCategoryData.color}`} />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Category Header */}
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${activeCategoryData.color} text-slate-950 font-bold shadow-lg shadow-indigo-500/10`}>
                      <ActiveIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {activeCategoryData.category}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                        Skill Group
                      </span>
                    </div>
                  </div>

                  {/* Category Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {activeCategoryData.description}
                  </p>

                  {/* Skills metrics lists */}
                  <div className="space-y-4 pt-2">
                    {activeCategoryData.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-200">{skill.name}</span>
                          <span className="font-mono font-medium text-slate-400">{skill.level}%</span>
                        </div>
                        {/* Custom Animated Progress Bar */}
                        <div className="h-2 w-full rounded-full bg-slate-950 border border-slate-900 overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: sIdx * 0.05 }}
                            className={`h-full rounded-full bg-gradient-to-r ${activeCategoryData.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative base footer */}
              <div className="border-t border-slate-900/60 pt-4 mt-6 flex items-center justify-between text-[10px] text-slate-500">
                <span>Interactive Hub</span>
                <span className="font-mono uppercase text-indigo-500/70">Potfolio Dashboard v1.0</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

