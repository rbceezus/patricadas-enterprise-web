2026-11-10 · rodada 1 · verificador-spec (subagente Explore, sem ferramentas de edição) · resposta sem edição

Spec: docs/specs/001-login/spec.md · Repositório: web · IDs: da spec
Rodada: HEAD b0e00ab · intervalo verificado: commit b0e00ab (feat/001-login-real)

| critério | lado | evidência (arquivo:linha do teste) | status | observação |
|---|---|---|---|---|
| CA-01 e-mail, senha e botão Entrar; o botão fica desabilitado enquanto a submissão está em andamento | [front] | src/routes/login/LoginPage.test.tsx:17 | SEM TESTE | O teste só prova os campos e o botão HABILITADO antes do envio. Nenhum teste prova `disabled` durante a submissão (LoginPage.tsx usa `disabled={isSubmitting}`, mas isso não está exercitado). |
| CA-02 credencial inválida mostra "E-mail ou senha incorretos." perto do formulário, sem recarregar; falha de rede mostra indisponibilidade | [front] | src/lib/login.test.ts:18, src/lib/login.test.ts:23 | SEM TESTE | As mensagens estão provadas só na lógica (`fazerLogin`). Nenhum teste prova que a mensagem aparece na tela perto do formulário sem recarregar a página (`role="alert"` em LoginPage.tsx:120 não é exercitado). |
| CA-03 sucesso consulta `GET /v1/me`; Colaborador vai para /catalogo, Operações para /operacoes; 403 não entra e a sessão é encerrada | [front] | src/lib/login.test.ts:28, :32, :36 | ATENDIDO | Destino por papel e 403 com `sair()` estão provados. Ressalva: Operações é testado só via `destinoPorPapel`, não via `fazerLogin`. O `/v1` vem de `VITE_API_BASE_URL` (.env.example:6). A URL real (`${apiBase}/me`, src/lib/supabase.ts) não tem teste. |
| CA-04 a nota fixa "Cada pessoa vê apenas os próprios empréstimos." aparece abaixo do formulário | [front] | src/routes/login/LoginPage.test.tsx:24 | ATENDIDO | O teste prova a presença do texto, não a posição. No código, a nota está após `</form>` (LoginPage.tsx:128-131). |
| CA-05 não existe entrada direta como Operações | [front] | src/routes/login/LoginPage.test.tsx:28 | ATENDIDO | |

Checks: npm test → passou (Tests 8 passed (8))
Checks: npm run build → passou (✓ built in 915ms, só aviso de tamanho de chunk)
Checks: npm run lint → passou
Checks: regeneração do cliente Orval → NÃO RODADO (não se aplica: não há cliente gerado, segundo rules/checks.md)
Checks: git status --short → NÃO RODADO (o verificador só pode usar git log/diff/show/rev-parse)
Fora de escopo: nada encontrado (sem cadastro, sem recuperação de senha, sem validação de força de senha. Área logada mínima em /catalogo e /operacoes, prevista em "Perguntas respondidas")
Veredito: NÃO PRONTA — CA-01 (botão desabilitado durante a submissão) e CA-02 (mensagem exibida na tela, sem recarregar) não têm teste que prove o comportamento de tela.
