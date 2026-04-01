"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import PageHeader from "../components/PageHeader";
import SectionHeading from "../components/SectionHeading";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";

const schoolsHistory = [
  {
    period: "Colonização",
    title: "Primeiros Aprendizes",
    content: "A formação técnica do trabalhador no Brasil começou na colonização, com os primeiros aprendizes de ofícios sendo os indígenas e os escravos.",
    year: "1534-1808",
  },
  {
    period: "Ouro em Minas",
    title: "Casas de Fundição",
    content: "Com o advento do ouro em Minas Gerais, foram criadas as Casas de Fundição e de Moeda. Pela primeira vez, estabelecia-se uma banca examinadora que avaliava habilidades dos aprendizes após 5-6 anos de aprendizado.",
    year: "1700s",
  },
  {
    period: "Arsenal da Marinha",
    title: "Centros de Aprendizagem",
    content: "Foram criados Centros de Aprendizagem de Ofícios nos Arsenais da Marinha, trazendo operários especializados de Portugal e recrutando pessoas pelas ruas.",
    year: "1800s",
  },
  {
    period: "Proibição de Fábricas",
    title: "Estagnação Tecnológica",
    content: "O desenvolvimento tecnológico ficou estagnado com a proibição de fábricas em 1785. Em 1800, começaram centros de aprendizagem para filhos dos pobres.",
    year: "1785-1800",
  },
  {
    period: "Chegada da Família Real",
    title: "Colégio das Fábricas",
    content: "D. João VI cria o Colégio das Fábricas, o primeiro estabelecimento instalado pelo poder público para atender à educação de artistas e aprendizes vindos de Portugal.",
    year: "1808",
  },
  {
    period: "Fim do Império",
    title: "636 Fábricas",
    content: "Em 1889, ao final do período imperial, existiam 636 estabelecimentos industriais com aproximadamente 54 mil trabalhadores, para uma população de 14 milhões de habitantes.",
    year: "1889",
  },
];

const reforms = [
  {
    year: "1906",
    title: "Decreto nº 787",
    description: "O Presidente Nilo Peçanha inicia política de ensino técnico nacional, criando quatro escolas profissionais em Campos, Petrópolis, Niterói e Paraíba do Sul.",
    icon: "📜",
  },
  {
    year: "1930",
    title: "Ministério da Educação",
    description: "Criado o Ministério da Educação e Saúde Pública. As Escolas de Aprendizes Artífices passaram do Ministério da Agricultura para o da Educação.",
    icon: "🏛️",
  },
  {
    year: "1942",
    title: "Reforma Capanema",
    description: "O ensino industrial deixou de ser primário e passou a ser de nível médio, articulado com as escolas de engenharia. Ingresso passou a depender de exames de admissão.",
    icon: "⚙️",
  },
  {
    year: "1953",
    title: "Lei da Equivalência",
    description: "Os egressos dos cursos técnicos passaram a ter direito a frequentar qualquer escola superior, vencendo a dualidade entre formação geral e profissional.",
    icon: "📚",
  },
  {
    year: "1971",
    title: "Lei 5.692",
    description: "Instituiu-se a profissionalização compulsória em todos os cursos de segundo grau, sob a justificativa de carência de técnicos de nível médio.",
    icon: "🔧",
  },
  {
    year: "1982",
    title: "Fim da Compulsoriedade",
    description: "O dispositivo de compulsoriedade foi revogado, passando a ser opção da escola e do aluno a profissionalização.",
    icon: "✓",
  },
];

const fenetTimeline = [
  {
    year: "2011",
    title: "Fundação",
    content: "A FENET é fundada em Belo Horizonte para representar os estudantes do ensino técnico brasileiro, preenchendo uma lacuna histórica na organização estudantil.",
  },
  {
    year: "2011-2019",
    title: "Expansão e Consolidação",
    content: "A federação expande sua atuação para todos os estados brasileiros, fortalecendo a rede de grêmios estudantis e coordenadores regionais.",
  },
  {
    year: "2020",
    title: "Campanha Technic@ Viva",
    content: "Lançamento da campanha em defesa do ensino técnico público, ampliando a visibilidade da causa estudantil em nível nacional.",
  },
  {
    year: "2020-2026",
    title: "Lutas Atuais",
    content: "Atuação contra a Reforma do Ensino Médio, pela recomposição orçamentária das instituições federais e por condições dignas de estudo.",
  },
];

