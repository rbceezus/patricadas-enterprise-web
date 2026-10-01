# 002 — Tela de Catálogo

Spec de domínio: ../../../patricadas-enterprise/docs/specs/002-catalogo-equipamentos/spec.md
Referência visual: ../../../patricadas-enterprise/docs/layout.md §5.2 Catálogo

## O que faz

Lista os equipamentos com a situação de cada um e permite solicitar
empréstimo de um item disponível (aciona a spec 003).

## Comportamento de UI

- Cabeçalho: H1 "Catálogo" + contagem "X de Y equipamentos disponíveis
  agora"; campo de busca de 260px alinhado à direita (busca é só filtro em
  tela, client-side ou via query — a API não precisa de endpoint dedicado
  além da listagem).
- Banner de bloqueio por atraso (condicional): aparece quando a pessoa
  logada tem item em atraso (regra vem da spec de domínio 003). Enquanto
  visível, os botões de solicitar ficam desabilitados ou o clique mostra o
  motivo do bloqueio.
- Chips de filtro: Todos · Disponíveis · Emprestados · Em manutenção —
  filtram a grade já carregada, sem nova chamada à API por chip.
- Grade de cards (`repeat(auto-fill, minmax(292px, 1fr))`, gap 16px). Cada
  card mostra: kicker de categoria, nome, patrimônio, pill de situação, uma
  linha de detalhe conforme o estado:
  - Disponível: "Pronto para retirada no balcão".
  - Emprestado: "Com {pessoa} · devolver até {data}" — **atenção**: a spec
    de domínio 002 diz que "quem está com ele" não é dado do catálogo do
    Colaborador. Esse texto só pode ser mostrado se a pessoa logada é
    Operações, ou precisa ser genérico ("Emprestado · devolve em {data}")
    para Colaborador. Resolver antes de implementar — ver pergunta aberta.
  - Em manutenção: observação textual.
  - Botão de largura total: "Solicitar" quando disponível; desabilitado
    (com o texto de estado) quando não.
- Ao solicitar com sucesso, o card atualiza para Emprestado sem recarregar
  a página inteira.

## Fora do escopo

- Edição/cadastro de equipamento (fica no painel de Operações, spec 005).
- Paginação (o PRD não menciona volume que justifique).

## Perguntas em aberto

- Confirmar com a spec de domínio 002: o card de item emprestado pode
  mostrar o nome de quem está com ele para qualquer pessoa logada, ou só
  para Operações? O texto de layout.md ("Com {pessoa}") sugere que sim,
  mas a spec de domínio restringe isso ao papel Operações. Até resolver,
  tratar como visível só para Operações.
