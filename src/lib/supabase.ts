import { createClient } from "@supabase/supabase-js"

import type { Equipamento } from "@/lib/catalogo"
import type { ResultadoSolicitar, SituacaoPessoa } from "@/lib/emprestimos"
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

/** Spec 002: GET /v1/equipments com o token da sessão atual. */
export async function buscarEquipamentos(): Promise<{ itens: Equipamento[] } | { status: number }> {
  try {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    if (!token) return { status: 401 }
    const r = await fetch(`${apiBase}/equipments`, { headers: { Authorization: `Bearer ${token}` } })
    if (!r.ok) return { status: r.status }
    return { itens: (await r.json()) as Equipamento[] }
  } catch {
    return { status: 0 }
  }
}

async function tokenAtual(): Promise<string | null> {
  const { data } = await supabase.auth.getSession()
  return data.session?.access_token ?? null
}

/** Spec 003: empréstimos abertos, limite e bloqueio por atraso. */
export async function buscarMinhaSituacao(): Promise<SituacaoPessoa | null> {
  try {
    const token = await tokenAtual()
    if (!token) return null
    const r = await fetch(`${apiBase}/loans/me`, { headers: { Authorization: `Bearer ${token}` } })
    return r.ok ? ((await r.json()) as SituacaoPessoa) : null
  } catch {
    return null
  }
}

/** Spec 003: POST /v1/loans em nome de quem está logado. */
export async function solicitarEmprestimo(equipmentId: string): Promise<ResultadoSolicitar> {
  try {
    const token = await tokenAtual()
    if (!token) return { ok: false, codigo: "REDE" }
    const r = await fetch(`${apiBase}/loans`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ equipmentId }),
    })
    const corpo = (await r.json().catch(() => ({}))) as { dueAt?: string; code?: string }
    if (r.ok && corpo.dueAt) return { ok: true, dueAt: corpo.dueAt }
    return { ok: false, codigo: corpo.code ?? "REDE" }
  } catch {
    return { ok: false, codigo: "REDE" }
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
