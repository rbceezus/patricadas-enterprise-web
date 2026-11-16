// Spec 003 — solicitar pelo catálogo.
import { describe, expect, it } from "vitest"

import type { Equipamento } from "@/lib/catalogo"
import { MENSAGENS_SOLICITAR, type SituacaoPessoa, aplicarEmprestimo, bloqueio, mensagemDe } from "@/lib/emprestimos"

const item: Equipamento = { id: "e1", name: "Mouse", category: "ACESSORIO", assetTag: null, notes: null, status: "DISPONIVEL", image: null }
const emp = (atrasado = false) => ({ id: "l", equipmentId: "x", equipmentName: "X", borrowedAt: "", dueAt: "", atrasado })
const sit = (n: number, atraso = false): SituacaoPessoa => ({
  emprestimos: Array.from({ length: n }, () => emp()),
  limite: 3,
  bloqueadoPorAtraso: atraso,
})

describe("spec 003 — solicitar no catálogo", () => {
  it("sem bloqueio abaixo do limite e sem atraso", () => {
    expect(bloqueio(sit(2))).toBeNull()
  })

  it("bloqueia no limite de 3", () => {
    expect(bloqueio(sit(3))).toBe(MENSAGENS_SOLICITAR.LIMITE)
  })

  it("atraso bloqueia mesmo abaixo do limite, e vence a mensagem de limite", () => {
    expect(bloqueio(sit(1, true))).toBe(MENSAGENS_SOLICITAR.ATRASO)
    expect(bloqueio(sit(3, true))).toBe(MENSAGENS_SOLICITAR.ATRASO)
  })

  it("código desconhecido vira mensagem de indisponibilidade", () => {
    expect(mensagemDe("XYZ")).toBe(MENSAGENS_SOLICITAR.REDE)
    expect(mensagemDe("INDISPONIVEL")).toBe(MENSAGENS_SOLICITAR.INDISPONIVEL)
  })

  it("após sucesso o card vira Emprestado e conta para o limite", () => {
    const r = aplicarEmprestimo([item], sit(2), item, "2026-12-01T00:00:00.000Z")
    expect(r.itens[0].status).toBe("EMPRESTADO")
    expect(r.situacao!.emprestimos).toHaveLength(3)
    expect(bloqueio(r.situacao)).toBe(MENSAGENS_SOLICITAR.LIMITE)
  })
})
