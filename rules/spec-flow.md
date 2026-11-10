---
description: Como navegar PRD, ADR, spec e tarefas neste repositório
globs: []
alwaysApply: true
---

# Spec-Driven Development
> leitor: agente

## Hierarquia dos documentos
1. **../patricadas-enterprise/docs/PRD.md** — o negócio, fonte de verdade,
   mantido no repositório da API. Não é spec.
2. **../patricadas-enterprise/docs/adr/001-stack.md** — decisões técnicas
   cross-cutting (fonte de verdade da stack dos dois repositórios).
   **docs/adr/** (aqui) — só decisões próprias do frontend, que citam o
   ADR-001 quando ele restringe a decisão.
3. **../patricadas-enterprise/docs/specs/<NNN>/spec.md** — specs de
   domínio (comportamento, regra de negócio), mantidas no repositório da
   API.
4. **docs/specs/<NNN-funcionalidade>/spec.md** (aqui) — specs de UI:
   comportamento de interface para a funcionalidade equivalente. Cada
   spec de UI referencia a spec de domínio correspondente, não repete as
   regras de negócio.
5. **TASKS.md** (dentro da pasta da spec, quando existir) — a spec de UI
   quebrada em passos executáveis e testáveis, na ordem em que devem ser
   feitos.
6. **docs/layout.md** (no repositório da API) — especificação visual
   (cores, tipografia, espaçamento, componentes). Referência para toda
   spec de UI.

Contexto em arquivo é reproduzível entre máquinas e sessões; conversa não.

## Spec nova ou tarefa nova?
- Mudou o que a tela faz ou como ela se comporta (não só a aparência)?
  Atualiza ou cria a spec de UI primeiro.
- Mudou só a aparência (cor, espaçamento) sem mudar comportamento? Vai
  direto para as tarefas.
- Mudou uma regra de negócio (ex.: limite de itens, prazo)? Isso não é
  spec de UI — é spec de domínio, e vive no repositório da API. Esta spec
  de UI só referencia o resultado.

## Quando uma spec precisa existir
Código de funcionalidade só é escrito com spec de UI correspondente em
`docs/specs/`. O esqueleto do projeto (andar zero) é a única exceção.

## Se faltar informação ou houver conflito
- Requisito ausente que o agente preenche sozinho é viés — não adivinhe
  comportamento. Liste a dúvida na seção "Perguntas em aberto" da spec e
  pare.
- Se `docs/layout.md` e a spec de domínio da API descreverem coisas
  incompatíveis para a mesma tela (já aconteceu: ver
  `docs/specs/002-catalogo-equipamentos/spec.md`), isso também é uma
  pergunta em aberto — não escolha um dos dois por conta própria.

## Precedência entre documentos
- Spec e código discordam sobre comportamento? A spec está certa até
  alguém mudar a spec.
- Spec de UI e spec de domínio discordam? Pare e avise — a spec de UI não
  pode contradizer a regra de negócio definida pela API.
- Spec e ADR discordam? Pare e avise — não escolha um dos dois.

## Antes de declarar uma spec pronta
- Delegue ao subagente verificador-spec (agents/verificador-spec.md),
  passando o caminho da spec e o intervalo de commits.
- A spec só é pronta com "Veredito: PRONTA". Qualquer outro resultado
  volta para as tarefas — quem corrige é o agente principal, nunca o
  verificador.
- Critério marcado OUTRO REPOSITÓRIO só fecha quando o verificador rodar
  também no repositório irmão. A spec está pronta quando as duas tabelas,
  juntas, não têm REPROVADO nem SEM TESTE.
- Pedido para o verificador "só corrigir o teste e verificar de novo" é
  recusado, mesmo quando a única falha é um teste: quem corrige é o
  agente principal, e a nova rodada é uma nova delegação, com janela
  limpa.
- Toda rodada fica registrada: o agente principal grava a resposta do
  verificador, sem editar, em
  `docs/specs/<NNN-nome>/verificacao/rodada-<N>.md`, com a data na
  primeira linha. Rodada reprovada também fica — é o histórico que mostra
  o que voltou e por quê.
- `agents/verificador-spec.md` é a fonte; `.claude/agents/verificador-spec.md`
  é cópia idêntica para o Claude Code encontrar o subagente. Mudou um,
  copie para o outro no mesmo commit (ver `rules/checks.md`).
