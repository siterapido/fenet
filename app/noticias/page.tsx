"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import PageHeader from "../components/PageHeader";
import NewsCard from "../components/NewsCard";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";
import { getPublishedPosts, getPublicCategories } from "../admin/actions";

const typeLabels: Record<string, string> = {
  noticia: "Notícia",
  artigo: "Artigo",
  comunicado: "Comunicado",
  entrevista: "Entrevista",
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Noticias() {
  const [posts, setPosts] = useState<Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    type: string;
    status: string;
    publishedAt: string | null;
    createdAt: string;
    categoryId: string | null;
    categoryName: string | null;
  }>>([]);
  const [categories, setCategories] = useState<Array<{id: string; name: string; slug: string; createdAt: string}>>([]);
  const [active, setActive] = useState("Todas");
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useState(() => {
    async function load() {
      const [postsData, catsData] = await Promise.all([
        getPublishedPosts(),
        getPublicCategories(),
      ]);
      setPosts(postsData);
      setCategories(catsData);
      setLoading(false);
    }
    load();
  });

  const allCategories = ["Todas", ...categories.map((c) => c.name)];
  const filtered =
    active === "Todas"
      ? posts
      : posts.filter((n) => n.categoryName === active);

  return (
    <>
      <PageHeader
        title="Notícias"
        subtitle="Fique por dentro das últimas movimentações da FENET e da educação técnica."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Notícias" }]}
        backgroundImage="/images/fenet-208.jpg"
      />

      {/* Filter bar */}
      <div className="bg-white border-b border-[#E0E0E0] sticky top-[68px] z-30">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-[#555555] mr-2 hidden sm:block">Filtrar:</span>
          <div className="relative flex gap-2 flex-wrap flex-1">
            {allCategories.map((cat) => (
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
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-6 md:px-10 max-w-[1280px] mx-auto">
        <AnimatePresence mode="wait">
          <StaggerContainer key={active} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center text-[#999] col-span-3 py-12">Carregando...</p>
            ) : filtered.length === 0 ? (
              <p className="text-center text-[#999] col-span-3 py-12">
                Nenhuma notícia encontrada nesta categoria.
              </p>
            ) : (
              filtered.map((item, i) => (
                <StaggerItem key={item.id}>
                  <NewsCard
                    category={item.categoryName || typeLabels[item.type] || "Notícia"}
                    title={item.title}
                    summary={item.excerpt || undefined}
                    date={formatDate(item.publishedAt || item.createdAt)}
                    href={`/noticias/${item.slug}`}
                    image={item.featuredImage || undefined}
                  />
                </StaggerItem>
              ))
            )}
          </StaggerContainer>
        </AnimatePresence>

        {!loading && filtered.length > 0 && (
          <div className="text-center mt-14">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 border-[#F4141A] text-[#F4141A] px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-[#FFF0F0] transition-colors duration-200"
            >
              Carregar mais notícias
            </motion.button>
          </div>
        )}
      </section>
    </>
  );
}
