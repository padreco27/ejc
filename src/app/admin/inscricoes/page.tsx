"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Search, Download, BarChart3, Users, CheckCircle, Clock } from "lucide-react";

interface Inscricao {
  id: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  telefone: string;
  email: string;
  instagram: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  paroquiaFrequenta: string;
  sacramentos: string[];
  restricaoAlimentar: string;
  alergiaMedicamento: string;
  contatoEmergenciaNome: string;
  contatoEmergenciaTelefone: string;
  parentesco: string;
  status: string;
  createdAt: string;
}

const defaultForm: Omit<Inscricao, "id" | "createdAt"> = {
  nome: "", dataNascimento: "", cpf: "", rg: "",
  telefone: "", email: "", instagram: "",
  cep: "", endereco: "", numero: "", bairro: "",
  cidade: "Campo Grande", estado: "MS",
  paroquiaFrequenta: "", sacramentos: [],
  restricaoAlimentar: "", alergiaMedicamento: "",
  contatoEmergenciaNome: "", contatoEmergenciaTelefone: "", parentesco: "",
  status: "Confirmada",
};

const statusOptions = ["Confirmada", "Pendente", "Cancelada", "Participou", "NÃO Participou"];

export default function AdminInscricoesPage() {
  const [items, setItems] = useState<Inscricao[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Inscricao | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Omit<Inscricao, "id" | "createdAt">>(defaultForm);
  const [viewMode, setViewMode] = useState<"dashboard" | "list">("dashboard");

  const fetchData = useCallback(() => {
    fetch("/api/inscricoes")
      .then(r => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => {
    setEditing(null);
    setForm(defaultForm);
    setShowForm(true);
  };

  const openEdit = (item: Inscricao) => {
    setEditing(item);
    const { id, createdAt, ...rest } = item;
    setForm(rest);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editing) {
      const res = await fetch("/api/inscricoes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
      if (res.ok) {
        const updated = await res.json();
        setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      }
    } else {
      const res = await fetch("/api/inscricoes", {
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
    if (!confirm("Tem certeza que deseja excluir esta inscrição?")) return;
    const res = await fetch(`/api/inscricoes?id=${id}`, { method: "DELETE" });
    if (res.ok) setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleExport = async () => {
    const res = await fetch("/api/inscricoes/export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inscricoes-ejc-${new Date().toISOString().split("T")[0]}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateSacramentos = (sac: string) => {
    setForm(f => ({
      ...f,
      sacramentos: f.sacramentos.includes(sac)
        ? f.sacramentos.filter(s => s !== sac)
        : [...f.sacramentos, sac],
    }));
  };

  const filtered = items.filter(i =>
    i.nome?.toLowerCase().includes(search.toLowerCase()) ||
    i.email?.toLowerCase().includes(search.toLowerCase()) ||
    i.telefone?.includes(search)
  );

  // Dashboard stats
  const total = items.length;
  const confirmadas = items.filter(i => i.status === "Confirmada").length;
  const pendentes = items.filter(i => i.status === "Pendente").length;
  const participaram = items.filter(i => i.status === "Participou").length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-carmelo dark:text-bege">Inscrições</h1>
          <p className="text-muted text-sm mt-1">Gerenciar inscrições do EJC</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === "dashboard" ? "list" : "dashboard")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border dark:border-dark-border text-muted hover:text-carmelo dark:hover:text-bege hover:bg-creme dark:hover:bg-dark-bg transition-all"
          >
            <BarChart3 className="w-4 h-4" />
            {viewMode === "dashboard" ? "Lista" : "Dashboard"}
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-green-600/20"
          >
            <Download className="w-4 h-4" /> Exportar Excel
          </button>
          <button
            onClick={openNew}
            className="flex items-center gap-2 bg-dourado hover:bg-dourado-dark text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-dourado/20"
          >
            <Plus className="w-4 h-4" /> Nova Inscrição
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-16 rounded-xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border animate-pulse" />)}</div>
      ) : viewMode === "dashboard" ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-dourado/10 text-dourado flex items-center justify-center"><Users className="w-5 h-5" /></div>
                <div>
                  <p className="text-2xl font-bold text-carmelo dark:text-bege">{total}</p>
                  <p className="text-xs text-muted">Total de Inscrições</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center"><CheckCircle className="w-5 h-5" /></div>
                <div>
                  <p className="text-2xl font-bold text-carmelo dark:text-bege">{confirmadas}</p>
                  <p className="text-xs text-muted">Confirmadas</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 flex items-center justify-center"><Clock className="w-5 h-5" /></div>
                <div>
                  <p className="text-2xl font-bold text-carmelo dark:text-bege">{pendentes}</p>
                  <p className="text-xs text-muted">Pendentes</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center"><BarChart3 className="w-5 h-5" /></div>
                <div>
                  <p className="text-2xl font-bold text-carmelo dark:text-bege">{participaram}</p>
                  <p className="text-xs text-muted">Participaram</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent registrations table */}
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 dark:border-dark-border/50">
              <h2 className="font-display font-bold text-lg text-carmelo dark:text-bege">Inscrições Recentes</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-creme dark:bg-dark-bg border-b border-border dark:border-dark-border">
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege">Nome</th>
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden md:table-cell">Contato</th>
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden sm:table-cell">Data</th>
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-carmelo dark:text-bege">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 10).map(item => (
                    <tr key={item.id} className="border-b border-border/50 dark:border-dark-border/50 hover:bg-creme/50 dark:hover:bg-dark-bg/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-carmelo dark:text-bege">{item.nome || "—"}</div>
                        <div className="text-xs text-muted">{item.paroquiaFrequenta || ""}</div>
                      </td>
                      <td className="px-4 py-3 text-muted text-sm hidden md:table-cell">
                        <div>{item.telefone || "—"}</div>
                        <div className="text-xs">{item.email || ""}</div>
                      </td>
                      <td className="px-4 py-3 text-muted text-sm hidden sm:table-cell">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString("pt-BR") : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          item.status === "Confirmada" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                          item.status === "Pendente" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                          item.status === "Cancelada" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                          item.status === "Participou" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                          "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}>{item.status || "Confirmada"}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-muted hover:text-dourado hover:bg-dourado/10 transition-colors" title="Editar"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-12 text-center text-muted">Nenhuma inscrição encontrada</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* List View */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input type="text" placeholder="Buscar por nome, email ou telefone..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-surface text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
          </div>
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-creme dark:bg-dark-bg border-b border-border dark:border-dark-border">
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege">Nome</th>
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden lg:table-cell">Email</th>
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden md:table-cell">Telefone</th>
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege hidden sm:table-cell">Data</th>
                    <th className="text-left px-4 py-3 font-semibold text-carmelo dark:text-bege">Status</th>
                    <th className="text-right px-4 py-3 font-semibold text-carmelo dark:text-bege">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(item => (
                    <tr key={item.id} className="border-b border-border/50 dark:border-dark-border/50 hover:bg-creme/50 dark:hover:bg-dark-bg/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-carmelo dark:text-bege">{item.nome || "—"}</div>
                        <div className="text-xs text-muted">{item.cidade || ""}</div>
                      </td>
                      <td className="px-4 py-3 text-muted text-sm hidden lg:table-cell">{item.email || "—"}</td>
                      <td className="px-4 py-3 text-muted hidden md:table-cell">{item.telefone || "—"}</td>
                      <td className="px-4 py-3 text-muted text-sm hidden sm:table-cell">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString("pt-BR") : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          item.status === "Confirmada" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                          item.status === "Pendente" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                          item.status === "Cancelada" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                          item.status === "Participou" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                          "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        }`}>{item.status || "Confirmada"}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(item)} className="p-2 rounded-lg text-muted hover:text-dourado hover:bg-dourado/10 transition-colors" title="Editar"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-muted">Nenhuma inscrição encontrada</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold text-carmelo dark:text-bege">{editing ? "Editar" : "Nova"} Inscrição</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg text-muted hover:text-carmelo dark:hover:text-bege hover:bg-creme dark:hover:bg-dark-bg transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-6">
                {/* Personal Data */}
                <div>
                  <h3 className="text-sm font-bold text-dourado uppercase tracking-wider mb-3">Dados Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Nome Completo</label>
                      <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Data de Nascimento</label>
                      <input type="date" value={form.dataNascimento} onChange={e => setForm(f => ({ ...f, dataNascimento: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">CPF</label>
                      <input value={form.cpf} onChange={e => setForm(f => ({ ...f, cpf: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-sm font-bold text-dourado uppercase tracking-wider mb-3">Contato</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Telefone</label>
                      <input value={form.telefone} onChange={e => setForm(f => ({ ...f, telefone: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Email</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Instagram</label>
                      <input value={form.instagram} onChange={e => setForm(f => ({ ...f, instagram: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="text-sm font-bold text-dourado uppercase tracking-wider mb-3">Endereço</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Endereço</label>
                      <input value={form.endereco} onChange={e => setForm(f => ({ ...f, endereco: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Número</label>
                      <input value={form.numero} onChange={e => setForm(f => ({ ...f, numero: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Bairro</label>
                      <input value={form.bairro} onChange={e => setForm(f => ({ ...f, bairro: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Cidade</label>
                      <input value={form.cidade} onChange={e => setForm(f => ({ ...f, cidade: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Estado</label>
                      <input value={form.estado} onChange={e => setForm(f => ({ ...f, estado: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                  </div>
                </div>

                {/* Religion */}
                <div>
                  <h3 className="text-sm font-bold text-dourado uppercase tracking-wider mb-3">Religião & Fé</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Paróquia que Frequenta</label>
                      <input value={form.paroquiaFrequenta} onChange={e => setForm(f => ({ ...f, paroquiaFrequenta: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-2">Sacramentos</label>
                      <div className="flex flex-wrap gap-2">
                        {["Batismo", "Primeira Eucaristia", "Crisma", "Matrimônio"].map(sac => (
                          <button key={sac} type="button" onClick={() => updateSacramentos(sac)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              form.sacramentos.includes(sac)
                                ? "bg-dourado text-white"
                                : "bg-creme dark:bg-dark-bg text-carmelo dark:text-bege border border-border dark:border-dark-border"
                            }`}
                          >{sac}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health */}
                <div>
                  <h3 className="text-sm font-bold text-dourado uppercase tracking-wider mb-3">Saúde & Emergência</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Restrição Alimentar</label>
                      <input value={form.restricaoAlimentar} onChange={e => setForm(f => ({ ...f, restricaoAlimentar: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Alergia/Medicamento</label>
                      <input value={form.alergiaMedicamento} onChange={e => setForm(f => ({ ...f, alergiaMedicamento: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Contato Emergência - Nome</label>
                      <input value={form.contatoEmergenciaNome} onChange={e => setForm(f => ({ ...f, contatoEmergenciaNome: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Contato Emergência - Telefone</label>
                      <input value={form.contatoEmergenciaTelefone} onChange={e => setForm(f => ({ ...f, contatoEmergenciaTelefone: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Parentesco</label>
                      <input value={form.parentesco} onChange={e => setForm(f => ({ ...f, parentesco: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-1">Status</label>
                      <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege text-sm focus:outline-none focus:ring-2 focus:ring-dourado/50">
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border dark:border-dark-border">
                <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-muted hover:text-carmelo dark:hover:text-bege border border-border dark:border-dark-border hover:bg-creme dark:hover:bg-dark-bg transition-all">Cancelar</button>
                <button onClick={handleSave} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-dourado hover:bg-dourado-dark transition-all shadow-lg shadow-dourado/20">
                  {editing ? "Salvar Alterações" : "Criar Inscrição"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
