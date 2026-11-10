# 001 — Tela de Login

Spec de domínio: ../../../patricadas-enterprise/docs/specs/001-login/spec.md
Referência visual: ../../../patricadas-enterprise/docs/layout.md §5.1 Login

## O que faz

Tela de entrada do sistema. Autentica e-mail/senha e redireciona para a
área correspondente ao papel da pessoa.

## Comportamento de UI

- Campos: E-mail e Senha, mais botão primário de envio (`btn-block`, 40px).
  O botão ghost "Entrar como Operações →" do layout.md foi removido nesta
  versão (ver CA-05 e "Perguntas respondidas").
- Enquanto a submissão está em andamento, o botão primário fica desabilitado
  (ver estado "Desabilitado" em layout.md §4).
- Erro de credencial inválida aparece perto do formulário, sem recarregar a
  página.
- Sucesso: redireciona para Catálogo (Colaborador) ou Painel de Operações
  (Operações), conforme o papel retornado pela API.
- Nota fixa abaixo do botão: "Cada pessoa vê apenas os próprios
  empréstimos" (texto do layout, mantém expectativa correta antes do
  login).

## Fora do escopo

- Cadastro de usuário, recuperação de senha (idem spec de domínio).
- Validação de força de senha além do que a API já recusar.

## Critérios de aceite (UI)

Acrescentados na prática de subagentes (2026-11-10). A prova de cada um
vive neste repositório; a regra de papel e de sessão é da API (spec 001 de
domínio, CA-01..CA-04).

- **CA-01** A tela tem e-mail, senha e o botão Entrar; o botão fica
  desabilitado enquanto a submissão está em andamento.
- **CA-02** Credencial inválida mostra "E-mail ou senha incorretos." perto
  do formulário, sem recarregar a página; falha de rede mostra mensagem de
  indisponibilidade.
- **CA-03** Sucesso pergunta o papel a `GET /v1/me` e redireciona:
  Colaborador para `/catalogo`, Operações para `/operacoes`. Conta sem
  vínculo (403) não entra e a sessão é encerrada.
- **CA-04** A nota fixa "Cada pessoa vê apenas os próprios empréstimos."
  aparece abaixo do formulário.
- **CA-05** Não existe entrada direta como Operações.

## Perguntas respondidas

- Botão "Entrar como Operações →": **removido nesta versão**. Uma conta fixa
  de demonstração seria uma credencial de Operações exposta na tela, e o
  papel já vem da API (CA-03). Volta a ser pergunta quando houver fluxo de
  Operações.
- Catálogo e Painel ainda não existem: as rotas `/catalogo` e `/operacoes`
  mostram só quem entrou e o botão Sair, até as specs 002/003 e 004.
- Chamada a `GET /v1/me` escrita à mão (`src/lib/supabase.ts`): o cliente
  gerado pelo Orval (ADR-001) depende do `openapi.json`, que a API ainda não
  publica (AZ-05). Desvio registrado no ENTREGA.md.
