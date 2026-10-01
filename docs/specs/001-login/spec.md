# 001 — Tela de Login

Spec de domínio: ../../../patricadas-enterprise/docs/specs/001-login/spec.md
Referência visual: ../../../patricadas-enterprise/docs/layout.md §5.1 Login

## O que faz

Tela de entrada do sistema. Autentica e-mail/senha e redireciona para a
área correspondente ao papel da pessoa.

## Comportamento de UI

- Campos: E-mail e Senha, mais botão primário de envio (`btn-block`, 40px)
  e um botão ghost "Entrar como Operações →" (conforme layout.md).
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

## Perguntas em aberto

- O botão "Entrar como Operações →" loga direto (conta fixa de demo) ou só
  muda o formulário para indicar que está entrando como Operações? A spec
  de domínio não cobre isso — confirmar antes de implementar.
