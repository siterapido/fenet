"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getDirectors, deleteDirector } from "../actions";

type DirectorItem = {
  id: string;
  nome: string;
  cargo: string;
  estado: string;
  instituicao: string;
  createdAt: string;
  updatedAt: string;
};

const BRAZIL_STATES = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
];

function getStateName(uf: string) {
  const state = BRAZIL_STATES.find((s) => s.uf === uf);
  return state?.name ?? uf;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DiretoresPage() {
  const [directors, setDirectors] = useState<DirectorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingDirector, setEditingDirector] = useState<DirectorItem | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    estado: "",
    instituicao: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const data = await getDirectors({
      search,
      estado: estadoFilter,
    });
    setDirectors(data as DirectorItem[]);
    setLoading(false);
  }, [search, estadoFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function openCreateModal() {
    setEditingDirector(null);
    setFormData({ nome: "", cargo: "", estado: "", instituicao: "" });
    setFormErrors({});
    setShowModal(true);
  }

  function openEditModal(director: DirectorItem) {
    setEditingDirector(director);
    setFormData({
      nome: director.nome,
      cargo: director.cargo,
      estado: director.estado,
      instituicao: director.instituicao || "",
    });
    setFormErrors({});
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingDirector(null);
    setFormData({ nome: "", cargo: "", estado: "", instituicao: "" });
    setFormErrors({});
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};
    if (!formData.nome.trim()) errors.nome = "Nome é obrigatório";
    if (!formData.cargo.trim()) errors.cargo = "Cargo é obrigatório";
    if (!formData.estado) errors.estado = "Estado é obrigatório";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const form = new FormData();
    form.append("nome", formData.nome);
    form.append("cargo", formData.cargo);
    form.append("estado", formData.estado);
    form.append("instituicao", formData.instituicao);

    try {
      if (editingDirector) {
        const { updateDirector } = await import("../actions");
        await updateDirector(editingDirector.id, form);
      } else {
        const { createDirector } = await import("../actions");
        await createDirector(form);
      }
      closeModal();
      loadData();
    } catch (error) {
      console.error("Error saving director:", error);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este diretor?")) return;
    await deleteDirector(id);
    loadData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Diretores</h1>
          <p className="text-sm text-[#999] mt-1">
            Gerencie os membros da diretoria da FENET
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[#F4141A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C01015] transition-colors flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Diretor
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-[#E0E0E0] rounded-lg text-sm flex-1 min-w-[200px] outline-none focus:border-[#F4141A] transition-colors"
        />
        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="px-4 py-2 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] bg-white"
        >
          <option value="all">Todos os estados</option>
          {BRAZIL_STATES.map((state) => (
            <option key={state.uf} value={state.uf}>
              {state.uf} — {state.name}
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
                Nome
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Cargo
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Estado
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#555] uppercase tracking-wider">
                Instituição
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
            ) : directors.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#999] text-sm">
                  Nenhum diretor encontrado
                </td>
              </tr>
            ) : (
              directors.map((director) => (
                <tr key={director.id} className="hover:bg-[#FAFAFA] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4141A] to-[#C01015] flex items-center justify-center text-white text-sm font-bold">
                        {director.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                      </div>
                      <p className="text-sm font-medium text-[#1A1A1A]">
                        {director.nome}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#555]">
                    {director.cargo}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F4141A]/10 text-[#F4141A]">
                      {director.estado}
                    </span>
                    <span className="text-xs text-[#999] ml-2">
                      {getStateName(director.estado)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#555]">
                    {director.instituicao || "—"}
                  </td>
                  <td className="px-4 py-4 text-xs text-[#999]">
                    {formatDate(director.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(director)}
                        className="p-2 text-[#555] hover:text-[#F4141A] hover:bg-[#FFF0F0] rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(director.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1A1A1A]">
                {editingDirector ? "Editar Diretor" : "Novo Diretor"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-[#999] hover:text-[#1A1A1A] rounded-lg hover:bg-[#F5F5F5] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-[#555] mb-1">
                  Nome completo *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, nome: e.target.value }));
                    if (formErrors.nome) setFormErrors((p) => ({ ...p, nome: "" }));
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors ${
                    formErrors.nome
                      ? "border-[#F4141A] focus:border-[#F4141A]"
                      : "border-[#E0E0E0] focus:border-[#F4141A]"
                  }`}
                  placeholder="Ex: João Silva"
                />
                {formErrors.nome && (
                  <p className="text-xs text-[#F4141A] mt-1">{formErrors.nome}</p>
                )}
              </div>

              {/* Cargo */}
              <div>
                <label className="block text-sm font-medium text-[#555] mb-1">
                  Cargo *
                </label>
                <input
                  type="text"
                  value={formData.cargo}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, cargo: e.target.value }));
                    if (formErrors.cargo) setFormErrors((p) => ({ ...p, cargo: "" }));
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors ${
                    formErrors.cargo
                      ? "border-[#F4141A] focus:border-[#F4141A]"
                      : "border-[#E0E0E0] focus:border-[#F4141A]"
                  }`}
                  placeholder="Ex: Presidente"
                />
                {formErrors.cargo && (
                  <p className="text-xs text-[#F4141A] mt-1">{formErrors.cargo}</p>
                )}
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-[#555] mb-1">
                  Estado *
                </label>
                <select
                  value={formData.estado}
                  onChange={(e) => {
                    setFormData((p) => ({ ...p, estado: e.target.value }));
                    if (formErrors.estado) setFormErrors((p) => ({ ...p, estado: "" }));
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm outline-none transition-colors bg-white ${
                    formErrors.estado
                      ? "border-[#F4141A] focus:border-[#F4141A]"
                      : "border-[#E0E0E0] focus:border-[#F4141A]"
                  }`}
                >
                  <option value="">Selecione um estado</option>
                  {BRAZIL_STATES.map((state) => (
                    <option key={state.uf} value={state.uf}>
                      {state.uf} — {state.name}
                    </option>
                  ))}
                </select>
                {formErrors.estado && (
                  <p className="text-xs text-[#F4141A] mt-1">{formErrors.estado}</p>
                )}
              </div>

              {/* Instituição */}
              <div>
                <label className="block text-sm font-medium text-[#555] mb-1">
                  Escola / Instituição
                </label>
                <input
                  type="text"
                  value={formData.instituicao}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, instituicao: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm outline-none focus:border-[#F4141A] transition-colors"
                  placeholder="Ex: IFSP - São Paulo"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 border border-[#E0E0E0] rounded-lg text-sm font-medium text-[#555] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-[#F4141A] text-white rounded-lg text-sm font-medium hover:bg-[#C01015] transition-colors disabled:opacity-50"
                >
                  {submitting ? "Salvando..." : editingDirector ? "Salvar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
