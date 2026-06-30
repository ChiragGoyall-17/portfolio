import { motion } from 'framer-motion';
import { Award, Code, CheckCircle, Zap, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'LeetCode Solved', value: '100+', subText: 'Easy, Medium & Hard', color: 'text-yellow-500' },
  { label: 'Uptime Achieved', value: '99%+', subText: 'Vercel & Render Deploys', color: 'text-emerald-500' },
  { label: 'Client Projects', value: '3+', subText: 'Freelance & Teams', color: 'text-indigo-500' },
  { label: 'Login & Access Control Systems', value: '2+', subText: 'JWT + RBAC / Sessions', color: 'text-cyan-500' }
];

const topics = [
  { name: 'Arrays & Hashing', score: 90 },
  { name: 'Strings & Linked Lists', score: 85 },
  { name: 'Trees & Graphs', score: 80 },
  { name: 'Dynamic Programming', score: 70 },
  { name: 'Binary Search & Sliding Window', score: 85 },
  { name: 'Recursion & Heap', score: 80 }
];

const achievements = [
  'Solved 100+ problems on LeetCode covering major concepts (Arrays, Hashing, Trees, Dynamic Programming).',
  'Practiced problems at Easy, Medium, and Hard levels with focus on time and space complexity optimizations.',
  'Deployed and maintained multiple live projects on Render and Vercel with real users and 99%+ uptime.',
  'Built secure authorization mechanisms (JWT + RBAC, Passport.js) in real freelance projects.',
  'Completed Full-Stack Web Development course at Apna College - MERN stack covered end to end.'
];

export default function CodingStats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80 }
    }
  };

  return (
    <section id="coding" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute left-1/4 top-1/4 w-80 h-80 rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

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
            Coding & <span className="text-gradient">Achievements</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Quantifiable coding profiles, algorithms practice, system reliability achievements, and academic credentials.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel - Numerical Stats (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-5 rounded-2xl border border-slate-900 bg-slate-900/10 backdrop-blur-md text-center hover:border-slate-800 transition-colors"
                >
                  <span className={`block text-3xl md:text-4xl font-extrabold mb-1.5 ${stat.color}`}>
                    {stat.value}
                  </span>
                  <span className="block text-sm font-bold text-slate-200">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {stat.subText}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* LeetCode link card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 hover:border-slate-800 transition-colors flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-yellow-500">
                  <Code className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="text-base font-bold text-white">LeetCode Profile</h4>
                  <p className="text-xs text-slate-400">@chirag_goyal2002</p>
                </div>
              </div>
              <a
                href="https://leetcode.com/u/chirag_goyal2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-slate-950 text-xs font-extrabold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Solve Challenges</span>
                <Zap className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right panel - Key topics proficiency & achievements bullet points (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Proficiencies */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-slate-900 bg-slate-900/15 backdrop-blur-md space-y-4"
            >
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                <span>DSA Topics & Proficiencies</span>
              </h3>

              <div className="space-y-3">
                {topics.map((topic, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>{topic.name}</span>
                      <span className="text-indigo-400">{topic.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${topic.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-indigo-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements Bullet List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-slate-900 bg-slate-900/10 space-y-4 text-left"
            >
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-400" />
                <span>Key Milestones</span>
              </h3>

              <ul className="space-y-3">
                {achievements.map((item, idx) => (
                  <motion.li
                    key={idx}
                    variants={cardVariants}
                    className="flex items-start text-xs md:text-sm text-slate-400"
                  >
                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-2.5 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
