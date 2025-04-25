import request from "supertest";
import { app } from "../server";
import { prisma } from "../lib/prisma";

describe("Autenticação - Cadastro e Login", () => {
  const emailTeste = "auth@test.com";
  const senhaTeste = "123456";

  beforeAll(async () => {
    await prisma.passeio.deleteMany();
    await prisma.user.deleteMany();
  });

  it("deve cadastrar um novo usuário", async () => {
    const res = await request(app).post("/user/register").send({
      nome: "Teste",
      email: emailTeste,
      senha: senhaTeste,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", emailTeste);
  });

  it("deve fazer login com o usuário", async () => {
    const res = await request(app).post("/user/login").send({
      email: emailTeste,
      senha: senhaTeste,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
