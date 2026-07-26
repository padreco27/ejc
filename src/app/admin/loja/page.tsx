"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import { formatCurrency, slugify } from "@/lib/utils";

interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  sizes: string[];
  colors: string[];
  category: string;
  inStock: boolean;
  quantity: number;
  image: string;
  images: string[];
  featured: boolean;
  badge: string | null;
}

const defaultForm: Omit<Product, "id"> = {
  slug: "", name: "", price: 0, description: "", shortDescription: "",
  sizes: [""], colors: [""], category: "Vestuário",
  inStock: true, quantity: 0, image: "", images: [""],
  featured: false, badge: null,
};

const categories = ["Vestuário", "Devocionais", "Utilidades", "Livros", "Acessórios"];

export default function AdminLojaPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Omit<Product, "id">>(defaultForm);

  useEffect(() => {
    fetch("/api/produtos").then(r => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(defaultForm);
    setShowForm(true);
  };

  const openEdit = (item: Product) => {
    setEditing(item);
    const { id, ...rest } = item;
    setForm(rest);
    setShowForm(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      sizes: form.sizes.filter(s => s.trim()),
      colors: form.colors.filter(c => c.trim()),
      images: form.images.filter(i => i.trim()),
    };

    if (editing) {
      const res = await fetch("/api/produtos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...payload }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      }
    } else {
      const res = await fetch("/api/produtos", {
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
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    const res = await fetch(`/api/produtos?id=${id}`, { method: "DELETE" });
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id));
  };

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const updateArrayField = (field: "sizes" | "colors" | "images", index: number, value: string) => {
    setForm(f => {
      const arr = [...f[field]];
      arr[index] = value;
      return { ...f, [field]: arr };
    });
  };

  const addArrayField = (field: "sizes" | "colors" | "images") => {
    setForm(f => ({ ...f, [field]: [...f[field], ""] }));
  };

  const removeArrayField = (field: "sizes" | "colors" | "images", index: number) => {
    setForm(f => ({ ...f, [field]: f[field].filter((_, i) => i !== index) }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-carmelo dark:text-bege">Loja Solidária</h1>
          <p className="text-muted text-sm mt-1">Gerenciar produtos da loja</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-dourado hover:bg-dourado-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-dourado/20">
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input type="text" placeholder="Buscar produtos..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
      </div>

      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 rounded-xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border animate-pulse" />)}</div>
      ) : (
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-creme dark:bg-dark-bg border-b border-border dark:border-dark-border">
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege">Produto</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden md:table-cell">Categoria</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege">Preço</th>
                  <th className="text-center px-4 py-3 font-semibold text-carmelo dark:text-bege hidden sm:table-cell">Estoque</th>
                  <th className="text-right px-4 py-3 font-semibold text-carmelo dark:text-bege">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} className="border-b border-border/50 dark:border-dark-border/50 hover:bg-creme/50 dark:hover:bg-dark-bg/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-carmelo dark:text-bege">{item.name}</div>
                      <div className="text-xs text-muted mt-0.5">{item.slug}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs font-medium bg-dourado/10 text-dourado px-2.5 py-1 rounded-full">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-carmelo dark:text-bege">{formatCurrency(item.price)}</td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${item.inStock ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
                        {item.inStock ? `${item.quantity} und` : "Fora de Estoque"}
                      </span>
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
                  <tr><td colSpan={5} className="px-4 py-12 text-center text-muted">Nenhum produto encontrado</td></tr>
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
                <h2 className="font-display text-2xl font-bold text-carmelo dark:text-bege">{editing ? "Editar" : "Novo"} Produto</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-muted hover:text-carmelo dark:hover:text-bege hover:bg-creme dark:hover:bg-dark-bg transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Nome</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Slug</label>
                  <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="Auto-gerado" className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Preço (R$)</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Categoria</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Quantidade</label>
                  <input type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="inStock" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} className="rounded border-border text-dourado focus:ring-dourado" />
                  <label htmlFor="inStock" className="text-sm font-semibold text-carmelo dark:text-bege">Em Estoque</label>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="rounded border-border text-dourado focus:ring-dourado" />
                  <label htmlFor="featured" className="text-sm font-semibold text-carmelo dark:text-bege">Produto em Destaque</label>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Badge (ex: "Mais Vendido")</label>
                  <input value={form.badge || ""} onChange={e => setForm(f => ({ ...f, badge: e.target.value || null }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">URL da Imagem</label>
                  <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Descrição Curta</label>
                <textarea value={form.shortDescription} onChange={e => setForm(f => ({ ...f, shortDescription: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Descrição Completa</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
              </div>

              {/* Sizes */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Tamanhos</label>
                {form.sizes.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={s} onChange={e => updateArrayField("sizes", i, e.target.value)} placeholder="ex: P, M, G, GG" className="flex-1 px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    <button onClick={() => removeArrayField("sizes", i)} className="px-3 py-2 text-muted hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => addArrayField("sizes")} className="text-sm text-dourado hover:text-dourado-dark font-medium">+ Adicionar tamanho</button>
              </div>

              {/* Colors */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Cores</label>
                {form.colors.map((c, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={c} onChange={e => updateArrayField("colors", i, e.target.value)} placeholder="ex: Bege, Marrom, Branco" className="flex-1 px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    <button onClick={() => removeArrayField("colors", i)} className="px-3 py-2 text-muted hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                <button onClick={() => addArrayField("colors")} className="text-sm text-dourado hover:text-dourado-dark font-medium">+ Adicionar cor</button>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border dark:border-dark-border">
                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-muted hover:text-carmelo dark:hover:text-bege border border-border dark:border-dark-border hover:bg-creme dark:hover:bg-dark-bg transition-all">Cancelar</button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-dourado hover:bg-dourado-dark transition-all shadow-lg shadow-dourado/20">
                  {editing ? "Salvar Alterações" : "Criar Produto"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
