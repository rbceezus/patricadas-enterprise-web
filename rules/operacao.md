---
description: Como rodar, depurar e operar este projeto no dia a dia
globs: []
alwaysApply: true
---

# Operação
> leitor: agente

## Ambiente local
1. Copie `.env.example` para `.env` e preencha com valores reais (nunca
   peça para o agente preencher — isso é humano, ver `rules/secrets.md`).
2. `VITE_API_BASE_URL` precisa apontar para a API rodando localmente
   (inclui o prefixo `/v1`).
3. `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` só aceitam a chave
   pública — nunca a `service_role`.

## Rodando a aplicação
`<COMANDO-DEV>` ainda não existe — não há código nem script no
`package.json` (andar zero pendente). Esta seção será substituída pelo
comando real (Vite dev server) assim que o andar zero existir.

## Depurando contra a API local
Este frontend fala com a API em `VITE_API_BASE_URL`; nunca direto com o
Supabase para dado de domínio (ADR-001 e `AGENTS.md`). Se uma tela não
carrega dado, o primeiro lugar a olhar é se a API local está no ar na
porta esperada, antes de suspeitar do frontend.

## Rastreamento de erro
Exceção não tratada no cliente vai para o Sentry (`VITE_SENTRY_DSN`). Se a
variável estiver vazia no `.env` local, o app deve continuar funcionando
sem o Sentry.

## Deploy
- Hospedagem: Vercel, projeto próprio deste frontend (ADR-001).
- Você não roda deploy manual nem altera configuração do projeto na
  Vercel (ver `rules/restrictions.md`). Deploy acontece via CI, a partir
  de PR aprovado e mergeado.
- Mudança de contrato com a API exige coordenação entre os dois
  repositórios (ver `AGENTS.md` e `rules/migration.md`) — não faça deploy
  do frontend esperando um endpoint que a API ainda não publicou.

## Se algo quebrar em produção
Veja o evento no Sentry e, se o erro vier de uma chamada à API, confirme o
`request_id` retornado (quando houver) para cruzar com o log da API. Não
tente corrigir direto em produção — ver `rules/restrictions.md`.

## Estado atual do projeto
Nada disto é executável ainda: não há deploy, não há instância rodando.
Esta página passa a valer fato a fato conforme o andar zero avança.
