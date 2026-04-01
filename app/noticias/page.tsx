"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageHeader from "../components/PageHeader";
import NewsCard from "../components/NewsCard";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";

const news = [
  { category: "Educação", title: "MEC publica novas diretrizes para ensino técnico integrado ao ensino médio", date: "14 Mar 2026", readTime: "4 min" },
  { category: "Direitos Estudantis", title: "Novos IFs anunciam criação de grêmios livres com apoio da FENET", date: "22 Mar 2026", readTime: "5 min" },
  { category: "Eventos", title: "Encontro Sul acontece em Curitiba: confira a programação completa", date: "10 Mar 2026", readTime: "3 min" },
  { category: "FENET em Ação", title: "FENET lança guia completo sobre direitos dos estudantes estagiários", date: "09 Mar 2026", readTime: "2 min" },
  { category: "Cultura", title: "Festival Cultural Estudantil abre inscrições para escolas técnicas", date: "07 Mar 2026", readTime: "2 min" },
  { category: "Educação", title: "Debate sobre cortes no PRONATEC reúne entidades estudantis em Brasília", date: "05 Mar 2026", readTime: "6 min" },
];

const categories = ["Todas", "Educação", "Direitos Estudantis", "Eventos", "FENET em Ação", "Cultura"];

export default function Noticias() {
  const [active, setActive] = useState("Todas");

  const filtered = active === "Todas" ? news : news.filter((n) => n.category === active);

  return (
    <>
      <PageHeader
        title="Notícias"
        subtitle="Fique por dentro das últimas movimentações da FENET e da educação técnica."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Notícias" }]}
      />

      {/* Filter bar */}
      <div className="bg-white border-b border-[#E0E0E0] sticky top-[68px] z-30">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-[#555555] mr-2 hidden sm:block">Filtrar:</span>
          <div className="relative flex gap-2 flex-wrap flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  active === cat
                    ? "text-white"
                    : "text-[#555555] border border-[#E0E0E0] hover:border-[#F4141A] hover:text-[#F4141A]"
                }`}
              >
                {active === cat && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-[#F4141A] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          <div className="relative ml-auto">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar notícias..."
              className="pl-9 pr-4 py-2 border border-[#E0E0E0] rounded-lg text-sm w-[200px] outline-none focus:border-[#F4141A] transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-6 md:px-10 max-w-[1280px] mx-auto">
        <AnimatePresence mode="wait">
          <StaggerContainer key={active} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <StaggerItem key={i}>
                <NewsCard
                  category={item.category}
                  title={item.title}
                  date={item.date}
                  readTime={item.readTime}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatePresence>

        <div className="text-center mt-14">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="border-2 border-[#F4141A] text-[#F4141A] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-[#FFF0F0] transition-colors duration-200"
          >
            Carregar mais notícias
          </motion.button>
        </div>
      </section>
    </>
  );
}
