"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Phone, MapPin, Church, HeartPulse, ShieldAlert, CheckCircle2, ChevronRight, ChevronLeft, Sparkles
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const steps = [
  { id: 1, title: "Dados Pessoais", icon: User },
  { id: 2, title: "Contato", icon: Phone },
  { id: 3, title: "Endereço", icon: MapPin },
  { id: 4, title: "Religião & Fé", icon: Church },
  { id: 5, title: "Saúde & Emergência", icon: HeartPulse },
];

export default function InscricaoPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [savedId, setSavedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    rg: "",
    telefone: "",
    email: "",
    instagram: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "Campo Grande",
    estado: "MS",
    paroquiaFrequenta: "",
    sacramentos: [] as string[],
    restricaoAlimentar: "",
    alergiaMedicamento: "",
    contatoEmergenciaNome: "",
    contatoEmergenciaTelefone: "",
    parentesco: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSacramentosChange = (sacramento: string) => {
    setFormData((prev) => {
      const exists = prev.sacramentos.includes(sacramento);
      return {
        ...prev,
        sacramentos: exists
          ? prev.sacramentos.filter((s) => s !== sacramento)
          : [...prev.sacramentos, sacramento],
      };
    });
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/inscricoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedId(data.id);
        setIsSuccess(true);
      } else {
        const err = await res.json();
        setSubmitError(err.message || "Erro ao enviar inscrição");
      }
    } catch {
      setSubmitError("Erro de conexão. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 bg-[#F6EFE3] dark:bg-[#1C1008] min-h-screen">
      {/* Banner Header */}
      <section className="bg-[#3D2618] text-[#E8D6B8] py-14">
        <div className="container-custom text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-widest text-[#B68A4B] font-semibold">
              III EJC · Vagas Limitadas
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mt-2 mb-3">
              Fazer Inscrição
            </h1>
            <p className="text-[#E8D6B8]/70 max-w-lg mx-auto text-sm font-light">
              Preencha os dados abaixo com carinho. A inscrição é totalmente gratuita.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Container */}
      <div className="container-custom py-12 max-w-3xl">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] rounded-3xl p-8 md:p-12 text-center shadow-2xl space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-4 py-1.5 rounded-full bg-[#B68A4B]/20 text-[#B68A4B] text-xs font-bold uppercase tracking-wider">
              Confirmação de Cadastro
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3D2618] dark:text-[#E8D6B8]">
              Inscrição enviada com sucesso!
            </h2>

            <p className="text-sm text-[#5A3925] dark:text-[#C9A46A]/90 max-w-md mx-auto leading-relaxed">
              Glória a Deus! Recebemos sua inscrição para o <strong>III EJC da Paróquia Nossa Senhora do Carmo</strong>. Nossa secretaria entrará em contato nos próximos dias via WhatsApp para confirmar seus detalhes.
            </p>

            <div className="p-6 bg-[#F6EFE3] dark:bg-[#1C1008] rounded-2xl border border-[#D4B896] max-w-md mx-auto text-left text-xs space-y-2 text-[#5A3925] dark:text-[#E8D6B8]">
              <div><strong>Nome:</strong> {formData.nome || "Jovem Retirante"}</div>
              <div><strong>E-mail:</strong> {formData.email || "contato@email.com"}</div>
              <div><strong>Telefone:</strong> {formData.telefone || "(67) 99999-9999"}</div>
              <div><strong>Status:</strong> Inscrição Confirmada (Aguardando Retiro)</div>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                setCurrentStep(1);
              }}
              className="bg-[#B68A4B] hover:bg-[#C9A46A] text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md"
            >
              Realizar Nova Inscrição
            </button>
          </motion.div>
        ) : (
          <div className="bg-white dark:bg-[#2A1910] border border-[#D4B896] dark:border-[#4A3020] rounded-3xl p-6 md:p-10 shadow-xl">
            {/* Step Progress Header */}
            <div className="mb-10">
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-4 no-scrollbar">
                {steps.map((step) => {
                  const isActive = currentStep === step.id;
                  const isDone = currentStep > step.id;
                  return (
                    <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isDone
                            ? "bg-green-600 text-white"
                            : isActive
                            ? "bg-[#B68A4B] text-white ring-4 ring-[#B68A4B]/20"
                            : "bg-[#F6EFE3] dark:bg-[#1C1008] text-[#9B7E5E]"
                        }`}
                      >
                        {isDone ? "✓" : step.id}
                      </div>
                      <span
                        className={`text-xs font-semibold hidden sm:inline ${
                          isActive
                            ? "text-[#3D2618] dark:text-[#E8D6B8]"
                            : "text-[#9B7E5E]"
                        }`}
                      >
                        {step.title}
                      </span>
                      {step.id < steps.length && (
                        <div className="w-6 h-0.5 bg-[#D4B896] dark:bg-[#4A3020] hidden sm:block mx-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Step Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* STEP 1: DADOS PESSOAIS */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-[#3D2618] dark:text-[#E8D6B8] border-b border-[#F6EFE3] pb-2">
                      Etapa 1: Dados Pessoais
                    </h3>
                    <div>
                      <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          Data de Nascimento *
                        </label>
                        <input
                          type="date"
                          name="dataNascimento"
                          required
                          value={formData.dataNascimento}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          CPF *
                        </label>
                        <input
                          type="text"
                          name="cpf"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: CONTATO */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-[#3D2618] dark:text-[#E8D6B8] border-b border-[#F6EFE3] pb-2">
                      Etapa 2: Contato
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          WhatsApp / Celular *
                        </label>
                        <input
                          type="tel"
                          name="telefone"
                          placeholder="(67) 99999-9999"
                          value={formData.telefone}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="seu.email@exemplo.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                        @Instagram (opcional)
                      </label>
                      <input
                        type="text"
                        name="instagram"
                        placeholder="@seuusuario"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: ENDEREÇO */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-[#3D2618] dark:text-[#E8D6B8] border-b border-[#F6EFE3] pb-2">
                      Etapa 3: Endereço
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          Rua / Logradouro *
                        </label>
                        <input
                          type="text"
                          name="endereco"
                          placeholder="Nome da rua"
                          value={formData.endereco}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          Número *
                        </label>
                        <input
                          type="text"
                          name="numero"
                          placeholder="123"
                          value={formData.numero}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          name="bairro"
                          placeholder="Bairro"
                          value={formData.bairro}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          Cidade / UF *
                        </label>
                        <input
                          type="text"
                          name="cidade"
                          value={`${formData.cidade} - ${formData.estado}`}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: INFORMAÇÕES RELIGIOSAS */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-[#3D2618] dark:text-[#E8D6B8] border-b border-[#F6EFE3] pb-2">
                      Etapa 4: Informações Religiosas
                    </h3>
                    <div>
                      <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                        Qual Paróquia ou Comunidade costuma frequentar?
                      </label>
                      <input
                        type="text"
                        name="paroquiaFrequenta"
                        placeholder="Ex: Paróquia Nossa Senhora do Carmo"
                        value={formData.paroquiaFrequenta}
                        onChange={handleChange}
                        className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-2">
                        Sacramentos já recebidos:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Batismo", "Primeira Eucaristia", "Crisma", "Matrimônio"].map((sac) => {
                          const checked = formData.sacramentos.includes(sac);
                          return (
                            <button
                              key={sac}
                              type="button"
                              onClick={() => handleSacramentosChange(sac)}
                              className={`p-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                                checked
                                  ? "bg-[#B68A4B] text-white border-[#B68A4B]"
                                  : "bg-[#F6EFE3] dark:bg-[#1C1008] text-[#5A3925] dark:text-[#E8D6B8] border-[#D4B896]"
                              }`}
                            >
                              <span>{sac}</span>
                              {checked && <span>✓</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: SAÚDE E CONTATO DE EMERGÊNCIA */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-xl text-[#3D2618] dark:text-[#E8D6B8] border-b border-[#F6EFE3] pb-2">
                      Etapa 5: Saúde & Contato de Emergência
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                        Restrição Alimentar ou Alergia (opcional)
                      </label>
                      <input
                        type="text"
                        name="restricaoAlimentar"
                        placeholder="Ex: Intolerância à lactose, vegetariano..."
                        value={formData.restricaoAlimentar}
                        onChange={handleChange}
                        className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          Nome do Contato de Emergência *
                        </label>
                        <input
                          type="text"
                          name="contatoEmergenciaNome"
                          placeholder="Nome do pai/mãe/responsável"
                          value={formData.contatoEmergenciaNome}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] mb-1">
                          Telefone do Contato *
                        </label>
                        <input
                          type="tel"
                          name="contatoEmergenciaTelefone"
                          placeholder="(67) 99999-9999"
                          value={formData.contatoEmergenciaTelefone}
                          onChange={handleChange}
                          className="w-full bg-[#F6EFE3] dark:bg-[#1C1008] border border-[#D4B896] dark:border-[#4A3020] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#B68A4B]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {submitError && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-lg px-4 py-3 text-center">
                {submitError}
              </div>
            )}

            {/* Navigation Actions */}
            <div className="mt-10 pt-6 border-t border-[#F6EFE3] dark:border-[#3D2618] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1 text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] hover:text-[#B68A4B] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                className="flex items-center gap-2 bg-[#B68A4B] hover:bg-[#C9A46A] text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                <span>{currentStep === steps.length ? "Finalizar Inscrição" : "Próxima Etapa"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
