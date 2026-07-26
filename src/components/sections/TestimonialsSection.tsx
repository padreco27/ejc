"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import testemunhosData from "@/data/testemunhos.json";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testemunhosData.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testemunhosData.length - 1 ? 0 : c + 1));
  const testimonial = testemunhosData[current];

  return (
    <section
      id="testemunhos"
      className="section-padding bg-[#F6EFE3] dark:bg-[#1C1008] relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#B68A4B]/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#5A3925]/5 blur-3xl" />

      <div className="container-custom relative z-10">
        <FadeIn className="text-center mb-12">
          <span className="inline-block text-[#B68A4B] text-sm uppercase tracking-widest font-semibold mb-3">
            Histórias Reais
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#3D2618] dark:text-[#E8D6B8] mb-4">
            Vidas Transformadas
          </h2>
          <div className="w-16 h-0.5 bg-[#B68A4B] mx-auto" />
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-[#2A1910] rounded-2xl p-8 md:p-12 border border-[#D4B896] dark:border-[#4A3020] text-center"
            >
              {/* Quote icon */}
              <div className="w-14 h-14 rounded-full bg-[#B68A4B]/10 flex items-center justify-center mx-auto mb-6">
                <Quote className="w-7 h-7 text-[#B68A4B]" />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#B68A4B]" fill="#B68A4B" />
                ))}
              </div>

              <p className="font-display text-xl md:text-2xl italic text-[#3D2618] dark:text-[#E8D6B8] leading-relaxed mb-8">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B68A4B] to-[#5A3925] flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <p className="font-semibold text-[#3D2618] dark:text-[#E8D6B8] mt-2">
                  {testimonial.name}
                </p>
                <p className="text-sm text-[#9B7E5E]">
                  {testimonial.age} anos · {testimonial.city}
                </p>
                <p className="text-xs text-[#B68A4B] font-semibold mt-1">{testimonial.ejcEdition}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#D4B896] dark:border-[#4A3020] flex items-center justify-center text-[#5A3925] dark:text-[#E8D6B8] hover:bg-[#E8D6B8] dark:hover:bg-[#2A1910] transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testemunhosData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-[#B68A4B]"
                      : "bg-[#D4B896] dark:bg-[#4A3020]"
                  }`}
                  aria-label={`Testemunho ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#D4B896] dark:border-[#4A3020] flex items-center justify-center text-[#5A3925] dark:text-[#E8D6B8] hover:bg-[#E8D6B8] dark:hover:bg-[#2A1910] transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
