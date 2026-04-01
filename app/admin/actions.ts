"use server";

import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { posts, categories } from "@/lib/db/schema";
import { eq, desc, and, sql, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";

async function getAuthUser() {
  const { data: session } = await auth.getSession();
  if (!session?.user) throw new Error("Unauthorized");
  return session.user;
}

// ─── Posts ─────────────────────────────────────────────────────

export async function getPosts(filters?: {
  status?: string;
  categoryId?: string;
  search?: string;
}) {
  await getAuthUser();

  const conditions = [];

  if (filters?.status && filters.status !== "all") {
    conditions.push(eq(posts.status, filters.status));
  }

  if (filters?.categoryId && filters.categoryId !== "all") {
    conditions.push(eq(posts.categoryId, filters.categoryId));
  }

  if (filters?.search) {
    conditions.push(sql`${posts.title} ILIKE ${"%" + filters.search + "%"}`);
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImage: posts.featuredImage,
      type: posts.type,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      categoryId: posts.categoryId,
      authorId: posts.authorId,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(whereClause)
    .orderBy(desc(posts.createdAt));
}

export async function getPostById(id: string) {
  await getAuthUser();

  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  return result[0] || null;
}

export async function getPostBySlug(slug: string) {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      excerpt: posts.excerpt,
      featuredImage: posts.featuredImage,
      type: posts.type,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      categoryId: posts.categoryId,
      authorId: posts.authorId,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.slug, slug))
    .limit(1);

  return result[0] || null;
}

export async function getPublishedPosts(limit?: number) {
  const query = db
    .select({
      id: posts.id,
      title: posts.title,
      slug: posts.slug,
      excerpt: posts.excerpt,
      featuredImage: posts.featuredImage,
      type: posts.type,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      categoryId: posts.categoryId,
      categoryName: categories.name,
    })
    .from(posts)
    .leftJoin(categories, eq(posts.categoryId, categories.id))
    .where(eq(posts.status, "publicado"))
    .orderBy(desc(posts.publishedAt));

  if (limit) {
    return query.limit(limit);
  }

  return query;
}

export async function createPost(formData: FormData) {
  const user = await getAuthUser();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const type = formData.get("type") as string;
  const status = formData.get("status") as string;
  const categoryId = formData.get("categoryId") as string;
  const featuredImage = formData.get("featuredImage") as string;

  if (!title || !slug) {
    throw new Error("Título e slug são obrigatórios");
  }

  const publishedAt = status === "publicado" ? new Date().toISOString() : null;

  await db.insert(posts).values({
    title,
    slug,
    content: content || "",
    excerpt: excerpt || "",
    type: type || "noticia",
    status: status || "rascunho",
    categoryId: categoryId || null,
    featuredImage: featuredImage || null,
    authorId: user.id,
    publishedAt,
  });

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePost(id: string, formData: FormData) {
  await getAuthUser();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const type = formData.get("type") as string;
  const status = formData.get("status") as string;
  const categoryId = formData.get("categoryId") as string;
  const featuredImage = formData.get("featuredImage") as string;

  if (!title || !slug) {
    throw new Error("Título e slug são obrigatórios");
  }

  const existingPost = await getPostById(id);
  const publishedAt =
    status === "publicado" && existingPost?.status !== "publicado"
      ? new Date().toISOString()
      : existingPost?.publishedAt;

  await db
    .update(posts)
    .set({
      title,
      slug,
      content: content || "",
      excerpt: excerpt || "",
      type: type || "noticia",
      status: status || "rascunho",
      categoryId: categoryId || null,
      featuredImage: featuredImage || null,
      publishedAt,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(posts.id, id));

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${id}/edit`);
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await getAuthUser();

  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/admin/posts");
}

// ─── Categories ────────────────────────────────────────────────

export async function getCategories() {
  await getAuthUser();

  return db.select().from(categories).orderBy(categories.name);
}

export async function getPublicCategories() {
  return db.select().from(categories).orderBy(categories.name);
}

export async function createCategory(name: string) {
  await getAuthUser();

  if (!name.trim()) throw new Error("Nome é obrigatório");

  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  await db.insert(categories).values({ name: name.trim(), slug });

  revalidatePath("/admin/categories");
}

export async function updateCategory(id: string, name: string) {
  await getAuthUser();

  if (!name.trim()) throw new Error("Nome é obrigatório");

  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  await db
    .update(categories)
    .set({ name: name.trim(), slug })
    .where(eq(categories.id, id));

  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  await getAuthUser();

  await db.delete(categories).where(eq(categories.id, id));

  revalidatePath("/admin/categories");
}

// ─── Upload ────────────────────────────────────────────────────

export async function uploadImage(formData: FormData) {
  await getAuthUser();

  const file = formData.get("file") as File;
  if (!file) throw new Error("Nenhum arquivo enviado");

  const blob = await put(`fenet/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return blob.url;
}

// ─── Stats ─────────────────────────────────────────────────────

export async function getAdminStats() {
  await getAuthUser();

  const [postCount] = await db.select({ count: count() }).from(posts);
  const [categoryCount] = await db.select({ count: count() }).from(categories);
  const [publishedCount] = await db
    .select({ count: count() })
    .from(posts)
    .where(eq(posts.status, "publicado"));
  const [draftCount] = await db
    .select({ count: count() })
    .from(posts)
    .where(eq(posts.status, "rascunho"));

  return {
    totalPosts: postCount.count,
    totalCategories: categoryCount.count,
    publishedPosts: publishedCount.count,
    draftPosts: draftCount.count,
  };
}
