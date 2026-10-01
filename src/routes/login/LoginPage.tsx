import { type FormEvent, useId, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const STATS = [
  { value: "3 itens", label: "por pessoa" },
  { value: "14 dias", label: "de prazo" },
  { value: "0 linhas", label: "para preencher" },
] as const

export function LoginPage() {
  const emailId = useId()
  const passwordId = useId()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    // Autenticação real depende da API (ver AGENTS.md — contrato ainda
    // não existe). Por ora, apenas simula o estado de carregamento.
    window.setTimeout(() => {
      setIsSubmitting(false)
      setError("Login ainda não está disponível nesta versão.")
    }, 600)
  }

  return (
    <div className="grid min-h-[820px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative flex flex-col justify-between overflow-hidden px-14 py-16 bg-[linear-gradient(160deg,#1b1f2e,#161826_60%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-30 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(47,184,172,0.16), transparent 70%)",
          }}
        />

        <div className="relative z-10 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] border-[1.5px] border-accent-500">
            <span className="h-2.5 w-2.5 rounded-sm bg-accent-500" />
          </span>
          <span className="text-[17px] tracking-[0.02em]">
            <span className="font-bold">EMPREST</span>
            <span className="text-accent-400">.AI</span>
          </span>
        </div>

        <div className="relative z-10 max-w-[480px]">
          <h1 className="text-[44px] font-semibold leading-[1.12] tracking-[-0.015em] text-balance">
            Controle de empréstimos de equipamentos de TI
          </h1>
          <p className="mt-4 text-[16px] leading-[1.55] text-[var(--color-text)]/60">
            Veja o que está disponível, peça emprestado e devolva — sem
            planilha.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex gap-9 border-t border-[var(--color-divider)] pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[20px] font-semibold text-accent-400">
                  {stat.value}
                </p>
                <p className="text-[12px] text-[var(--color-text)]/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[12px] text-[var(--color-text)]/40">
            Operações · TI interno
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-14 py-16">
        <div className="w-full max-w-[340px]">
          <h2 className="text-[26px] font-semibold">Entrar</h2>
          <p className="mt-2 text-[14px] text-[var(--color-text)]/62">
            Use o e-mail e a senha cadastrados por Operações.
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={emailId}>E-mail</Label>
              <Input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={passwordId}>Senha</Label>
              <Input
                id={passwordId}
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error ? (
              <p role="alert" className="text-[13px] text-[var(--color-state-danger-fg)]">
                {error}
              </p>
            ) : null}

            <Button type="submit" size="block" disabled={isSubmitting}>
              {isSubmitting ? "Entrando…" : "Entrar"}
            </Button>

            <Button type="button" variant="ghost" size="block">
              Entrar como Operações →
            </Button>
          </form>

          <p className="mt-6 text-[12px] text-[var(--color-text)]/55">
            Cada pessoa vê apenas os próprios empréstimos.
          </p>
        </div>
      </section>
    </div>
  )
}
