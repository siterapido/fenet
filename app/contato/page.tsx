"use client";

import { useState } from "react";
import { motion } from "motion/react";
import PageHeader from "../components/PageHeader";
import AnimatedSection from "../components/AnimatedSection";
import FloatingLabel, { FloatingTextarea } from "../components/FloatingLabel";
import SectionHeading from "../components/SectionHeading";

const contactItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "E-mail",
    value: "fenetbrasil@gmail.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Endereço",
    value: "Belo Horizonte, MG — Brasil",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: "Redes Sociais",
    value: "@fenetbrasil",
  },
];

type FormState = "idle" | "sending" | "success";

export default function Contato() {
  const [formState, setFormState] = useState<FormState>("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => setFormState("success"), 1800);
  }

  return (
    <>
      <PageHeader
        title="Fale com a FENET"
        subtitle="Estamos prontos para atender você. Preencha o formulário ou entre em contato pelos nossos canais."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contato" }]}
      />

      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
          {/* Form */}
          <AnimatedSection direction="right">
            <SectionHeading title="Envie uma mensagem" />

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#f0fff4] border border-[#28A745]/30 rounded-2xl p-10 text-center"
              >
                <div className="w-16 h-16 bg-[#28A745] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Mensagem enviada!</h3>
                <p className="text-[#555555] text-sm">Entraremos em contato em breve.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <FloatingLabel label="Nome completo" name="nome" required />
                <FloatingLabel label="Endereço de e-mail" type="email" name="email" required />

                <div className="relative">
                  <select
                    name="assunto"
                    required
                    className="w-full h-14 px-4 pt-3 bg-white border-2 border-[#E0E0E0] rounded-lg text-[#1A1A1A] text-sm outline-none focus:border-[#F4141A] transition-colors duration-200 appearance-none cursor-pointer"
                  >
                    <option value="">Selecione um assunto</option>
                    <option>Filiação de entidade</option>
                    <option>Parcerias</option>
                    <option>Imprensa</option>
                    <option>Outros</option>
                  </select>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#999999]">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="absolute left-4 top-[8px] text-[10px] uppercase tracking-[0.08em] font-medium text-[#999999]">
                    Assunto
                  </span>
                </div>

                <FloatingTextarea label="Sua mensagem" name="mensagem" required rows={5} />

                <motion.button
                  type="submit"
                  disabled={formState === "sending"}
                  whileHover={{ scale: formState === "idle" ? 1.01 : 1 }}
                  whileTap={{ scale: formState === "idle" ? 0.98 : 1 }}
                  className="w-full bg-[#F4141A] hover:bg-[#C01015] disabled:opacity-60 text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition-all duration-200 hover:shadow-[0_4px_14px_rgba(244,20,26,0.35)] flex items-center justify-center gap-2"
                >
                  {formState === "sending" ? (
                    <>
                      <svg className="animate-spin-slow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="28 56"/>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Enviar mensagem"
                  )}
                </motion.button>
              </form>
            )}
          </AnimatedSection>

          {/* Info card */}
          <AnimatedSection direction="left" delay={0.15}>
            <div className="bg-[#1A1A1A] rounded-2xl p-8 text-white h-full">
              <h3 className="text-xl font-bold mb-2">Fale conosco</h3>
              <p className="text-white/60 text-sm mb-8 leading-relaxed">
                Tem alguma dúvida sobre filiação, parcerias ou quer saber mais sobre a FENET? Preencha o formulário ou entre em contato pelos canais abaixo.
              </p>

              <div className="space-y-5">
                {contactItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-10 h-10 bg-[#F4141A]/12 border border-[#F4141A]/25 rounded-lg flex items-center justify-center text-[#F4141A] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/45 text-[11px] uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-7 border-t border-white/8">
                <p className="text-white/45 text-[11px] uppercase tracking-wider mb-4">Siga-nos nas redes</p>
                <div className="flex gap-3">
                  {["IG", "FB", "TW", "YT"].map((s, i) => (
                    <motion.div
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.4, duration: 0.3 }}
                      whileHover={{ scale: 1.12, backgroundColor: "#F4141A" }}
                      className="w-10 h-10 bg-white/8 rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer"
                    >
                      {s}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
