"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { 
  Phone, Mail, Globe, Linkedin, MessageCircle, 
  Download, Cpu, Code2, Globe2, Sparkles, 
  Zap, Layers, Rocket, ShieldCheck, ExternalLink,
  ChevronRight, Instagram, Twitter
} from "lucide-react";
import Stats from "@/components/Stats";

// --- Sub-components ---

const ImagePlaceholder = ({ className = "", label = "Image Placeholder" }: { className?: string; label?: string }) => (
  <div className={`relative overflow-hidden group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-pulse" />
    <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl">
      <div className="flex flex-col items-center gap-2 text-white/20 group-hover:text-white/40 transition-colors">
        <Sparkles size={32} />
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
      </div>
    </div>
    <div className="absolute inset-0 shimmer opacity-30" />
  </div>
);

const BootUpSplash = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const allLogs = [
    "[SYSTEM] Initializing Skyrix Core...",
    "[NETWORK] Connecting to muammar@skyrix.com...",
    "[SECURITY] decrypting BMO_ACCESS_KEY...",
    "[GRAPHICS] Rendering Bento Dashboard...",
    "[STATUS] Co-Founder authenticated.",
    "[READY] Welcome, Bablo Muammar Omar."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < allLogs.length) {
        setLogs(prev => [...prev, allLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "circOut" } }}
      className="fixed inset-0 z-[100] bg-[#050A18] flex flex-col items-center justify-center font-mono p-6"
    >
      <div className="w-full max-w-md space-y-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500/50 animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50 animate-pulse delay-75" />
          <div className="w-3 h-3 rounded-full bg-green-500/50 animate-pulse delay-150" />
        </div>
        <AnimatePresence mode="popLayout">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sky-400 text-xs md:text-sm"
            >
              <span className="text-sky-800 mr-2">{">"}</span> {log}
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "linear" }}
          className="h-1 bg-sky-500 shadow-[0_0_15px_#0EA5E9] mt-8"
        />
      </div>
    </motion.div>
  );
};

const BentoCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ 
      y: -5,
      transition: { duration: 0.2 } 
    }}
    className={`glass rounded-[2rem] p-6 relative overflow-hidden group border border-white/5 shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

const TechMarquee = () => {
  const techs = [
    { name: "Next.js", icon: Globe2 },
    { name: "TypeScript", icon: Code2 },
    { name: "Tailwind", icon: Layers },
    { name: "React", icon: Cpu },
    { name: "Vercel", icon: Rocket },
    { name: "Supabase", icon: ShieldCheck },
  ];
  
  return (
    <div className="flex overflow-hidden mt-4 gap-4 py-2">
      <div className="flex animate-marquee gap-8 items-center whitespace-nowrap">
        {[...techs, ...techs].map((tech, i) => (
          <div key={i} className="flex items-center gap-2 text-white/40 text-sm font-medium hover:text-sky-400 transition-colors">
            <tech.icon size={16} />
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page ---

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Bablo Muammar Omar\nORG:Skyrix Technologies\nTITLE:Co-Founder\nTEL;TYPE=CELL:+256700000000\nEMAIL:muammar@skyrix.com\nURL:https://skyrix-techologies.vercel.app\nEND:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Bablo_Muammar_Omar.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main ref={containerRef} className="mesh-gradient min-h-screen text-white font-sans selection:bg-sky-500/30 overflow-x-hidden relative">
      <div className="noise" />
      
      <AnimatePresence>
        {!isLoaded && <BootUpSplash />}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-auto">
          
          {/* HERO PROFILE SECTION */}
          <BentoCard className="md:col-span-8 md:row-span-2 flex flex-col md:flex-row gap-8 items-center md:items-stretch bg-gradient-to-br from-sky-500/[0.07] to-transparent border-sky-500/10">
            <div className="relative group shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8px] rounded-full border border-dashed border-sky-400/30 group-hover:border-sky-400 transition-colors"
              />
              <ImagePlaceholder className="w-48 h-48 md:w-56 md:h-56 rounded-full" label="Profile Photo" />
              <div className="absolute -bottom-2 -right-2 bg-sky-500 text-white p-3 rounded-2xl shadow-lg animate-bounce">
                <Sparkles size={20} />
              </div>
            </div>
            
            <div className="flex flex-col justify-center text-center md:text-left">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-4 self-center md:self-start border border-sky-500/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Available for New Ventures
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Bablo Muammar <span className="text-sky-400">Omar</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl font-medium mb-6">
                Co-Founder & Lead Architect at <span className="text-white border-b border-sky-400/30">Skyrix Technologies</span>
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-white/70">Building Systems</div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-white/70">Product Strategy</div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-white/70">Innovating Tech</div>
              </div>
            </div>
          </BentoCard>

          {/* VISUAL STATS */}
          <BentoCard className="md:col-span-4 flex flex-col justify-between border-white/5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sky-400">
                <Zap size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Metrics</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </div>
            <Stats />
            <p className="text-[9px] text-center text-white/20 mt-4 italic">
              "Continuous growth through consistent execution."
            </p>
          </BentoCard>

          {/* TECH STACK */}
          <BentoCard className="md:col-span-4">
            <div className="flex items-center gap-2 mb-2 text-sky-400">
              <Code2 size={18} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Arsenal</span>
            </div>
            <p className="text-xs text-white/50 mb-1">Modern ecosystem mastery:</p>
            <TechMarquee />
          </BentoCard>

          {/* ABOUT ME SECTION */}
          <BentoCard className="md:col-span-12 flex flex-col lg:flex-row items-center lg:items-stretch gap-12 py-10">
            {/* Skills Left */}
            <div className="w-full lg:w-80 flex flex-col justify-center gap-6 order-2 lg:order-1">
              {[
                { name: "System Architecture", level: 95 },
                { name: "Fullstack Engineering", level: 90 },
                { name: "Product Strategy", level: 85 },
                { name: "UI/UX Orchestration", level: 88 },
              ].map((skill, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{skill.name}</span>
                    <span className="text-[10px] font-mono text-sky-400">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "circOut" }}
                      className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Content Middle */}
            <div className="flex-1 flex flex-col justify-center text-center lg:text-left order-3 lg:order-2">
              <div className="flex items-center gap-2 text-sky-400 mb-4 justify-center lg:justify-start">
                <Sparkles size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">The Journey</span>
              </div>
              <h2 className="text-3xl font-black mb-6 tracking-tight">Crafting Digital <span className="text-sky-400">Excellence</span></h2>
              <div className="space-y-4 text-white/60 leading-relaxed text-sm md:text-base max-w-2xl mx-auto lg:mx-0">
                <p>
                  I'm a visionary technologist and co-founder dedicated to architecting seamless digital experiences. With a deep passion for innovation, I bridge the gap between complex engineering and human-centric design.
                </p>
                <p>
                  At Skyrix Technologies, we don't just build software; we engineer solutions that redefine how users interact with the digital world, focusing on performance, scalability, and aesthetic precision.
                </p>
              </div>
            </div>

            {/* Image Right */}
            <div className="shrink-0 order-1 lg:order-3">
              <ImagePlaceholder className="w-64 h-64 md:w-72 md:h-80 rounded-[2.5rem] shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-500" label="Alternate View" />
            </div>
          </BentoCard>

          {/* FEATURED PROJECTS GALLERY */}
          <BentoCard className="md:col-span-12 group/gallery">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-sky-400">
                <Layers size={18} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Featured Creations</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-white transition-colors">
                View All <ChevronRight size={14} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Skyrix OS", category: "Infrastructure", color: "from-blue-500/20" },
                { title: "Bento Builder", category: "Open Source", color: "from-purple-500/20" },
                { title: "Quantum API", category: "Backend", color: "from-amber-500/20" },
              ].map((project, i) => (
                <div key={i} className="group/item cursor-pointer">
                  <ImagePlaceholder className="w-full aspect-video rounded-2xl mb-4 bg-gradient-to-br transition-all group-hover/item:scale-[1.02]" label={project.title} />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover/item:text-sky-400 transition-colors">{project.title}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">{project.category}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-sky-500 transition-colors">
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* CONNECT SECTION */}
          <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {[
              { icon: Phone, label: "Phone", href: "tel:+256700000000", color: "hover:border-blue-500/30" },
              { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/256700000000", color: "hover:border-green-500/30" },
              { icon: Mail, label: "Email", href: "mailto:muammar@skyrix.com", color: "hover:border-purple-500/30" },
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/muammar-omar", color: "hover:border-blue-600/30" },
            ].map((item, i) => (
              <BentoCard key={i} className={`flex flex-col items-center justify-center p-8 cursor-pointer transition-all border-white/5 ${item.color}`} delay={0.1 * i}>
                <a href={item.href} target="_blank" className="flex flex-col items-center">
                  <item.icon size={32} className="mb-4 text-white/60 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/60 transition-colors">{item.label}</span>
                </a>
              </BentoCard>
            ))}
          </div>

          {/* WEBSITE TILE */}
          <BentoCard className="md:col-span-12 flex items-center justify-between group cursor-pointer border-white/5" delay={0.5}>
            <a href="https://skyrix-techologies.vercel.app" target="_blank" className="flex items-center gap-6 w-full">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 group-hover:rotate-6">
                <Globe size={32} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Official Domain</span>
                <span className="text-xl md:text-2xl font-bold tracking-tight">skyrix-techologies.vercel.app</span>
              </div>
              <div className="ml-auto flex items-center gap-2 text-sky-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                <span className="text-[10px] font-bold uppercase">Launch</span>
                <ChevronRight size={20} />
              </div>
            </a>
          </BentoCard>

        </div>
      </div>

      {/* FOOTER & CTA */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 pb-24 md:pb-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5 pt-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm">
            <h3 className="text-2xl font-bold mb-2">Let's Build Something</h3>
            <p className="text-white/40 text-sm mb-6">Currently accepting limited collaborations for high-impact architectural and technological projects.</p>
            <div className="flex gap-4">
              <Twitter className="text-white/20 hover:text-sky-400 cursor-pointer transition-colors" size={20} />
              <Instagram className="text-white/20 hover:text-pink-500 cursor-pointer transition-colors" size={20} />
              <Linkedin className="text-white/20 hover:text-blue-500 cursor-pointer transition-colors" size={20} />
            </div>
          </div>
          
          <motion.button
            onClick={downloadVCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full md:w-auto px-12 py-6 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-cyan-500 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 shimmer" />
            <div className="relative flex items-center justify-center gap-3 text-white font-black tracking-widest text-xs uppercase">
              <Download size={18} />
              Add to Contacts
            </div>
          </motion.button>
        </div>
        
        <div className="mt-24 text-center">
          <div className="inline-block p-1 px-3 rounded-full bg-white/5 border border-white/5 text-[8px] font-bold uppercase tracking-widest text-white/20">
            &copy; 2026 Skyrix Technologies &bull; Powered by Muammar Omar
          </div>
        </div>
      </div>
    </main>
  );
}
