import React from "react";
import { motion } from "motion/react";
import { Archivo_Black } from "next/font/google";
import {
  ArrowBigDown,
  ArrowBigDownDash,
  ArrowDownWideNarrow,
} from "lucide-react";

const ab = Archivo_Black({
  weight: "400", // Michroma has only one weight
  subsets: ["latin"],
});

export default function HeroSection() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start z-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className={`${ab.className} mt-48 text-center text-5xl sm:text-5xl md:text-6xl lg:text-8xl dark:text-white/90 text-gray-800/90 bg-green-600 dark:bg-purple-600 p-4 rounded filter drop-shadow-[0_0_16px_rgba(192,132,252,0.8)] bg-clip-text font-bold`}
      >
        Event Sphere
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
        className="dark:text-white/70 text-black/70 text-xl lg:text-2xl font-semibold mt-3"
      >
        Your gateway to every college event.
      </motion.h3>
      <motion.button
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn" }}
        className="absolute w-fit flex px-4 py-2 bg-black/30 hover:bg-black/40 dark:bg-white/10 dark:hover:bg-white/20 rounded-full animate-bounce bottom-36"
      >
        Explore events
        <span className="ml-2">
          <ArrowBigDownDash />
        </span>
      </motion.button>
    </div>
  );
}
