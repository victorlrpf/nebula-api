# 🌌 Nebula API  

**Nebula API** é um backend modular desenvolvido em **Node.js** com foco em **autenticação JWT, microserviços e integração com Supabase**.  
O objetivo é fornecer uma base sólida para projetos que precisem de cadastro, login, controle de usuários e gerenciamento de dados em nuvem.  

---

## 🚀 Tecnologias  

- [Node.js](https://nodejs.org/) – Runtime do projeto  
- [Express](https://expressjs.com/) – Framework web minimalista  
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken) – Autenticação baseada em token  
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) – Criptografia de senhas  
- [Supabase](https://supabase.com/) – Banco de dados e autenticação serverless  
- [dotenv](https://github.com/motdotla/dotenv) – Variáveis de ambiente  
- [Helmet](https://helmetjs.github.io/) – Segurança HTTP  
- [Morgan](https://github.com/expressjs/morgan) – Logs de requisição  
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit) – Rate limiting para segurança  

---

## 📂 Estrutura de Pastas  

nebula-api/ <br>
├── src/<br>
│ ├── routes/ # Rotas da aplicação<br>
│ ├── controllers/ # Lógica de cada serviço <br>
│ ├── middlewares/ # Middlewares (auth, logs, etc) <br>
│ ├── services/ # Serviços e integrações externas<br>
│ └── config/ # Configurações (db, supabase, jwt)<br>
├── .env # Variáveis de ambiente<br>
├── package.json<br>
└── README.md


---

## ⚙️ Instalação  

Clone o repositório e instale as dependências:  

```bash
git clone https://github.com/seu-usuario/nebula-api.git
cd nebula-api
npm install

PORT=3000
JWT_SECRET=sua_chave_secreta
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=sua_chave_anon
```
🔐 Endpoints Principais
Autenticação

POST /auth/register → Cadastro de usuário

POST /auth/login → Login e geração de JWT

GET /auth/me → Retorna dados do usuário autenticado

Estoque (Exemplo com Supabase)

GET /stock → Listar produtos

POST /stock → Criar produto

PUT /stock/:id → Atualizar produto

DELETE /stock/:id → Remover produto

🛡️ Segurança

Senhas → Armazenadas com bcrypt.

JWT → Autenticação via Bearer Token.

Rate Limit → Evita abusos e brute force.

Helmet → Proteção contra ataques comuns via HTTP headers.