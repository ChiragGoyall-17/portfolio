import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, BookOpen, ExternalLink } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute right-0 bottom-1/4 w-80 h-80 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />

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
            Education & <span className="text-gradient">Certifications</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 hover:border-slate-800 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-indigo-400">
                <GraduationCap className="w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Degree</h3>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">B.Tech in Computer Science Engineering</h4>
                <p className="text-sm font-semibold text-slate-350">Guru Gobind Singh Indraprastha University</p>
                <p className="text-xs text-slate-500">New Delhi, India</p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <span>Graduation Year: 2026</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Cumulative GPA:</span>
              <span className="text-sm font-extrabold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                8.42 / 10.0
              </span>
            </div>
          </motion.div>

          {/* Certifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 hover:border-slate-800 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Award className="w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Certifications</h3>
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">Full-Stack Web Development</h4>
                <p className="text-sm font-semibold text-slate-350">Apna College</p>
                <p className="text-xs text-slate-500">MERN Stack Covered End-to-End</p>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>React, Node.js, Express, MongoDB, MVC, Auth</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900">
              <a
                href="https://drive.google.com/file/d/1PefqkEBz1gNoApXS8mHfvgkyIdDA3Q5M/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-extrabold text-slate-400 hover:text-white transition-colors"
              >
                <span>Credentials Verified</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
