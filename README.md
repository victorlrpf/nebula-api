# Nebula API — Backend Lab (TypeScript Microservices)

Um projeto laboratório para estudo: autenticação segura, microserviços, mensageria, cache e observabilidade.
Inclui:
- auth-service (usuários, JWT + refresh tokens)
- inventory-service (produtos, estoque, cache Redis)
- docker-compose com Postgres, Redis, RabbitMQ
- Prisma ORM + migrations
- Scripts básicos de testes e start

> Use como playground: evolua, adicione testes, integrações e métricas.

## Como usar (de primeira)
1. Copie `.env.example` para `.env` em cada serviço e ajuste variáveis.
2. Execute `docker compose up --build` na raiz.
3. Entre em `auth-service` e `inventory-service` para rodar localmente com `npm run dev`.

