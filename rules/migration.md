---
description: Como lidar com mudança de contrato de API neste repositório
globs: []
alwaysApply: true
---

# Migration de contrato
> leitor: agente

Este repositório não tem schema de banco — "migration" aqui é sobre o
contrato HTTP com a API, não sobre dado.

## Dono do contrato
O `openapi.json` publicado pelo CI da API é a fonte de verdade do
contrato. O cliente HTTP deste frontend é **gerado** a partir desse
arquivo com Orval (ADR-001, seção Contrato de API).

## O que nunca fazer
- Nunca edite à mão um arquivo dentro da pasta do cliente gerado. Se o
  tipo ou o método está errado, o problema está no schema do lado da API
  (Zod) ou na versão do `openapi.json` usada para gerar — a correção
  nunca é no arquivo gerado.
- Nunca aponte a geração para uma cópia local editada do
  `openapi.json`; use sempre o artefato publicado pelo CI da API (ou a
  versão combinada explicitamente para o andar zero/desenvolvimento
  conjunto).

## Procedimento ao mudar o contrato
1. Confirme que a mudança já existe do lado da API (endpoint, campo ou
   schema novo já implementado e com `openapi.json` atualizado).
2. Rode o script de regeneração do cliente (ver `rules/operations.md`
   quando o script existir).
3. Rode `git diff` sobre a pasta do cliente gerado. Essa diferença é o
   "contrato mudou" ficando visível — é o substituto, com repositórios
   separados, do build quebrar sozinho quando a API muda (ADR-001).
4. Ajuste o código que consome o cliente para o novo tipo. Se o CI do
   frontend falhar porque o cliente divergiu do `openapi.json` publicado,
   a tarefa não terminou (ver `rules/checks.md`).

## Estado atual do projeto
Ainda não há cliente gerado nem script de geração (andar zero pendente).
Esta regra passa a ser executável assim que o script existir.
