# 003 — Tela de Meus empréstimos

Spec de domínio: ../../../patricadas-enterprise/docs/specs/003-solicitar-emprestimo/spec.md
e ../../../patricadas-enterprise/docs/specs/004-devolver-item/spec.md
Referência visual: ../../../patricadas-enterprise/docs/layout.md §5.3 Meus empréstimos

## O que faz

Mostra os empréstimos abertos da própria pessoa logada e permite devolver
cada um (aciona a spec de domínio 004).

## Comportamento de UI

- Cabeçalho: H1 + "N de 3 itens em seu nome · prazo padrão de 14 dias".
- Barra de 3 traços representando o limite de itens (spec de domínio 003):
  traço ocupado no acento, traço de item em atraso em vermelho, traços
  vazios em baixa opacidade.
- Lista de linhas, uma por empréstimo aberto, com borda esquerda de 3px na
  cor do estado (em dia / a vencer / atraso — ver layout.md §1, tabela de
  cores semânticas). Colunas: item · data de retirada · "devolver até"
  (colorida conforme o estado) · pill de situação · botão "Devolver".
- Botão "Devolver" chama a ação de devolução; ao confirmar, a linha some da
  lista e a barra de 3 traços atualiza.
- Lista vazia: mensagem de estado vazio (conforme padrão do design system,
  layout.md §4) — "Nenhum item emprestado no momento" ou equivalente.

## Fora do escopo

- Histórico de empréstimos já devolvidos (não faz parte da v1, PRD não
  pede).

## Perguntas em aberto

- Devolver exige confirmação (modal) ou é uma ação direta de um clique? O
  layout.md não detalha modal de confirmação para esta tela especificamente
  — confirmar antes de implementar.
