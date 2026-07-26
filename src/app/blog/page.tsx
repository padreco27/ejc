"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Clock, User, ArrowRight, Tag } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import blogData from "@/data/blog.json";
import { formatDate } from "@/lib/utils";

const categories = [
  "Todos",
  "Espiritualidade",
  "Liturgia",
  "Formação",
  "Santos",
  "Testemunhos",
  "Eventos",
  "Avisos",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogData.filter((post) => {
    const matchesCategory =
      selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-[#F6EFE3] dark:bg-[#1C1008] min-h-screen">
      {/* Blog Header */}
      <section className="bg-[#3D2618] text-[#E8D6B8] py-16">
        <div className="container-custom text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-widest text-[#B68A4B] font-semibold">
              Portal Medium EJC
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-2 mb-4">
              Blog & Artigos Espirituais
            </h1>
            <p className="text-[#E8D6B8]/70 max-w-xl mx-auto text-base font-light mb-8">
              Reflexões, vida dos santos, testemunhos e novidades sobre o Encontro de Jovens com Cristo.
            </p>

            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Buscar artigos por título, autor ou palavra-chave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1C1008] border border-[#5A3925] focus:border-[#B68A4B] rounded-full px-6 py-3.5 pl-12 text-sm text-[#E8D6B8] placeholder-[#9B7E5E] outline-none"
              />
              <Search className="w-4 h-4 text-[#B68A4B] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#B68A4B] text-white shadow-md"
                  : "bg-white dark:bg-[#2A1910] text-[#5A3925] dark:text-[#E8D6B8] border border-[#D4B896] dark:border-[#4A3020] hover:border-[#B68A4B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="text-xs text-[#9B7E5E] mb-6">
          Exibindo {filteredPosts.length} artigo(s)
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#2A1910] rounded-2xl border border-[#D4B896] dark:border-[#4A3020]">
            <p className="text-[#5A3925] dark:text-[#E8D6B8] text-lg font-display">
              Nenhum artigo encontrado para sua busca.
            </p>
          </div>
        ) : (
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    className="h-full bg-white dark:bg-[#2A1910] rounded-2xl border border-[#D4B896] dark:border-[#4A3020] overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all"
                  >
                    <div>
                      {/* Thumbnail Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-[#5A3925] via-[#3D2618] to-[#2A1005] relative p-4 flex flex-col justify-between">
                        <span className="self-start px-3 py-1 bg-[#B68A4B] text-white text-[10px] uppercase font-bold tracking-wider rounded-full">
                          {post.category}
                        </span>
                        <div className="text-[#E8D6B8]/30 font-display text-4xl text-right">
                          ✝
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-[#9B7E5E] mb-3">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-xl text-[#3D2618] dark:text-[#E8D6B8] mb-3 leading-snug hover:text-[#B68A4B] transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/80 leading-relaxed line-clamp-3 mb-4">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-0 border-t border-[#F6EFE3] dark:border-[#3D2618] flex items-center justify-between mt-auto">
                      <span className="text-[10px] text-[#9B7E5E]">
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="text-xs font-bold text-[#B68A4B] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Ler Mais <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        )}
      </div>
    </div>
  );
}
