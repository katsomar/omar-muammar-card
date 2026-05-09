"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { 
  Phone, Mail, Globe, Linkedin, MessageCircle, 
  Download, Cpu, Code2, Globe2, Sparkles, 
  Zap, Layers, Rocket, ShieldCheck, ExternalLink,
  ChevronRight, Instagram, Facebook, Star
} from "lucide-react";
import Stats from "@/components/Stats";

// --- Sub-components ---

const HeaderStrip = () => {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[150] h-12 bg-[#050A18]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-12 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 overflow-hidden">
            <Image src="/logo/dark.png" alt="Logo" width={24} height={24} className="object-contain" />
          </div>
          <div className="w-[1px] h-4 bg-white/10 mx-2 hidden sm:block" />
        </div>
        {/* <div className="flex items-center gap-2 text-sky-400">
          <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Live</span>
        </div> */}
      </div>
      <div className="absolute inset-0 bg-sky-500/5 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[1px] bg-sky-400/30 w-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-sky-400 to-transparent"
        />
      </div>
      <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between text-[8px] font-black tracking-[0.3em] uppercase text-white/40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_5px_#22C55E]" />
            <span>System Online</span>
          </div>
          <div className="hidden sm:block h-3 w-[1px] bg-white/10" />
          <div className="hidden sm:flex items-center gap-2">
            <Globe size={10} className="text-sky-400" />
            <span>Global Access Secured</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">Local Time: {mounted ? time : "--:--"}</div>
          <div className="h-3 w-[1px] bg-white/10" />
          <div className="text-sky-400 animate-pulse">SKYRIX-CORE-V2.0</div>
        </div>
      </div>
    </div>
  );
};

