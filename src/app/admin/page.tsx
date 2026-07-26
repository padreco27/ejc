"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, ShoppingBag, Image, Calendar, ArrowRight } from "lucide-react";

interface SectionCount {
  label: string;
  href: string;
  icon: typeof BookOpen;
  count: number;
  color: string;
}

export default function AdminDashboard() {
  const [sections, setSections] = useState<SectionCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/blog").then((r) => r.json()),
      fetch("/api/produtos").then((r) => r.json()),
      fetch("/api/galeria").then((r) => r.json()),
      fetch("/api/agenda").then((r) => r.json()),
    ])
      .then(([blog, produtos, galeria, agenda]) => {
        setSections([
          {
            label: "Blog",
            href: "/admin/blog",
            icon: BookOpen,
            count: Array.isArray(blog) ? blog.length : 0,
            color: "from-dourado to-dourado-dark",
          },
          {
            label: "Loja Solidária",
            href: "/admin/loja",
            icon: ShoppingBag,
            count: Array.isArray(produtos) ? produtos.length : 0,
            color: "from-carmelo-light to-carmelo",
          },
          {
            label: "Galeria",
            href: "/admin/galeria",
            icon: Image,
            count: Array.isArray(galeria) ? galeria.length : 0,
            color: "from-dourado-light to-dourado",
          },
          {
            label: "Agenda",
            href: "/admin/agenda",
            icon: Calendar,
            count: Array.isArray(agenda) ? agenda.length : 0,
            color: "from-carmelo to-carmelo-dark",
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-carmelo dark:text-bege">
          Dashboard
        </h1>
        <p className="text-muted mt-1 text-sm">
          Gerencie os conteúdos do site EJC Flor do Carmelo
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 rounded-2xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}
                  >
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-carmelo dark:text-bege">
                      {section.label}
                    </h2>
                    <p className="text-3xl font-bold text-dourado mt-1">
                      {section.count}{" "}
                      <span className="text-sm font-normal text-muted">
                        {section.count === 1 ? "item" : "itens"}
                      </span>
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted group-hover:text-dourado transition-colors group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
