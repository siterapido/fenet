"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import PageHeader from "../components/PageHeader";
import AnimatedSection from "../components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";
import SectionHeading from "../components/SectionHeading";
import AnimatedCounter from "../components/AnimatedCounter";

const timeline = [
  { year: "2011", title: "Fundação da FENET", desc: "A Federação Nacional dos Estudantes em Ensino Técnico é fundada durante o Encontro Nacional de Estudantes Técnicos, reunindo representantes de diversas escolas técnicas do país." },
  { year: "2015", title: "Expansão Nacional", desc: "A FENET expande sua atuação para todos os estados brasileiros, fortalecendo a rede de coordenadores regionais e aumentando a representatividade estudantil." },
  { year: "2020", title: "Campanha Nacional", desc: "Lançamento da campanha \"Technic@ Viva\" em defesa do ensino técnico público, ampliando a visibilidade da causa estudantil em nível nacional." },
  { year: "2026", title: "Novos Rumos", desc: "Com mais de 100 mil estudantes representados, a FENET continua ampliando sua atuação e fortalecendo a organização estudantil em todo o Brasil." },
];

const stats = [
  { value: 37, suffix: "", label: "Coordenadores Nacionais" },
  { value: 15, suffix: "+", label: "Anos de Atuação" },
  { value: 26, suffix: "", label: "Estados Representados" },
  { value: 100, suffix: "k+", label: "Estudantes Representados" },
];

const values = [
  "Representatividade estudantil",
  "Democraticidade e transparência",
  "Luta por educação pública e gratuita",
  "Solidariedade e coletividade",
  "Combatividade e organização",
];

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" as never });
  const isRight = index % 2 === 0;

  return (
    <div ref={ref} className="flex items-start gap-6">
      {/* Node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.12, type: "spring", stiffness: 300 }}
          className="w-12 h-12 bg-[#F4141A] rounded-full flex items-center justify-center text-white text-[11px] font-black shadow-[0_4px_16px_rgba(244,20,26,0.35)] z-10"
        >
          {item.year}
        </motion.div>
        {index < timeline.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.3, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="w-[2px] h-12 bg-gradient-to-b from-[#F4141A]/60 to-[#F4141A]/10 mt-1"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isRight ? -24 : 24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.12 + 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white rounded-xl p-6 border border-[#E0E0E0] hover:border-[#F4141A]/25 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-200 flex-1 mb-2"
      >
        <h4 className="text-base font-bold text-[#1A1A1A] mb-2">{item.title}</h4>
        <p className="text-[#555555] text-sm leading-relaxed">{item.desc}</p>
      </motion.div>
    </div>
  );
}

export default function Sobre() {
  return (
    <>
      <PageHeader
        title="Defendendo o estudante técnico brasileiro"
        subtitle="A FENET é a voz dos estudantes do ensino técnico do Brasil. Com 37 coordenadores atuando em todo o território nacional, representamos milhares de jovens."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sobre" }]}
      />

      {/* Timeline */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <SectionHeading title="Nossa História" />
        <div className="max-w-[700px] space-y-0">
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 md:px-10 bg-[#1A1A1A]">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeading title="FENET em Números" light className="text-center items-center" />
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StaggerItem key={i}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center hover:bg-white/8 hover:border-[#F4141A]/30 transition-all duration-300">
                  <div className="text-[44px] font-black text-[#F4141A] leading-none mb-2">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/65 text-sm font-medium leading-snug">{s.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mission + Values */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <AnimatedSection direction="right">
            <SectionHeading title="Missão" />
            <p className="text-[#555555] text-base leading-relaxed">
              Representar e defender os direitos dos estudantes do ensino técnico profissional e tecnológico do Brasil, promovendo a organização estudantil, a participação política e a qualidade da educação técnica pública.
            </p>
          </AnimatedSection>

          <AnimatedSection direction="left" delay={0.1}>
            <SectionHeading title="Valores" />
            <ul className="space-y-3">
              {values.map((v, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3 text-[#555555] text-base"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4141A] flex-shrink-0" />
                  {v}
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
