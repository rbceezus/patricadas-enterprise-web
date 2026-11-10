import { createClient } from "@supabase/supabase-js"

import type { DependenciasLogin, Perfil } from "@/lib/login"

// Só a chave pública (publishable/anon). A service_role nunca entra no front.
const url = import.meta.env.VITE_SUPABASE_URL
const chavePublica = import.meta.env.VITE_SUPABASE_ANON_KEY
const apiBase = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "")

export const supabase = createClient(url, chavePublica)

/**
 * Chamada à API escrita à mão: o cliente gerado pelo Orval (ADR-001) ainda
 * não existe porque a API não publica openapi.json (AZ-05 pendente).
 * Desvio registrado no ENTREGA.md; é a única chamada assim.
 */
export async function buscarPerfil(token: string): Promise<{ perfil: Perfil } | { status: number }> {
  try {
    const r = await fetch(`${apiBase}/me`, { headers: { Authorization: `Bearer ${token}` } })
    if (!r.ok) return { status: r.status }
    return { perfil: (await r.json()) as Perfil }
  } catch {
    return { status: 0 }
  }
}

export const dependenciasReais: DependenciasLogin = {
  async entrar(email, senha) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error || !data.session) {
      return { erro: error?.status === 400 || error?.code === "invalid_credentials" ? "credenciais" : "rede" }
    }
    return { token: data.session.access_token }
  },
  buscarPerfil,
  async sair() {
    await supabase.auth.signOut()
  },
}
