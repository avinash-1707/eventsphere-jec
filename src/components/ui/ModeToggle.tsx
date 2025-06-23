"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className={`z-20 ${
        theme == "dark"
          ? "bg-white/80 border-2 border-gray-700/80"
          : "bg-white/20 border-2 border-gray-700/20"
      }`}
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400/70 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-blue-600/70 transition-all" />
      )}
    </Button>
  );
}
