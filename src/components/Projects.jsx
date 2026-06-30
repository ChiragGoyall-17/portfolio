import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'QuickAI',
    tagline: 'Full-Stack AI Web Application',
    description: 'Designed and built a robust full-stack AI web app featuring image generation, object removal, resume review, title generator, and article/blog writing tools.',
    tech: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'Neon DB', 'Clerk Auth', 'Render'],
    bullets: [
      'Engineered a suite of 6 core AI features including image generation, object removal, and writing assistants.',
      'Designed Restful APIs in Express.js connected to Neon Serverless Postgres for user data and activity logs.',
      'Implemented secure auth and session states with Clerk and environment configuration for live deployment.'
    ],
    image: '/quickai.png',
    github: 'https://github.com/ChiragGoyall-17/QuickAI',
    demo: 'https://quickai-frontend-rz6e.onrender.com',
    accent: 'indigo'
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
    accent: 'emerald'
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 60, damping: 15 }
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute right-10 bottom-1/4 w-96 h-96 rounded-full bg-cyan-600/5 blur-3xl pointer-events-none" />

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
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Full-stack web applications deployed to production, demonstrating clean design, security measures, and database management.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {projects.map((project, idx) => {
            const isIndigo = project.accent === 'indigo';
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-3xl border border-slate-900 bg-slate-900/10 backdrop-blur-md hover:border-slate-800/80 transition-all duration-500"
              >
                {/* Media Container */}
                <div className="lg:col-span-6 w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-950 relative group">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300" />
                  {/* Corner Accent Glow */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-xl opacity-30 ${isIndigo ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                </div>

                {/* Content Container (cols 6-12 or 7-12) */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="space-y-1.5">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isIndigo ? 'text-indigo-400' : 'text-emerald-400'}`}>
                      {project.tagline}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm md:text-base text-slate-350 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span 
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-900 border border-slate-850 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-2.5">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start text-xs md:text-sm text-slate-400">
                        <span className={`mr-2 mt-1.5 w-1.5 h-1.5 rounded-full ${isIndigo ? 'bg-indigo-500' : 'bg-emerald-500'} shrink-0`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-2">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-850 text-slate-300 hover:text-white hover:border-slate-700 flex items-center space-x-2 text-xs font-bold transition-all"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                      <span>Code Repository</span>
                    </a>

                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg text-white flex items-center space-x-2 text-xs font-bold transition-all shadow-md ${
                        isIndigo 
                          ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10' 
                          : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/10'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live App</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
