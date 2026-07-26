"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, BookOpen, ShoppingBag, Image, Calendar, ClipboardList,
  LogOut, ChevronLeft, ChevronRight
} from "lucide-react";
import { LilyFlower } from "@/components/ui/SacredArtwork";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Loja Solidária", href: "/admin/loja", icon: ShoppingBag },
  { label: "Galeria", href: "/admin/galeria", icon: Image },
  { label: "Agenda", href: "/admin/agenda", icon: Calendar },
  { label: "Inscrições", href: "/admin/inscricoes", icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-carmelo-dark text-bege flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center border-b border-dourado/20",
        collapsed ? "justify-center p-4" : "gap-3 p-5"
      )}>
        <div className="w-9 h-9 rounded-full bg-dourado/20 border border-dourado/40 flex items-center justify-center flex-shrink-0">
          <LilyFlower className="w-5 h-5 text-dourado" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight min-w-0">
            <span className="font-display font-bold text-lg tracking-wide text-bege truncate">
              Admin
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] font-semibold text-dourado truncate">
              EJC Flor do Carmelo
            </span>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-carmelo border border-dourado/40 text-dourado flex items-center justify-center hover:bg-dourado hover:text-carmelo-dark transition-colors"
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-dourado/20 text-dourado border border-dourado/30"
                  : "text-bege/70 hover:text-bege hover:bg-white/5"
              )}
              title={collapsed ? link.label : undefined}
            >
              <link.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-dourado")} />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-dourado/20 p-2">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-bege/60 hover:text-red-400 hover:bg-red-500/10 transition-all",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? "Sair" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
