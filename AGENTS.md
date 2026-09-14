# EMPREST.AI — Frontend (web)

Interface web do sistema interno de empréstimo de equipamentos (EMPREST.AI).
React + Vite, conforme a stack em docs/adr/001-stack.md do repositório da API.
Repositório separado da API (patricadas-enterprise); não há pacote compartilhado
de tipos.

## Onde olhar
- ../patricadas-enterprise/docs/PRD.md — o negócio (fonte de verdade, no repo da API).
- ../patricadas-enterprise/docs/adr/001-stack.md — a stack decidida (cross-cutting).
- ../patricadas-enterprise/docs/layout.md — especificação visual completa (telas, tokens, componentes).
- ../patricadas-enterprise/docs/specs/ — specs de domínio (comportamento), quando existirem.
- rules/restrictions.md — leia sempre, antes de qualquer tarefa.
- docs/adr/ — decisões específicas do frontend.
- docs/specs/ — specs de UI específicas do frontend, quando existirem. Ainda vazio.

PRD, ADR-001 e specs de domínio são mantidos no repositório da API como fonte de
verdade. Aqui ficam apenas as decisões e specs próprias do frontend.

## Precedência
Se dois artefatos discordarem sobre comportamento, a spec vence o código.
Se algo não estiver em lugar nenhum, pergunte — não decida.

## Contrato com a API
- O cliente HTTP é gerado pelo Orval a partir do openapi.json publicado pela API.
- Não edite o cliente gerado à mão. Mudou o contrato? Regenere a partir do OpenAPI.
- Para dados de domínio o frontend fala com a API, nunca direto com o Supabase.
- Só a chave pública (anon) do Supabase vive aqui. A service_role NUNCA entra no frontend.

## Processo
- Leia os ADRs antes de propor qualquer coisa estrutural.
- Decisão estrutural nova precisa de ADR antes do código. Você descreve a decisão e para.
- Código de funcionalidade só com spec correspondente.
- Uma tarefa por vez.

## Estado atual do projeto
O projeto ainda não tem código. Não existe comando de build, de teste nem de
execução. Esta seção será substituída por Comandos, Mapa de diretórios,
Convenções e Como testar quando o andar zero existir.
