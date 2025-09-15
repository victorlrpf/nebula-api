Auth Service
============

Endpoints:
- POST /api/v1/auth/register  { email, password }
- POST /api/v1/auth/login     { email, password } -> returns access token + set refresh cookie
- POST /api/v1/auth/refresh   uses refresh cookie or body { token }
- POST /api/v1/auth/logout    requires Authorization bearer <access>

Use Prisma to migrate schema:
- npx prisma generate
- npx prisma migrate dev --name init
