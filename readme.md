# API com Node.js, Fastify, Prisma e PostgreSQL

Este é um projeto de estudo focado na aplicação de conceitos de Programação Orientada a Objetos (OO), Clean Architecture, Domain-Driven Design (DDD) e princípios SOLID.

A API é construída com Node.js, utilizando o framework Fastify para o servidor HTTP, TypeScript para tipagem estática, e Prisma como ORM para interação com um banco de dados PostgreSQL.

## Tecnologias

- **Node.js**: Ambiente de execução JavaScript.
- **Fastify**: Framework web de alta performance.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Prisma**: ORM de próxima geração para Node.js e TypeScript.
- **PostgreSQL**: Banco de dados relacional.
- **Docker**: Para containerização do banco de dados.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
- [Node.js](https://nodejs.org/en/) (v22 ou superior)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started) e [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Começando

Siga os passos abaixo para configurar e executar o projeto localmente.

1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd node-fastify-oo
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Copie o arquivo `.env.example` (se existir) para um novo arquivo chamado `.env`.
   - Preencha a variável `DATABASE_URL` com a string de conexão do seu banco de dados PostgreSQL. Exemplo:
     ```
     DATABASE_URL="postgresql://docker:docker@localhost:5432/meubanco?schema=public"
     ```

4. **Suba o banco de dados com Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do Prisma:**
   Isso irá criar as tabelas no seu banco de dados com base no schema do Prisma.
   ```bash
   npx prisma migrate dev
   ```

## 🏃‍♀️ Executando a Aplicação

- **Modo de Desenvolvimento:**
  ```bash
  npm run dev
  ```

- **Build para Produção:**
  ```bash
  npm run build
  ```

- **Executar em Produção:**
  ```bash
  npm start
  ```

