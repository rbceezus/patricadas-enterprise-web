---
description: O que precisa passar antes de declarar uma tarefa pronta
globs: []
alwaysApply: true
---

# Verificação de fim de tarefa
> leitor: agente

## Quando
Sempre que você for dizer "pronto", "implementado" ou "funcionando".

## Procedimento
1. Rode `<COMANDO-TESTES>` (Vitest, ADR-001). Cole a última linha da saída
   na resposta.
2. Se a tarefa tocou no cliente HTTP gerado, rode o script de regeneração
   a partir do `openapi.json` e confirme `git diff` vazio ou esperado (ver
   `rules/migration.md`) — cliente desatualizado falha o CI.
3. Rode `<COMANDO-BUILD>` antes de qualquer push. Build que quebra na
   Vercel é o feedback mais lento e mais caro deste projeto.
4. Rode `git status --short`. Só podem aparecer arquivos do escopo da
   tarefa.
5. Diga qual critério de aceitação da spec de UI esta tarefa atende.

## Verificação
Pronto = os quatro comandos terminaram sem falha E o `git status` não
trouxe surpresa. As duas coisas, não uma.

## Não faça
- Não relate sucesso parcial. Teste vermelho é tarefa não terminada,
  mesmo que o código "esteja certo".
- Não tente consertar a mesma falha duas vezes seguidas sem mostrar a
  saída do erro.
- Não edite à mão o cliente gerado para fazer o teste passar (ver
  `rules/migration.md`) — se o teste só passa editando o gerado, o schema
  do lado da API está desatualizado, não o cliente.

## Estado atual do projeto
`<COMANDO-TESTES>` e `<COMANDO-BUILD>` ainda não existem: não há código,
suíte de testes nem script de build (andar zero pendente). Esta seção
passa a valer assim que esses comandos existirem de fato; até lá, os
passos 1 e 3 não são executáveis.
