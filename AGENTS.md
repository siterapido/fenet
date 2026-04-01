<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Database Setup (Neon DB + Drizzle ORM)

### Setup Steps

1. **Criar projeto no Neon Console**
   - Acesse https://console.neon.tech
   - Crie um novo projeto
   - Vá em **Auth** > clique em **Enable Neon Auth**
   - Copie o **Auth URL** (ex: `https://ep-xxx.neonauth.us-east-1.aws.neon.tech/neondb/auth`)

2. **Configurar variáveis de ambiente**
   ```bash
   cp .env.example .env.local
   # Edite .env.local com os valores do Neon Console:
   # DATABASE_URL - Connection string do Dashboard (pooled)
   # NEON_AUTH_BASE_URL - Auth URL da página Auth > Configuration
   # NEON_AUTH_COOKIE_SECRET - openssl rand -base64 32
   # BLOB_READ_WRITE_TOKEN - Vercel Blob token (opcional)
   ```

3. **Gerar migrations do banco**
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit migrate
   ```

4. **Configurar Vercel Blob** (opcional)
   - Criar storage no Vercel Dashboard > Storage
   - Copiar `BLOB_READ_WRITE_TOKEN`

### Comandos úteis

```bash
# Gerar migrations após alterar schema
npx drizzle-kit generate

# Aplicar migrations no banco
npx drizzle-kit migrate

# Push schema diretamente (desenvolvimento)
npx drizzle-kit push

# Ver migrations
npx drizzle-kit studio
```

### Schema do banco

O schema está em `lib/db/schema.ts`:
- `categories` - Categorias dos posts (name, slug)
- `posts` - Posts do blog (title, slug, content, excerpt, featuredImage, type, status, categoryId, authorId)

### Autenticação (Neon Auth)

- `lib/auth/server.ts` - Instância server-side (getSession, signIn, signOut, middleware)
- `lib/auth/client.ts` - Instância client-side (useSession, signOut)
- `app/api/auth/[...path]/route.ts` - API proxy handler
- `proxy.ts` - Middleware protege `/admin/*`
- `app/auth/[path]/page.tsx` - Páginas de login (Neon Auth UI)

---

## Tech Stack

- **Framework:** Next.js 16 App Router
- **Styling:** Tailwind CSS v4 (CSS-first, sem tailwind.config.js)
- **Animations:** Framer Motion v12 (`motion/react`)
- **Database:** Neon Postgres via Drizzle ORM
- **Auth:** Neon Auth (Better Auth hosted)
- **Image Upload:** Vercel Blob
- **ORM:** Drizzle ORM com neon-http driver

