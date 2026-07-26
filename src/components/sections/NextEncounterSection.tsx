"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ChevronRight, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { useCountdown } from "@/hooks/useCountdown";
import eventosData from "@/data/eventos.json";
import { formatDate } from "@/lib/utils";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1C1008]/90 border border-[#B68A4B]/40 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
        <span className="font-display text-2xl md:text-3xl font-bold text-[#B68A4B]">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-[#E8D6B8]/70 font-semibold">
        {label}
      </span>
    </div>
  );
}

export default function NextEncounterSection() {
  const event = eventosData[0];
  const timeLeft = useCountdown(event.date + "T19:00:00");
  const spotsPercent = Math.round(
    ((event.spots - event.spotsAvailable) / event.spots) * 100
  );

  return (
    <section
      id="encontro"
      className="section-padding bg-[#3D2618] dark:bg-[#1C1008] relative overflow-hidden text-[#E8D6B8]"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=2000&auto=format&fit=crop"
          alt="Adoração Eucarística"
          className="w-full h-full object-cover object-center opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3D2618] via-[#3D2618]/90 to-[#1C1008]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <FadeIn className="text-center mb-12">
          <div className="filigree-ornament mb-2">
            <span>✦ NÃO PERCA ✦</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Próximo Encontro
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B68A4B] to-transparent mx-auto" />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Event Card */}
          <FadeIn direction="left">
            <div className="bg-[#2A1910]/95 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-[#B68A4B]/40 sacred-frame shadow-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B68A4B]/20 border border-[#B68A4B]/40 text-[#B68A4B] text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#B68A4B] animate-pulse" />
                Inscrições Abertas (Vagas Limitadas)
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                {event.title}
              </h3>
              <p className="text-[#B68A4B] font-display text-lg mb-6 italic">&ldquo;{event.theme}&rdquo;</p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Calendar,
                    label: "Data do Retiro",
                    value: `${formatDate(event.date)} a ${formatDate(event.endDate)}`,
                  },
                  {
                    icon: MapPin,
                    label: "Localização Paroquial",
                    value: `${event.parish} – ${event.city}, ${event.state}`,
                  },
                  {
                    icon: Users,
                    label: "Vagas Restantes",
                    value: `${event.spotsAvailable} vagas disponíveis (de ${event.spots} no total)`,
                  },
                  {
                    icon: Clock,
                    label: "Diretor Espiritual",
                    value: event.chaplain,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#5A3925] flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#B68A4B]/30">
                      <item.icon className="w-4.5 h-4.5 text-[#B68A4B]" />
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9B7E5E] uppercase tracking-wider font-semibold">{item.label}</div>
                      <div className="text-[#E8D6B8] text-sm font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spots Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-[#E8D6B8]/70 mb-2 font-medium">
                  <span>Preenchimento de Vagas</span>
                  <span className="text-[#B68A4B] font-bold">{spotsPercent}%</span>
                </div>
                <div className="h-2.5 bg-[#1C1008] rounded-full overflow-hidden p-0.5 border border-[#5A3925]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#B68A4B] via-[#C9A46A] to-[#F0E2CC] rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${spotsPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              <Link
                href="/inscricao"
                className="btn-gold-shine group w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#B68A4B] to-[#8C6530] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(182,138,75,0.4)]"
              >
                Garantir Minha Vaga (Gratuito)
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Live Countdown */}
          <FadeIn direction="right">
            <div className="text-center space-y-8">
              <div>
                <span className="text-[#B68A4B] text-xs uppercase tracking-widest font-bold">
                  Contagem Regressiva para o Retiro
                </span>
                <h4 className="font-display text-2xl text-white mt-1">O Encontro se Aproxima</h4>
              </div>

              <div className="flex items-start justify-center gap-3 md:gap-5">
                <CountdownUnit value={timeLeft.days} label="Dias" />
                <span className="text-[#B68A4B] text-3xl font-light mt-4">:</span>
                <CountdownUnit value={timeLeft.hours} label="Horas" />
                <span className="text-[#B68A4B] text-3xl font-light mt-4">:</span>
                <CountdownUnit value={timeLeft.minutes} label="Min" />
                <span className="text-[#B68A4B] text-3xl font-light mt-4">:</span>
                <CountdownUnit value={timeLeft.seconds} label="Seg" />
              </div>

              <div className="p-7 rounded-3xl border border-[#B68A4B]/30 bg-[#2A1910]/70 backdrop-blur-md max-w-md mx-auto shadow-xl">
                <div className="font-display text-3xl text-[#B68A4B] mb-2">✦</div>
                <p className="font-display text-xl italic text-white/90 leading-relaxed">
                  &ldquo;Porque para mim o viver é Cristo, e o morrer é lucro.&rdquo;
                </p>
                <p className="text-[#B68A4B] text-xs font-bold uppercase tracking-widest mt-3">
                  Filipenses 1,21
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

