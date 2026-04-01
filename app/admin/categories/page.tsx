"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../actions";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [newName, setNewName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await getCategories();
    setCategories(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    await createCategory(newName);
    setNewName("");
    setShowForm(false);
    await loadData();
  }

  async function handleUpdate(e: React.FormEvent, id: string) {
    e.preventDefault();
    if (!editName.trim()) return;
    await updateCategory(id, editName);
    setEditingId(null);
    setEditName("");
    await loadData();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta categoria?")) return;
    await deleteCategory(id);
    await loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Categorias</h1>
          <p className="text-sm text-[#999] mt-1">
            Gerencie as categorias dos posts
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#F4141A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C01015] transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Nova Categoria
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-xl border border-[#E0E0E0] p-6 mb-6 flex gap-3 items-end"
        >
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
              Nome da categoria
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ex: Educação, Eventos, Institucional"
              className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#F4141A] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C01015] transition-colors"
          >
            Criar
          </button>
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setNewName("");
            }}
            className="px-6 py-2.5 border border-[#E0E0E0] rounded-lg text-sm text-[#555] hover:bg-[#F5F5F5] transition-colors"
          >
            Cancelar
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-[#E0E0E0] overflow-hidden">
        {loading ? (
          <div className="px-6 py-12 text-center text-[#999] text-sm">
            Carregando...
          </div>
        ) : categories.length === 0 ? (
          <div className="px-6 py-12 text-center text-[#999] text-sm">
            Nenhuma categoria criada ainda
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F5] border-b border-[#E0E0E0]">
                <th className="text-left px-6 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                  Nome
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                  Slug
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                  Posts
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="px-6 py-4">
                    {editingId === cat.id ? (
                      <form
                        onSubmit={(e) => handleUpdate(e, cat.id)}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-3 py-1.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A]"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="text-xs bg-[#F4141A] text-white px-3 py-1.5 rounded-lg hover:bg-[#C01015]"
                        >
                          Salvar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditName("");
                          }}
                          className="text-xs border border-[#E0E0E0] px-3 py-1.5 rounded-lg hover:bg-[#F5F5F5]"
                        >
                          Cancelar
                        </button>
                      </form>
                    ) : (
                      <span className="text-sm font-medium text-[#1A1A1A]">
                        {cat.name}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs text-[#999] font-mono">
                    {cat.slug}
                  </td>
                  <td className="px-4 py-4 text-xs text-[#999]">
                    —
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditName(cat.name);
                        }}
                        className="p-2 text-[#555] hover:text-[#F4141A] hover:bg-[#FFF0F0] rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
