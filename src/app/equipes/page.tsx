"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Crown, Users, FileText, BookOpen, Music, Heart, Home, Flower, Camera, ChefHat, Wrench
} from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";

interface EquipeItem {
  id: number;
  name: string;
  description: string;
  members: number;
  coordinator: string;
  coordinatorRole: string;
  icon: string;
}

const iconMap: Record<string, any> = {
  Crown,
  Users,
  FileText,
  BookOpen,
  Music,
  Heart,
  Home,
  Flower,
  Camera,
  ChefHat,
  Wrench,
};

export default function EquipesPage() {
  const [equipesData, setEquipesData] = useState<EquipeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/equipes")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar equipes");
        return res.json();
      })
      .then((data) => setEquipesData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-[#F6EFE3] dark:bg-[#1C1008] min-h-screen">
      {/* Header */}
      <section className="bg-[#3D2618] text-[#E8D6B8] py-16">
        <div className="container-custom text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-widest text-[#B68A4B] font-semibold">
              Serviço & Doação
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-2 mb-4">
              Equipes de Trabalho
            </h1>
            <p className="text-[#E8D6B8]/70 max-w-xl mx-auto text-base font-light">
              Conheça os braços que tornam o Encontro de Jovens com Cristo uma realidade de fé e amor.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-12">
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipesData.map((equipe) => {
            const IconComponent = iconMap[equipe.icon] || Users;
            return (
              <StaggerItem key={equipe.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] rounded-3xl p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all h-full"
                >
                  <div>
                    {/* Header Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#5A3925] text-[#E8D6B8] flex items-center justify-center border border-[#B68A4B]/40">
                        <IconComponent className="w-7 h-7 text-[#B68A4B]" />
                      </div>
                      <span className="bg-[#F6EFE3] dark:bg-[#1C1008] text-[#5A3925] dark:text-[#C9A46A] text-xs font-bold px-3 py-1.5 rounded-full border border-[#D4B896]">
                        {equipe.members} membros
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-2xl text-[#3D2618] dark:text-[#E8D6B8] mb-3">
                      {equipe.name}
                    </h2>

                    <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/80 leading-relaxed mb-6">
                      {equipe.description}
                    </p>
                  </div>

                  {/* Coordinator Footer */}
                  <div className="pt-4 border-t border-[#F6EFE3] dark:border-[#3D2618] flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#B68A4B] text-white flex items-center justify-center font-bold text-xs">
                      {equipe.coordinator.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#3D2618] dark:text-[#E8D6B8]">
                        {equipe.coordinator}
                      </div>
                      <div className="text-[10px] text-[#9B7E5E]">
                        {equipe.coordinatorRole}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </div>
  );
}
