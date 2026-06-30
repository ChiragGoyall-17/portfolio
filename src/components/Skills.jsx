import { motion } from 'framer-motion';
import { Terminal, Globe, Cpu, Database, Settings, Sparkles, BookOpen } from 'lucide-react';

const skillsData = [
  {
    category: 'Languages',
    icon: Terminal,
    color: 'from-blue-500/25 to-cyan-500/25',
    borderColor: 'group-hover:border-blue-500/50',
    skills: ['JavaScript (ES6+)', 'Java', 'HTML5', 'CSS3']
  },
  {
    category: 'Frontend',
    icon: Globe,
    color: 'from-cyan-500/25 to-indigo-500/25',
    borderColor: 'group-hover:border-cyan-500/50',
    skills: ['React.js', 'Bootstrap', 'Responsive Design', 'Tailwind CSS']
  },
  {
    category: 'Backend & Security',
    icon: Cpu,
    color: 'from-violet-500/25 to-purple-500/25',
    borderColor: 'group-hover:border-violet-500/50',
    skills: ['Node.js', 'Express.js', 'JWT Auth', 'Role-Based Access Control (RBAC)', 'MVC Architecture']
  },
  {
    category: 'Databases',
    icon: Database,
    color: 'from-emerald-500/25 to-teal-500/25',
    borderColor: 'group-hover:border-emerald-500/50',
    skills: ['MongoDB', 'Mongoose ODM', 'PostgreSQL', 'Neon (Serverless Postgres)', 'MySQL']
  },
  {
    category: 'Tools & Cloud',
    icon: Settings,
    color: 'from-amber-500/25 to-orange-500/25',
    borderColor: 'group-hover:border-amber-500/50',
    skills: ['Git & GitHub', 'VS Code', 'Render', 'Vercel', 'Clerk Auth', 'Passport.js', 'AWS basics']
  },
  {
    category: 'AI & ML Integrations',
    icon: Sparkles,
    color: 'from-pink-500/25 to-rose-500/25',
    borderColor: 'group-hover:border-pink-500/50',
    skills: ['Claude AI', 'ChatGPT APIs', 'Prompt Engineering', 'AI API Integration']
  },
  {
    category: 'Core CS Subjects',
    icon: BookOpen,
    color: 'from-red-500/25 to-purple-500/25',
    borderColor: 'group-hover:border-red-500/50',
    skills: ['Data Structures & Algorithms (Java)', 'Object-Oriented Programming (OOP)', 'DBMS', 'Operating Systems', 'Computer Networks', 'Artificial Intelligence']
  }
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute right-0 top-1/3 w-96 h-96 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />
      
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
            Technical <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 w-20 bg-indigo-500 mx-auto rounded-full"
          />
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            A comprehensive overview of my technological capability and stack, gathered from engineering subjects, practical development projects, and freelancing.
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`group relative p-6 rounded-2xl border border-slate-900 bg-slate-900/20 backdrop-blur-md transition-all duration-300 hover:bg-slate-900/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/5 ${item.borderColor}`}
              >
                {/* Visual glow indicator */}
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10`} />

                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-950 border border-slate-800/80 text-slate-400 group-hover:text-slate-300 group-hover:border-slate-800 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
