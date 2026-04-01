"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageHeader from "../components/PageHeader";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";

const BRAZIL_STATES = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
];

interface Director {
  id: string;
  nome: string;
  cargo: string;
  estado: string;
}

const SEED_DIRECTORS: Director[] = [
  { id: "1", nome: "Ana Paula Ferreira", cargo: "Presidente", estado: "MG" },
  { id: "2", nome: "Carlos Eduardo Lima", cargo: "Vice-Presidente", estado: "SP" },
  { id: "3", nome: "Juliana Souza", cargo: "Secretária-Geral", estado: "RJ" },
  { id: "4", nome: "Rafael Mendes", cargo: "Tesoureiro", estado: "BA" },
  { id: "5", nome: "Fernanda Costa", cargo: "Coord. Regional Sul", estado: "RS" },
  { id: "6", nome: "Diego Alves", cargo: "Coord. Regional Norte", estado: "PA" },
];

const STORAGE_KEY = "fenet_directors";

function loadDirectors(): Director[] {
  if (typeof window === "undefined") return SEED_DIRECTORS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : SEED_DIRECTORS;
  } catch {
    return SEED_DIRECTORS;
  }
}

function DirectorCard({ director }: { director: Director }) {
  const state = BRAZIL_STATES.find((s) => s.uf === director.estado);
  const initials = director.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.13)" }}
      className="bg-white border border-[#E0E0E0] rounded-2xl p-6 relative overflow-hidden hover:border-[#F4141A]/25 transition-colors duration-200"
    >
      {/* UF badge */}
      <div className="absolute top-4 right-4 w-11 h-11 bg-[#F4141A] rounded-xl flex items-center justify-center text-white text-[11px] font-black tracking-wider shadow-[0_4px_12px_rgba(244,20,26,0.3)]">
        {director.estado}
      </div>

      {/* Avatar com iniciais */}
      <div className="w-14 h-14 bg-[#FFF0F0] border-2 border-[#F4141A]/20 rounded-full flex items-center justify-center text-[#F4141A] text-lg font-black mb-4">
        {initials}
      </div>

      <h3 className="text-[15px] font-bold text-[#1A1A1A] leading-snug pr-14 mb-1">
        {director.nome}
      </h3>
      <p className="text-[13px] text-[#555555] font-medium mb-3">{director.cargo}</p>

      <div className="flex items-center gap-1.5 text-[12px] text-[#999999]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>{state?.name ?? director.estado}</span>
      </div>
    </motion.div>
  );
}

