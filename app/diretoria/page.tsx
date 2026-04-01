import { getPublishedDirectors } from "../admin/actions";
import PageHeader from "../components/PageHeader";
import AnimatedSection from "../components/AnimatedSection";
import SectionHeading from "../components/SectionHeading";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";

const BRAZIL_STATES: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia",
  CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás",
  MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais",
  PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí",
  RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul",
  RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo",
  SE: "Sergipe", TO: "Tocantins",
};

interface Director {
  id: string;
  nome: string;
  cargo: string;
  estado: string;
  instituicao: string;
}

function DirectorCard({ director }: { director: Director }) {
  const initials = director.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const stateName = BRAZIL_STATES[director.estado] || director.estado;

  return (
    <StaggerItem>
      <div className="group relative bg-white rounded-2xl p-6 border border-[#E0E0E0] hover:border-[#F4141A]/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(244,20,26,0.12)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4141A]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F4141A] via-[#E01016] to-[#C01015] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-[#F4141A]/20 group-hover:scale-105 transition-transform duration-300">
              {initials}
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F4141A]/10 text-[#F4141A] text-xs font-bold tracking-wider">
              {director.estado}
            </div>
          </div>

          <h3 className="text-base font-bold text-[#1A1A1A] mb-1 group-hover:text-[#F4141A] transition-colors">
            {director.nome}
          </h3>
          <p className="text-sm font-medium text-[#555555] mb-3">{director.cargo}</p>

          {director.instituicao && (
            <div className="flex items-center gap-1.5 text-xs text-[#999999]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
              </svg>
              <span className="truncate">{director.instituicao}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-[#999999] mt-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span>{stateName}</span>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export default async function DiretoriaPage() {
  const directors = await getPublishedDirectors();
  const directorsData = directors as Director[];

  return (
    <>
      <PageHeader
        title="Diretoria"
        subtitle="Conheça os membros da diretoria nacional da FENET Brasil e os representantes de cada estado."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diretoria" }]}
        backgroundImage="/images/fenet-527.jpg"
      />

      <section className="py-16 px-6 md:px-10 max-w-[1280px] mx-auto">
        <AnimatedSection direction="up">
          <SectionHeading
            title="Membros da Diretoria"
            subtitle={`${directorsData.length} membro${directorsData.length !== 1 ? "s" : ""} cadastrado${directorsData.length !== 1 ? "s" : ""}`}
          />
        </AnimatedSection>

        {directorsData.length === 0 ? (
          <AnimatedSection direction="up">
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="1.5">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <p className="text-[#999999] text-sm">Nenhum diretor cadastrado ainda.</p>
              <p className="text-[#999999] text-xs mt-1">Em breve você poderá conhecer nossa equipe.</p>
            </div>
          </AnimatedSection>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {directorsData.map((director) => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </StaggerContainer>
        )}
      </section>

      <section className="py-20 px-6 md:px-10 bg-[#1A1A1A]">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedSection direction="up">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Junte-se à Nossa Luta
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                A FENET trabalha para defender os direitos dos estudantes técnicos em todo o Brasil. 
                Venha fazer parte dessa história!
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contato"
                className="px-8 py-3 bg-[#F4141A] text-white font-semibold rounded-xl hover:bg-[#C01015] transition-colors"
              >
                Fale Conosco
              </a>
              <a
                href="/sobre"
                className="px-8 py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Conheça a FENET
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
