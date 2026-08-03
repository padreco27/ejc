"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Warm Carmelo Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"
          alt="Jovens reunidos em oração"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008] via-[#3D2618]/85 to-[#5A3925]/70 backdrop-brightness-75" />
      </div>

      {/* Decorative Sacred Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        {/* Subtle Cross watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 flex items-center justify-center">
          <div className="w-1.5 h-full bg-gradient-to-b from-transparent via-[#B68A4B] to-transparent" />
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#B68A4B] to-transparent absolute" />
        </div>

        {/* Gold Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#B68A4B]/15 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-[#C9A46A]/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center pt-32 md:pt-40 pb-16">


        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0 }}
          className="font-display font-bold text-5xl sm:text-7xl lg:text-9xl text-white leading-tight mb-6 tracking-tight drop-shadow-2xl"
        >
          Cristo{" "}
          <span className="gradient-text drop-shadow-[0_4px_25px_rgba(182,138,75,0.4)]">
            Vive.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="text-xl md:text-3xl text-[#E8D6B8]/90 max-w-3xl mx-auto mb-10 leading-relaxed font-display italic drop-shadow"
        >
          &ldquo;Venha viver um encontro que transforma vidas.&rdquo;
        </motion.p>

        {/* Filigree Ornament Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="filigree-ornament mb-10"
        >
          <span>✦ ✝ ✦</span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Link
            href="/inscricao"
            className="btn-gold-shine group flex items-center gap-3 px-9 py-4.5 bg-gradient-to-r from-[#B68A4B] via-[#C9A46A] to-[#8C6530] text-white font-bold text-base rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(182,138,75,0.5)] border border-[#F0E2CC]/30"
          >
            Quero Participar
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/sobre"
            className="group flex items-center gap-3 px-8 py-4.5 bg-[#3D2618]/60 backdrop-blur-md border border-[#B68A4B]/40 hover:border-[#B68A4B] text-white font-medium rounded-2xl transition-all duration-300 hover:bg-[#3D2618]/90"
          >
            <Play className="w-4 h-4 text-[#B68A4B]" fill="#B68A4B" />
            Conheça o EJC
          </Link>
        </motion.div>

        {/* Sacred Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto p-6 rounded-2xl bg-[#1C1008]/60 backdrop-blur-md border border-[#B68A4B]/20 shadow-2xl"
        >
          {[
            { value: "200+", label: "Jovens Transformados" },
            { value: "3ª", label: "Edição do Encontro" },
            { value: "100%", label: "Gratuito & Solidário" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-4xl font-bold text-[#B68A4B]">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs text-[#E8D6B8]/70 mt-1 uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#E8D6B8]/60 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold">Deslize</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4 text-[#B68A4B]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

