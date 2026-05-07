"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const name = "Bablo Muammar Omar";
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= name.length) {
        setDisplayName(name.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center pt-12 pb-8">
      {/* Avatar Ring */}
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-500 border-l-cyan-400"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-[4px] rounded-full bg-navy-dark flex items-center justify-center border border-sky-900/50 shadow-[0_0_30px_rgba(14,165,233,0.3)]"
        >
          <span className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-sky-400">
            BMO
          </span>
        </motion.div>
      </div>

      {/* Name and Title */}
      <motion.h2 
        className="text-3xl font-bold text-white tracking-tight mb-2 min-h-[40px]"
      >
        {displayName}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-8 bg-sky-500 ml-1 align-middle"
        />
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="text-sky-400 font-medium tracking-wide uppercase text-xs"
      >
        Co-Founder &bull; Skyrix Technologies
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="text-white/60 text-sm mt-2 italic"
      >
        "Building the future with cutting-edge technology"
      </motion.p>
    </div>
  );
}
