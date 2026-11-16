// Spec 003 (domínio) no catálogo — regras de tela para solicitar, separadas
// da tela para poderem ser testadas.
import type { Equipamento } from "@/lib/catalogo"

/** Formato de GET /v1/loans/me. */
export interface SituacaoPessoa {
  emprestimos: { id: string; equipmentId: string; equipmentName: string; borrowedAt: string; dueAt: string; atrasado: boolean }[]
  limite: number
  bloqueadoPorAtraso: boolean
}

/** Resultado de POST /v1/loans, já traduzido. */
export type ResultadoSolicitar = { ok: true; dueAt: string } | { ok: false; codigo: string }

export const MENSAGENS_SOLICITAR: Record<string, string> = {
  INDISPONIVEL: "Este equipamento não está mais disponível.",
  LIMITE: "Você já está com 3 itens emprestados. Devolva um para pegar outro.",
  ATRASO: "Você tem item em atraso. Devolva antes de pegar outro.",
  NAO_ENCONTRADO: "Equipamento não encontrado.",
  REDE: "Não foi possível solicitar agora. Tente de novo em instantes.",
}

export function mensagemDe(codigo: string): string {
  return MENSAGENS_SOLICITAR[codigo] ?? MENSAGENS_SOLICITAR.REDE
}

/** Motivo para não deixar solicitar, antes mesmo de chamar a API. */
export function bloqueio(s: SituacaoPessoa | null): string | null {
  if (!s) return null
  if (s.bloqueadoPorAtraso) return MENSAGENS_SOLICITAR.ATRASO
  if (s.emprestimos.length >= s.limite) return MENSAGENS_SOLICITAR.LIMITE
  return null
}

/** Depois do sucesso, o card vira Emprestado sem recarregar a página (spec de UI 002). */
export function aplicarEmprestimo(
  itens: Equipamento[],
  s: SituacaoPessoa | null,
  equipamento: Equipamento,
  dueAt: string,
): { itens: Equipamento[]; situacao: SituacaoPessoa | null } {
  return {
    itens: itens.map((e) => (e.id === equipamento.id ? { ...e, status: "EMPRESTADO" } : e)),
    situacao: s && {
      ...s,
      emprestimos: [
        ...s.emprestimos,
        {
          id: `local-${equipamento.id}`,
          equipmentId: equipamento.id,
          equipmentName: equipamento.name,
          borrowedAt: new Date().toISOString(),
          dueAt,
          atrasado: false,
        },
      ],
    },
  }
}

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR")
}
