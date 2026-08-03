"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, User, Tag, ChevronRight, ArrowRight } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  author: string;
  readTime: number;
  publishedAt: string;
  image: string;
  category: string;
  featured: boolean;
}

const categoryColors: Record<string, string> = {
  Espiritualidade: "bg-[#5A3925]/10 text-[#5A3925] dark:bg-[#5A3925]/20 dark:text-[#C9A46A]",
  Liturgia: "bg-[#B68A4B]/10 text-[#8C6530] dark:text-[#B68A4B]",
  Formação: "bg-[#3D2618]/10 text-[#3D2618] dark:text-[#E8D6B8]",
  Santos: "bg-[#B68A4B]/15 text-[#7A5540]",
  Testemunhos: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Eventos: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  Avisos: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export default function BlogPreview() {
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar artigos");
        return res.json();
      })
      .then((data) => setBlogData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const featured = blogData.filter((p) => p.featured)[0] ?? null;
  const recent = blogData.filter((p) => !p.featured).slice(0, 4);

  return (
    <section id="blog" className="section-padding bg-[#EDE4D4] dark:bg-[#2A1910]">
      <div className="container-custom">
        {/* Header */}
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block text-[#B68A4B] text-sm uppercase tracking-widest font-semibold mb-3">
              Blog & Reflexões
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#3D2618] dark:text-[#E8D6B8]">
              Palavra & Vida
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[#B68A4B] font-semibold hover:gap-3 transition-all group whitespace-nowrap"
          >
            Ver todos os artigos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

        {loading ? (
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 h-96 rounded-3xl bg-white/70 dark:bg-[#2A1910]/60 animate-pulse" />
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-28 rounded-3xl bg-white/70 dark:bg-[#2A1910]/60 animate-pulse" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] p-8 text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : !featured ? (
          <div className="rounded-3xl bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] p-8 text-center text-[#3D2618] dark:text-[#E8D6B8]">
            Nenhum artigo disponível no momento.
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Featured Post */}
            <FadeIn className="lg:col-span-3" direction="left">
              <Link href={`/blog/${featured.slug}`}>
                <motion.article
                  whileHover={{ scale: 1.01 }}
                  className="group h-full bg-white dark:bg-[#3D2618] rounded-2xl overflow-hidden border border-[#D4B896] dark:border-[#5A3925] card-hover"
                >
                  {/* Image */}
                  <div className="h-64 relative overflow-hidden bg-[#3D2618]">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[featured.category] || "bg-gray-100 text-gray-700"}`}>
                        {featured.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#B68A4B] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-lg">
                        ✦ Destaque Espiritual
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-[#9B7E5E] mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {featured.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featured.readTime} min
                      </span>
                      <span>{formatDate(featured.publishedAt)}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#3D2618] dark:text-[#E8D6B8] mb-3 group-hover:text-[#B68A4B] transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-sm text-[#5A3925] dark:text-[#C9A46A]/70 leading-relaxed mb-4">
                      {featured.summary}
                    </p>
                    <span className="flex items-center gap-1 text-[#B68A4B] text-sm font-semibold group-hover:gap-2 transition-all">
                      Ler artigo completo
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.article>
              </Link>
            </FadeIn>

            {/* Recent Posts */}
            <StaggerChildren className="lg:col-span-2 space-y-4">
              {recent.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`}>
                    <motion.article
                      whileHover={{ x: 4 }}
                      className="group flex gap-4 bg-white dark:bg-[#3D2618] rounded-xl p-4 border border-[#D4B896] dark:border-[#5A3925] transition-all hover:border-[#B68A4B]"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#3D2618] relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] || ""}`}>
                          {post.category}
                        </span>
                        <h4 className="font-display text-sm font-bold text-[#3D2618] dark:text-[#E8D6B8] mt-1 leading-tight group-hover:text-[#B68A4B] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-[#9B7E5E]">
                          <span>{post.readTime} min</span>
                          <span>·</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        )}
      </div>
    </section>
  );
}
