"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, MapPin, Tag, Filter } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import agendaData from "@/data/agenda.json";
import { formatDate } from "@/lib/utils";

const eventTypes = ["Todos", "Missa", "Reunião", "Adoração", "Retiro", "Formação", "EJC"];

export default function AgendaPage() {
  const [selectedType, setSelectedType] = useState("Todos");

  const filteredEvents = agendaData.filter((evt) =>
    selectedType === "Todos" ? true : evt.type === selectedType
  );

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-[#F6EFE3] dark:bg-[#1C1008] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#3D2618] text-[#E8D6B8] py-16">
        <div className="container-custom text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-widest text-[#B68A4B] font-semibold">
              Calendário de Atividades
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-2 mb-4">
              Agenda do EJC
            </h1>
            <p className="text-[#E8D6B8]/70 max-w-xl mx-auto text-base font-light">
              Fique por dentro das missas, formações, adorações e encontros das nossas equipes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-12 max-w-5xl">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-center">
          <Filter className="w-4 h-4 text-[#B68A4B] mr-2 flex-shrink-0" />
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedType === type
                  ? "bg-[#B68A4B] text-white shadow-md"
                  : "bg-white dark:bg-[#2A1910] text-[#5A3925] dark:text-[#E8D6B8] border border-[#D4B896] dark:border-[#4A3020] hover:border-[#B68A4B]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Timeline Events List */}
        <StaggerChildren className="space-y-6">
          {filteredEvents.map((event) => (
            <StaggerItem key={event.id}>
              <motion.div
                whileHover={{ x: 4 }}
                className="bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Date Badge */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#3D2618] text-[#E8D6B8] flex flex-col items-center justify-center flex-shrink-0 border border-[#5A3925]">
                    <span className="text-xs uppercase font-bold text-[#B68A4B]">
                      {new Date(event.date + "T00:00:00").toLocaleDateString("pt-BR", { month: "short" })}
                    </span>
                    <span className="font-display text-2xl font-bold leading-none">
                      {new Date(event.date + "T00:00:00").getDate()}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-[#B68A4B]/15 text-[#B68A4B]">
                        {event.type}
                      </span>
                      <span className="text-xs text-[#9B7E5E] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {event.time}h
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-[#3D2618] dark:text-[#E8D6B8]">
                      {event.title}
                    </h3>
                    <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/80 mt-1 max-w-xl">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#5A3925] dark:text-[#C9A46A] bg-[#F6EFE3] dark:bg-[#1C1008] px-4 py-2 rounded-xl border border-[#D4B896]/50 dark:border-[#4A3020] self-stretch md:self-auto justify-center">
                  <MapPin className="w-4 h-4 text-[#B68A4B]" />
                  {event.location}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
