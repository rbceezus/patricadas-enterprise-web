// Spec 001 (UI) — regras do login, separadas da tela para poderem ser testadas.

export type Papel = "COLABORADOR" | "OPERACOES"

export interface Perfil {
  id: string
  email: string
  name: string
  role: Papel
}

/** O que o login precisa do mundo de fora — trocado por falsos nos testes. */
export interface DependenciasLogin {
  entrar(email: string, senha: string): Promise<{ token: string } | { erro: "credenciais" | "rede" }>
  buscarPerfil(token: string): Promise<{ perfil: Perfil } | { status: number }>
  sair(): Promise<void>
}

export type ResultadoLogin = { destino: string; perfil: Perfil } | { erro: string }

/** CA-03: o destino depende do papel devolvido pela API. */
export function destinoPorPapel(papel: Papel): string {
  return papel === "OPERACOES" ? "/operacoes" : "/catalogo"
}

export const MENSAGENS = {
  credenciais: "E-mail ou senha incorretos.",
  semAcesso: "Esta conta não tem acesso ao EMPREST.AI. Fale com Operações.",
  indisponivel: "Não foi possível entrar agora. Tente de novo em instantes.",
} as const

/** CA-02/CA-03: autentica, pergunta o papel à API e decide para onde ir. */
export async function fazerLogin(deps: DependenciasLogin, email: string, senha: string): Promise<ResultadoLogin> {
  const sessao = await deps.entrar(email, senha)
  if ("erro" in sessao) {
    return { erro: sessao.erro === "credenciais" ? MENSAGENS.credenciais : MENSAGENS.indisponivel }
  }
  const resposta = await deps.buscarPerfil(sessao.token)
  if ("status" in resposta) {
    await deps.sair() // sem papel, não fica sessão pendurada
    return { erro: resposta.status === 403 ? MENSAGENS.semAcesso : MENSAGENS.indisponivel }
  }
  return { destino: destinoPorPapel(resposta.perfil.role), perfil: resposta.perfil }
}
