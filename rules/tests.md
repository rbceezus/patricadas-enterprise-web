# Testes — convenções

Como os testes funcionam neste repositório. Ainda não há código nem suíte:
esta página será preenchida com fatos verificáveis (comando para rodar,
padrão adotado) depois do andar zero.

## Decisões já registradas no ADR-001 (contexto, não instrução verificável ainda)
- Unitário do frontend: Vitest (mesmo pipeline do Vite, sem config de
  transform paralela).
- E2E de interface: Playwright, para os fluxos que travam a operação
  (login, abertura de chamado, cadastro de ativo — adaptar à lista real de
  fluxos críticos do EMPREST.AI quando definida).
- Verificação de contrato: o CI do frontend falha se o cliente gerado
  divergir do `openapi.json` publicado pela API (ver `rules/migration.md`).
- Sem meta percentual de cobertura; caminhos críticos são obrigatórios.

## O que testar primeiro, quando o andar zero existir
Os fluxos descritos nas specs de UI em `docs/specs/`, na ordem do PRD:
login, listar catálogo, solicitar empréstimo, devolver item, painel de
Operações. Teste de UI não substitui o teste de regra de negócio, que vive
no repositório da API — aqui o foco é comportamento de interface e
integração com o cliente gerado.
