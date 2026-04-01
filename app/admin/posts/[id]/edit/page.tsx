"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPostById, getCategories, updatePost, uploadImage } from "../../../actions";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [post, setPost] = useState<Record<string, unknown> | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(async ({ id }) => {
      const [postData, cats] = await Promise.all([
        getPostById(id),
        getCategories(),
      ]);
      if (postData) {
        setPost(postData as Record<string, unknown>);
        setTitle(postData.title as string);
        setSlug(postData.slug as string);
        setImageUrl(postData.featuredImage as string || "");
        setPreviewImage(postData.featuredImage as string || "");
      }
      setCategories(cats);
      setLoading(false);
    });
  }, [params]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const url = await uploadImage(fd);
      setImageUrl(url);
      setPreviewImage(url);
    } catch {
      alert("Erro ao fazer upload da imagem");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#999] text-sm">
        Carregando...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-[#999]">Post não encontrado.</p>
        <button
          onClick={() => router.push("/admin/posts")}
          className="mt-4 text-sm text-[#F4141A] hover:underline"
        >
          Voltar para posts
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-sm text-[#555] hover:text-[#F4141A] flex items-center gap-1 mb-4 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Voltar
        </button>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Editar Post</h1>
        <p className="text-sm text-[#999] mt-1">Altere os dados do post</p>
      </div>

      <form
        action={async (formData) => {
          const { id } = await params;
          await updatePost(id, formData);
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Título *
              </label>
              <input
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Slug *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#999]">/noticias/</span>
                <input
                  name="slug"
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Resumo
              </label>
              <textarea
                name="excerpt"
                rows={3}
                defaultValue={post.excerpt as string || ""}
                placeholder="Breve descrição do post"
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] transition-colors resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Conteúdo
              </label>
              <textarea
                name="content"
                rows={12}
                defaultValue={post.content as string || ""}
                placeholder="Escreva o conteúdo do post aqui..."
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] transition-colors resize-y font-mono text-xs leading-relaxed"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 space-y-5">
            <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              Publicação
            </h3>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Status
              </label>
              <select
                name="status"
                defaultValue={post.status as string}
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] bg-white"
              >
                <option value="rascunho">Rascunho</option>
                <option value="publicado">Publicado</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Tipo
              </label>
              <select
                name="type"
                defaultValue={post.type as string}
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] bg-white"
              >
                <option value="noticia">Notícia</option>
                <option value="artigo">Artigo</option>
                <option value="comunicado">Comunicado</option>
                <option value="entrevista">Entrevista</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                Categoria
              </label>
              <select
                name="categoryId"
                defaultValue={post.categoryId as string || ""}
                className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] bg-white"
              >
                <option value="">Sem categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E0E0E0] p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider">
              Imagem Destacada
            </h3>

            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl("");
                    setPreviewImage("");
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-black/70"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#E0E0E0] rounded-lg cursor-pointer hover:border-[#F4141A] transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#999] mb-2">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                  <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-xs text-[#999]">
                  {uploading ? "Enviando..." : "Clique para enviar"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}

            <input type="hidden" name="featuredImage" value={imageUrl} />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F4141A] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#C01015] transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
