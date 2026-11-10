import { type ReactNode, useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import type { Perfil } from "@/lib/login"
import { buscarPerfil, supabase } from "@/lib/supabase"

/**
 * Sem sessão válida, nenhuma tela de domínio abre (spec 001). As telas de
 * Catálogo e Operações ainda não existem: são entregas seguintes. Até lá, a
 * área logada só mostra quem entrou e o botão de sair.
 */
export function AreaLogada({ titulo, children }: { titulo: string; children?: ReactNode }) {
  const navigate = useNavigate()
  const [estado, setEstado] = useState<"carregando" | "fora" | Perfil>("carregando")

  useEffect(() => {
    let ativo = true
    supabase.auth.getSession().then(async ({ data }) => {
      const token = data.session?.access_token
      const r = token ? await buscarPerfil(token) : { status: 401 }
      if (ativo) setEstado("perfil" in r ? r.perfil : "fora")
    })
    return () => {
      ativo = false
    }
  }, [])

  if (estado === "carregando") return <p className="p-14 text-[14px] opacity-60">Carregando…</p>
  if (estado === "fora") return <Navigate to="/" replace />

  async function sair() {
    await supabase.auth.signOut()
    navigate("/", { replace: true })
  }

  return (
    <div className="mx-auto max-w-[960px] px-14 py-12">
      <header className="flex items-center justify-between">
        <h1 className="text-[28px] font-semibold">{titulo}</h1>
        <div className="flex items-center gap-4 text-[14px]">
          <span>
            {estado.name} · {estado.role === "OPERACOES" ? "Operações" : "Colaborador"}
          </span>
          <Button type="button" variant="ghost" onClick={sair}>
            Sair
          </Button>
        </div>
      </header>
      <main className="mt-8">{children}</main>
    </div>
  )
}
