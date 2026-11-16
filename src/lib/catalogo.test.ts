// Spec 002 (UI) — regras do catálogo.
import { describe, expect, it } from "vitest"

import { type Equipamento, contagem, detalhe, filtrar, patrimonio } from "@/lib/catalogo"

const base: Equipamento = {
  id: "1",
  name: "Notebook Dell",
  category: "NOTEBOOK",
  assetTag: "TI-0101",
  notes: null,
  status: "DISPONIVEL",
  image: null,
}
const itens: Equipamento[] = [
  base,
  { ...base, id: "2", name: "Monitor LG", category: "MONITOR", assetTag: null, status: "EMPRESTADO" },
  { ...base, id: "3", name: "Cabo HDMI", category: "CABO", status: "EM_MANUTENCAO", notes: "Conector solto" },
]

describe("spec 002 (UI) — catálogo", () => {
  it("contagem mostra disponíveis sobre o total", () => {
    expect(contagem(itens)).toBe("1 de 3 equipamentos disponíveis agora")
  })

  it("chip filtra por situação", () => {
    expect(filtrar(itens, "EMPRESTADO", "").map((e) => e.id)).toEqual(["2"])
    expect(filtrar(itens, "TODOS", "")).toHaveLength(3)
  })

  it("busca filtra por nome, patrimônio ou categoria, sem diferenciar maiúsculas", () => {
    expect(filtrar(itens, "TODOS", "hdmi").map((e) => e.id)).toEqual(["3"])
    expect(filtrar(itens, "TODOS", "ti-0101").map((e) => e.id)).toEqual(["1", "3"])
    expect(filtrar(itens, "TODOS", "monitor").map((e) => e.id)).toEqual(["2"])
  })

  it("busca e chip combinam", () => {
    expect(filtrar(itens, "DISPONIVEL", "cabo")).toEqual([])
  })

  it("patrimônio ausente aparece como TI-—", () => {
    expect(patrimonio(itens[1])).toBe("TI-—")
  })

  it("detalhe por situação; emprestado não diz com quem está", () => {
    expect(detalhe(itens[0])).toBe("Pronto para retirada no balcão")
    expect(detalhe(itens[1])).toBe("Emprestado no momento")
    expect(detalhe(itens[2])).toBe("Conector solto")
  })
})
