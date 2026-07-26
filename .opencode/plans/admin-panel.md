# Plano: Painel Administrativo

## Estrutura de arquivos

### Utilitários
- `src/lib/admin/auth.ts` — autenticação via cookie httpOnly
- `src/lib/admin/constants.ts` — senha do admin (via env)
- `src/lib/admin/db.ts` — leitura/escrita de JSON files

### API Routes
- `src/app/api/admin/login/route.ts` — POST login
- `src/app/api/admin/logout/route.ts` — POST logout  
- `src/app/api/admin/check/route.ts` — GET verificar sessão
- `src/app/api/blog/route.ts` + `[id]/route.ts` — CRUD blog
- `src/app/api/produtos/route.ts` + `[id]/route.ts` — CRUD loja
- `src/app/api/galeria/route.ts` + `[id]/route.ts` — CRUD galeria
- `src/app/api/equipes/route.ts` + `[id]/route.ts` — CRUD equipes
- `src/app/api/agenda/route.ts` + `[id]/route.ts` — CRUD agenda
- `src/app/api/faq/route.ts` + `[id]/route.ts` — CRUD FAQ
- `src/app/api/testemunhos/route.ts` + `[id]/route.ts` — CRUD testemunhos
- `src/app/api/eventos/route.ts` + `[id]/route.ts` — CRUD eventos

### Componentes Admin
- `src/components/admin/AdminSidebar.tsx` — sidebar navegação
- `src/components/admin/DataTable.tsx` — tabela genérica com ações
- `src/components/admin/FormModal.tsx` — modal para criar/editar
- `src/components/admin/ConfirmDialog.tsx` — confirmação de exclusão
- `src/components/admin/AdminGuard.tsx` — proteção de rota (client)

### Páginas Admin
- `src/app/admin/login/page.tsx` — tela de login
- `src/app/admin/layout.tsx` — layout com sidebar + proteção
- `src/app/admin/page.tsx` — dashboard
- `src/app/admin/blog/page.tsx` — CRUD blog
- `src/app/admin/loja/page.tsx` — CRUD produtos
- `src/app/admin/galeria/page.tsx` — CRUD galeria
- `src/app/admin/equipes/page.tsx` — CRUD equipes
- `src/app/admin/agenda/page.tsx` — CRUD agenda
- `src/app/admin/faq/page.tsx` — CRUD FAQ
- `src/app/admin/testemunhos/page.tsx` — CRUD testemunhos
- `src/app/admin/eventos/page.tsx` — CRUD eventos
