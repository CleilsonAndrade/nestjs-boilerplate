<div align="center">
  <h1>NestJS Boilerplate</h1>
  <p>Template para projetos em NestJS pré-configurado e permitindo que se concentrem no desenvolvimento de recursos específicos do aplicativo.</p>
  <img src="./design/desktop.gif" alt="Logo" width="800">
</div>

# 📒 Índice
* [Descrição](#descrição)
* [Requisitos Funcionais](#requisitos)
  * [Features](#features)
* [Tecnologias](#tecnologias)
* [Endpoints](#endpoints)
* [Instalação](#instalação)
* [Licença](#licença)

# 📃 <span id="descrição">Descrição</span>
Template inicial para projetos em [**NestJS**](https://nestjs.com/) pré-configurado e permitindo que se concentrem no desenvolvimento de recursos específicos do aplicativo. O template utiliza o framework [**NestJS**](https://nestjs.com/) para [**NodeJS**](https://nodejs.org/en), empregando o [**TypeScript**](https://www.typescriptlang.org/) para a sintaxe. Já vem com várias dependências instaladas, incluindo o [**Terminus**](https://github.com/nestjs/terminus) para utilização do módulo de Health, permitindo obter informações sobre o uso dos recursos da API, pré-configuração do [**Prisma ORM**](https://www.prisma.io/) com o banco [**SQLite**](https://www.sqlite.org/), pré-configuração do token [**JWT**](https://github.com/nestjs/jwt), além de bibliotecas como [**axios**](https://github.com/axios/axios), [**Moment**](https://momentjs.com/), [**Class Validator**](https://github.com/nestjs/class-validator), suporte para cobertura de testes com [**Jest**](https://jestjs.io/pt-BR/), padrão de código com [**ESLInt**](https://github.com/eslint/eslint), commits com [**Commitizen**](https://github.com/commitizen/cz-cli) e exemplo de documentação com [**Swagger**](https://github.com/nestjs/swagger), além de suporte a temas com [**Swagger themes**](https://github.com/ilyamixaltik/swagger-themes) e Workflows pré configurados para o Github, com esteiras para deploy de ambientes dev, stage e prod com listagem de commits e reset e reversão.

# 📌 <span id="requisitos">Requisitos Funcionais</span>
- [x] JWT Token configurado<br>
- [x] Exemplo de rotas com autenticação<br>
- [x] Terminus Module para verificar recursos da API<br>
- [x] Prisma ORM para manipulação de dados do banco<br>
- [x] Configuração para o SQLite<br>
- [x] Class Validator para DTO<br>
- [x] Imagem Docker para MySQL<br>
- [x] Converter BigInt para JSON (Serialização)<br>
- [x] Exemplo de documentação com Swagger<br>
- [x] Padronização de sintaxe de código com ESLint e Prettier<br>
- [x] Padronização de commits semânticos e esteira com Commitizen<br>

## Features
- [x] Workflows para ambientes: dev, stage e prod<br>
- [x] Configuração de ecosystem.config para acoplação ao PM2<br>
- [x] Lib Moment para manipulação de datas com helper para checar formato de datas<br>
- [x] Helper para remover espaços sobressalentes de string's<br>
- [x] Suporte a temas para o Swagger<br>

# 💻 <span id="tecnologias">Tecnologias</span>
- **NodeJS**
- **TypeScript**
- **NestJS**
- **JWT**
- **Terminus**
- **axios**
- **Moment**
- **Class Validator**
- **Prisma ORM**
- **Jest**
- **Commitizen**
- **ESLInt**
- **Prettier**
- **Swagger**
- **Swagger themes**

# 📍 <span id="endpoints">Endpoints</span>
| Método | Endpoint               | Resumo                                           | Autenticação               | Role
|--------|----------------------|------------------------------------------------------|--------------------------|----------------------
<kbd>GET</kbd> | <kbd>/</kbd> | Responsável por ser o endpoint inicial | Não | *
<kbd>GET</kbd> | <kbd>/auth/login</kbd> | Responsável por autenticar o usuário, gerando o Bearer Token *JWT* | Sim | *
<kbd>POST</kbd> | <kbd>/users</kbd> | Responsável por cadastrar o usuário | Não | *
<kbd>GET</kbd> | <kbd>/users</kbd> | Responsável por listar todos os usuários com paginação | Sim | *
<kbd>GET</kbd> | <kbd>/users/:id</kbd> | Responsável por buscar usuário, informando o ID | Sim | *
<kbd>PATCH</kbd> | <kbd>/users/:id</kbd> | Responsável por atualizar as informações de um usuário, informando o ID | Sim | *
<kbd>DELETE</kbd> | <kbd>/users/:id</kbd> | Responsável por desabilitar um usuário, informando o ID | Sim | *
<kbd>GET</kbd> | <kbd>/health</kbd> | Responsável por utilizar o Terminus para consulta dos recursos de uso da API | Sim | *
<kbd>GET</kbd> | <kbd>/docs</kbd> | Responsável por servir a documentação dos recursos da API | Não | *

# 🚀 <span id="instalação">Instalação</span>
```bash
  # Clone este repositório:
  $ git clone https://github.com/CleilsonAndrade/nestjs-boilerplate.git
  $ cd ./nestjs-boilerplate

  # Instalar as dependências:
  $ yarn install

  # Gerar o código TypeScript com base nos modelos do Prisma:
  $ npx prisma generate

  # Aplicar migrações ao banco de dados:
  $ npx prisma migrate dev

  # Executar:
  $ yarn start:dev
  
  # Executar testes:
  $ yarn test:watch

  # Utilizar a esteira para commits:
  $ yarn commit
```

# 📝 <span id="licença">Licença</span>
Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 💜 by CleilsonAndrade
</p>