export default function DiretoriaPage() {
  const [directors, setDirectors] = useState<Director[]>(() => loadDirectors());
  const [formData, setFormData] = useState({ nome: "", cargo: "", estado: "" });
  const [errors, setErrors] = useState<{ nome?: string; cargo?: string; estado?: string }>({});
  const [formState, setFormState] = useState<"idle" | "success">("idle");
  const [nomeFocused, setNomeFocused] = useState(false);
  const [cargoFocused, setCargoFocused] = useState(false);
  const [estadoFocused, setEstadoFocused] = useState(false);

  function saveDirectors(updated: Director[]) {
    setDirectors(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function validate(): boolean {
    const newErrors: typeof errors = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.cargo.trim()) newErrors.cargo = "Cargo é obrigatório";
    if (!formData.estado) newErrors.estado = "Estado é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const newDirector: Director = {
      id: Date.now().toString(),
      nome: formData.nome.trim(),
      cargo: formData.cargo.trim(),
      estado: formData.estado,
    };
    saveDirectors([...directors, newDirector]);
    setFormData({ nome: "", cargo: "", estado: "" });
    setErrors({});
    setFormState("success");
    setTimeout(() => setFormState("idle"), 3000);
  }

  const nomeActive = nomeFocused || !!formData.nome;
  const cargoActive = cargoFocused || !!formData.cargo;
  const estadoActive = estadoFocused || !!formData.estado;

  return (
    <>
      <PageHeader
        title="Diretoria"
        subtitle="Conheça os membros da diretoria nacional da FENET e os representantes de cada estado."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diretoria" }]}
      />

      {/* Grid de diretores */}
      <section className="py-16 px-6 md:px-10 max-w-[1280px] mx-auto">
        <AnimatedSection direction="up">
          <SectionHeading
            title="Membros da Diretoria"
            subtitle={`${directors.length} diretor${directors.length !== 1 ? "es" : ""} cadastrado${directors.length !== 1 ? "s" : ""}`}
          />
        </AnimatedSection>

        <AnimatePresence mode="popLayout">
          {directors.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-[#999999]"
            >
              <p className="text-sm">Nenhum diretor cadastrado ainda.</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {directors.map((d) => (
                  <DirectorCard key={d.id} director={d} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Formulário de cadastro */}
      <section className="py-20 px-6 md:px-10 bg-[#F5F5F5]">
        <div className="max-w-[700px] mx-auto">
          <AnimatedSection direction="up">
            <SectionHeading title="Cadastrar Diretor" />
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1}>
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-[#28A745]/30 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-[#28A745] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Diretor cadastrado!</h3>
                  <p className="text-[#555555] text-sm">O registro foi adicionado com sucesso.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8 border border-[#E0E0E0] space-y-5"
                >
                  {/* Nome */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, nome: e.target.value }));
                          if (errors.nome) setErrors((p) => ({ ...p, nome: undefined }));
                        }}
                        onFocus={() => setNomeFocused(true)}
                        onBlur={() => setNomeFocused(false)}
                        className="w-full h-14 px-4 pt-5 pb-2 bg-white rounded-lg text-[#1A1A1A] text-sm outline-none transition-colors duration-200 border-2"
                        style={{
                          borderColor: errors.nome ? "#F4141A" : nomeFocused ? "#F4141A" : "#E0E0E0",
                        }}
                      />
                      <label
                        className="absolute left-4 pointer-events-none font-medium transition-all duration-200"
                        style={{
                          top: nomeActive ? "8px" : "50%",
                          transform: nomeActive ? "none" : "translateY(-50%)",
                          fontSize: nomeActive ? "10px" : "14px",
                          color: nomeFocused ? "#F4141A" : "#999999",
                          letterSpacing: nomeActive ? "0.08em" : "normal",
                          textTransform: nomeActive ? "uppercase" : "none",
                        }}
                      >
                        Nome completo
                      </label>
                    </div>
                    {errors.nome && (
                      <p className="text-[11px] text-[#F4141A] mt-1 ml-1">{errors.nome}</p>
                    )}
                  </div>

                  {/* Cargo */}
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.cargo}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, cargo: e.target.value }));
                          if (errors.cargo) setErrors((p) => ({ ...p, cargo: undefined }));
                        }}
                        onFocus={() => setCargoFocused(true)}
                        onBlur={() => setCargoFocused(false)}
                        className="w-full h-14 px-4 pt-5 pb-2 bg-white rounded-lg text-[#1A1A1A] text-sm outline-none transition-colors duration-200 border-2"
                        style={{
                          borderColor: errors.cargo ? "#F4141A" : cargoFocused ? "#F4141A" : "#E0E0E0",
                        }}
                      />
                      <label
                        className="absolute left-4 pointer-events-none font-medium transition-all duration-200"
                        style={{
                          top: cargoActive ? "8px" : "50%",
                          transform: cargoActive ? "none" : "translateY(-50%)",
                          fontSize: cargoActive ? "10px" : "14px",
                          color: cargoFocused ? "#F4141A" : "#999999",
                          letterSpacing: cargoActive ? "0.08em" : "normal",
                          textTransform: cargoActive ? "uppercase" : "none",
                        }}
                      >
                        Cargo
                      </label>
                    </div>
                    {errors.cargo && (
                      <p className="text-[11px] text-[#F4141A] mt-1 ml-1">{errors.cargo}</p>
                    )}
                  </div>

                  {/* Estado */}
                  <div>
                    <div className="relative">
                      <select
                        value={formData.estado}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, estado: e.target.value }));
                          if (errors.estado) setErrors((p) => ({ ...p, estado: undefined }));
                        }}
                        onFocus={() => setEstadoFocused(true)}
                        onBlur={() => setEstadoFocused(false)}
                        className="w-full h-14 px-4 pt-3 bg-white rounded-lg text-[#1A1A1A] text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer border-2"
                        style={{
                          borderColor: errors.estado ? "#F4141A" : estadoFocused ? "#F4141A" : "#E0E0E0",
                          color: formData.estado ? "#1A1A1A" : "transparent",
                        }}
                      >
                        <option value="" disabled />
                        {BRAZIL_STATES.map((s) => (
                          <option key={s.uf} value={s.uf} style={{ color: "#1A1A1A" }}>
                            {s.uf} — {s.name}
                          </option>
                        ))}
                      </select>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#999999]"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="absolute left-4 font-medium pointer-events-none transition-all duration-200"
                        style={{
                          top: estadoActive ? "8px" : "50%",
                          transform: estadoActive ? "none" : "translateY(-50%)",
                          fontSize: estadoActive ? "10px" : "14px",
                          color: estadoFocused ? "#F4141A" : "#999999",
                          letterSpacing: estadoActive ? "0.08em" : "normal",
                          textTransform: estadoActive ? "uppercase" : "none",
                        }}
                      >
                        Estado
                      </span>
                    </div>
                    {errors.estado && (
                      <p className="text-[11px] text-[#F4141A] mt-1 ml-1">{errors.estado}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#F4141A] hover:bg-[#C01015] text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wide transition-all duration-200 hover:shadow-[0_4px_14px_rgba(244,20,26,0.35)]"
                  >
                    Cadastrar Diretor
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