const fights = [
  {
    icon: "🎓",
    title: "Assistência Estudantil",
    description: "A luta pelo 'Direito de Permanecer'. A FENET defende que não basta o estudante entrar na escola; ele precisa de auxílio-transporte, alimentação gratuita e moradia para não abandonar os estudos.",
  },
  {
    icon: "🛡️",
    title: "Ensino Público e Gratuito",
    description: "A entidade é uma barreira contra as tentativas de privatização e cortes de verbas na educação federal, estadual e municipal.",
  },
  {
    icon: "📖",
    title: "Contra a Reforma do Ensino Médio",
    description: "A federação tem sido uma das vozes mais críticas ao 'Novo Ensino Médio', denunciando a redução da carga horária de disciplinas básicas e a precarização da formação técnica.",
  },
  {
    icon: "🌡️",
    title: "Infraestrutura e Climatização",
    description: "A campanha contra as 'saunas de aula' ganhou força, exigindo condições dignas de estudo diante das crises climáticas.",
  },
];

const legacy = [
  {
    title: "Mais de 100 Anos de História",
    content: "As Escolas Técnicas, antigas Escolas de Artífices, eram destinadas principalmente aos filhos dos trabalhadores e menores abandonados.",
  },
  {
    title: "Propósito Original",
    content: '"Habilitar os filhos dos desfavorecidos com indispensável preparo técnico intelectual, fazê-los adquirir hábitos de trabalho profícuo que os afastará da ociosidade, escolas de vício e do crime".',
  },
  {
    title: "Educação Profissional Tecnológica",
    content: "Hoje vive um momento ímpar na sua história, onde acumulou experiência significativa, experimentou as mais diversas mudanças no intuito de aproximar-se das necessidades do cidadão e do mundo de trabalho.",
  },
  {
    title: "Cidadania e Desenvolvimento",
    content: "A Educação Profissional Tecnológica é elemento estratégico para a construção da cidadania e para uma melhor inserção de jovens e trabalhadores na sociedade.",
  },
];

