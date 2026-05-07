"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function CircularProgress({ value, max, label, suffix = "", delay = 0 }: { value: number; max: number; label: string; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = duration / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / max) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/5"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 2, delay, ease: "easeOut" }}
            className="text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{count}{suffix}</span>
        </div>
      </div>
      <span className="text-[10px] text-center text-white/40 uppercase tracking-widest font-bold max-w-[80px]">
        {label}
      </span>
    </div>
  );
}

const stats = [
  { label: "Projects Delivered", value: 15, max: 20, suffix: "+" },
  { label: "Years Experience", value: 5, max: 10, suffix: "+" },
  { label: "Global Clients", value: 12, max: 15, suffix: "+" },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-2 py-4">
      {stats.map((stat, i) => (
        <CircularProgress 
          key={i} 
          value={stat.value} 
          max={stat.max} 
          label={stat.label} 
          suffix={stat.suffix} 
          delay={i * 0.2}
        />
      ))}
    </div>
  );
}
