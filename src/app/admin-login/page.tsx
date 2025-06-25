"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import DarkModeToggle from "@/components/ui/ModeToggle";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    toast("Checking credentials... ");
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.ok) {
      router.push("/admin/dashboard");
    } else {
      toast("❌ Invalid credentials!", {
        description: "Please check username and password",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-200 via-white to-blue-200 dark:bg-gradient-to-br dark:from-blue-950 dark:via-black dark:to-violet-950 ">
      <div className="absolute top-0 right-0 m-5">
        <DarkModeToggle />
      </div>
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-6 lg:mx-0 mx-4 bg-black/30 dark:bg-white/60 rounded-2xl shadow"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Admin Login
        </h2>
        <p className="text-black mb-1.5">Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-3 p-2 bg-white/30 dark:bg-black/20 rounded-md text-black"
        />
        <p className="text-black mb-1.5">Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 bg-white/30  dark:bg-black/20 rounded-md text-black"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-2xl bg-black text-white mt-2 py-2"
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}
