import {
  pgTable,
  pgSchema,
  uuid,
  text,
  timestamp,
  unique,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ─── Neon Auth tables (read-only reference) ────────────────────
export const neonAuth = pgSchema("neon_auth");

export const users = neonAuth.table(
  "user",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean().notNull(),
    image: text(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    role: text(),
    banned: boolean(),
    banReason: text(),
    banExpires: timestamp({ withTimezone: true, mode: "string" }),
  },
  (table) => [unique("user_email_key").on(table.email)]
);

// ─── Categories ────────────────────────────────────────────────
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
});

// ─── Posts ─────────────────────────────────────────────────────
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull().default(""),
  excerpt: text("excerpt").default(""),
  featuredImage: text("featured_image"),
  type: text("type").notNull().default("noticia"),
  status: text("status").notNull().default("rascunho"),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id),
  publishedAt: timestamp("published_at", { mode: "string" }),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

// ─── Directors ──────────────────────────────────────────────────
export const directors = pgTable("directors", {
  id: uuid("id").defaultRandom().primaryKey(),
  nome: text("nome").notNull(),
  cargo: text("cargo").notNull(),
  estado: text("estado").notNull(),
  instituicao: text("instituicao").default(""),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

// ─── Types ─────────────────────────────────────────────────────
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Director = typeof directors.$inferSelect;
export type NewDirector = typeof directors.$inferInsert;
