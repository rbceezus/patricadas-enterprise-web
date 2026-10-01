---
description: Como lidar com credenciais e segredos neste repositório
globs: []
alwaysApply: true
---

# Segredos
> leitor: agente

## O que nunca fazer
- Nunca leia, exiba, edite ou commite o arquivo `.env`.
- Nunca invente valor de credencial, nem como placeholder "parecido com
  real". Para exemplificar, use `SEU-PROJETO` e afins — como já está em
  `.env.example`.
- Nunca escreva segredo (chave, token) em spec, PRD, ADR, AGENTS.md,
  handoff.md, commit, PR ou nesta conversa.
- Nunca crie, revogue ou gire chave do Supabase (`anon`). Isso é feito por
  uma pessoa, no painel do Supabase.

## Regra específica deste frontend
- **Toda variável com prefixo `VITE_` é pública.** O Vite embute essas
  variáveis no bundle enviado ao navegador — qualquer pessoa que abrir o
  DevTools lê o valor. Nunca ponha segredo real numa variável `VITE_`,
  nem "por enquanto" nem "só em dev".
- Só a chave `anon` do Supabase pode existir aqui
  (`VITE_SUPABASE_ANON_KEY`). A `service_role` NUNCA entra neste
  repositório, em nenhuma variável, em nenhum ambiente — ela só existe na
  API (ver ADR-001, seção Segurança).
- O token de sessão do usuário fica em memória/storage gerenciado pelo
  `supabase-js`; não escreva lógica própria para guardá-lo em outro lugar.

## O que entra no repositório
Só `.env.example`, sem valor real — ver o arquivo já existente nesta pasta
para o formato esperado de cada variável. Variável nova entra em
`.env.example` no mesmo PR que passa a exigi-la.

## Se encontrar um segredo exposto
Pare a tarefa atual e avise. Se o que vazou for a `service_role` do
Supabase num bundle de frontend, trate como incidente: essa chave dá
acesso total ao banco ignorando RLS. Não tente resolver sozinho — isso é
decisão humana (inclui girar a chave).
