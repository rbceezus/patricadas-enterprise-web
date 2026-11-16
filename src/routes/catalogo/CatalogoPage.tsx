import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  type Equipamento,
  type Filtro,
  FILTROS,
  ROTULO_CATEGORIA,
  ROTULO_SITUACAO,
  type Situacao,
  contagem,
  detalhe,
  filtrar,
  patrimonio,
} from "@/lib/catalogo"
import { buscarEquipamentos } from "@/lib/supabase"

const COR: Record<Situacao, string> = {
  DISPONIVEL: "ok",
  EMPRESTADO: "warn",
  EM_MANUTENCAO: "off",
}

function Pill({ situacao }: { situacao: Situacao }) {
  const c = COR[situacao]
  return (
    <span
      className="rounded-full border px-[9px] py-[3px] text-[12px]"
      style={{
        color: `var(--color-state-${c}-fg)`,
        background: `var(--color-state-${c}-bg)`,
        borderColor: `var(--color-state-${c}-bd)`,
      }}
    >
      {ROTULO_SITUACAO[situacao]}
    </span>
  )
}

export function CardEquipamento({ e }: { e: Equipamento }) {
  const credito = e.image && [e.image.author, e.image.license].filter(Boolean).join(" · ")
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)] p-[18px]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black/20">
        {e.image ? (
          <img src={e.image.url} alt={e.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-[12px] opacity-50">Sem imagem</div>
        )}
      </div>
      {credito ? (
        <p className="-mt-2 truncate text-[11px] opacity-50">
          {e.image?.sourceUrl ? (
            <a href={e.image.sourceUrl} target="_blank" rel="noreferrer" className="hover:underline">
              Foto: {credito}
            </a>
          ) : (
            <>Foto: {credito}</>
          )}
        </p>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.08em] text-accent-400">{ROTULO_CATEGORIA[e.category]}</p>
          <h2 className="truncate text-[16px] font-semibold">{e.name}</h2>
          <p className="text-[12px] opacity-60">{patrimonio(e)}</p>
        </div>
        <Pill situacao={e.status} />
      </div>
      <p className="text-[13px] opacity-75">{detalhe(e)}</p>
      {/* Solicitar empréstimo é a spec 003; por ora o botão só mostra o estado. */}
      <Button type="button" size="block" disabled title="Solicitação chega com a spec 003">
        {e.status === "DISPONIVEL" ? "Solicitar" : ROTULO_SITUACAO[e.status]}
      </Button>
    </article>
  )
}

export function CatalogoPage() {
  const [itens, setItens] = useState<Equipamento[] | "carregando" | "erro">("carregando")
  const [filtro, setFiltro] = useState<Filtro>("TODOS")
  const [busca, setBusca] = useState("")

  useEffect(() => {
    let ativo = true
    buscarEquipamentos().then((r) => {
      if (ativo) setItens("itens" in r ? r.itens : "erro")
    })
    return () => {
      ativo = false
    }
  }, [])

  if (itens === "carregando") return <p className="text-[14px] opacity-60">Carregando equipamentos…</p>
  if (itens === "erro")
    return (
      <p role="alert" className="text-[14px] text-[var(--color-state-danger-fg)]">
        Não foi possível carregar o catálogo. Tente de novo em instantes.
      </p>
    )

  const visiveis = filtrar(itens, filtro, busca)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[14px] opacity-70">{contagem(itens)}</p>
        <Input
          type="search"
          placeholder="Buscar equipamento"
          aria-label="Buscar equipamento"
          value={busca}
          onChange={(ev) => setBusca(ev.target.value)}
          className="w-[260px]"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por situação">
        {FILTROS.map((f) => (
          <button
            key={f.valor}
            type="button"
            aria-pressed={filtro === f.valor}
            onClick={() => setFiltro(f.valor)}
            className={`rounded-full border px-3 py-1 text-[13px] ${
              filtro === f.valor
                ? "border-accent-500 bg-[rgba(47,184,172,0.10)] text-accent-300"
                : "border-[var(--color-divider)] opacity-75"
            }`}
          >
            {f.rotulo}
          </button>
        ))}
      </div>

      {visiveis.length === 0 ? (
        <p className="text-[14px] opacity-60">Nenhum equipamento encontrado.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(292px,1fr))] gap-4">
          {visiveis.map((e) => (
            <CardEquipamento key={e.id} e={e} />
          ))}
        </div>
      )}
    </div>
  )
}
