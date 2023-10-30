# Despesas Financeiras com PostgreSQL

Este projeto tem como objetivo criar uma API de despesas financeiras com conexão ao banco de dados PostgreSQL. <br>
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

<br><br>

## 🌐 Endpoints

- **POST** **/usuario** - Cadastrar Usuários;
- **POST** **/login** - Logar Usuários;
- **GET** **/usuario** - Detalhar Usuário Logado;
- **PUT** **/usuario** - Atualizar Usuário Logado;
- **GET** **/categoria** - Listar Categorias;
- **POST** **/transacao** - Cadastrar Transação para o Usuário Logado;
- **GET** **/transacao** - Listar transações do Usuário Logado;
- **GET** **/transacao?filtro[]=Roupas** - Listar Transação do Usuário Logado pelo Filtro Informado;
- **GET** **/transacao/:id** - Detalhar Transação do Usuário Logado;
- **PUT** **/transacao/:id** - Atualizar Transação do Usuário Logado;
- **DELETE** **/transacao/:id** - Deletar Transação do Usuário Logado;
- **GET** **/transacao/extrato** - Buscar as Transações de Entrada e Saída mostrando o valor total de cada uma delas.

<br>

## ⚠️ IMPORTANTE ⚠️

**Para rodar o projeto é necessário a criação do Banco de Dados em PostgreSQL.**<br>
As linhas de comando para modelagem do bando de dados se encontra no arquivo "dump.sql".

![dump-sql](https://github.com/Radkau/api-despesas-financeiras-com-postgresql/assets/116851140/28e5a710-0645-4faa-b2da-588155470ac7)

<br>

## 👨🏻‍💻Funcionamento dos Endpoints

### **POST** **/usuario**
Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.<br><br>

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```
<br>

Imagem do funcionamento:

![cadastro-usuario](https://github.com/Radkau/api-despesas-financeiras-com-postgresql/assets/116851140/a383160c-16b3-48da-8252-1ade9ee9b500)

<br><br>

### `POST` `/login`
Essa é a rota que permite o usuario cadastrado realizar o login no sistema.<br><br>

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

<br>

Imagem do funcionamento:

![login-usuario](https://github.com/Radkau/api-despesas-financeiras-com-postgresql/assets/116851140/d30e782e-7f4c-43ea-9735-9334b0f02951)

<br><br>

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado

---

<br><br>

### `GET` `/usuario`
Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.<br><br>

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

<br>

Imagem de Funcionamento:


<br><br>

### `PUT` `/usuario`
Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.<br><br>

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

<br>

Imagem de funcionamento:


<br><br>

### `GET` `/categoria`
Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.<br><br>

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```

<br>

Imagem de Funcionamento:


<br><br>

### `GET` `/transacao`
Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.<br><br>

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```

<br>

Imagem de Funcionamento:


<br><br>

### `GET` `/transacao?filtro[]=Roupas&filtro[]=Salário`
Essa é a rota que será chamada quando o usuario logado quiser listar suas transações cadastradas com filtro.<br><br>

#### **Exemplo de requisição**

```javascript
// GET /transacao?filtro[]=Roupas&filtro[]=Salário
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 11,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 14,
        categoria_nome: "Salário",
    },
]
```

```javascript
// HTTP Status 200 / 201 / 204
[]
```

<br>

Imagem de Funcionamento:


<br><br>

### `GET` `/transacao/:id`
Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.<br><br>

#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Transação não encontrada."
}
```

<br>

Imagem de funcionamento:


<br><br>

### `POST` `/transacao`
Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.<br><br>

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

<br>

Imagem de funcionamento:


<br><br>
