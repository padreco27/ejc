"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Check, X, Copy, Filter, Sparkles, Calendar, CheckSquare } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/FadeIn";
import { LilyFlower, CarmelEmblem, DevotionalBadge } from "@/components/ui/SacredArtwork";
import produtosData from "@/data/produtos.json";
import { formatCurrency } from "@/lib/utils";

const categories = ["Todos", "Vestuário", "Devocionais", "Utilidades", "Livros", "Acessórios"];

export default function LojaPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<(typeof produtosData)[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [copiedPix, setCopiedPix] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = produtosData.filter((p) =>
    selectedCategory === "Todos" ? true : p.category === selectedCategory
  );

  const copyPixKey = () => {
    navigator.clipboard.writeText("599627730001000");
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 parchment-bg min-h-screen">
      {/* 
        ====================================================
        OFFICIAL DIGITAL REPLICANT OF THE "FLOR DO CARMELO" FLYER
        ====================================================
      */}
      <section className="container-custom py-8">
        <FadeIn>
          <div className="bg-[#F6EFE3] dark:bg-[#2A1910] border-4 border-[#5A3925] rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Top Right Lily Flower Line Art Illustration */}
            <div className="absolute top-4 right-6 opacity-30 pointer-events-none hidden sm:block">
              <LilyFlower className="w-32 h-32 text-[#B68A4B]" />
            </div>

            {/* Header Title Banner */}
            <div className="text-center space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-16 bg-[#5A3925]" />
                <span className="font-display font-semibold text-xs md:text-sm uppercase tracking-[0.3em] text-[#5A3925] dark:text-[#E8D6B8]">
                  CAMISA
                </span>
                <div className="h-px w-16 bg-[#5A3925]" />
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#5A3925] dark:text-[#E8D6B8] tracking-tight">
                FLOR DO CARMELO
              </h1>

              {/* Devotional Pill Badge */}
              <div className="flex justify-center">
                <DevotionalBadge text="FÉ • TRADIÇÃO • DEVOÇÃO" />
              </div>
            </div>

            {/* Middle Grid: T-shirt Model Visuals & Order Info */}
            <div className="grid lg:grid-cols-3 gap-8 items-center mb-8">
              {/* Product Card Showcase (Front & Back mockup presentation) */}
              <div className="lg:col-span-2 bg-[#E8D6B8]/50 dark:bg-[#1C1008]/50 p-6 rounded-2xl border-2 border-[#D4B896] dark:border-[#4A3020] flex flex-col md:flex-row items-center justify-around gap-6 text-center">
                {/* Front Camisa Mockup */}
                <div className="space-y-2">
                  <div className="w-48 h-56 bg-[#E8D6B8] dark:bg-[#3D2618] rounded-xl border border-[#B68A4B]/40 shadow-lg p-4 flex flex-col items-center justify-center relative">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A3925] dark:text-[#E8D6B8] absolute top-3">
                      Frente
                    </span>
                    <span className="font-display text-xs font-bold text-[#5A3925] dark:text-[#E8D6B8] tracking-widest mt-6">
                      FLOR DO CARMELO
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#5A3925] dark:text-[#E8D6B8]">
                    Bordado Peito
                  </span>
                </div>

                {/* Back Camisa Mockup with Our Lady of Carmel Artwork */}
                <div className="space-y-2">
                  <div className="w-52 h-64 bg-[#E8D6B8] dark:bg-[#3D2618] rounded-xl border-2 border-[#B68A4B] shadow-2xl p-4 flex flex-col items-center justify-center relative">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#B68A4B] absolute top-3">
                      Costas (Exclusivo)
                    </span>
                    <CarmelEmblem className="w-24 h-24 mt-2" />
                    <span className="font-display text-[9px] uppercase tracking-widest text-[#5A3925] dark:text-[#E8D6B8] text-center mt-2 px-2">
                      FLOR DO CARMELO · FLOR DO CARMELO
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#B68A4B]">
                    Estampa Sacra Costas
                  </span>
                </div>

                {/* Features List */}
                <div className="text-left space-y-3 text-xs text-[#5A3925] dark:text-[#E8D6B8]">
                  <div className="flex items-center gap-2 font-bold">
                    <div className="w-6 h-6 rounded-full bg-[#5A3925] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <span>TECIDO CONFORTÁVEL 100% ALGODÃO</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <div className="w-6 h-6 rounded-full bg-[#5A3925] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <span>ESTAMPA DE ALTA QUALIDADE</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <div className="w-6 h-6 rounded-full bg-[#5A3925] text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                    <span>EXPRESSE SUA FÉ E DEVOÇÃO</span>
                  </div>
                </div>
              </div>

              {/* Price & Order Box (Matching the Flyer Layout) */}
              <div className="space-y-4">
                {/* Big Price Box */}
                <div className="bg-[#3D2618] text-[#E8D6B8] p-6 rounded-2xl border-2 border-[#B68A4B] text-center shadow-xl">
                  <span className="text-xs uppercase tracking-widest text-[#B68A4B] font-bold block mb-1">
                    APENAS
                  </span>
                  <div className="font-display text-5xl font-bold text-white">
                    R$ <span className="text-6xl text-[#B68A4B]">50</span>,00
                  </div>
                </div>

                {/* Deadline Box */}
                <div className="bg-[#E8D6B8] dark:bg-[#2A1910] p-4 rounded-xl border border-[#5A3925] text-center">
                  <div className="flex items-center justify-center gap-2 text-[#5A3925] dark:text-[#E8D6B8] font-bold text-sm">
                    <Calendar className="w-4 h-4 text-[#B68A4B]" />
                    <span>PEDIDOS ATÉ 31 DE JULHO</span>
                  </div>
                  <span className="text-[10px] text-[#5A3925]/80 dark:text-[#C9A46A] block mt-1">
                    MEDIANTE PREENCHIMENTO DO FORMULÁRIO
                  </span>
                </div>
              </div>
            </div>

            {/* PIX Key Banner (Exact Replica from Flyer) */}
            <div className="bg-[#F6EFE3] dark:bg-[#1C1008] border-2 border-[#5A3925] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Simulated Teal PIX Logo */}
                <div className="px-3 py-1.5 rounded-lg pix-badge text-xs font-extrabold tracking-wider flex items-center gap-1">
                  <span>❖ pix</span>
                </div>
                <span className="text-xs text-[#5A3925] dark:text-[#E8D6B8] font-semibold">
                  Pagamento via PIX
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-[#3D2618] text-[#E8D6B8] text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">
                  CHAVE PIX
                </span>
                <code className="font-mono font-bold text-base text-[#5A3925] dark:text-[#E8D6B8]">
                  599627730001000
                </code>
                <button
                  onClick={copyPixKey}
                  className="bg-[#B68A4B] hover:bg-[#C9A46A] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
                >
                  {copiedPix ? "✓ Copiado" : "Copiar"}
                </button>
              </div>
            </div>

            {/* Bottom Callout Strip */}
            <div className="mt-6 pt-4 border-t border-[#D4B896] dark:border-[#5A3925] flex flex-col sm:flex-row items-center justify-between text-xs text-[#5A3925] dark:text-[#C9A46A] font-semibold gap-2">
              <div className="flex items-center gap-2">
                <CarmelEmblem className="w-8 h-8" />
                <span>GARANTA A SUA! Lucro destinado à realização do III EJC PNSC</span>
              </div>
              <div className="flex items-center gap-2 text-[#B68A4B]">
                <CheckSquare className="w-4 h-4" />
                <span>PREENCHA O FORMULÁRIO E FAÇA SEU PEDIDO!</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Product Catalog Grid */}
      <div className="container-custom py-12">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-[#5A3925] dark:text-[#E8D6B8]">
            Todos os Produtos Devocionais & EJC
          </h2>
          <div className="w-20 h-0.5 bg-[#B68A4B] mx-auto mt-2" />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-center">
          <Filter className="w-4 h-4 text-[#B68A4B] mr-2 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#5A3925] text-white shadow-md border border-[#B68A4B]"
                  : "bg-white dark:bg-[#2A1910] text-[#5A3925] dark:text-[#E8D6B8] border border-[#D4B896] dark:border-[#4A3020] hover:border-[#B68A4B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <StaggerItem key={product.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedSize(product.sizes[0] || "");
                    setOrderSuccess(false);
                  }}
                  className="group bg-white dark:bg-[#2A1910] rounded-2xl border-2 border-[#5A3925] overflow-hidden flex flex-col justify-between cursor-pointer card-hover shadow-md"
                >
                  <div>
                    {/* Image */}
                    <div className="h-64 bg-[#3D2618] relative overflow-hidden flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/80 via-transparent to-transparent opacity-40" />

                      {/* Badge */}
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-[#5A3925] text-[#E8D6B8] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-[#B68A4B]/40 shadow-lg">
                          {product.badge}
                        </span>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md active:scale-125 ${
                          isFav
                            ? "bg-red-500 text-white"
                            : "bg-[#1C1008]/70 backdrop-blur-md text-[#E8D6B8] hover:bg-[#B68A4B] hover:text-white"
                        }`}
                      >
                        <Heart className="w-4.5 h-4.5" fill={isFav ? "white" : "none"} />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <span className="text-[10px] uppercase font-bold text-[#B68A4B] tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-display font-bold text-lg text-[#3D2618] dark:text-[#E8D6B8] mt-1 mb-2 group-hover:text-[#B68A4B] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/80 line-clamp-2 mb-4">
                        {product.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-[#F6EFE3] dark:border-[#3D2618] mt-auto">
                    <div>
                      <span className="text-[10px] text-[#9B7E5E] block">Apenas</span>
                      <span className="font-display text-xl font-bold text-[#5A3925] dark:text-[#E8D6B8]">
                        {formatCurrency(product.price)}
                      </span>
                    </div>

                    <button className="flex items-center gap-1.5 bg-[#5A3925] hover:bg-[#B68A4B] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Comprar
                    </button>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F6EFE3] dark:bg-[#2A1910] border-2 border-[#5A3925] rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#E8D6B8] dark:bg-[#3D2618] flex items-center justify-center text-[#5A3925] dark:text-[#E8D6B8] hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>

              {orderSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#3D2618] dark:text-[#E8D6B8]">
                    Pedido de Reserva Efetuado!
                  </h3>
                  <p className="text-sm text-[#5A3925] dark:text-[#C9A46A] max-w-md mx-auto">
                    Você reservou <strong>{selectedProduct.name}</strong> ({selectedSize}). Por favor, faça o PIX para a chave <strong>599627730001000</strong> e envie o comprovante para a equipe de vendas EJC.
                  </p>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-4 bg-[#B68A4B] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#C9A46A] transition-colors"
                  >
                    Concluir
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="h-72 bg-[#1C1008] rounded-2xl overflow-hidden relative border border-[#B68A4B]/30 flex items-center justify-center">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008] via-transparent to-transparent opacity-70" />
                    {selectedProduct.badge && (
                      <span className="absolute top-3 left-3 bg-[#B68A4B] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md">
                        {selectedProduct.badge}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 text-center">
                      <span className="text-[10px] text-[#E8D6B8]/90 font-medium italic">
                        100% destinado ao III EJC PNSC
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-[#B68A4B] uppercase tracking-wider">
                        {selectedProduct.category}
                      </span>
                      <h2 className="font-display font-bold text-2xl text-[#3D2618] dark:text-[#E8D6B8]">
                        {selectedProduct.name}
                      </h2>
                      <div className="font-display text-3xl font-bold text-[#5A3925] dark:text-[#E8D6B8] mt-1">
                        {formatCurrency(selectedProduct.price)}
                      </div>
                    </div>

                    <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/80 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    {selectedProduct.sizes.length > 0 && (
                      <div>
                        <label className="block text-xs font-bold text-[#3D2618] dark:text-[#E8D6B8] mb-2 uppercase tracking-wider">
                          Selecione o Tamanho:
                        </label>
                        <div className="flex gap-2">
                          {selectedProduct.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setSelectedSize(sz)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                selectedSize === sz
                                  ? "bg-[#5A3925] text-white"
                                  : "bg-[#E8D6B8] dark:bg-[#3D2618] text-[#3D2618] dark:text-[#E8D6B8] hover:bg-[#D4B896]"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 space-y-2">
                      <button
                        onClick={() => setOrderSuccess(true)}
                        className="w-full bg-[#5A3925] hover:bg-[#B68A4B] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Garantir a Sua (Fazer Pedido)
                      </button>
                      <p className="text-[10px] text-center text-[#9B7E5E]">
                        Pedidos mediante preenchimento de reserva e pagamento via PIX.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
