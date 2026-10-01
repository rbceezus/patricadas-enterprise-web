# 004 — Tela de Operações

Spec de domínio: ../../../patricadas-enterprise/docs/specs/005-painel-operacoes/spec.md
Referência visual: ../../../patricadas-enterprise/docs/layout.md (seção de Operações
não detalhada no trecho lido; usar os componentes `.table` e grade de KPIs
já descritos em §3–4 como base, a confirmar contra o restante de layout.md)

## O que faz

Painel exclusivo do papel Operações: mostra todos os empréstimos em aberto
de todas as pessoas e permite registrar devolução no balcão.

## Comportamento de UI

- Acesso restrito a Operações; Colaborador não vê esta rota (a UI não deve
  nem oferecer o link, além de a API recusar a chamada — ver spec de
  domínio 001).
- Grade de KPIs no topo (4 colunas, conforme §3 de layout.md) — métricas
  exatas (ex.: total em aberto, total em atraso) a definir, já que o PRD
  não lista quais números aparecem aqui.
- Tabela (`.table`, layout.md §3–4) com uma linha por empréstimo em aberto:
  pessoa, equipamento, data do empréstimo, data limite, situação (em dia /
  atraso), ação "Registrar devolução".
- Ação de devolução atualiza a linha (remove da lista de abertos) sem
  recarregar a página.

## Fora do escopo

- Cadastro de equipamento (depende de resposta à pergunta em aberto da
  spec de domínio 005 — se vier a ser parte desta tela, precisa de uma
  seção nova nesta spec antes de implementar).
- Relatórios e exportação.

## Perguntas em aberto

- Quais KPIs exatamente aparecem no topo? O PRD não especifica números,
  só "ver todos os empréstimos em aberto". Perguntar a Operações antes de
  implementar os cards de KPI.
- O cadastro de equipamento novo mora nesta tela? Ver pergunta equivalente
  na spec de domínio 005.
