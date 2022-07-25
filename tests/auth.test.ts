import prisma from "../src/config/database.js"
import supertest from "supertest"
import app from "../src/app.js"
import { createUserFactory, insertUserFactory } from "./factory/authFactory.js"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
});

describe("POST /sign-up", () => {

    it("cadastrar um novo usuário", async () => {
        const body = {
            email: "ana@gmail.com",
            password: "123456789aa",
            passwordConfirmation: "123456789aa"
        }
        const respo = await supertest(app).post("/sign-up").send(body)
        expect(respo.statusCode).toBe(201)
    })

    it("tentar cadastrar um usuário já existente", async () => {
        const body = {
            email: "ana@gmail.com",
            password: "123456789aa",
            passwordConfirmation: "123456789aa"
        }

        await createUserFactory(body)
        const respo = await supertest(app).post("/sign-up").send(body)
        expect(respo.statusCode).toBe(409)
    })

    it("teste com senha de confirmação divergente", async () => {
        const body = {
            email: "ana@gmail.com",
            password: "123456789aa",
            passwordConfirmation: "12345678900"
        }
        const respo = await supertest(app).post("/sign-up").send(body)
        expect(respo.statusCode).toBe(422)
    })

    it("teste com body inconsistente", async () => {
        const body = { email: "ana@gmail.com", password: "123456789aa" }

        const respo = await supertest(app).post("/sign-up").send(body)
        expect(respo.statusCode).toBe(422)
    })
})


describe("POST /sign-in", () => {

    it("fazer o login com credenciais válidas", async () => {
        const body = { email: "ana@gmail.com", password: "123456789aa" }
        await insertUserFactory(body.email, body.password)
        const respo = await supertest(app).post("/sign-in").send(body)
        expect(respo.statusCode).toBe(201)
    })

    it("fazer o login com email não cadastrado", async () => {
        const body = { email: "nina@gmail.com", password: "123456789aa" }

        const respo = await supertest(app).post("/sign-in").send(body)
        expect(respo.statusCode).toBe(404)
    })

    it("fazer o login com senha inválida", async () => {
        const body = { email: "ana@gmail.com", password: "123456789aa" }
        const body2 = { email: "ana@gmail.com", password: "123456789adlsa" }
        await insertUserFactory(body.email, body.password)

        const respo = await supertest(app).post("/sign-in").send(body2)
        expect(respo.statusCode).toBe(401)
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});