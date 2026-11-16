// Spec 002 (UI) — regras do catálogo, separadas da tela para poderem ser testadas.

export type Situacao = "DISPONIVEL" | "EMPRESTADO" | "EM_MANUTENCAO"
export type Categoria = "NOTEBOOK" | "MONITOR" | "CABO" | "CAMERA" | "ACESSORIO"

/** Formato devolvido por GET /v1/equipments (spec 002 da API). */
export interface Equipamento {
  id: string
  name: string
  category: Categoria
  assetTag: string | null
  notes: string | null
  status: Situacao
  image: { url: string; author: string | null; sourceUrl: string | null; license: string | null } | null
}

export type Filtro = "TODOS" | Situacao

export const FILTROS: { valor: Filtro; rotulo: string }[] = [
  { valor: "TODOS", rotulo: "Todos" },
  { valor: "DISPONIVEL", rotulo: "Disponíveis" },
  { valor: "EMPRESTADO", rotulo: "Emprestados" },
  { valor: "EM_MANUTENCAO", rotulo: "Em manutenção" },
]

export const ROTULO_SITUACAO: Record<Situacao, string> = {
  DISPONIVEL: "Disponível",
  EMPRESTADO: "Emprestado",
  EM_MANUTENCAO: "Em manutenção",
}

export const ROTULO_CATEGORIA: Record<Categoria, string> = {
  NOTEBOOK: "Notebook",
  MONITOR: "Monitor",
  CABO: "Cabo",
  CAMERA: "Câmera",
  ACESSORIO: "Acessório",
}

/** layout.md §5.5: patrimônio ausente aparece como "TI-—". */
export function patrimonio(e: Equipamento): string {
  return e.assetTag ?? "TI-—"
}

/**
 * Linha de detalhe do card. Emprestado é genérico: quem está com o item é
 * informação de Operações (pergunta em aberto da spec de UI 002).
 */
export function detalhe(e: Equipamento): string {
  if (e.status === "DISPONIVEL") return "Pronto para retirada no balcão"
  if (e.status === "EMPRESTADO") return "Emprestado no momento"
  return e.notes?.trim() || "Em manutenção"
}

/** Chips filtram a grade já carregada, sem nova chamada (spec de UI 002). */
export function filtrar(itens: Equipamento[], filtro: Filtro, busca: string): Equipamento[] {
  const termo = busca.trim().toLowerCase()
  return itens.filter(
    (e) =>
      (filtro === "TODOS" || e.status === filtro) &&
      (!termo || `${e.name} ${patrimonio(e)} ${ROTULO_CATEGORIA[e.category]}`.toLowerCase().includes(termo)),
  )
}

export function contagem(itens: Equipamento[]): string {
  const livres = itens.filter((e) => e.status === "DISPONIVEL").length
  return `${livres} de ${itens.length} equipamentos disponíveis agora`
}
