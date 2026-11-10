// Spec 001 (UI) — o que a tela mostra antes de qualquer interação.
import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import type { DependenciasLogin } from "@/lib/login"
import { LoginPage } from "@/routes/login/LoginPage"

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

  it("CA-04: mostra a nota fixa sobre ver só os próprios empréstimos", () => {
    expect(html).toContain("Cada pessoa vê apenas os próprios empréstimos.")
  })

  it("CA-05: não oferece entrada direta como Operações", () => {
    expect(html).not.toContain("Entrar como Operações")
  })
})
