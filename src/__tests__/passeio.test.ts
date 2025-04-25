import request from "supertest";
import { app } from "../server";
import { prisma } from "../lib/prisma";

describe("Testes de Passeio", () => {
  let token: string;
  let passeioId: string;

  beforeAll(async () => {
    await prisma.passeio.deleteMany();
    await prisma.user.deleteMany();

    await request(app).post("/user/register").send({
      nome: "Testador",
      email: "passeio@test.com",
      senha: "123456",
    });

    const login = await request(app).post("/user/login").send({
      email: "passeio@test.com",
      senha: "123456",
    });

    token = login.body.token;
  });

  it("Deve criar um novo passeio", async () => {
    const response = await request(app)
      .post("/passeios")
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Passeio Teste",
        descricao: "Descrição",
        preco: 150,
        data: new Date().toISOString(),
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    passeioId = response.body.id;
  });

  it("Deve listar os passeios", async () => {
    const response = await request(app)
      .get("/passeios")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Deve atualizar o passeio", async () => {
    const response = await request(app)
      .put(`/passeios/${passeioId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        titulo: "Passeio Atualizado",
        descricao: "Descrição Atualizada",
        preco: 200,
        data: new Date().toISOString(),
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", passeioId);
  });

  it("Deve deletar o passeio", async () => {
    const response = await request(app)
      .delete(`/passeios/${passeioId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Passeio deletado com sucesso.");
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
