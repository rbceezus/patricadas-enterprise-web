# O que não fazer

Arquivo de limites: apenas o que você NÃO pode fazer neste repositório. Ele fala
do agente, não do projeto — por isso vale igual em qualquer stack. Se uma linha
começar a citar biblioteca ou pasta, ela está no arquivo errado (é AGENTS.md ou ADR).

## Autoridade
- Não escreva ADR. Se encontrar uma decisão que precisa de um, descreva a
  decisão e as alternativas, e PARE. Quem decide é o time.
- Não contrarie o que está em docs/adr/ nem no ADR-001 do repositório da API.
  Se precisar contrariar, pare e diga.
- Não escolha biblioteca, serviço ou padrão que não esteja no ADR-001. Proponha e espere.

## Escopo
- Não altere arquivo fora do escopo da tarefa atual.
- Não crie estrutura de pastas nova que não esteja num plano aprovado.
- Não gere scaffold automático de framework sem mostrar antes o que ele vai criar.
- Não edite à mão o cliente HTTP gerado a partir do OpenAPI; regenere.
- Não escreva código de funcionalidade sem uma spec correspondente. O esqueleto
  (andar zero) é a única exceção.

## Ritmo
- Não escreva código antes de um plano aprovado. Escreva o plano, mostre, e espere.
- "Pode implementar" NÃO autoriza o plano inteiro: uma tarefa, rode os checks,
  mostre o resultado e pare.
- Não relate sucesso parcial. Se um check falhou, a tarefa não terminou.

## Segredos
- Nunca invente credencial. Nunca leia, exiba ou commite o .env. O que entra no
  repositório é .env.example, sem valor real.
- A service_role do Supabase NUNCA entra no frontend. Só a chave pública (anon).
- Lembre que tudo com prefixo VITE_ vai para o cliente e é público; nunca ponha
  segredo numa variável VITE_.

## Precedência
- Se o código e uma spec discordarem sobre comportamento, a spec está certa até
  que alguém mude a spec.
- Se uma spec e um ADR discordarem, pare e avise. Não escolha um dos dois.
