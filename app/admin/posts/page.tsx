"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getPosts, getCategories, deletePost } from "../actions";

type PostItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  type: string;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: string | null;
  authorId: string;
  categoryName: string | null;
};

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

const statusColors: Record<string, string> = {
  publicado: "bg-green-100 text-green-700",
  rascunho: "bg-yellow-100 text-yellow-700",
  arquivado: "bg-gray-100 text-gray-500",
};

const typeLabels: Record<string, string> = {
  noticia: "Notícia",
  artigo: "Artigo",
  comunicado: "Comunicado",
  entrevista: "Entrevista",
};

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    const [postsData, categoriesData] = await Promise.all([
      getPosts({
        status: statusFilter,
        categoryId: categoryFilter,
        search,
      }),
      getCategories(),
    ]);
    setPosts(postsData as PostItem[]);
    setCategoriesList(categoriesData);
    setLoading(false);
  }, [statusFilter, categoryFilter, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    await deletePost(id);
    await loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Posts</h1>
          <p className="text-sm text-[#999] mt-1">
            Gerencie os posts do blog da FENET
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-[#F4141A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C01015] transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-[#E0E0E0] rounded-lg text-sm flex-1 min-w-[200px] outline-none focus:border-[#F4141A] transition-colors"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] bg-white"
        >
          <option value="all">Todos os status</option>
          <option value="publicado">Publicado</option>
          <option value="rascunho">Rascunho</option>
          <option value="arquivado">Arquivado</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] bg-white"
        >
          <option value="all">Todas as categorias</option>
          {categoriesList.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F5F5] border-b border-[#E0E0E0]">
              <th className="text-left px-6 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Título
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Categoria
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Tipo
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Data
              </th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F0]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#999] text-sm">
                  Carregando...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#999] text-sm">
                  Nenhum post encontrado
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {post.featuredImage ? (
                        <img
                          src={post.featuredImage}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#999]">
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                            <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#1A1A1A] truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-[#999] truncate">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#555]">
                    {post.categoryName || "—"}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-[#555]">
                      {typeLabels[post.type] || post.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        statusColors[post.status] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {post.status === "publicado"
                        ? "Publicado"
                        : post.status === "rascunho"
                        ? "Rascunho"
                        : "Arquivado"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-[#999]">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 text-[#555] hover:text-[#F4141A] hover:bg-[#FFF0F0] rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-[#555] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
