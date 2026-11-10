2026-11-10 · rodada 2 · verificador-spec (subagente Explore, sem ferramentas de edição) · resposta sem edição

Spec: docs/specs/001-login/spec.md · Repositório: web · IDs: da spec
Rodada: HEAD 922c1dc · intervalo verificado: main..HEAD (feat/001-login-real: b0e00ab, 922c1dc)

| critério | lado | evidência (arquivo:linha do teste) | status | observação |
|---|---|---|---|---|
| CA-01 e-mail, senha e botão Entrar; botão desabilitado durante a submissão | [front] | src/routes/login/LoginPage.test.tsx:17, :24 | ATENDIDO | O estado desabilitado é provado no componente EstadoEnvio (LoginPage.tsx:20-34), que a LoginPage usa com isSubmitting. Não há teste que simule o envio pela página inteira. |
| CA-02 credencial inválida mostra "E-mail ou senha incorretos." perto do form, sem recarregar; rede mostra indisponível | [front] | src/lib/login.test.ts:18, :23; src/routes/login/LoginPage.test.tsx:29, :35 | ATENDIDO | Mensagens em src/lib/login.ts:26-30. O "sem recarregar" é provado de forma indireta: o form não tem action e o envio passa pelo onSubmit com preventDefault. |
| CA-03 sucesso consulta GET /v1/me; Colaborador vai para /catalogo, Operações para /operacoes; 403 não entra e encerra a sessão | [front] | src/lib/login.test.ts:28, :32, :36 | ATENDIDO | Os testes usam dependências falsas. A chamada real a GET /v1/me (src/lib/supabase.ts) não tem teste. O caso de Operações testa só destinoPorPapel, não passa por fazerLogin. A regra de papel e sessão no servidor é da API (spec de domínio ../../../patricadas-enterprise/docs/specs/001-login/spec.md, CA-01..CA-04). |
| CA-04 a nota "Cada pessoa vê apenas os próprios empréstimos." aparece abaixo do formulário | [front] | src/routes/login/LoginPage.test.tsx:39 | ATENDIDO | O teste prova que o texto existe, mas não a posição. No código ele fica depois do form (LoginPage.tsx:143-145). |
| CA-05 não existe entrada direta como Operações | [front] | src/routes/login/LoginPage.test.tsx:43 | ATENDIDO | Na seção "Comportamento de UI" a spec ainda lista o botão ghost "Entrar como Operações →". "Perguntas respondidas" e CA-05 o removem. A spec se contradiz internamente, mas o CA está claro. |

Checks: npm test → passou (Tests 11 passed (11))
Checks: npm run build → passou (só aviso de tamanho de chunk)
Checks: npm run lint → passou (oxlint sem erros)
Checks: regeneração do cliente Orval → NÃO RODADO (não existe cliente gerado; rules/checks.md diz que o passo 2 não se aplica)
Checks: git status --short → passou (árvore limpa)
Checks: git diff --no-index agents/verificador-spec.md .claude/agents/verificador-spec.md → NÃO RODADO (o intervalo não mexeu no verificador)
Fora de escopo: nada encontrado (a busca por cadastro, signUp e recuperação de senha em src/ só achou texto de interface, LoginPage.tsx:110)
Veredito: PRONTA — CA-01..CA-05 têm teste que passa e os checks de rules/checks.md passaram. Fica pendente o verificador no repositório da API para a parte de papel e sessão da spec de domínio.

---
Nota do agente principal: a parte da API (spec 001 de domínio, CA-01..CA-04) já tinha voltado PRONTA na rodada 1 do repositório da API (HEAD 334d332). A contradição apontada em CA-05 foi corrigida na spec depois desta rodada.
