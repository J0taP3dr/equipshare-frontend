# Arquitetura — EquipShare

## Camadas

A aplicação separa apresentação (`components`), composição (`App`), domínio (`features`) e infraestrutura local (`lib`). Funções de cálculo e transição de estado são puras e recebem seus dados como parâmetros; os testes não dependem de uma API externa.

O projeto usa React com TypeScript estrito. Zod valida dados recuperados e entradas complexas. Vite produz um bundle estático. O roteamento por hash mantém navegação e links internos funcionando em hospedagem sem fallback de servidor.

## Estado e persistência

Filtros e modais são estados efêmeros. Entidades editáveis são persistidas pelo hook `useStored`, que trata JSON inválido, dados incompatíveis, erro de quota e eventos `storage`. A aplicação recupera um estado inicial seguro quando o conteúdo salvo é inválido. Não há garantia de concorrência: em múltiplas abas, a última gravação vence. Valores persistidos nunca devem ser tratados como autorização ou prova de transação.

## Acessibilidade

`Shell` concentra navegação semântica, link de salto, alternância de tema e paleta de comandos. O modal utiliza o elemento `dialog`, que fornece contenção de foco e Escape nos navegadores modernos, com restauração do foco anterior no fechamento. Controles possuem nomes acessíveis e estados visíveis. No Kanban, o seletor de status oferece uma alternativa ao gesto de arrastar.

## Contratos do domínio

Os dias de retirada e devolução são cobrados inclusive. A taxa demonstrativa é de 8%, arredondada em centavos. O cálculo usa dias UTC para evitar diferenças de horário de verão. Reservas confirmadas do mesmo equipamento não podem compartilhar nenhum dia. Reservas canceladas liberam disponibilidade. Preços, avaliações e fornecedores são fictícios. Não existem pagamentos, contratos, autenticação ou disponibilidade real.

## Evolução para produção

1. Introduzir interfaces de repositório assíncronas e substituir `localStorage` por uma API com validação no servidor.
2. Definir autenticação, autorização e isolamento por workspace/usuário.
3. Implementar controle de concorrência, auditoria e recuperação de falhas de rede.
4. Adicionar E2E em navegadores reais, auditoria de acessibilidade e orçamento de performance por rota.
5. Adicionar monitoramento de erros respeitando privacidade e consentimento.

Esses itens são evolução futura, não funcionalidades já implementadas.
