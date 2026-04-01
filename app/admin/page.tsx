"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminStats } from "./actions";

export default function AdminDashboard() {
  const [stats, setStats] = useState<{
    totalPosts: number;
    totalCategories: number;
    publishedPosts: number;
    draftPosts: number;
  } | null>(null);

  useEffect(() => {
    getAdminStats().then(setStats);
  }, []);

  const cards = [
    {
      label: "Total de Posts",
      value: stats?.totalPosts ?? "—",
      href: "/admin/posts",
      color: "bg-[#F4141A]",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      label: "Posts Publicados",
      value: stats?.publishedPosts ?? "—",
      href: "/admin/posts?status=publicado",
      color: "bg-green-500",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    {
      label: "Rascunhos",
      value: stats?.draftPosts ?? "—",
      href: "/admin/posts?status=rascunho",
      color: "bg-yellow-500",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      ),
    },
    {
      label: "Categorias",
      value: stats?.totalCategories ?? "—",
      href: "/admin/categories",
      color: "bg-[#1A1A1A]",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Dashboard</h1>
        <p className="text-sm text-[#999] mt-1">
          Visão geral do painel administrativo
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-[#E0E0E0] p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`${card.color} text-white p-3 rounded-xl`}
              >
                {card.icon}
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-[#999] group-hover:text-[#F4141A] transition-colors"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-[#1A1A1A]">{card.value}</p>
            <p className="text-sm text-[#999] mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-[#E0E0E0] p-6">
        <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">Ações Rápidas</h2>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/admin/posts/new"
            className="bg-[#F4141A] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C01015] transition-colors"
          >
            + Novo Post
          </Link>
          <Link
            href="/admin/categories"
            className="bg-white border border-[#E0E0E0] text-[#1A1A1A] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#F5F5F5] transition-colors"
          >
            Gerenciar Categorias
          </Link>
          <Link
            href="/noticias"
            target="_blank"
            className="bg-white border border-[#E0E0E0] text-[#1A1A1A] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#F5F5F5] transition-colors"
          >
            Ver Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
