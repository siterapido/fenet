import PageHeader from "../components/PageHeader";
import EventCard from "../components/EventCard";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";
import SectionHeading from "../components/SectionHeading";

const events = [
  { day: "18", month: "Abr", title: "Encontro Sul de Estudantes Técnicos — Curitiba", location: "UTFPR Câmpus Curitiba — Paraná", type: "Encontro Regional", typeColor: "red" as const },
  { day: "05", month: "Mai", title: "Seminário Nacional: Lei de Estágio para Estudantes Técnicos", location: "Online — Transmissão ao Vivo pelo YouTube", type: "Seminário", typeColor: "gray" as const },
  { day: "20", month: "Jun", title: "Plenária Nacional da FENET 2026", location: "Belo Horizonte — MG (local a confirmar)", type: "Plenária Nacional", typeColor: "red" as const },
  { day: "15", month: "Jul", title: "Encontro Nordeste de Estudantes Técnicos", location: "Recife — PE (local a confirmar)", type: "Encontro Regional", typeColor: "red" as const },
  { day: "10", month: "Ago", title: "Workshop: Organização Estudantil", location: "São Paulo — SP", type: "Workshop", typeColor: "gray" as const },
];

export default function Agenda() {
  return (
    <>
      <PageHeader
        title="Agenda de Eventos"
        subtitle="Participe das mobilizações e eventos da FENET em todo o Brasil."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Agenda" }]}
        backgroundImage="/images/fenet-526.jpg"
      />

      <section className="py-20 px-6 md:px-10 max-w-[1280px] mx-auto">
        <SectionHeading title="Próximos Eventos" subtitle="Calendário de 2026" />
        <StaggerContainer className="max-w-[800px] flex flex-col gap-4">
          {events.map((event, i) => (
            <StaggerItem key={i}>
              <EventCard {...event} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </>
  );
}
