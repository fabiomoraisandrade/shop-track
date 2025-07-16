# 🛍️ Shop Track

**Shop Track** é uma aplicação web de e-commerce onde usuários podem **cadastrar seus próprios produtos**, **comprar produtos de outros usuários** e acompanhar **o status dos pedidos em tempo real via WebSocket**.

A aplicação conta com funcionalidades para compradores, vendedores e um painel de administração exclusivo para usuários com perfil administrador.

---

## 📦 Funcionalidades

### 🛒 Usuário comprador

- Visualizar produtos disponíveis.
- Comprar produtos de outros usuários.
- Informar endereço de entrega.
- Acompanhar o status da entrega em tempo real:
  - `Pendente` → `Preparando pedido` → `Em trânsito` → `Entregue`.

### 📦 Usuário vendedor

- Cadastrar seus próprios produtos.
- Visualizar pedidos recebidos.
- Atualizar o status de pedidos:
  - Preparar pedido → Enviar pedido → Confirmar entrega.

### 🔐 Usuário administrador

- Listar, cadastrar e excluir usuários do sistema.

### 💬 Outros recursos

- Autenticação via JWT.
- Atualizações em tempo real com Socket.IO.
- Testes automatizados (Jest + Testing Library + Supertest).
- Suporte a múltiplos bancos de dados via `DIALECT` (PostgreSQL ou MySQL).

---

## 🧱 Tecnologias Utilizadas

### 🔙 Back-end (Node.js + Express)

- `express`
- `sequelize` com `sequelize-cli`
- `pg` e `mysql2`
- `dotenv` para variáveis de ambiente
- `socket.io` para comunicação em tempo real
- `jsonwebtoken` para autenticação
- `joi` para validações
- `cloudinary` para upload de imagens
- `jest` e `supertest` para testes
- `prettier` e `nodemon` para desenvolvimento

### 🔝 Front-end (React)

- `react` e `react-dom`
- `redux`, `redux-thunk`, `@reduxjs/toolkit`
- `redux-persist` para persistência de estado
- `react-router-dom` para navegação
- `socket.io-client` para WebSocket
- `styled-components` e `@mui/material` para estilização
- `axios` para requisições HTTP
- `sweetalert2` e `sonner` para alertas e notificações
- `jest`, `react-testing-library` para testes
- `prettier` para formatação de código

---

## ⚙️ Pré-requisitos

- Node.js >= 18
- npm ou yarn
- PostgreSQL ou MySQL
- Docker (opcional)
- Git

---

## 🚀 Rodando o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/shop-track.git
cd shop-track
```

---

### 2. Configure as variáveis de ambiente

#### 🔙 Back-end (`back-end/.env`)

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=seu_usuario
POSTGRES_DB=shoptrack
POSTGRES_PASSWORD=sua_senha
DIALECT=postgres

DATABASE_URL= (opcional para produção)

PORT=10000
SOCKET_CLIENT_ORIGIN=http://localhost:3000

JWT_SECRET=sua_chave_jwt

CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
```

#### 🔝 Front-end (`front-end/.env`)

```env
REACT_APP_API_URL=http://localhost:10000
```

---

### 3. Instale as dependências

#### Back-end

```bash
cd back-end
npm install
```

#### Front-end

```bash
cd ../front-end
npm install
```

---

### 4. Configure o banco de dados

Você pode usar o Sequelize CLI para isso:

```bash
cd ../back-end
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

Ou, se quiser rodar com Docker:

```bash
npm run services:up
```

---

### 5. Inicie o projeto

#### Back-end

```bash
npm start
```

Esse comando também já executa as migrations.

#### Front-end

```bash
cd ../front-end
npm start
```

---

## 🧪 Rodar os testes

#### Back-end

```bash
npm test
```

Ou para modo assistido:

```bash
npm run test:watch
```

#### Front-end

```bash
npm test
```

---

## 🌐 Deploy

- **Front-end**: [Vercel](https://shop-track-front.vercel.app)
- **Back-end**: [Render](https://shop-track-back-end.onrender.com)
- **Banco de dados**: Neon Tech (PostgreSQL)
