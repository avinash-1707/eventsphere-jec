"use client";
import React from "react";

import { motion } from "motion/react";
import DarkModeToggle from "@/components/ui/ModeToggle";
import HeroSection from "@/components/HeroSection";
import EventsListing from "@/components/EventsListing";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-white dark:bg-black px-2 lg:px-24 py-10 overflow-hidden">
      <div className="p-5 h-fit w-fit absolute top-0 right-0 z-50">
        <Button
          className="mr-3 bg-gray-700/50 dark:bg-white/50 hover:bg-gray-700/70 dark:hover:bg-white/70"
          onClick={() => router.push("/admin-login")}
        >
          Admin Login
        </Button>
        <DarkModeToggle />
      </div>
      <motion.img
        initial={{ scale: 1.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeIn" }}
        src="/bg-image.png"
        alt="Background image"
        className="absolute inset-0 w-screen h-screen dark:invert-0 invert object-cover blur-lg opacity-80 pointer-events-none z-10 over"
      />
      <HeroSection />
      <EventsListing />
    </div>
  );
}
