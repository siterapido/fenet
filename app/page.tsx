import Image from "next/image";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import NewsCard from "./components/NewsCard";
import EventCard from "./components/EventCard";
import AnimatedSection from "./components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "./components/StaggerContainer";
import SectionHeading from "./components/SectionHeading";
import AnimatedCounter from "./components/AnimatedCounter";

const featuredNews = {
  category: "Direitos Estudantis",
  title: "Novos Institutos Federais anunciam criação de grêmios livres em parceria com a FENET",
  excerpt: "A iniciativa beneficia mais de 12 mil estudantes em 8 estados e marca um avanço histórico para a representação estudantil no ensino técnico.",
  date: "22 Mar 2026",
  readTime: "4 min",
};

const secondaryNews = [
  { category: "FENET em Ação", title: "Coordenação nacional se reúne para discutir pauta do segundo semestre", date: "19 Mar 2026", readTime: "3 min" },
  { category: "Cultura", title: "Festival Cultural Estudantil: inscrições abertas para escolas técnicas de todo o Brasil", date: "17 Mar 2026", readTime: "2 min" },
];

const latestNews = [
  { category: "Educação", title: "MEC publica novas diretrizes para ensino técnico integrado", date: "14 Mar 2026", readTime: "5 min" },
  { category: "Eventos", title: "Encontro Sul de Estudantes acontece em Curitiba no mês de abril", date: "12 Mar 2026", readTime: "3 min" },
  { category: "FENET em Ação", title: "FENET lança guia sobre lei de estágio para estudantes técnicos", date: "09 Mar 2026", readTime: "4 min" },
];

const stats = [
  { value: 37, suffix: "", label: "Coordenadores Nacionais" },
  { value: 15, suffix: "+", label: "Anos de Atuação" },
  { value: 26, suffix: "", label: "Estados Representados" },
  { value: 100, suffix: "k+", label: "Estudantes Representados" },
];

