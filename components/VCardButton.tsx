"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function VCardButton() {
  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Bablo Muammar Omar
ORG:Skyrix Technologies
TITLE:Co-Founder
TEL;TYPE=CELL:+256700000000
EMAIL:muammar@skyrix.com
URL:https://skyrix-techologies.vercel.app
END:VCARD`;

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
    <div className="px-4 pb-12 w-full">
      <motion.button
        onClick={downloadVCard}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-full py-5 rounded-2xl bg-sky-500 font-bold text-white overflow-hidden group shadow-[0_0_20px_rgba(14,165,233,0.5)]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Save to Contacts <Download size={20} />
        </span>
        <div className="absolute inset-0 shimmer opacity-50" />
      </motion.button>
      
      <div className="mt-8 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[10px] text-white tracking-widest uppercase font-bold">
          Skyrix Technologies
        </span>
        <span className="text-[8px] text-white font-medium">
          Powered by Skyrix Tech
        </span>
      </div>
    </div>
  );
}
