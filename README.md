# EquipShare

> O equipamento certo para a próxima grande ideia.

Um marketplace audiovisual demonstrativo com catálogo ilustrado, favoritos e um fluxo completo de reserva local.

**React · TypeScript · Vite · Zod · Vitest · Testing Library**

## Funcionalidades

- Catálogo com oito equipamentos e ilustrações SVG originais.
- Busca, filtro por categoria, preço máximo e três ordenações.
- Favoritos persistidos com sincronização entre abas.
- Reserva com período de 1 a 30 dias e detalhamento de diária e taxa.
- Validação de datas, bloqueio de sobreposição e cancelamento de reservas.
- Layout responsivo, tema claro/escuro e suporte a movimento reduzido.
- Navegação por hash e paleta de navegação com `Ctrl+K` ou `⌘K`.
- Estados vazios, mensagens de resultado e recuperação de erros de armazenamento.

## Rodar localmente

Requer **Node.js 24** e npm.

```bash
git clone https://github.com/J0taP3dr/equipshare-frontend.git
cd equipshare-frontend
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.
Não são necessárias chaves de API ou variáveis de ambiente.

## Comandos

| Comando                | Finalidade                                    |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                   |
| `npm run check`        | Verificação TypeScript estrita                |
| `npm test`             | Testes de domínio e integração de componentes |
| `npm run build`        | Typecheck e build de produção em `dist/`      |
| `npm run preview`      | Inspecionar o build localmente                |
| `npm run format`       | Formatar com Prettier                         |
| `npm run format:check` | Verificar formatação                          |

## Experimente este fluxo

Favorite uma câmera, acesse Meus favoritos e abra sua reserva. Escolha retirada e devolução, confirme e acompanhe em Minhas reservas. Cancele para liberar o período.

## Organização

```text
src/
  components/    # Shell, modal nativo e boundary de erros
  features/      # Componentes e regras do domínio
  lib/           # Persistência, formatação e utilitários
  test/          # Setup de testes DOM
  App.tsx        # Composição de páginas e estado da aplicação
  main.tsx       # Entrada React
  styles.css     # Tokens e componentes visuais compartilhados
  project.css    # Identidade e componentes específicos
```

## Regras de domínio

Os dias de retirada e devolução são cobrados inclusive. A taxa demonstrativa é de 8%, arredondada em centavos. O cálculo usa dias UTC para evitar diferenças de horário de verão. Reservas confirmadas do mesmo equipamento não podem compartilhar nenhum dia. Reservas canceladas liberam disponibilidade. Preços, avaliações e fornecedores são fictícios. Não existem pagamentos, contratos, autenticação ou disponibilidade real.

## Persistência e limitações

Este é um projeto **Front-End demonstrativo**. Os dados editáveis ficam no `localStorage` deste navegador, sob chaves versionadas, com validação Zod. Limpar os dados do navegador remove as alterações. Se o armazenamento estiver indisponível, a interface avisa que os dados ficam apenas em memória. Atualizações entre abas adotam a última gravação.

Não há autenticação, autorização, banco de dados remoto ou colaboração em tempo real. Não use dados sensíveis. Uma versão de produção precisaria de API, validação no servidor e políticas de acesso.

## Qualidade e acessibilidade

O workflow `.github/workflows/ci.yml` instala o lockfile, verifica tipos, executa testes e gera o build. Os testes cobrem regras de negócio e fluxos completos com Testing Library; o modal usa `dialog` nativo, retorno de foco e Escape. As páginas usam landmarks, labels, foco visível e link para pular ao conteúdo. Isso não constitui certificação WCAG; veja [o checklist](docs/QUALITY.md).

## Publicação estática

`npm run build` gera arquivos estáticos em `dist/`. A configuração `base: './'` e a navegação por hash permitem hospedagem em subdiretórios. Publique **o conteúdo de `dist/`** em uma hospedagem estática. Este repositório contém código-fonte; a criação do repositório não ativa automaticamente GitHub Pages.

## Decisões técnicas

Veja [ARCHITECTURE.md](docs/ARCHITECTURE.md) para decisões, contratos e evolução sugerida.

Referências: [React](https://react.dev/reference/react), [Vite](https://vite.dev/guide/static-deploy.html), [Zod](https://zod.dev/).
