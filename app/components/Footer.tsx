"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { memo } from "react";
import AnimatedSection from "./AnimatedSection";
import StaggerContainer, { StaggerItem } from "./StaggerContainer";

const socials = [
  { label: "IG", title: "Instagram" },
  { label: "FB", title: "Facebook" },
  { label: "TW", title: "Twitter/X" },
  { label: "YT", title: "YouTube" },
  { label: "WA", title: "WhatsApp" },
];

const Footer = memo(function Footer() {
  return (
    <footer className="relative bg-[#1A1A1A] text-white overflow-hidden">
      <div className="h-[3px] bg-gradient-to-r from-[#F4141A] via-[#ff4d52] to-[#C01015]" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-14 pb-8">
        <AnimatedSection direction="up" duration={0.7}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-[#F4141A] rounded flex items-center justify-center">
                  <span className="text-white font-black text-sm">F</span>
                </div>
                <div className="text-xl font-black tracking-tight">
                  FE<span className="text-[#F4141A]">NET</span>
                </div>
              </div>
              <p className="text-[#999999] text-sm leading-relaxed">
                Federação Nacional dos Estudantes em Ensino Técnico. Organizando a luta dos
                estudantes técnicos do Brasil desde 2011.
              </p>
              <StaggerContainer className="flex gap-2.5 mt-6" staggerDelay={0.07} childDelay={0.2}>
                {socials.map((s) => (
                  <StaggerItem key={s.label}>
                    <motion.div
                      whileHover={{ scale: 1.15, backgroundColor: "#F4141A" }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      title={s.title}
                      className="w-9 h-9 bg-white/10 rounded flex items-center justify-center text-[11px] font-bold cursor-pointer"
                    >
                      {s.label}
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest mb-5 text-[#F4141A]">
                Institucional
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/sobre", label: "Sobre a FENET" },
                  { href: "#", label: "Coordenação" },
                  { href: "#", label: "História" },
                  { href: "#", label: "Estatuto" },
                  { href: "#", label: "Atas e Resoluções" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[#999999] text-sm link-hover hover:text-white transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest mb-5 text-[#F4141A]">
                Conteúdo
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: "/noticias", label: "Notícias" },
                  { href: "/agenda", label: "Agenda de Eventos" },
                  { href: "/documentos", label: "Documentos" },
                  { href: "#", label: "Galeria de Fotos" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[#999999] text-sm link-hover hover:text-white transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest mb-5 text-[#F4141A]">
                Contato
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="mailto:fenetbrasil@gmail.com"
                    className="text-[#999999] text-sm link-hover hover:text-white transition-colors duration-150"
                  >
                    fenetbrasil@gmail.com
                  </a>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="text-[#999999] text-sm link-hover hover:text-white transition-colors duration-150"
                  >
                    Formulário de Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="text-[#999999] text-sm link-hover hover:text-white transition-colors duration-150"
                  >
                    Filie-se
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-[#666666]">
          <span>CNPJ 19.720.065/0001-30 · Belo Horizonte, MG</span>
          <span>© 2026 FENET. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
