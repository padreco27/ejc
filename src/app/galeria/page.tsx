"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Image as ImageIcon, Video, Calendar, Filter, Maximize2 } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import galeriaData from "@/data/galeria.json";
import { formatDate } from "@/lib/utils";

const categories = ["Todos", "Encontros", "Missas", "Retiros"];

export default function GaleriaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [lightboxItem, setLightboxItem] = useState<(typeof galeriaData)[0] | null>(null);

  const filteredItems = galeriaData.filter((item) =>
    selectedCategory === "Todos" ? true : item.category === selectedCategory
  );

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-[#F6EFE3] dark:bg-[#1C1008] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#3D2618] text-[#E8D6B8] py-16">
        <div className="container-custom text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-widest text-[#B68A4B] font-semibold">
              Registros & Memórias
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-2 mb-4">
              Galeria de Encontros
            </h1>
            <p className="text-[#E8D6B8]/70 max-w-xl mx-auto text-base font-light">
              Momentos marcantes de oração, louvor, retiros e celebrações da juventude EJC.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#B68A4B] text-white shadow-md"
                  : "bg-white dark:bg-[#2A1910] text-[#5A3925] dark:text-[#E8D6B8] border border-[#D4B896] dark:border-[#4A3020] hover:border-[#B68A4B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <StaggerChildren className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <StaggerItem key={item.id} className="break-inside-avoid">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightboxItem(item)}
                className="group relative bg-[#3D2618] rounded-2xl overflow-hidden border border-[#D4B896] dark:border-[#4A3020] cursor-pointer shadow-md"
              >
                {/* Visual Image Render */}
                <div className="w-full relative overflow-hidden bg-[#2A1910]">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ minHeight: "220px", maxHeight: "400px" }}
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <span className="bg-[#3D2618]/80 backdrop-blur-md border border-[#B68A4B]/40 text-[#E8D6B8] text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008] via-[#3D2618]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <div className="w-9 h-9 rounded-full bg-[#B68A4B] flex items-center justify-center text-white shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-1 drop-shadow">{item.title}</h3>
                    <p className="text-xs text-[#E8D6B8]/90 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#B68A4B] mt-2 font-bold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.date)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-[#2A1910] border border-[#5A3925] rounded-3xl overflow-hidden relative shadow-2xl"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#1C1008]/80 text-[#E8D6B8] flex items-center justify-center hover:bg-[#B68A4B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Container */}
              <div className="relative bg-[#1C1008] max-h-[500px] overflow-hidden flex items-center justify-center">
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="w-full max-h-[480px] object-contain"
                />
              </div>

              <div className="p-8 text-[#E8D6B8]">
                <p className="text-sm text-[#C9A46A]/80 leading-relaxed mb-4">
                  {lightboxItem.description}
                </p>
                <div className="text-xs text-[#9B7E5E]">
                  Arquivo original em alta definição armazenado no acervo da equipe de Comunicação EJC.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
