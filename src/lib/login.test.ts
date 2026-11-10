// Spec 001 (UI) — regras do login.
import { describe, expect, it, vi } from "vitest"

import { type DependenciasLogin, MENSAGENS, destinoPorPapel, fazerLogin } from "@/lib/login"

const perfil = { id: "u1", email: "a@b.c", name: "A", role: "COLABORADOR" as const }

function deps(parcial: Partial<DependenciasLogin> = {}): DependenciasLogin {
  return {
    entrar: async () => ({ token: "t" }),
    buscarPerfil: async () => ({ perfil }),
    sair: vi.fn(async () => {}),
    ...parcial,
  }
}

describe("spec 001 (UI) — login", () => {
  it("CA-02: credencial inválida devolve a mensagem de erro, sem redirecionar", async () => {
    const r = await fazerLogin(deps({ entrar: async () => ({ erro: "credenciais" }) }), "a@b.c", "x")
    expect(r).toEqual({ erro: MENSAGENS.credenciais })
  })

  it("CA-02: falha de rede no login devolve mensagem de indisponível", async () => {
    const r = await fazerLogin(deps({ entrar: async () => ({ erro: "rede" }) }), "a@b.c", "x")
    expect(r).toEqual({ erro: MENSAGENS.indisponivel })
  })

  it("CA-03: Colaborador vai para o Catálogo", async () => {
    expect(await fazerLogin(deps(), "a@b.c", "x")).toEqual({ destino: "/catalogo", perfil })
  })

  it("CA-03: Operações vai para o Painel de Operações", () => {
    expect(destinoPorPapel("OPERACOES")).toBe("/operacoes")
  })

  it("CA-03: o papel vem da API; conta sem vínculo (403) não entra e a sessão é encerrada", async () => {
    const d = deps({ buscarPerfil: async () => ({ status: 403 }) })
    expect(await fazerLogin(d, "a@b.c", "x")).toEqual({ erro: MENSAGENS.semAcesso })
    expect(d.sair).toHaveBeenCalled()
  })
})
