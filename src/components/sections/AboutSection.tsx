"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, BookOpen, Globe, Star, ChevronRight, Sparkles } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";

const values = [
  {
    icon: Heart,
    title: "Fé",
    description: "Uma fé viva, pessoal e transformadora. Acreditamos que o encontro com Cristo muda o coração e renova a vida.",
  },
  {
    icon: Globe,
    title: "Tradição",
    description: "Enraizados na espiritualidade carmelita e na tradição bimilenar da Igreja Católica.",
  },
  {
    icon: BookOpen,
    title: "Formação",
    description: "Formamos jovens integralmente: humana, espiritual, intelectual e apostolicamente.",
  },
  {
    icon: Star,
    title: "Missão",
    description: "Somos enviados para evangelizar, levar o amor de Cristo a outros jovens e transformar o mundo.",
  },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="section-padding bg-[#F6EFE3] dark:bg-[#1C1008] relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <div className="filigree-ornament mb-2">
            <span>✿ SOBRE O MOVIMENTO ✿</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-[#3D2618] dark:text-[#E8D6B8] mb-4">
            O que é o EJC?
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B68A4B] to-transparent mx-auto mb-6" />
          <p className="text-[#5A3925] dark:text-[#C9A46A]/80 max-w-2xl mx-auto leading-relaxed text-lg font-light">
            O Encontro de Jovens com Cristo é um movimento de evangelização da Igreja Católica
            que proporciona aos jovens uma experiência pessoal, viva e transformadora com Jesus Cristo.
          </p>
        </FadeIn>

        {/* Main Content with Photo */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Text */}
          <FadeIn direction="left">
            <div className="space-y-6">
              <div className="space-y-4 text-[#5A3925] dark:text-[#C9A46A]/90 leading-relaxed text-base">
                <p>
                  Nascido na espiritualidade carmelita e no amor à Nossa Senhora do Carmo, o EJC é
                  um fim de semana de retiro onde jovens de 15 a 35 anos são convidados a se
                  encontrar com Cristo de forma pessoal e profunda.
                </p>
                <p>
                  Durante o encontro, os participantes vivem momentos intensos de oração, adoração
                  eucarística, partilha, testemunhos e celebrações que tocam o coração e transformam
                  vidas. Muitos jovens chegam ao EJC afastados da fé e saem com um relacionamento
                  vivo e apaixonado com Jesus Cristo.
                </p>
                <p>
                  Nossa espiritualidade é enraizada na tradição do Carmelo e na devoção a Nossa
                  Senhora, que nos guia ao seu Filho com ternura e amor materno.
                </p>
              </div>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 text-[#B68A4B] font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-300 group pt-2"
              >
                Conheça nossa história completa
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Visual Card with Image & Quote */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#B68A4B]/40">
            <img
              src="https://images.unsplash.com/photo-1548625361-186f87452d3a?q=80&w=1200&auto=format&fit=crop"
              alt="Retiro de Jovens"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="bg-[#1C1008]/70 backdrop-blur-md rounded-2xl border border-[#B68A4B]/30 p-6 md:p-8 shadow-2xl">
                <div className="flex gap-4">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-[#B68A4B] to-transparent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-3xl text-[#B68A4B] leading-none mb-2">❝</div>
                    <blockquote className="font-display text-xl md:text-2xl italic leading-relaxed text-white">
                      &ldquo;Cristo vive em mim, e a vida que agora vivo na carne, vivo-a pela fé no Filho de Deus.&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-[#B68A4B]/60 to-transparent" />
                      <cite className="text-[#B68A4B] text-xs font-bold uppercase tracking-widest not-italic whitespace-nowrap">
                        Gálatas 2,20 · lema do movimento
                      </cite>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-[#2A1910] rounded-2xl p-7 border border-[#D4B896] dark:border-[#4A3020] card-hover cursor-default shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#B68A4B]/15 flex items-center justify-center mb-5 border border-[#B68A4B]/30">
                  <value.icon className="w-6 h-6 text-[#B68A4B]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#3D2618] dark:text-[#E8D6B8] mb-2">
                  {value.title}
                </h3>
                <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/80 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

