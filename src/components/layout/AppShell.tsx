"use client";

import { useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const stored = localStorage.getItem("ejc-theme");
    if (stored === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("ejc-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("ejc-theme", "light");
      }
      return next;
    });
  };

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
