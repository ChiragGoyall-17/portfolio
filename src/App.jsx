import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CodingStats from './components/CodingStats';
import Education from './components/Education';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased overflow-x-hidden">
      {/* Universal Top Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none z-0" />

      {/* Floating navigation header */}
      <Navbar />

      {/* Main content sections */}
      <main className="relative z-10">
        <Hero />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <hr className="border-slate-900" />
        </div>

        <Skills />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <hr className="border-slate-900" />
        </div>

        <Experience />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <hr className="border-slate-900" />
        </div>

        <Projects />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <hr className="border-slate-900" />
        </div>

        <CodingStats />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <hr className="border-slate-900" />
        </div>

        <Education />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <hr className="border-slate-900" />
        </div>

        <Contact />
      </main>
    </div>
  );
}
