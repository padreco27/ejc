"use client";

import { motion } from "framer-motion";
import { Heart, Compass, Shield, History, Sparkles, CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";

const timelineEvents = [
  {
    year: "1970",
    title: "Origem do EJC",
    description: "O movimento de Encontro de Jovens com Cristo nasceu no Brasil, inspirado no movimento de Cursilhos de Cristandade e na rica tradição carmelita de contemplação e ação.",
  },
  {
    year: "2015",
    title: "Chegada à Paróquia",
    description: "O EJC foi implantado na Paróquia Nossa Senhora do Carmo por iniciativa de jovens e sacerdotes inspirados a criar um espaço de acolhimento jovem.",
  },
  {
    year: "2024",
    title: "I EJC PNSC",
    description: "Realização do primeiro encontro da paróquia, reunindo 70 jovens retirantes e mobilizando mais de 100 servos nas equipes de apoio.",
  },
  {
    year: "2025",
    title: "II EJC PNSC",
    description: "Consolidação do movimento com a realização da segunda edição e a criação da Loja Solidária Flor do Carmelo.",
  },
  {
    year: "2026",
    title: "III EJC – Edição Atual",
    description: "Preparação para o III EJC sob a proteção de Nossa Senhora do Carmo, com ampliação de equipes e projetos de formação continuada.",
  },
];

const pillars = [
  {
    title: "Oração e Contemplação",
    desc: "Enraizados no silêncio e na busca constante de Deus através dos sacramentos e da adoração eucarística.",
  },
  {
    title: "Fraternidade e Acolhimento",
    desc: "Um ambiente onde todo jovem se sente amado, respeitado e acolhido exatamente como é.",
  },
  {
    title: "Formação Humana e Cristã",
    desc: "Estudo contínuo da Doutrina Social da Igreja, virtudes cristãs e discernimento vocacional.",
  },
  {
    title: "Ação Apostólica e Serviço",
    desc: "O jovem evangelizando outro jovem através do serviço humilde nas equipes do movimento.",
  },
];

export default function SobrePage() {
  return (
    <div className="pt-28 md:pt-36 pb-20 bg-[#F6EFE3] dark:bg-[#1C1008] min-h-screen">
      {/* Banner Header */}
      <section className="bg-[#3D2618] text-[#E8D6B8] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-[#B68A4B]_1px,transparent_1px] [background-size:16px_16px]" />
        <div className="container-custom relative z-10 text-center">
          <FadeIn>
            <span className="inline-block text-[#B68A4B] text-xs uppercase tracking-widest font-semibold mb-3">
              Identidade & História
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Sobre o EJC
            </h1>
            <div className="w-20 h-0.5 bg-[#B68A4B] mx-auto mb-6" />
            <p className="text-[#E8D6B8]/80 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Conheça a história, a missão e a espiritualidade que movem o Encontro de Jovens com Cristo sob o manto de Nossa Senhora do Carmo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Nossa Missão",
                desc: "Proporcionar aos jovens um encontro pessoal com Jesus Cristo através de retiros, formação espiritual e vivência comunitária, despertando neles o desejo de serem discípulos missionários.",
              },
              {
                icon: Compass,
                title: "Nossa Visão",
                desc: "Ser um farol de esperança e fé para a juventude católica, formando líderes cristãos comprometidos com a verdade, a caridade e a renovação da sociedade.",
              },
              {
                icon: Shield,
                title: "Nossos Valores",
                desc: "Fidelidade à Igreja Católica, espiritualidade marianas, amor à Eucaristia, humildade no serviço, caridade fraterna e busca pela santidade no cotidiano.",
              },
            ].map((box, i) => (
              <FadeIn key={box.title} delay={0.1 * (i + 1)}>
                <div className="bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] rounded-2xl p-8 h-full shadow-lg hover:border-[#B68A4B] transition-all">
                  <div className="w-12 h-12 rounded-xl bg-[#B68A4B]/10 flex items-center justify-center text-[#B68A4B] mb-6">
                    <box.icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#3D2618] dark:text-[#E8D6B8] mb-3">
                    {box.title}
                  </h2>
                  <p className="text-[#5A3925] dark:text-[#C9A46A]/80 text-sm leading-relaxed">
                    {box.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pilares da Espiritualidade */}
      <section className="py-16 bg-[#EDE4D4] dark:bg-[#2A1910]">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <span className="inline-block text-[#B68A4B] text-xs uppercase tracking-widest font-semibold mb-2">
              Espiritualidade Carmelita
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3D2618] dark:text-[#E8D6B8]">
              Os 4 Pilares do Movimento
            </h2>
          </FadeIn>

          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-white dark:bg-[#1C1008] p-6 rounded-2xl border border-[#D4B896] dark:border-[#5A3925]">
                  <CheckCircle2 className="w-6 h-6 text-[#B68A4B] mb-4" />
                  <h3 className="font-display font-bold text-lg text-[#3D2618] dark:text-[#E8D6B8] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/70 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#B68A4B] text-xs uppercase tracking-widest font-semibold mb-2">
              <History className="w-4 h-4" />
              Nossa Trajetória
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-[#3D2618] dark:text-[#E8D6B8]">
              Linha do Tempo
            </h2>
          </FadeIn>

          <div className="relative border-l-2 border-[#B68A4B]/40 ml-4 md:ml-32 space-y-12">
            {timelineEvents.map((event, index) => (
              <FadeIn key={event.year} delay={index * 0.1}>
                <div className="relative pl-8 md:pl-10 group">
                  {/* Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#B68A4B] border-4 border-[#F6EFE3] dark:border-[#1C1008] group-hover:scale-125 transition-transform" />

                  {/* Year Tag */}
                  <div className="md:absolute md:-left-32 md:top-0 text-sm font-bold text-[#B68A4B] mb-1 md:mb-0">
                    {event.year}
                  </div>

                  <div className="bg-white dark:bg-[#2A1910] p-6 rounded-2xl border border-[#D4B896] dark:border-[#4A3020] shadow-md">
                    <h3 className="font-display font-bold text-xl text-[#3D2618] dark:text-[#E8D6B8] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#5A3925] dark:text-[#C9A46A]/80 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
