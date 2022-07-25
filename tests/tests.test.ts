import prisma from "../src/config/database.js"
import supertest from "supertest"
import app from "../src/app.js"

const token = "eyJhbGciOiJIUzI1NiJ9.bWF0aGV1c0BnbWFpbC5jb20.MnTQRQ28ecMyFvoYlXg8Dh8M1fSVeGgloeOxvfGEI7Q"

const test = {
    name: "prova de GA",
    pdfUrl: "https://instagram.com",
    categoryId: 2,
    teacherDisciplineId: 6,
    teacherId: 2
}

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM tests`;
})

describe("POST /tests", () => {

    it("postar uma prova válida", async () => {
        const respo = await supertest(app).post("/tests").set('Authorization', `Bearer ${token}`).send(test)
        expect(respo.statusCode).toBe(201)
    })

    it("postar uma prova com um id de categoria não existente", async () => {
        const test2 = {...test, categoryId: 10}
        const respo = await supertest(app).post("/tests").set('Authorization', `Bearer ${token}`).send(test2)
        expect(respo.statusCode).toBe(422)
    })

    it("postar uma prova com um id de disciplina que não existe", async () => {
        const test2 = {...test, teacherDisciplineId: 100}
        const respo = await supertest(app).post("/tests").set('Authorization', `Bearer ${token}`).send(test2)
        expect(respo.statusCode).toBe(422)
    })

    it("postar uma prova com um id de um professor não cadastrado", async () => {
        const test2 = {...test, teacherId: 23}
        const respo = await supertest(app).post("/tests").set('Authorization', `Bearer ${token}`).send(test2)
        expect(respo.statusCode).toBe(422)
    })

    it("postar uma prova com um id de uma disciplina que não pertence a um professor", async () => {
        const test2 = {...test, teacherDisciplineId: 1}
        const respo = await supertest(app).post("/tests").set('Authorization', `Bearer ${token}`).send(test2)
        expect(respo.statusCode).toBe(401)
    })

    it("postar uma prova sem o token", async () => {
        const test2 = {...test, teacherDisciplineId: 1}
        const respo = await supertest(app).post("/tests").send(test2)
        expect(respo.statusCode).toBe(401)
    })
})

describe("GET /tests/instructor", () => {

    it("buscar as provas organizadas por instrutor com o token", async () => {
        const respo = await supertest(app).get("/tests/instructor").set('Authorization', `Bearer ${token}`)
        expect(respo.statusCode).toBe(200)
    })

    it("buscar as provas organizadas por instrutor sem o token", async () => {
        const respo = await supertest(app).get("/tests/instructor")
        expect(respo.statusCode).toBe(401)
    })
})

describe("GET /tests/subject", () => {

    it("buscar as provas organizadas por disciplina com o token", async () => {
        const respo = await supertest(app).get("/tests/subject").set('Authorization', `Bearer ${token}`)
        expect(respo.statusCode).toBe(200)
    })

    it("buscar as provas organizadas por disciplina sem o token", async () => {
        const respo = await supertest(app).get("/tests/subject")
        expect(respo.statusCode).toBe(401)
    })
})

afterAll(async () => {
    await prisma.$disconnect();
})