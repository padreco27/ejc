"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { LilyFlower } from "@/components/ui/SacredArtwork";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        const redirect = searchParams.get("redirect") || "/admin";
        router.push(redirect);
      } else {
        setError(data.message || "Erro ao fazer login");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-creme dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-carmelo border-2 border-dourado flex items-center justify-center mx-auto mb-4">
            <LilyFlower className="w-9 h-9 text-bege" />
          </div>
          <h1 className="font-display text-3xl font-bold text-carmelo dark:text-bege">
            Admin EJC
          </h1>
          <p className="text-sm text-muted mt-1">
            Flor do Carmelo — Painel Administrativo
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-dark-surface rounded-2xl border border-border dark:border-dark-border p-8 shadow-xl space-y-6"
        >
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-lg px-4 py-3 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-carmelo dark:text-bege mb-2">
              Senha de Administrador
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-border dark:border-dark-border bg-creme dark:bg-dark-bg text-carmelo dark:text-bege focus:outline-none focus:ring-2 focus:ring-dourado/50 transition-all"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-carmelo dark:hover:text-bege"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 bg-dourado hover:bg-dourado-dark text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-dourado/20"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn className="w-5 h-5" />
            )}
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-muted hover:text-dourado transition-colors"
          >
            &larr; Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
