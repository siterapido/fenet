import PageHeader from "../components/PageHeader";
import DocumentCard from "../components/DocumentCard";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";
import SectionHeading from "../components/SectionHeading";

const documents = [
  { title: "Estatuto da FENET", type: "Documento Oficial", size: "2.3 MB", date: "15/01/2024" },
  { title: "Regimento Interno", type: "Documento Oficial", size: "1.1 MB", date: "15/01/2024" },
  { title: "Plano de Ação 2024–2026", type: "Planejamento", size: "3.2 MB", date: "10/03/2024" },
  { title: "Resolução 001/2024 — Diretrizes", type: "Resolução", size: "850 KB", date: "20/02/2024" },
  { title: "Ata da Plenária 2023", type: "Ata", size: "4.1 MB", date: "15/12/2023" },
  { title: "Carta de Princípios", type: "Documento Institucional", size: "520 KB", date: "01/06/2023" },
];

export default function Documentos() {
  return (
    <>
      <PageHeader
        title="Documentos"
        subtitle="Acesse documentos oficiais, atas e resoluções da FENET."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Documentos" }]}
        backgroundImage="/images/fenet-448.jpg"
      />

      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <SectionHeading title="Documentos Oficiais" subtitle="Clique para fazer o download" />
        <StaggerContainer className="max-w-[860px] flex flex-col gap-3">
          {documents.map((doc, i) => (
            <StaggerItem key={i}>
              <DocumentCard {...doc} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}
