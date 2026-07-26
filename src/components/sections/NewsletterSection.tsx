"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2, Send } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="section-padding bg-[#3D2618] dark:bg-[#1C1008] text-[#E8D6B8] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#B68A4B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto bg-[#2A1910] border border-[#5A3925] rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <FadeIn>
            <div className="w-14 h-14 rounded-2xl bg-[#B68A4B]/20 flex items-center justify-center mx-auto mb-6 text-[#B68A4B]">
              <Mail className="w-7 h-7" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#B68A4B] font-semibold">
              Boletim Espiritual
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#E8D6B8] mt-2 mb-4">
              Receba reflexões e avisos do EJC
            </h2>
            <p className="text-[#C9A46A]/80 text-sm md:text-base max-w-xl mx-auto mb-8">
              Inscreva seu e-mail para receber avisos sobre os próximos encontros, artigos do blog e orações semanais da nossa comunidade.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#5A3925]/40 border border-[#B68A4B]/40 rounded-2xl p-6 flex flex-col items-center gap-3 text-center"
              >
                <CheckCircle2 className="w-10 h-10 text-[#B68A4B]" />
                <h3 className="font-display text-xl font-bold text-white">
                  Deus abençoe! Inscrito com sucesso.
                </h3>
                <p className="text-xs text-[#E8D6B8]/70">
                  Enviamos uma mensagem de confirmação para {email}.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#1C1008] border border-[#5A3925] focus:border-[#B68A4B] rounded-xl px-4 py-3.5 text-sm text-[#E8D6B8] placeholder-[#9B7E5E] outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#B68A4B] hover:bg-[#C9A46A] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:scale-105"
                >
                  <span>Inscrever</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
