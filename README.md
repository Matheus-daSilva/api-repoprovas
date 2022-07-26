# <p align = "center"> RepoProvas </p>



<p align = "center">
   <img src="https://img.shields.io/badge/author-Matheus-4dae71?style=flat-square" />
</p>


##  :clipboard: Descrição

Esta API é um gerenciador de provas já aplicadas por professores de escolas e universidades. Assim que o usuário realiza o signup, ele já é capaz de postar uma prova com o nome do professor, a disciplina, a url do arquivo pdf e a categoria da prova (P1, P2, Rec...).

***

## :computer:	 Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- PostgreSQL com Prisma

***

## :rocket: Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário com senha de no mínimo 10 caracteres
    - headers: {}
    - body:{
       "email": "matheus@gmail.com",
       "password": "123456789aa",
       "passwordConfirmation": "123456789aa"
}
```
    
```yml 
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
       "email": "matheus@gmail.com",
       "password": "123456789aa"
}
```
    
```yml 
POST /tests (autenticada)
    - Rota para cadastrar uma prova
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "prova de GA",
        "pdfUrl": "https://instagram.com",
        "categoryId": 2,
        "teacherDisciplineId": 2,
        "teacherId": 1
}
```

```yml 
GET /tests/subject (autenticada)
    - Rota para listar as provas ordenadas por disciplina
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
```yml

GET /tests/instructor (autenticada)
    - Rota para listar as provas ordenadas por professor(a)
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

***
