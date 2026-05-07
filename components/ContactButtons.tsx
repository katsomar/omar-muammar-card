"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Globe, Linkedin, MessageCircle } from "lucide-react";

const contactData = [
  {
    icon: Phone,
    label: "Phone",
    value: "+256 700 000 000",
    href: "tel:+256700000000",
    color: "from-blue-500/20 to-sky-500/20",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+256 700 000 000",
    href: "https://wa.me/256700000000",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Mail,
    label: "Email",
    value: "muammar@skyrix.com",
    href: "mailto:muammar@skyrix.com",
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "muammar-omar",
    href: "https://linkedin.com/in/muammar-omar",
    color: "from-blue-600/20 to-blue-400/20",
  },
  {
    icon: Globe,
    label: "Website",
    value: "skyrix-techologies.vercel.app",
    href: "https://skyrix-techologies.vercel.app",
    color: "from-cyan-500/20 to-sky-500/20",
  },
];

export default function ContactButtons() {
  return (
    <div className="flex flex-col gap-4 px-4 pb-8 w-full">
      {contactData.map((contact, i) => (
        <motion.a
          key={i}
          href={contact.href}
          target={contact.href.startsWith("http") ? "_blank" : undefined}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: i * 0.1 }}
          className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r ${contact.color} border border-white/10 backdrop-blur-xl group hover:border-sky-500/50 transition-colors`}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white group-hover:text-sky-400 transition-colors">
            <contact.icon size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
              {contact.label}
            </span>
            <span className="text-white font-medium text-sm">
              {contact.value}
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