const events = [
  { day: "18", month: "Abr", title: "Encontro Sul de Estudantes Técnicos", location: "UTFPR Curitiba — Paraná", type: "Encontro Regional", typeColor: "red" as const },
  { day: "05", month: "Mai", title: "Seminário Nacional: Lei de Estágio para Estudantes Técnicos", location: "Online — YouTube", type: "Seminário", typeColor: "gray" as const },
  { day: "20", month: "Jun", title: "Plenária Nacional da FENET 2026", location: "Belo Horizonte — MG", type: "Plenária Nacional", typeColor: "red" as const },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroSection
        tag="FENET · Março 2026"
        headline="Defendendo o estudante técnico brasileiro"
        subheadline="Organização nacional que representa mais de 100 mil estudantes de ensino técnico em institutos federais e escolas estaduais."
        ctaLabel="Últimas notícias"
        ctaHref="/noticias"
        secondaryLabel="Conheça a FENET"
        secondaryHref="/sobre"
      />

      {/* ── Em Destaque ──────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <SectionHeading title="Em Destaque" subtitle="As principais notícias da semana" className="mb-0" />
          <AnimatedSection direction="right">
            <Link href="/noticias" className="text-[#F4141A] text-sm font-semibold hover:text-[#C01015] transition-colors flex items-center gap-1.5 group">
              Ver todas as notícias
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform duration-150">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
          <AnimatedSection direction="up" delay={0.05}>
            <NewsCard
              category={featuredNews.category}
              title={featuredNews.title}
              summary={featuredNews.excerpt}
              date={featuredNews.date}
              readTime={featuredNews.readTime}
              featured
            />
          </AnimatedSection>

          <div className="flex flex-col gap-5">
            {secondaryNews.map((news, i) => (
              <AnimatedSection key={i} direction="left" delay={0.1 + i * 0.1}>
                <NewsCard
                  category={news.category}
                  title={news.title}
                  date={news.date}
                  readTime={news.readTime}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Últimas Notícias ──────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[#F5F5F5]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeading title="Últimas Notícias" subtitle="Fique por dentro de tudo que acontece" className="mb-0" />
            <AnimatedSection direction="right">
              <Link href="/noticias" className="text-[#F4141A] text-sm font-semibold hover:text-[#C01015] transition-colors flex items-center gap-1.5 group">
                Ver todas
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform duration-150">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news, i) => (
              <StaggerItem key={i}>
                <NewsCard
                  category={news.category}
                  title={news.title}
                  date={news.date}
                  readTime={news.readTime}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Sobre / Stats ────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection direction="right">
            <SectionHeading title="Sobre a FENET" subtitle="Nossa história e missão" />
            <h3 className="text-3xl md:text-[36px] font-black text-[#1A1A1A] leading-tight mb-5">
              Defendendo o <span className="text-[#F4141A]">estudante técnico</span> brasileiro desde 2011
            </h3>
            <p className="text-[#555555] text-base leading-relaxed mb-8">
              A FENET é a voz dos estudantes do ensino técnico do Brasil. Com 37 coordenadores atuando em todo o território nacional, representamos milhares de jovens em institutos federais e escolas técnicas estaduais.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 bg-[#F4141A] hover:bg-[#C01015] text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:shadow-[0_4px_14px_rgba(244,20,26,0.35)] hover:-translate-y-px"
              >
                Conheça nossa história
              </Link>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 border-2 border-[#F4141A] text-[#F4141A] hover:bg-[#FFF0F0] px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors duration-200"
              >
                Filie sua entidade
              </Link>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-2xl p-7 text-center shadow-[0_2px_12px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-shadow duration-300 border-t-[3px] border-[#F4141A] group hover:-translate-y-1 transition-transform">
                  <div className="text-[42px] font-black text-[#F4141A] leading-none mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[#555555] text-sm font-medium leading-snug">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Eventos ──────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[#F5F5F5]">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <SectionHeading title="Próximos Eventos" subtitle="Participe das mobilizações nacionais" className="mb-0" />
            <AnimatedSection direction="right">
              <Link href="/agenda" className="text-[#F4141A] text-sm font-semibold hover:text-[#C01015] transition-colors flex items-center gap-1.5 group">
                Ver agenda completa
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform duration-150">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </AnimatedSection>
          </div>

          <StaggerContainer className="max-w-[760px] flex flex-col gap-4">
            {events.map((event, i) => (
              <StaggerItem key={i}>
                <EventCard {...event} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Galeria ENET ─────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <AnimatedSection>
          <SectionHeading title="ENET 2023" subtitle="Encontro Nacional de Estudantes Técnicos" />
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {[
            { src: "/enet-foto-208.jpg", alt: "ENET 2023 - estudantes técnicos" },
            { src: "/enet-foto-448.jpg", alt: "ENET 2023 - encontro nacional" },
            { src: "/enet-foto-526.jpg", alt: "ENET 2023 - participantes" },
            { src: "/enet-foto-527.jpg", alt: "ENET 2023 - mobilização estudantil" },
          ].map((foto, i) => (
            <StaggerItem key={i}>
              <div className="relative aspect-square overflow-hidden rounded-xl group">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── Newsletter ───────────────────────────────────── */}
      <section className="relative py-20 px-6 md:px-10 overflow-hidden bg-[#1A1A1A]">
        {/* Subtle red glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F4141A 0%, transparent 70%)" }} />

        <AnimatedSection className="relative z-10 max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#F4141A]/15 border border-[#F4141A]/25 text-[#F4141A] text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-6">
            Newsletter
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
            Fique por dentro das novidades
          </h2>
          <p className="text-[#999999] text-base mb-8 leading-relaxed">
            Receba notícias, comunicados e convocações da FENET direto no seu e-mail.
          </p>
          <form className="flex gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu endereço de e-mail"
              className="flex-1 bg-white/8 border border-white/12 text-white placeholder-white/35 px-4 py-3.5 rounded-lg text-sm outline-none focus:border-[#F4141A]/60 focus:bg-white/10 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-[#F4141A] hover:bg-[#C01015] text-white px-6 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:shadow-[0_4px_14px_rgba(244,20,26,0.4)] flex-shrink-0"
            >
              Entrar
            </button>
          </form>
        </AnimatedSection>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="relative py-20 px-6 md:px-10 overflow-hidden">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 gradient-shift"
          style={{ background: "linear-gradient(135deg, #F4141A 0%, #C01015 40%, #ff3a3f 80%, #F4141A 100%)", backgroundSize: "200% 200%" }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <AnimatedSection className="relative z-10 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-black text-white leading-tight">
              Sua entidade pode fazer parte da FENET
            </h2>
            <p className="text-white/80 text-base mt-2">
              Grêmios, DCEs e entidades estudantis de escolas técnicas de todo o Brasil
            </p>
          </div>
          <Link
            href="/contato"
            className="flex-shrink-0 inline-flex items-center gap-2.5 bg-white text-[#F4141A] hover:bg-[#FFF0F0] font-black px-8 py-4 rounded-xl text-[15px] tracking-wide transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 uppercase"
          >
            Saiba como se filiar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
