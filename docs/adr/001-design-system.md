# ADR-001 (frontend) — Design system

> Status: DECIDIDO (Alternativa A), a pedido explícito do responsável pelo
> repositório, para destravar a implementação da tela de Login.

## Contexto

`docs/layout.md` (repositório da API) já define a base visual do produto
como o design system **Nocturne**: uma folha de estilo (`styles.css`) mais
um override de `:root` com a rampa de cor teal e a tipografia Raleway da
marca EMPREST.AI, com os componentes do layout descritos como classes do
próprio Nocturne (`.btn`, `.card`, `.field`, `.table`, `.dialog`, etc.) e
estilo aplicado inline no markup.

O ADR-001 cross-cutting (repositório da API,
`docs/adr/001-stack.md`) já decidiu, para este frontend: Tailwind CSS como
estilização e shadcn/ui como biblioteca de componentes (copiados para
dentro do repositório, não escondidos atrás de API de biblioteca).

Essas duas fontes ainda não foram conciliadas: `layout.md` descreve um
design system com folha de estilo própria e classes próprias (Nocturne),
enquanto o ADR-001 já escolheu Tailwind + shadcn/ui como o mecanismo de
estilização do frontend. É preciso decidir **como o Nocturne entra no
projeto React/Tailwind/shadcn já decidido**, não se ele entra — layout.md
já é a referência visual obrigatória.

## Decisão

**Alternativa A** — Nocturne entra como tema Tailwind: os tokens de
`docs/layout.md` (cores, rampa de acento, tipografia Raleway, escala de
espaçamento 0.70×, raios) viram `theme.extend` em `tailwind.config.ts` e
CSS vars em `:root` (incluindo os dois temas — claro/escuro não se aplica
aqui, é só o tema escuro do Nocturne). Componentes shadcn/ui, copiados
para `src/components/ui/`, consomem essas classes utilitárias. Onde
shadcn/ui não cobre um componente do layout (`.tag-outline`, régua de
seção com gradiente nas pontas, barra de 3 traços do limite de itens),
o componente é escrito à mão no mesmo diretório, seguindo o padrão
shadcn (componente copiado, estilizado com as classes Tailwind do tema).

## Alternativas

### A — Nocturne como tema Tailwind (tokens → `tailwind.config`)
Traduzir os tokens de `layout.md` (cores, espaçamento 0.70×, raios,
tipografia) para `tailwind.config.ts` (`theme.extend`) e CSS vars em
`:root`. Componentes shadcn/ui usam essas classes utilitárias; onde
shadcn não cobre (ex.: `.tag-outline`, régua de seção com gradiente nas
pontas), criar componente próprio em `src/components/ui/` no mesmo
padrão shadcn (copiado, não importado de pacote).
- Prós: um único mecanismo de estilo no projeto (Tailwind), consistente
  com o ADR-001; fácil de customizar depois.
- Contras: tradução manual de todo `layout.md` para tokens Tailwind é
  trabalho não-trivial e sujeito a divergir do Nocturne original com o
  tempo; se o Nocturne for atualizado na fonte, a tradução não acompanha
  sozinha.

### B — Folha de estilo do Nocturne importada + Tailwind só para layout
Importar o `styles.css` do Nocturne como está (com o override de `:root`
já descrito em `layout.md`), e usar Tailwind apenas para utilitários de
layout (flex, grid, gap) que não colidem com as classes do Nocturne.
Componentes shadcn/ui ficam restritos a onde o Nocturne não tem
equivalente.
- Prós: menor risco de divergência visual em relação a `layout.md`,
  porque a folha de estilo é a mesma que gerou a referência; menos
  tradução manual.
- Contras: duas fontes de estilo convivendo (classes do Nocturne +
  utilitários Tailwind + componentes shadcn) é mais difícil de manter
  consistente; contraria parcialmente o espírito do ADR-001 de usar
  Tailwind como estilização principal.

### C — Nocturne vira a única fonte, shadcn/ui descartado
Não usar shadcn/ui; todo componente é escrito à mão seguindo as classes e
o HTML descritos em `layout.md`.
- Prós: fidelidade máxima ao layout definido; sem dois sistemas de
  componente convivendo.
- Contras: contradiz o ADR-001 (cross-cutting, já decidido) sem passar
  pelo processo de revisão desse ADR; perde os ganhos de shadcn/ui citados
  no ADR-001 (customização sem lutar contra a dependência, componentes já
  acessíveis).

## Perguntas em aberto para quem decide
- O Nocturne é um design system interno (arquivo próprio do time) ou um
  pacote/template externo? Isso muda o custo de manutenção de cada
  alternativa.
- Existe um `styles.css` do Nocturne disponível para importar como está
  (alternativa B), ou só a descrição em `layout.md`?
- Vale revisar o ADR-001 (decisão cross-cutting) se a alternativa C for a
  escolhida, já que ela contraria a escolha de shadcn/ui lá registrada.

## Consequências
- Um único mecanismo de estilo no projeto (Tailwind), consistente com o
  ADR-001 cross-cutting.
- A tradução dos tokens do Nocturne para `tailwind.config.ts` é trabalho
  manual, feito uma vez no andar zero da UI e mantido a cada tela nova que
  revelar token ausente.
- Se o Nocturne for atualizado na fonte, a tradução não acompanha
  sozinha — exige revisão manual do `tailwind.config.ts` quando isso
  acontecer.
