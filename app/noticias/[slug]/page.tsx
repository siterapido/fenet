import { notFound } from "next/navigation";
import { getPostBySlug } from "../../admin/actions";
import PageHeader from "../../components/PageHeader";
import { auth } from "@/lib/auth/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
    month: "long",
    year: "numeric",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "publicado") {
    notFound();
  }

  const { data: session } = await auth.getSession();
  const isAdmin = !!session?.user;

  return (
    <>
      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Notícias", href: "/noticias" },
          { label: post.title },
        ]}
      />

      <article className="max-w-[800px] mx-auto px-6 md:px-10 py-16">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {post.categoryName && (
            <span className="bg-[#F4141A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {post.categoryName}
            </span>
          )}
          <span className="text-xs text-[#999]">
            {typeLabels[post.type] || post.type}
          </span>
          <span className="text-xs text-[#999]">
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-[#555] leading-relaxed mb-8 font-medium border-l-4 border-[#F4141A] pl-5">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none text-[#1A1A1A] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {/* Admin link */}
        {isAdmin && (
          <div className="mt-12 pt-6 border-t border-[#E0E0E0]">
            <Link
              href={`/admin/posts/${post.id}/edit`}
              className="text-sm text-[#999] hover:text-[#F4141A] flex items-center gap-1 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Editar no Admin
            </Link>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/noticias"
            className="text-sm text-[#555] hover:text-[#F4141A] flex items-center gap-1 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Voltar para Notícias
          </Link>
        </div>
      </article>
    </>
  );
}
