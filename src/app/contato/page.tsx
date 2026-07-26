"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe, Share2, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 bg-[#F6EFE3] dark:bg-[#1C1008] min-h-screen">
      {/* Banner */}
      <section className="bg-[#3D2618] text-[#E8D6B8] py-16">
        <div className="container-custom text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-widest text-[#B68A4B] font-semibold">
              Fale Conosco
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mt-2 mb-4">
              Canais de Contato
            </h1>
            <p className="text-[#E8D6B8]/70 max-w-xl mx-auto text-base font-light">
              Estamos prontos para acolher você, tirar suas dúvidas e receber suas intenções de oração.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Container */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info & Map Box */}
          <FadeIn direction="left" className="space-y-8">
            <div className="bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] rounded-3xl p-8 shadow-lg space-y-6">
              <h2 className="font-display font-bold text-2xl text-[#3D2618] dark:text-[#E8D6B8]">
                Paróquia Nossa Senhora do Carmo
              </h2>

              <div className="space-y-4 text-sm text-[#5A3925] dark:text-[#C9A46A]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B68A4B] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#3D2618] dark:text-[#E8D6B8]">Endereço:</div>
                    Rua das Flores, 123 – Centro, Campo Grande – MS
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B68A4B] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#3D2618] dark:text-[#E8D6B8]">Telefone / WhatsApp:</div>
                    (67) 99999-9999
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B68A4B] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#3D2618] dark:text-[#E8D6B8]">E-mail:</div>
                    ejc@pnsc.com.br
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-[#F6EFE3] dark:border-[#3D2618]">
                <div className="text-xs font-bold text-[#9B7E5E] uppercase tracking-wider mb-3">
                  Redes Sociais Oficial:
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: Globe, label: "@ejcpnsc", href: "#" },
                    { icon: Share2, label: "EJC PNSC", href: "#" },
                    { icon: MessageCircle, label: "Grupo WhatsApp", href: "#" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="flex items-center gap-2 bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] px-4 py-2 rounded-xl text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] hover:border-[#B68A4B] transition-colors"
                    >
                      <s.icon className="w-4 h-4 text-[#B68A4B]" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Map Graphic Box */}
            <div className="bg-[#3D2618] border border-[#5A3925] rounded-3xl h-64 p-6 relative overflow-hidden flex flex-col justify-between text-[#E8D6B8]">
              <div className="absolute inset-0 opacity-20 bg-[radial-[#B68A4B]_2px,transparent_2px] [background-size:20px_20px]" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-[#B68A4B] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                  Mapa da Localização
                </span>
                <span className="text-xs text-[#B68A4B]">Campo Grande - MS</span>
              </div>
              <div className="relative z-10 text-center py-4">
                <MapPin className="w-10 h-10 text-[#B68A4B] mx-auto animate-bounce mb-2" />
                <div className="font-display text-xl font-bold text-white">Paróquia N. Sra. do Carmo</div>
                <p className="text-xs text-[#E8D6B8]/70">Salão Paroquial - Sede do EJC</p>
              </div>
              <div className="relative z-10 text-[10px] text-center text-[#9B7E5E]">
                Clique para abrir rota no Google Maps
              </div>
            </div>
          </FadeIn>

          {/* Form Box */}
          <FadeIn direction="right">
            <div className="bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] rounded-3xl p-8 shadow-lg">
              <h2 className="font-display font-bold text-2xl text-[#3D2618] dark:text-[#E8D6B8] mb-2">
                Envie uma Mensagem
              </h2>
              <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/80 mb-6">
                Preencha os campos abaixo para nos enviar uma dúvida, sugestão ou intenção de oração.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#B68A4B] mx-auto" />
                  <h3 className="font-display font-bold text-2xl text-[#3D2618] dark:text-[#E8D6B8]">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]">
                    Obrigado pelo contato! Nossa equipe responderá em breve.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-[#B68A4B] text-white px-6 py-2.5 rounded-xl font-semibold text-xs"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome completo"
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                      Seu E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dúvida, Inscrição, Intenção..."
                      value={form.assunto}
                      onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                      className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                      Mensagem *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Escreva sua mensagem aqui..."
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#B68A4B] hover:bg-[#C9A46A] text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md"
                  >
                    <span>Enviar Mensagem</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
