"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";

interface Event {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: string;
  color: string;
}

const defaultForm: Omit<Event, "id"> = {
  date: "", time: "19:00", title: "", description: "",
  location: "", type: "Reunião", color: "carmelo",
};

const eventTypes = ["Reunião", "Adoração", "Missa", "Retiro", "EJC", "Formação"];
const colorOptions = [
  { value: "carmelo", label: "Carmelo" },
  { value: "dourado", label: "Dourado" },
  { value: "bege", label: "Bege" },
];

export default function AdminAgendaPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Omit<Event, "id">>(defaultForm);

  useEffect(() => {
    fetch("/api/agenda").then(r => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(defaultForm);
    setShowForm(true);
  };

  const openEdit = (item: Event) => {
    setEditing(item);
    const { id, ...rest } = item;
    setForm(rest);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editing) {
      const res = await fetch("/api/agenda", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      }
    } else {
      const res = await fetch("/api/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
    if (!confirm("Tem certeza que deseja excluir este evento?")) return;
    const res = await fetch(`/api/agenda?id=${id}`, { method: "DELETE" });
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id));
  };

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.type.toLowerCase().includes(search.toLowerCase()) ||
    i.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-carmelo dark:text-bege">Agenda</h1>
          <p className="text-muted text-sm mt-1">Gerenciar eventos da agenda</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-dourado hover:bg-dourado-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-dourado/20">
          <Plus className="w-4 h-4" /> Novo Evento
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input type="text" placeholder="Buscar eventos..." value={search} onChange={e => setSearch(e.target.value)}
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
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege">Evento</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden sm:table-cell">Data</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden sm:table-cell">Horário</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden md:table-cell">Tipo</th>
                  <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden lg:table-cell">Local</th>
                  <th className="text-right px-4 py-3 font-semibold text-carmelo dark:text-bege">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item.id} className="border-b border-border/50 dark:border-dark-border/50 hover:bg-creme/50 dark:hover:bg-dark-bg/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          item.color === "carmelo" ? "bg-carmelo" :
                          item.color === "dourado" ? "bg-dourado" : "bg-bege"
                        }`} />
                        <div className="font-medium text-carmelo dark:text-bege">{item.title}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted hidden sm:table-cell">
                      {new Date(item.date + "T00:00:00").toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 text-muted hidden sm:table-cell">{item.time}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-xs font-medium bg-dourado/10 text-dourado px-2.5 py-1 rounded-full">{item.type}</span>
                    </td>
                    <td className="px-4 py-3 text-muted text-sm hidden lg:table-cell">{item.location}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-muted hover:text-dourado hover:bg-dourado/10 transition-colors" title="Editar"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-muted">Nenhum evento encontrado</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-carmelo dark:text-bege">{editing ? "Editar" : "Novo"} Evento</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-muted hover:text-carmelo dark:hover:text-bege hover:bg-creme dark:hover:bg-dark-bg transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Título</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Data</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Horário</label>
                  <input type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Tipo</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50">
                    {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Cor</label>
                  <select value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50">
                    {colorOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Local</label>
                  <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Descrição</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border dark:border-dark-border">
                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-muted hover:text-carmelo dark:hover:text-bege border border-border dark:border-dark-border hover:bg-creme dark:hover:bg-dark-bg transition-all">Cancelar</button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-dourado hover:bg-dourado-dark transition-all shadow-lg shadow-dourado/20">
                  {editing ? "Salvar Alterações" : "Criar Evento"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
