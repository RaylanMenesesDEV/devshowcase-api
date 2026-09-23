# DevShowcase API

API REST desenvolvida com Node.js, Express, PostgreSQL e Prisma para gerenciamento de um portfólio de projetos de desenvolvimento.

## 📌 Sobre o projeto

O DevShowcase API foi desenvolvido como um projeto de back-end para praticar a criação de uma API REST, integração com banco de dados PostgreSQL, organização em camadas e utilização do Prisma ORM.

A API permite cadastrar e gerenciar perfis, projetos, tecnologias e feedbacks, além de trabalhar com os relacionamentos entre essas entidades.

## 🚀 Tecnologias utilizadas

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* JavaScript
* Git e GitHub

## 🗂️ Estrutura do projeto

```text
devshowcase-api/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── dtos/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── lib/
│   └── server.js
├── .env
├── .gitignore
├── package.json
├── prisma7.config.ts
└── README.md
```

## 🗄️ Entidades

A aplicação possui as seguintes entidades:

### Profile

Armazena as informações do perfil do desenvolvedor.

Principais campos:

* id
* name
* bio
* githubUrl
* linkedinUrl

### Project

Armazena os projetos do perfil.

Principais campos:

* id
* title
* description
* projectUrl
* imageUrl
* profileId

### Technology

Armazena as tecnologias utilizadas nos projetos.

Principais campos:

* id
* name

### Feedback

Armazena os comentários relacionados aos projetos.

Principais campos:

* id
* author
* comment
* projectId

## 🔗 Relacionamentos

```text
Profile 1 ─────── N Project

Project N ─────── N Technology

Project 1 ─────── N Feedback
```

A relação entre `Project` e `Technology` é feita através da entidade intermediária `ProjectTechnology`.

## 📡 Principais endpoints

### Profiles

```text
GET    /api/profiles
GET    /api/profiles/:id
POST   /api/profiles
PUT    /api/profiles/:id
DELETE /api/profiles/:id
```

### Projects

```text
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Technologies

```text
GET    /api/technologies
GET    /api/technologies/:id
POST   /api/technologies
PUT    /api/technologies/:id
DELETE /api/technologies/:id
```

### Project Technologies

```text
GET    /api/project-technologies
GET    /api/project-technologies/project/:projectId
POST   /api/project-technologies
DELETE /api/project-technologies/:projectId/:technologyId
```

### Feedbacks

```text
GET    /api/feedbacks
GET    /api/feedbacks/:id
GET    /api/feedbacks/project/:projectId
POST   /api/feedbacks
PUT    /api/feedbacks/:id
DELETE /api/feedbacks/:id
```

## ⚙️ Como executar o projeto

### 1. Clonar o projeto

```bash
git clone https://github.com/RaylanMenesesDEV/devshowcase-api.git
```

### 2. Entrar na pasta

```bash
cd devshowcase-api
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar o banco de dados

Crie um banco PostgreSQL e configure a variável `DATABASE_URL` no arquivo `.env`.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/devshowcase"
```

### 5. Executar as migrações

```bash
npx prisma migrate dev
```

### 6. Gerar o Prisma Client

```bash
npx prisma generate
```

### 7. Iniciar o servidor

```bash
npm start
```

O servidor será iniciado em:

```text
http://localhost:3000
```

## 🧪 Testando a API

A API pode ser testada utilizando ferramentas como:

* Postman
* Insomnia
* Thunder Client
* cURL

A rota principal pode ser acessada através de:

```text
GET http://localhost:3000/
```

Resposta esperada:

```json
{
  "message": "DevShowcase API funcionando!"
}
```

## 🔐 Variáveis de ambiente

O arquivo `.env` contém informações de configuração do banco de dados e não deve ser enviado para o GitHub.

Por isso, ele está incluído no `.gitignore`.

## 👨‍💻 Autor

Raylan Meneses Ferreira

Projeto desenvolvido para fins acadêmicos e de aprendizado em desenvolvimento back-end.
