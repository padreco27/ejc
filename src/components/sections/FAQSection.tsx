"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/faq")
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao carregar FAQ");
        return res.json();
      })
      .then((data) => setFaqData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="section-padding bg-[#F6EFE3] dark:bg-[#1C1008]">
      <div className="container-custom">
        <FadeIn className="text-center mb-16">
          <span className="inline-block text-[#B68A4B] text-sm uppercase tracking-widest font-semibold mb-3">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#3D2618] dark:text-[#E8D6B8] mb-4">
            Perguntas Frequentes
          </h2>
          <div className="w-16 h-0.5 bg-[#B68A4B] mx-auto mb-6" />
          <p className="text-[#5A3925] dark:text-[#C9A46A]/80 max-w-xl mx-auto text-base">
            Respostas para as principais dúvidas sobre a participação, inscrições e funcionamento do EJC.
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <FadeIn key={item.id}>
                <div className="bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-[#F6EFE3]/50 dark:hover:bg-[#3D2618]/50 transition-colors"
                  >
                    <span className="font-display font-bold text-lg text-[#3D2618] dark:text-[#E8D6B8] flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#B68A4B] flex-shrink-0" />
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#B68A4B] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 text-[#5A3925] dark:text-[#C9A46A]/80 text-sm leading-relaxed border-t border-[#F6EFE3] dark:border-[#3D2618]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
