"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Moon, Sun, ChevronDown,
  Home, Info, BookOpen, ShoppingBag, Image, Calendar, Users, ClipboardList, Phone, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LilyFlower } from "@/components/ui/SacredArtwork";

const navItems = [
  { label: "Início", href: "/", icon: Home },
  { label: "Sobre", href: "/sobre", icon: Info },
  {
    label: "Conteúdo",
    icon: BookOpen,
    children: [
      { label: "Blog", href: "/blog", icon: BookOpen, desc: "Artigos e reflexões espirituais" },
      { label: "Galeria", href: "/galeria", icon: Image, desc: "Fotos e vídeos dos encontros" },
      { label: "Agenda", href: "/agenda", icon: Calendar, desc: "Próximos eventos e missas" },
    ],
  },
  { label: "Equipes", href: "/equipes", icon: Users },
  { label: "Loja Solidária", href: "/loja", icon: ShoppingBag },
  { label: "Inscrição", href: "/inscricao", icon: ClipboardList },
  { label: "Contato", href: "/contato", icon: Phone },
  { label: "Admin", href: "/admin", icon: Shield, highlight: true },
];

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaMenuOpen(null);
  }, [pathname]);

  const isHome = pathname === "/";
  const navBg = scrolled
    ? "bg-[#F6EFE3]/95 dark:bg-[#1C1008]/95 backdrop-blur-xl shadow-lg shadow-[#5A3925]/10 border-b border-[#D4B896]/50"
    : isHome
    ? "bg-transparent"
    : "bg-[#F6EFE3]/95 dark:bg-[#1C1008]/95 backdrop-blur-xl border-b border-[#D4B896]/50";

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          navBg
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#5A3925] border border-[#B68A4B] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                <LilyFlower className="w-6 h-6 text-[#E8D6B8]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={cn(
                  "font-display font-bold text-xl tracking-wide transition-colors duration-300",
                  (scrolled || !isHome) ? "text-[#5A3925] dark:text-[#E8D6B8]" : "text-white"
                )}>
                  EJC
                </span>
                <span className={cn(
                  "text-[9px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300",
                  (scrolled || !isHome) ? "text-[#B68A4B]" : "text-[#E8D6B8]"
                )}>
                  Flor do Carmelo
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(item.label)}
                    onMouseLeave={() => setMegaMenuOpen(null)}
                  >
                    <button className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      (scrolled || !isHome)
                        ? "text-[#5A3925] dark:text-[#E8D6B8] hover:bg-[#E8D6B8] dark:hover:bg-[#2A1910]"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}>
                      {item.label}
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        megaMenuOpen === item.label ? "rotate-180" : ""
                      )} />
                    </button>
                    <AnimatePresence>
                      {megaMenuOpen === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-[#F6EFE3] dark:bg-[#2A1910] rounded-xl shadow-2xl border border-[#D4B896] dark:border-[#4A3020] overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-3 p-4 hover:bg-[#E8D6B8] dark:hover:bg-[#3D2618] transition-colors group"
                            >
                              <child.icon className="w-5 h-5 text-[#B68A4B] mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-sm font-semibold text-[#3D2618] dark:text-[#E8D6B8] group-hover:text-[#5A3925]">
                                  {child.label}
                                </div>
                                <div className="text-xs text-[#9B7E5E] mt-0.5">{child.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-[#B68A4B] text-white"
                        : (scrolled || !isHome)
                        ? "text-[#5A3925] dark:text-[#E8D6B8] hover:bg-[#E8D6B8] dark:hover:bg-[#2A1910]"
                        : "text-white/90 hover:text-white hover:bg-white/10",
                      item.label === "Inscrição" && pathname !== item.href
                        ? (scrolled || !isHome)
                          ? "border border-[#B68A4B] text-[#B68A4B] hover:bg-[#B68A4B] hover:text-white"
                          : "border border-white/60 hover:bg-white/20"
                        : "",
                      item.label === "Admin" && pathname !== item.href
                        ? "opacity-50 hover:opacity-100"
                        : ""
                    )}
                  >
                    <item.icon className="w-3.5 h-3.5 mr-1.5 inline-block" />
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                  (scrolled || !isHome)
                    ? "text-[#5A3925] dark:text-[#E8D6B8] hover:bg-[#E8D6B8] dark:hover:bg-[#2A1910]"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Alternar tema"
              >
                {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  "lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200",
                  (scrolled || !isHome)
                    ? "text-[#5A3925] dark:text-[#E8D6B8] hover:bg-[#E8D6B8] dark:hover:bg-[#2A1910]"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-[#F6EFE3] dark:bg-[#1C1008] pt-20 overflow-y-auto lg:hidden"
          >
            <div className="container-custom py-6 space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <div className="px-4 py-2 text-xs uppercase tracking-widest text-[#B68A4B] font-semibold mt-4 mb-1">
                      {item.label}
                    </div>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-[#5A3925] dark:text-[#E8D6B8] hover:bg-[#E8D6B8] dark:hover:bg-[#2A1910] transition-colors",
                          pathname === child.href && "bg-[#B68A4B] text-white dark:text-white"
                        )}
                      >
                        <child.icon className="w-5 h-5 opacity-70" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-[#5A3925] dark:text-[#E8D6B8] hover:bg-[#E8D6B8] dark:hover:bg-[#2A1910] transition-colors font-medium",
                      pathname === item.href && "bg-[#B68A4B] text-white dark:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5 opacity-70" />
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
