var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import prisma from "../src/config/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import { createUserFactory, insertUserFactory } from "./factory/authFactory.js";
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE users CASCADE;"], ["TRUNCATE TABLE users CASCADE;"])))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("POST /sign-up", function () {
    it("cadastrar um novo usuário", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, respo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        email: "ana@gmail.com",
                        password: "123456789aa",
                        passwordConfirmation: "123456789aa"
                    };
                    return [4 /*yield*/, supertest(app).post("/sign-up").send(body)];
                case 1:
                    respo = _a.sent();
                    expect(respo.statusCode).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("tentar cadastrar um usuário já existente", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, respo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        email: "ana@gmail.com",
                        password: "123456789aa",
                        passwordConfirmation: "123456789aa"
                    };
                    return [4 /*yield*/, createUserFactory(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-up").send(body)];
                case 2:
                    respo = _a.sent();
                    expect(respo.statusCode).toBe(409);
                    return [2 /*return*/];
            }
        });
    }); });
    it("teste com senha de confirmação divergente", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, respo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = {
                        email: "ana@gmail.com",
                        password: "123456789aa",
                        passwordConfirmation: "12345678900"
                    };
                    return [4 /*yield*/, supertest(app).post("/sign-up").send(body)];
                case 1:
                    respo = _a.sent();
                    expect(respo.statusCode).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("teste com body inconsistente", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, respo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = { email: "ana@gmail.com", password: "123456789aa" };
                    return [4 /*yield*/, supertest(app).post("/sign-up").send(body)];
                case 1:
                    respo = _a.sent();
                    expect(respo.statusCode).toBe(422);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("POST /sign-in", function () {
    it("fazer o login com credenciais válidas", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, respo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = { email: "ana@gmail.com", password: "123456789aa" };
                    return [4 /*yield*/, insertUserFactory(body.email, body.password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(body)];
                case 2:
                    respo = _a.sent();
                    expect(respo.statusCode).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("fazer o login com email não cadastrado", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, respo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = { email: "nina@gmail.com", password: "123456789aa" };
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(body)];
                case 1:
                    respo = _a.sent();
                    expect(respo.statusCode).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("fazer o login com senha inválida", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, body2, respo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = { email: "ana@gmail.com", password: "123456789aa" };
                    body2 = { email: "ana@gmail.com", password: "123456789adlsa" };
                    return [4 /*yield*/, insertUserFactory(body.email, body.password)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send(body2)];
                case 2:
                    respo = _a.sent();
                    expect(respo.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1;
