import { motion } from 'framer-motion';
import { Briefcase, Zap, ShieldAlert, Users, Code, CheckCircle } from 'lucide-react';

const achievements = [
  {
    icon: ShieldAlert,
    title: 'Admin Dashboards & User Access Control',
    description: 'Built and added 4+ new features to live web apps — including admin dashboards and user access management (role-based access controls and JWT authentication).'
  },
  {
    icon: Zap,
    title: 'Database Query Optimization',
    description: 'Fixed slow API calls by improving database queries, significantly making the app respond faster for users.'
  },
  {
    icon: Users,
    title: 'Collaborative Client Deliveries',
    description: 'Worked with a team on 3 client projects, utilized Git for version control, and successfully delivered all features on schedule.'
  },
  {
    icon: Code,
    title: 'Clean Code Best Practices',
    description: 'Wrote clean and reusable code by following proper MVC structures and software development standards.'
  },
  {
    icon: CheckCircle,
    title: 'Postman Integration & Testing',
    description: 'Tested APIs using Postman to make sure all endpoints and routes were working correctly before pushing to production.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute left-0 bottom-1/3 w-96 h-96 rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold text-white"
          >
            Work <span className="text-gradient">Experience</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Professional freelancing milestones showcasing software engineering, api integrations, database optimizations, and cross-functional team collaborations.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-12">
          {/* Timeline node */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative pl-8 md:pl-10"
          >
            {/* Timeline icon dot */}
            <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-indigo-600 border-4 border-slate-950 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Briefcase className="w-3 h-3 text-white" />
            </div>

            {/* Work details header */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">Software Developer</h3>
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit">
                  Aug 2025 – Present
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                <span className="font-semibold text-slate-300">NCOG Limited (Freelance)</span>
                <span>•</span>
                <span>Remote</span>
                <span>•</span>
                <span className="text-indigo-400">Node.js, MongoDB, Express, Git</span>
              </div>
            </div>

            {/* Achievements Sub-timeline */}
            <div className="grid gap-6">
              {achievements.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-5 rounded-xl border border-slate-900 bg-slate-900/10 hover:border-slate-800 transition-all duration-300 group hover:bg-slate-900/30"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
