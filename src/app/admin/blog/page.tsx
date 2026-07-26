"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import { formatDate, slugify } from "@/lib/utils";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  tags: string[];
  readTime: number;
  publishedAt: string;
  image: string;
  featured: boolean;
}

const defaultForm: Omit<BlogPost, "id"> = {
  slug: "", title: "", summary: "", content: "",
  author: "", authorRole: "", category: "Espiritualidade",
  tags: [], readTime: 5, publishedAt: new Date().toISOString().split("T")[0],
  image: "", featured: false,
};

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Omit<BlogPost, "id">>(defaultForm);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetch("/api/blog").then(r => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...defaultForm, publishedAt: new Date().toISOString().split("T")[0] });
    setShowForm(true);
  };

  const openEdit = (item: BlogPost) => {
    setEditing(item);
    const { id, ...rest } = item;
    setForm(rest);
    setShowForm(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
    };

    if (editing) {
      const res = await fetch("/api/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...payload }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      }
    } else {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        setItems(prev => [...prev, created]);
      }
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return;
    const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm(f => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput("");
  };

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-carmelo dark:text-bege">Blog</h1>
          <p className="text-muted text-sm mt-1">Gerenciar artigos do blog</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-dourado hover:bg-dourado-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-dourado/20">
          <Plus className="w-4 h-4" /> Novo Artigo
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text" placeholder="Buscar artigos..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50"
        />
      </div>

      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 rounded-xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border animate-pulse" />)}</div>
      ) : (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-creme dark:bg-dark-bg border-b border-border dark:border-dark-border">
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege">Título</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden md:table-cell">Autor</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden lg:table-cell">Categoria</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden sm:table-cell">Data</th>
                  <th className="text-center px-4 py-3 font-semibold text-carmelo dark:text-bege hidden sm:table-cell">Destaque</th>
                  <th className="text-right px-4 py-3 font-semibold text-carmelo dark:text-bege">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} className="border-b border-border/50 dark:border-dark-border/50 hover:bg-creme/50 dark:hover:bg-dark-bg/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-carmelo dark:text-bege">{item.title}</div>
                      <div className="text-xs text-muted mt-0.5">{item.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-muted hidden md:table-cell">{item.author}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs font-medium bg-dourado/10 text-dourado px-2.5 py-1 rounded-full">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 text-muted text-sm hidden sm:table-cell">{formatDate(item.publishedAt)}</td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {item.featured ? <span className="text-green-600 dark:text-green-400 text-lg">★</span> : <span className="text-muted text-lg">☆</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-muted hover:text-dourado hover:bg-dourado/10 transition-colors" title="Editar">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors" title="Excluir">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-muted">Nenhum artigo encontrado</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-carmelo dark:text-bege">{editing ? "Editar" : "Novo"} Artigo</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-muted hover:text-carmelo dark:hover:text-bege hover:bg-creme dark:hover:bg-dark-bg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Título</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Slug</label>
                  <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="Deixe vazio para auto-gerar" className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Categoria</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50">
                    {["Espiritualidade", "Liturgia", "Testemunhos", "Santos", "Formação", "Eventos", "Avisos"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Autor</label>
                  <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Cargo do Autor</label>
                  <input value={form.authorRole} onChange={e => setForm(f => ({ ...f, authorRole: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Tempo de Leitura (min)</label>
                  <input type="number" value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: Number(e.target.value) }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Data de Publicação</label>
                  <input type="date" value={form.publishedAt} onChange={e => setForm(f => ({ ...f, publishedAt: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">URL da Imagem</label>
                  <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="rounded border-border text-dourado focus:ring-dourado" />
                  <label htmlFor="featured" className="text-sm font-semibold text-carmelo dark:text-bege">Artigo em Destaque</label>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Resumo</label>
                <textarea value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Conteúdo</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={8} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50 font-mono" />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Tags</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 text-xs bg-dourado/10 text-dourado px-2.5 py-1 rounded-full">
                      {tag}
                      <button onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Adicionar tag..." className="flex-1 px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                  <button onClick={addTag} className="px-3 py-2 bg-dourado/10 text-dourado rounded-lg text-sm font-medium hover:bg-dourado/20 transition-colors">Adicionar</button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border dark:border-dark-border">
                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-muted hover:text-carmelo dark:hover:text-bege border border-border dark:border-dark-border hover:bg-creme dark:hover:bg-dark-bg transition-all">Cancelar</button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-dourado hover:bg-dourado-dark transition-all shadow-lg shadow-dourado/20">
                  {editing ? "Salvar Alterações" : "Criar Artigo"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
