# PO Tracker

[![Deploy Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white)](https://frontend-campeoes.vercel.app)

🛠️ **PO Tracker** é um sistema web para _rastreamento e gestão de ordens de compra (POs)_ em tempo real.

Permite acompanhar o ciclo completo **Em Andamento → PO → Entrega**, com foco em:

- Desempenho por equipe e responsável
- Identificação de gargalos e atrasos
- Visualização interativa via dashboards

---

## 🚀 Stack principal

| Camada                     | Techs                                              | Observações                |
| -------------------------- | -------------------------------------------------- | -------------------------- |
| **Front-end**              | React + Vite + TypeScript                          | build ultrarrápido         |
| **UI Kit**                 | Tailwind CSS • shadcn/ui • Radix UI • Lucide Icons | componetização acessível   |
| **Charts**                 | Recharts                                           | pizza, barras, linhas      |
| **Estado / Data-Fetching** | TanStack Query                                     | cache + prefetch           |
| **Autenticação**           | JWT + Context API                                  | login real + token         |
| **Mock & Dev-Tools**       | @faker-js/faker • tsx • ts-node                    | geração de dados realistas |
| **Qualidade**              | ESLint • Prettier                                  | lint & format              |

---

## 📁 Estrutura de Pastas

```bash
src/
├── components/
│   ├── layout/                  # Header, Sidebar, Footer
│   ├── pages/                   # Componentes por rota
│   ├── dashboards/              # Gráficos, KPIs, estatísticas
│   ├── ui/                      # Botões, Cards, Inputs, EmptyStates
│   └── toasts/                  # Toasts customizados (ex: LogoutMock)
├── features/                    # Estrutura por domínio (DDD)
│   ├── auth/                    # Login e gerenciamento de sessão
│   ├── clients/                 # Lógica de clientes (filtros, listagens, detalhes)
│   └── purchase-order/          # Lógica de ordens de compra
├── hooks/                       # Hooks reutilizáveis (ex: useEmptyStateHandler)
├── data/                        # Dados mockados (via script)
├── scripts/                     # mockGenerator.ts para dados fictícios
├── lib/                         # Funções utilitárias independentes
├── routes/                      # AppRoutes.tsx
├── styles/                      # globals.css + temas
└── main.tsx / App.tsx           # Entrypoint da aplicação
```

---

## ✨ Destaques recentes

| Tipo                                 | Descrição                                                                                                                  | PR/Commit                                          |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **♻️ Centralização de Empty States** | Hook `useEmptyStateHandler` + componentes `EmptyClientList`, `EmptyAllOrders`, `EmptyPedidosList`, `EmptySearchResult`    | `feat(ui): padroniza e centraliza estados vazios…` |
| **📦 Mocks realistas**               | Script `mockGenerator.ts` gera clientes, pedidos e status com N° de pedidos (usar `npm run mock`)                         | `feat: adiciona script gerador de mocks…`          |
| **🔔 Toasts customizados**           | `CustomToast.tsx` + toast de logout (`showMockLogoutToast`)                                                                | `feat(ui): toasts customizados`                    |
| **🧠 Comentários e fallback lateral**| `AddCommentDialog` + `Sheet` como fallback para comentários longos em clientes e pedidos                                   | `feat: painel lateral de comentários`              |
| **🔍 Busca e filtros inteligentes**  | Implementação de debounce + filtro normalizado por nome, status, e responsável                                             | `feat(clients): filtro e busca refinados`          |
| **🔐 Login funcional com JWT**       | `useLogin`, `useAuth`, `loginApi` + token persistido e headers automáticos nas requisições                                | `feat(auth): login integrado com backend`          |

---

## 🔁 Fluxo de Processos

```text
[Em Andamento] → [PO Emitida] → [Resolvido]
                       ↘
                   [Histórico]
```

---

## 🌐 Variáveis de Ambiente

Crie um `.env` na raiz com:

| Variável         | Descrição                         |
| ---------------- | --------------------------------- |
| `VITE_API_URL`   | URL base do backend               |
| `SAP_TOKEN`      | Token OAuth de integração com SAP |
| `DYNAMICS_TOKEN` | Token de autenticação Dynamics    |

---

## 📦 Scripts úteis

```bash
npm run dev       # Inicia ambiente de desenvolvimento
npm run build     # Gera versão de produção
npm run lint      # Lint do projeto
npm run mock      # Gera dados mockados (faker → src/data)
```

---

## 🧠 Hooks customizados

| Hook                                                            | Responsabilidade                                               |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| `useClienteFilter`, `usePedidoFilter`, `usePurchaseOrderFilter` | Filtragem com normalização                                     |
| `useEmptyStateHandler`                                          | Decide qual estado vazio renderizar: `none`, `search`, `empty` |
| `useLogin`, `useAuth`                                           | Autenticação real com JWT + persistência                       |

---

## 🔍 Empty States implementados

| Componente            | Quando aparece                            | Ícone                    |
| --------------------- | ----------------------------------------- | ------------------------ |
| `EmptySearchResult`   | Filtro sem resultado                      | `FileSearch` amarelo     |
| `EmptyClientList`     | Nenhum cliente registrado                 | `Users` vermelho         |
| `EmptyAllOrders`      | Nenhum pedido no sistema                  | `PackageX` vermelho      |
| `EmptyPedidosList`    | Cliente sem pedidos                       | `PackageX` vermelho      |
| `EmptyClientNotFound` | Cliente não encontrado (ID inválido)      | `AlertTriangle` vermelho |
| `FeatureComingSoon`   | Rota ou funcionalidade em desenvolvimento | `Hammer` amarelo         |

---

## 🔔 Toasts customizados

| Toast                 | Local        | Descrição                            |
| --------------------- | ------------ | ------------------------------------ |
| `showMockLogoutToast` | Header       | Informa que o logout é simulado      |
| `CustomToast.tsx`     | Reutilizável | Ícone, título, descrição e botão `×` |

---

## ✅ Status atual

- ✅ Tema dark/light com toggle
- ✅ Sidebar colapsável e responsiva
- ✅ Dashboard com KPIs e gráficos
- ✅ Listagens de clientes e pedidos com filtro
- ✅ Exibição contextual de estados vazios
- ✅ Geração de dados mockados realistas
- ✅ Toasts customizados e tipados
- ✅ Autenticação JWT integrada
- ✅ Painel lateral com comentários por entidade
- ✅ Arquitetura modularizada por domínio

---

## 🛣️ Próximos passos

- [ ] Exportação de relatórios
- [ ] Testes automatizados (Vitest / Playwright)
- [ ] Internacionalização (i18n)
- [ ] Modo offline (PWA)

---

## 📄 Licença

Projeto interno do time **Campeões**.  
© 2025 Hewlett-Packard — Todos os direitos reservados.
