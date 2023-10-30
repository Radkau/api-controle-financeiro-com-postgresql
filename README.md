# Despesas Financeiras com PostgreSQL

Este projeto tem como objetivo cria uma API de despesas financeiras com conexão ao banco de dados PostgreSQL. <br>
O projeto está na versão 1.0 e irei melhorar ele a cada aprendizado que eu tiver.

#
## **Linguagem**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## **Frameworks, Plataforms e Bibliotecas**

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)

## **Tecnologias e Ferramentas**

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<br><br>

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

git clone <urlProjeto>

# 2. Crie um servidor

npm init -y

# 3. Instale as dependências

npm install

# 4. Rode o projeto

npm run dev
```

## 🌐 Endpoints

- **POST** **/usuario** - Cadastra Usuários;
- **POST** **/login** - Logar Usuários;
- **GET** **/usuario** - Detalhar Usuário Logado;
- **PUT** **/usuario** - Atualizar Usuário Logado;
- **GET** **/categoria** - Listar Categorias;
- **POST** **/transacao** - Cadastra Transação para o Usuário Logado;
- **GET** **/transacao** - Lista transações do Usuário Logado;
- **GET** **/transacao?filtro[]=Roupas** - Lista Transação do Usuário Logado pelo Filtro Informado;
- **GET** **/transacao/:id** - Detalha Transação do Usuário Logado;
- **PUT** **/transacao/:id** - Atualiza Transação do Usuário Logado;
- **DELETE** **/transacao/:id** - Deleta Transação do Usuário Logado;
- **GET** **/transacao/extrato** - Busca as Transações de Entrada e Saída mostrando o valor total de cada uma delas.

<br>

## 