function SchoolCard({ item, index }: { item: typeof schoolsHistory[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" as never });

  return (
    <StaggerItem>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white rounded-2xl border border-[#E5E5E5] p-6 hover:border-[#F4141A]/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 group"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[#F4141A] bg-[#F4141A]/8 px-3 py-1 rounded-full">
            {item.period}
          </span>
          <span className="text-xs font-semibold text-[#888]">{item.year}</span>
        </div>
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-3 group-hover:text-[#F4141A] transition-colors">
          {item.title}
        </h3>
        <p className="text-[#666] text-sm leading-relaxed">{item.content}</p>
      </motion.div>
    </StaggerItem>
  );
}

function ReformCard({ item, index }: { item: typeof reforms[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" as never });

  return (
    <StaggerItem>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex gap-4"
      >
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
            className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center text-2xl shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          >
            {item.icon}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.15 }}
          className="bg-white rounded-xl p-5 border border-[#E5E5E5] flex-1 hover:border-[#F4141A]/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all"
        >
          <span className="text-sm font-black text-[#F4141A]">{item.year}</span>
          <h4 className="text-base font-bold text-[#1A1A1A] mb-2 mt-1">{item.title}</h4>
          <p className="text-[#666] text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      </motion.div>
    </StaggerItem>
  );
}

function FENETCard({ item, index }: { item: typeof fenetTimeline[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" as never });

  return (
    <StaggerItem>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-[#F4141A] before:to-[#F4141A]/20"
      >
        <div className="absolute left-0 top-0 w-3 h-3 bg-[#F4141A] rounded-full -translate-x-[7px]" />
        <span className="text-sm font-black text-[#F4141A]">{item.year}</span>
        <h4 className="text-lg font-bold text-[#1A1A1A] mb-2 mt-1">{item.title}</h4>
        <p className="text-[#666] text-sm leading-relaxed">{item.content}</p>
      </motion.div>
    </StaggerItem>
  );
}

function FightCard({ item, index }: { item: typeof fights[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" as never });

  return (
    <StaggerItem>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white rounded-2xl border border-[#E5E5E5] p-6 hover:border-[#F4141A]/30 hover:shadow-[0_8px_28px_rgba(244,20,26,0.12)] transition-all duration-300"
      >
        <span className="text-3xl mb-4 block">{item.icon}</span>
        <h4 className="text-base font-bold text-[#1A1A1A] mb-3">{item.title}</h4>
        <p className="text-[#666] text-sm leading-relaxed">{item.description}</p>
      </motion.div>
    </StaggerItem>
  );
}

export default function Sobre() {
  return (
    <>
      <PageHeader
        title="Nossa História"
        subtitle="Das origens da educação técnica no Brasil à trajetória de luta da FENET. Conheça a jornada de mais de um século de história e resistência estudantil."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sobre" }]}
        backgroundImage="/images/fenet-448.jpg"
      />

      {/* Escolas Técnicas - Origins */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <SectionHeading title="Origens da Educação Técnica" />
        <p className="text-[#666] text-base max-w-[800px] mb-12 leading-relaxed">
          A formação técnica do trabalhador no Brasil começou a ser feita desde os tempos mais remotos da colonização. Vamos conhecer os marcos históricos que moldaram o ensino técnico brasileiro ao longo dos séculos.
        </p>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schoolsHistory.map((item, i) => (
            <SchoolCard key={i} item={item} index={i} />
          ))}
        </StaggerContainer>
      </section>

      {/* Reformas e Marcos Legais */}
      <section className="py-20 px-6 md:px-10 bg-[#FAFAFA]">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeading title="Reformas e Marcos Legais" />
          <p className="text-[#666] text-base max-w-[800px] mb-12 leading-relaxed">
            Ao longo de mais de um século, diversas reformas moldaram o ensino técnico brasileiro.
          </p>
          <div className="max-w-[900px] space-y-6">
            {reforms.map((item, i) => (
              <ReformCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Legado das Escolas Técnicas */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <SectionHeading title="Legado e Atualidade" />
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legacy.map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1A1A1A] rounded-2xl p-7 hover:bg-[#252525] transition-colors group"
              >
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#F4141A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.content}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Divider */}
      <div className="py-16 flex items-center justify-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-[2px] w-24 bg-[#F4141A]"
        />
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-4 text-2xl"
        >
          ⚙️
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="h-[2px] w-24 bg-[#F4141A]"
        />
      </div>

      {/* FENET Section */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <SectionHeading title="A FENET" />
        <p className="text-[#666] text-base max-w-[800px] mb-4 leading-relaxed">
          A Federação Nacional dos Estudantes em Ensino Técnico (FENET) é a entidade máxima de representação dos alunos de escolas técnicas e institutos federais no Brasil. Fundada oficialmente em 23 de abril de 2011, em Belo Horizonte, ela nasceu para preencher uma lacuna histórica: a necessidade de uma organização que unificasse as pautas específicas da formação técnica e profissional, conectando estudantes de diferentes regiões do país.
        </p>
        <p className="text-[#666] text-base max-w-[800px] mb-12 leading-relaxed">
          A criação da FENET ocorreu em um momento de grande expansão da Rede Federal de Educação Profissional, Científica e Tecnológica. Milhares de jovens ingressavam nos novos Institutos Federais (IFs), mas enfrentavam falta de infraestrutura, assistência estudantil precária e currículos que nem sempre atendiam às necessidades da classe trabalhadora.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fenetTimeline.map((item, i) => (
            <FENETCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Principais Lutas */}
      <section className="py-20 px-6 md:px-10 bg-[#FAFAFA]">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeading title="Principais Lutas e Bandeiras" />
          <p className="text-[#666] text-base max-w-[800px] mb-12 leading-relaxed">
            Ao longo de sua história, a federação se destacou por pautas que vão além da sala de aula:
          </p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fights.map((item, i) => (
              <FightCard key={i} item={item} index={i} />
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Organização */}
      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading title="Organização e Métodos" />
            <p className="text-[#666] text-base leading-relaxed mb-6">
              A FENET se organiza de baixo para cima. Sua base são os Grêmios Estudantis, que formam a linha de frente nas escolas. O principal fórum de decisão é o ENET (Encontro Nacional de Estudantes Técnicos), onde estudantes de todo o Brasil se reúnem para debater política educacional, trocar experiências de mobilização e eleger a nova diretoria da federação.
            </p>
            <p className="text-[#666] text-base leading-relaxed">
              A federação atua não apenas na defesa dos estudantes, mas em solidariedade a outras causas populares, entendendo que o estudante técnico é, acima de tudo, um futuro trabalhador.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#1A1A1A] rounded-2xl p-8"
          >
            <h4 className="text-lg font-bold text-white mb-4">FENET nos Dias Atuais</h4>
            <p className="text-white/65 text-sm leading-relaxed mb-4">
              Hoje, a federação consolidou-se como um movimento social de relevância nacional. Com mais de uma década de existência, a FENET mantém seu caráter independente e rebelde, reafirmando que a organização estudantil é a ferramenta mais eficaz para transformar a realidade da educação técnica no Brasil.
            </p>
            <div className="flex items-center gap-2 text-[#F4141A] font-bold text-sm">
              <span className="w-2 h-2 bg-[#F4141A] rounded-full animate-pulse" />
              Luta atual: recomposição orçamentária e revogação de medidas que retiram direitos da juventude
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conclusão */}
      <section className="py-20 px-6 md:px-10 bg-[#F4141A]">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              A Educação Profissional Tecnológica assume cada vez mais importância
            </h2>
            <p className="text-white/85 text-lg max-w-[800px] mx-auto leading-relaxed">
              Como elemento estratégico para a construção da cidadania e para uma melhor inserção de jovens e trabalhadores na sociedade. Mais do que um instrumento gerador de emprego e renda, também é um meio de redução das desigualdades sociais e fortalecimento da cidadania.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
