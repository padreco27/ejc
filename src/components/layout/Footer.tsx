"use client";

import Link from "next/link";
import { Globe, Share2, Phone, Mail, MapPin, ExternalLink, Heart } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { LilyFlower } from "@/components/ui/SacredArtwork";

const footerLinks = {
  movimento: [
    { label: "Sobre o EJC", href: "/sobre" },
    { label: "Equipes", href: "/equipes" },
    { label: "Inscrição", href: "/inscricao" },
    { label: "Próximo Encontro", href: "/#encontro" },
  ],
  conteudo: [
    { label: "Blog", href: "/blog" },
    { label: "Galeria", href: "/galeria" },
    { label: "Agenda", href: "/agenda" },
    { label: "FAQ", href: "/#faq" },
  ],
  loja: [
    { label: "Loja Solidária", href: "/loja" },
    { label: "Camiseta Flor do Carmelo", href: "/loja" },
    { label: "Devocionais", href: "/loja" },
    { label: "Apoiar o EJC", href: "/contato" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#3D2618] dark:bg-[#1C1008] text-[#E8D6B8] border-t-2 border-[#B68A4B]">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#B68A4B] to-transparent" />

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <FadeIn>
              <Link href="/" className="flex items-center gap-3 mb-5 group">
                <div className="w-12 h-12 rounded-full bg-[#5A3925] border border-[#B68A4B] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <LilyFlower className="w-7 h-7 text-[#E8D6B8]" />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-[#E8D6B8]">EJC</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#B68A4B] font-semibold">
                    Flor do Carmelo · FÉ • TRADIÇÃO • DEVOÇÃO
                  </div>
                </div>
              </Link>

              <p className="text-sm text-[#C9A46A]/80 leading-relaxed mb-6 max-w-xs">
                O Encontro de Jovens com Cristo é um movimento de evangelização da Igreja Católica
                que transforma vidas através da experiência pessoal com Jesus Cristo.
              </p>

              {/* Social */}
              <div className="flex gap-3">
                {[
                  { icon: Globe, label: "Website", href: "#" },
                  { icon: Share2, label: "Redes Sociais", href: "#" },
                  { icon: Phone, label: "WhatsApp", href: "#" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-[#5A3925] hover:bg-[#B68A4B] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, links], i) => (
            <FadeIn key={key} delay={0.1 * (i + 1)}>
              <div>
                <h4 className="font-display text-[#B68A4B] font-semibold text-sm uppercase tracking-widest mb-4">
                  {key === "movimento"
                    ? "Movimento"
                    : key === "conteudo"
                    ? "Conteúdo"
                    : "Loja"}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#C9A46A]/70 hover:text-[#B68A4B] transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="mt-12 pt-8 border-t border-[#5A3925] grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: MapPin, text: "Paróquia Nossa Senhora do Carmo – Campo Grande, MS" },
            { icon: Phone, text: "(67) 99999-9999" },
            { icon: Mail, text: "ejc@pnsc.com.br" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[#C9A46A]/70">
              <item.icon className="w-4 h-4 text-[#B68A4B] flex-shrink-0" />
              {item.text}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[#5A3925] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#C9A46A]/50 text-center">
            © {new Date().getFullYear()} EJC – Paróquia Nossa Senhora do Carmo. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#C9A46A]/50 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-[#B68A4B]" fill="#B68A4B" /> para a glória de Deus
          </p>
        </div>
      </div>
    </footer>
  );
}