const BackgroundParticles = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: Math.random() * 0.3, 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%" 
          }}
          animate={{ 
            y: [null, Math.random() * 100 - 50 + "vh"],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: Math.random() * 10 + 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute w-1 h-1 bg-sky-400/20 rounded-full blur-[1px]"
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%" 
          }}
          animate={{ 
            opacity: [0, 0.15, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          className="absolute w-24 h-24 bg-sky-500/5 rounded-full blur-[60px]"
        />
      ))}
    </div>
  );
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt((Math.random() * 50).toString())));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <span className="inline-block min-w-[120px]">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} ml-1 text-sky-400`}>|</span>
    </span>
  );
};

const ProjectCatalogOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const projects = [
    { title: "Skyrix OS", category: "Core Infrastructure", desc: "A decentralized operating system built for the next generation of cloud computing.", stack: ["Rust", "Wasm", "Next.js"] },
    { title: "Bento Builder", category: "Creative Tools", desc: "Dynamic layout engine for high-end digital identities and portfolio management.", stack: ["React", "Framer", "Three.js"] },
    { title: "Quantum API", category: "Backend Engine", desc: "Ultra-low latency API gateway with automated global scaling and edge computing.", stack: ["Go", "gRPC", "Redis"] },
    { title: "Nexus Media", category: "Digital Agency", desc: "A creative-first platform for high-end digital storytelling and immersive content.", stack: ["WebGL", "GLSL", "Node.js"] },
    { title: "Skyrix Cloud", category: "Cloud Services", desc: "Enterprise-grade cloud solutions with a focus on security and architectural precision.", stack: ["AWS", "Terraform", "Docker"] },
    { title: "Innova Mobile", category: "Mobile Apps", desc: "Cross-platform mobile applications that feel native and perform like desktop software.", stack: ["React Native", "Swift", "Kotlin"] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-[#050A18] flex flex-col overflow-y-auto"
        >
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[#050A18]" />
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-500/10 rounded-full blur-[150px] animate-pulse-glow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/5 rounded-full blur-[150px] animate-pulse-glow delay-1000" />
            <div className="absolute inset-0 noise opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 p-6 md:p-12 lg:py-24">
            <div className="flex items-center justify-between mb-16">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sky-400">
                  <Sparkles size={16} />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black">Archive</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Project <span className="text-sky-400">Catalog</span></h2>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-sky-500 transition-all duration-300"
              >
                <ChevronRight size={32} className="rotate-180" />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-[2.5rem] p-8 group cursor-pointer border-white/5 hover:border-sky-500/30 transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-widest border border-sky-500/20">
                      {project.category}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                      <ExternalLink size={18} />
                    </div>
                  </div>
                  
                  <ImagePlaceholder className="w-full aspect-video rounded-2xl mb-8 bg-gradient-to-br transition-all group-hover:scale-[1.02]" label={project.title} />

                  <h3 className="text-2xl font-black mb-4 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, j) => (
                      <span key={j} className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <p className="text-white/20 text-xs font-medium italic">"And many more architectural secrets yet to be unveiled."</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const [progress, setProgress] = useState(0);
  const allLogs = [
    "INITIALIZING CORE...",
    "CONNECTING TO SKYRIX NETWORK...",
    "DECRYPTING ACCESS KEYS...",
    "OPTIMIZING BENTO RENDERING...",
    "CO-FOUNDER AUTHENTICATED",
    "SYSTEMS READY"
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < allLogs.length) {
        setLogs(prev => [...prev, allLogs[currentLog]]);
        currentLog++;
        setProgress((currentLog / allLogs.length) * 100);
      } else {
        clearInterval(interval);
      }
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 1, ease: "circIn" } 
      }}
      className="fixed inset-0 z-[500] bg-[#050A18] flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-0 noise opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo and Progress Ring */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-16">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              className="stroke-white/5 fill-none"
              strokeWidth="2"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              className="stroke-sky-500 fill-none"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 502" }}
              animate={{ strokeDasharray: `${(progress / 100) * 502} 502` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </svg>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-24 h-24 p-4 relative"
          >
            <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-2xl animate-pulse" />
            <img 
              src="/logo/dark.png" 
              alt="Skyrix" 
              className="w-full h-full object-contain relative z-10 brightness-125" 
            />
          </motion.div>
        </div>

        {/* Cinematic Logs */}
        <div className="w-full max-w-[200px] space-y-3">
          <AnimatePresence mode="popLayout">
            {logs.slice(-1).map((log, i) => (
              <motion.div
                key={log}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)] text-center">
                  {log}
                </span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, j) => (
                    <motion.div
                      key={j}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }}
                      className="w-1 h-1 bg-sky-500 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Scanning Line */}
      <motion.div 
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent shadow-[0_0_15px_rgba(14,165,233,0.1)] pointer-events-none"
      />
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
    { name: "Next.js", img: "/images/nxt.png" },
    { name: "TypeScript", img: "/images/ts.png" },
    { name: "Tailwind", img: "/images/tail.png" },
    { name: "React", img: "/images/react.png" },
    { name: "Node.js", img: "/images/node.png" },
    { name: "Python", img: "/images/py.png" },
    { name: "SQL", img: "/images/sql.png" },
    { name: "PHP", img: "/images/php.png" },
  ];
  
  return (
    <div className="flex overflow-hidden mt-6 gap-4 py-2">
      <div className="flex animate-marquee gap-10 items-center whitespace-nowrap">
        {[...techs, ...techs].map((tech, i) => (
          <div key={i} className="flex items-center group gap-3">
            <div className="w-6 h-6 relative transition-all duration-500 group-hover:scale-110">
              <img 
                src={tech.img} 
                alt={tech.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[10px] font-black text-white/40 group-hover:text-sky-400 transition-colors uppercase tracking-widest">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page ---

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const containerRef = useRef(null);

  const reviews = [
    { name: "Kato Wasswa", company: "Central Logistics", text: "The architectural precision provided by Skyrix has redefined our digital presence completely." },
    { name: "Namukasa Sarah", company: "Elite Tech Solutions", text: "Exceptional service and deep technical expertise. They delivered exactly what we needed." },
    { name: "Okello John", company: "Nile Dynamics", text: "Skyrix transformed our digital infrastructure overnight. High-performance systems that never fail." },
    { name: "Mirembe Joy", company: "Pearl FinTech", text: "A truly global standard of engineering right here. Seamless integration and great support." },
    { name: "Ssali David", company: "Victoria Energy", text: "They don't just build software; they engineer solutions that redefine industry standards." },
    { name: "Nalubega Proscovia", company: "Summit Media", text: "The most reliable software partners in the region. Innovative solutions with a personal touch." },
    { name: "Mugisha Ronald", company: "Horizon Group", text: "Architectural precision at its finest. The best investment for our company's long-term growth." },
    { name: "Atwine Patience", company: "Savannah Apps", text: "Highly professional team. They bridge the gap between complex engineering and human design." },
    { name: "Kibirige Shafiq", company: "Kampala Cloud", text: "Innovative, efficient, and forward-thinking. Skyrix is the future of digital architecture." },
    { name: "Nantongo Grace", company: "Blue Nile Systems", text: "Outstanding execution. Their attention to detail in system performance is simply unmatched." },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 5000);
    const reviewInterval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => {
      clearTimeout(timer);
      clearInterval(reviewInterval);
    };
  }, []);

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:Bablo Muammar Omar\nORG:Skyrix Technologies\nTITLE:Co-Founder\nTEL;TYPE=CELL:+256771827046\nEMAIL:katsomar60@gmail.com\nURL:https://skyrix-techologies.vercel.app\nEND:VCARD`;
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
      <HeaderStrip />
      <BackgroundParticles />
      <ProjectCatalogOverlay isOpen={showCatalog} onClose={() => setShowCatalog(false)} />
      
      <AnimatePresence>
        {!isLoaded && <BootUpSplash />}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] animate-pulse-glow delay-1000" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-auto">
          
          {/* HERO PROFILE SECTION */}
          <BentoCard className="md:col-span-8 md:row-span-2 flex flex-col md:flex-row gap-8 items-center md:items-stretch bg-gradient-to-br from-sky-500/[0.07] to-transparent border-sky-500/10">
            <div className="relative group shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-8px] rounded-full border border-dashed border-sky-400/30 group-hover:border-sky-400 transition-colors"
              />
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden relative group border-4 border-white/5 shadow-2xl">
                <Image 
                  src="/images/me.jpg" 
                  alt="Bablo Muammar Omar" 
                  width={224}
                  height={224}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A18]/40 to-transparent pointer-events-none" />
              </div>
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
              <span className="text-[10px] uppercase tracking-widest font-bold">Tech Stack</span>
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
              <div className="flex items-center gap-3 text-sky-400 mb-6 justify-center lg:justify-start">
                <div className="w-8 h-[1px] bg-sky-500/50" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black">The Narrative</span>
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tighter leading-none italic">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">Architecting</span> <br/>
                <span className="text-sky-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">Digital Legacies</span>
              </h2>
              <div className="space-y-6 text-white/50 leading-relaxed text-sm md:text-base max-w-2xl mx-auto lg:mx-0 font-medium">
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
              <div className="w-64 h-64 md:w-72 md:h-80 rounded-[2.5rem] overflow-hidden relative group shadow-2xl rotate-[2deg] hover:rotate-0 transition-all duration-700 border border-white/5">
                <Image 
                  src="/images/ceo.jpeg" 
                  alt="Bablo Muammar Omar" 
                  width={288}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050A18]/40 to-transparent pointer-events-none" />
              </div>
            </div>
          </BentoCard>

          {/* FEATURED PROJECTS GALLERY */}
          <BentoCard className="md:col-span-12 group/gallery py-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2 text-sky-400">
                  <Layers size={14} className="animate-bounce" />
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black">Portfolio</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40 uppercase">
                  Featured <span className="text-sky-400">Creations</span>
                </h2>
              </div>
              <motion.div 
                onClick={() => setShowCatalog(true)}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer hover:bg-sky-500/10 hover:text-sky-400 transition-all group"
              >
                View Catalog <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "E-commerce Website", category: "Full Stack", img: "/projects/loko.png", url: "https://loko-harvest-limited.vercel.app/orders" },
                { title: "E-commerce Website", category: "Full Stack", img: "/projects/gs.png", url: "https://golden-sprinkles-bakery.vercel.app/#products" },
                { title: "School Management System", category: "Full Stack", img: "/projects/bw.png", url: "https://bornwell-academy.great-site.net/public/login.php?i=2" },
              ].map((project, i) => (
                <a key={i} href={project.url} target="_blank" rel="noopener noreferrer" className="group/item cursor-pointer block">
                  <div className="w-full aspect-video rounded-2xl mb-4 overflow-hidden relative border border-white/5">
                    <Image 
                      src={project.img} 
                      alt={project.title} 
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-all duration-700 group-hover/item:scale-110 group-hover/item:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050A18]/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <h4 className="font-black text-sm text-white group-hover/item:text-sky-400 transition-colors uppercase tracking-tight">{project.title}</h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">{project.category}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:bg-sky-500 group-hover/item:border-sky-400 transition-all duration-500">
                      <ExternalLink size={14} className="text-white group-hover/item:scale-110 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </BentoCard>

          {/* NEWSLETTER & REVIEWS SECTION */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Newsletter Card */}
            <BentoCard className="relative group overflow-hidden p-0 flex flex-col min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent pointer-events-none" />
              <div className="p-10 flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-3 text-sky-400 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 shadow-[0_0_20px_rgba(14,165,233,0.1)]">
                      <Mail size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 block mb-1">Intelligence</span>
                      <h3 className="text-2xl font-black tracking-tighter uppercase">Skyrix <span className="text-sky-400">Digest</span></h3>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-12 font-medium">
                    Architectural insights, technological breakthroughs, and engineering secrets delivered to your core.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <AnimatePresence mode="wait">
                    {newsletterStatus === 'success' ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-8 text-center flex flex-col items-center gap-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                          <Rocket size={24} className="text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">Access Granted</h4>
                          <p className="text-sky-400/60 text-[10px] font-bold uppercase tracking-widest">You are now part of the Skyrix network.</p>
                        </div>
                        <motion.button 
                          onClick={() => setNewsletterStatus('idle')}
                          className="mt-2 text-[8px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
                        >
                          Subscribe another email
                        </motion.button>
                      </motion.div>
                    ) : (
                      <form 
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const form = e.currentTarget;
                          const email = new FormData(form).get('email');
                          setNewsletterStatus('loading');
                          
                          const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwXdBOM1XAPUTq_aZ6BMy-GZOA6QzXMAxbx8mf0HsYt96vVNvEeIj-3kp3JXLYMv_jBVw/exec";
                          
                          try {
                            await fetch(GOOGLE_SHEET_URL, {
                              method: 'POST',
                              mode: 'no-cors',
                              body: JSON.stringify({ email, date: new Date().toISOString() }),
                              headers: { 'Content-Type': 'application/json' }
                            });
                            setNewsletterStatus('success');
                            form.reset();
                          } catch (err) {
                            setNewsletterStatus('error');
                            setTimeout(() => setNewsletterStatus('idle'), 3000);
                          }
                        }}
                        className="relative group"
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                        <div className="relative flex items-center">
                          <input 
                            name="email"
                            type="email" 
                            required
                            disabled={newsletterStatus === 'loading'}
                            placeholder={newsletterStatus === 'loading' ? "AUTHENTICATING..." : "ENTER YOUR EMAIL ADDRESS"} 
                            className="w-full bg-[#0A0F1E]/80 border border-white/5 rounded-2xl py-6 px-8 text-[11px] font-black tracking-[0.2em] text-white outline-none focus:border-sky-500/50 transition-all placeholder:text-white/10 disabled:opacity-50"
                          />
                          <motion.button 
                            type="submit"
                            disabled={newsletterStatus === 'loading'}
                            whileHover={{ scale: 1.05, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-3 bg-sky-500 text-white px-6 py-3 rounded-xl shadow-xl shadow-sky-500/20 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 disabled:opacity-50"
                          >
                            {newsletterStatus === 'loading' ? "JOINING..." : "Join"} <Rocket size={14} className={newsletterStatus === 'loading' ? "animate-bounce" : ""} />
                          </motion.button>
                        </div>
                        {newsletterStatus === 'error' && (
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-[8px] font-black uppercase tracking-widest mt-4 text-center"
                          >
                            Connection failed. Please try again.
                          </motion.p>
                        )}
                      </form>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-4 border-[#050A18] bg-white/10 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/30 to-sky-600/30" />
                            <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-white/40">U{i}</div>
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">1.2k+ Subscribed</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-sky-500/30" />
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Experience Rating Card */}
            <BentoCard className="relative group overflow-hidden p-0 flex flex-col min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tl from-sky-500/5 to-transparent pointer-events-none" />
              <div className="p-10 flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-sky-400" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">Quality Control</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="text-sky-400 fill-sky-400/20" />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-12 flex-1">
                  <div className="relative shrink-0">
                    <div className="w-40 h-40 relative flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-dashed border-sky-400/10"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(6)].map((_, i) => {
                          const angle = (i * 360) / 6;
                          const radius = 60;
                          const x = radius * Math.cos((angle - 90) * (Math.PI / 180));
                          const y = radius * Math.sin((angle - 90) * (Math.PI / 180));
                          const isFull = i < 4;
                          const isHalf = i === 4;

                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1,
                                x: x,
                                y: y
                              }}
                              transition={{ 
                                delay: i * 0.1,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                              }}
                              className="absolute"
                            >
                              <motion.div
                                animate={{ rotate: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                              >
                                <Star 
                                  size={16} 
                                  className={`${isFull ? "text-yellow-500 fill-yellow-500" : isHalf ? "text-yellow-500/40 fill-yellow-500/20" : "text-white/5"} drop-shadow-[0_0_10px_rgba(234,179,8,0.4)]`} 
                                />
                              </motion.div>
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-white tracking-tighter">4.9</span>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mt-2">Platform Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-6">
                    <div className="space-y-1 mb-8">
                      <div className="flex items-center gap-2 text-sky-400/50 justify-center md:justify-start">
                        <div className="w-6 h-[1px] bg-sky-500/30" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Trust Ledger</span>
                      </div>
                      <h3 className="text-3xl font-black tracking-tighter uppercase leading-none italic">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">Architectural</span> <br/>
                        <span className="text-sky-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">Appraisals</span>
                      </h3>
                    </div>
                    
                    <div className="min-h-[100px] relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeReview}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-6"
                        >
                          <p className="text-white/50 text-sm leading-relaxed font-medium italic">
                            "{reviews[activeReview].text}"
                          </p>
                          <div className="flex items-center gap-4 pt-4 border-t border-white/5 justify-center md:justify-start">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-sky-400 font-black text-xs">
                              {reviews[activeReview].name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="text-[10px] font-black text-white uppercase tracking-widest">{reviews[activeReview].name}</div>
                              <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">{reviews[activeReview].company}</div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* CONNECT SECTION */}
          <div className="md:col-span-12 grid grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
            {[
              { icon: Phone, label: "Phone", value: "+256 771 827046", url: "tel:+256771827046" },
              { icon: MessageCircle, label: "WhatsApp", value: "+256 771 827046", url: "https://wa.me/256771827046" },
              { icon: Mail, label: "Email", value: "katsomar60@gmail.com", url: "mailto:katsomar60@gmail.com" },
              { icon: Linkedin, label: "LinkedIn", value: "Kats Omar", url: "https://www.linkedin.com/in/kats-omar" },
              { icon: Globe, label: "Skyrix Technologies", value: "skyrix-techologies.vercel.app", url: "https://skyrix-techologies.vercel.app/" },
            ].map((item, i) => (
              <a key={i} href={item.url} target={item.url.startsWith('http') ? "_blank" : undefined} rel={item.url.startsWith('http') ? "noopener noreferrer" : undefined}>
                <BentoCard className="flex flex-col items-center justify-center py-8 group cursor-pointer hover:border-sky-500/40 transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-sky-500/20">
                    <item.icon size={24} className="text-sky-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-1 group-hover:text-sky-400/50 transition-colors">{item.label}</span>
                  <span className="text-[10px] font-bold text-white/60 group-hover:text-white transition-colors text-center px-2">{item.value}</span>
                </BentoCard>
              </a>
            ))}
          </div>


        </div>
      </div>

      {/* FOOTER & CTA */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 pb-24 md:pb-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5 pt-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group hover:border-sky-500 transition-all duration-500 overflow-hidden p-2">
                <Image 
                  src="/logo/dark.png" 
                  alt="Skyrix Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-2xl font-black tracking-tighter">
                Skyrix <span className="text-sky-400">
                  <Typewriter words={["Technologies", "Media", "Consultants", "Cloud", "Software", "Mobile Apps", "Innovations"]} />
                </span>
              </h3>
            </div>
            <p className="text-white/30 text-sm mb-8 max-w-sm font-medium">
              Architecting the next generation of digital infrastructure and immersive user experiences.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, url: "https://www.facebook.com/61588036853642/photos/" },
                { Icon: Instagram, url: "https://www.instagram.com/skyrixtechnologies?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
                { Icon: Linkedin, url: "https://www.linkedin.com/in/kats-omar" },
                { Icon: Globe, url: "https://skyrix-techologies.vercel.app/" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-sky-400 hover:border-sky-400/30 cursor-pointer transition-all"
                >
                  <social.Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="text-right hidden md:block">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 block mb-2">Primary Contact</span>
              <span className="text-lg font-bold text-white/60">katsomar60@gmail.com</span>
            </div>
            <motion.button
              onClick={downloadVCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full md:w-auto px-12 py-6 rounded-2xl overflow-hidden"
            >
              {/* Outer Glow Layer */}
              <div className="absolute inset-0 bg-sky-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Border Layer */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-sky-400/50 transition-colors duration-500" />
              
              {/* Background Layers */}
              <div className="absolute inset-0 bg-[#050A18] rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Animated Liquid Gradient */}
              <motion.div 
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600 bg-[length:200%_auto] opacity-90"
              />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 shimmer opacity-30" />
              
              {/* Content */}
              <div className="relative flex items-center justify-center gap-4 text-white font-black tracking-[0.2em] text-[10px] uppercase">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Download size={20} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </motion.div>
                <span className="drop-shadow-lg">Save Contact</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-sky-200 animate-pulse shadow-[0_0_10px_#fff]" />
              </div>
            </motion.button>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Cookie Policy</span>
          </div>
          <div className="p-1 px-4 rounded-full bg-white/[0.02] border border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/20">
            &copy; 2026 Skyrix Technologies &bull; Powered by Muammar Omar
          </div>
        </div>
      </div>
    </main>
  );
}
