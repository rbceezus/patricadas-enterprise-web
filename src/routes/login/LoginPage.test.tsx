// Spec 001 (UI) — o que a tela mostra antes de qualquer interação.
import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { type DependenciasLogin, MENSAGENS } from "@/lib/login"
import { EstadoEnvio, LoginPage } from "@/routes/login/LoginPage"

const deps = {} as DependenciasLogin
const html = renderToStaticMarkup(
  <MemoryRouter>
    <LoginPage deps={deps} />
  </MemoryRouter>,
)

describe("spec 001 (UI) — tela de login", () => {
  it("CA-01: tem campos de e-mail e senha e o botão Entrar habilitado antes do envio", () => {
    expect(html).toMatch(/type="email"/)
    expect(html).toMatch(/type="password"/)
    expect(html).toMatch(/<button[^>]*type="submit"[^>]*>Entrar<\/button>/)
    expect(html).not.toMatch(/<button[^>]*type="submit"[^>]*disabled/)
  })

  it("CA-01: enquanto a submissão está em andamento, o botão fica desabilitado", () => {
    const enviando = renderToStaticMarkup(<EstadoEnvio enviando erro={null} />)
    expect(enviando).toMatch(/<button[^>]*type="submit"[^>]*disabled=""[^>]*>Entrando…<\/button>/)
  })

  it("CA-02: o erro aparece como alerta logo acima do botão, dentro do formulário", () => {
    const comErro = renderToStaticMarkup(<EstadoEnvio enviando={false} erro={MENSAGENS.credenciais} />)
    expect(comErro).toMatch(new RegExp(`^<p role="alert"[^>]*>${MENSAGENS.credenciais}</p><button`))
    expect(html).toMatch(/<form[^>]*>[\s\S]*<button[^>]*type="submit"[\s\S]*<\/form>/)
  })

  it("CA-02: sem recarregar — o envio é tratado pela página (onSubmit), não por navegação do form", () => {
    expect(html).not.toMatch(/<form[^>]*action=/)
  })

  it("CA-04: mostra a nota fixa sobre ver só os próprios empréstimos", () => {
    expect(html).toContain("Cada pessoa vê apenas os próprios empréstimos.")
  })

  it("CA-05: não oferece entrada direta como Operações", () => {
    expect(html).not.toContain("Entrar como Operações")
  })
})
