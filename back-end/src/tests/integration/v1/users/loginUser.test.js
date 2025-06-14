const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa POST /api/v1/login", () => {
  describe("Quando o login é feito com sucesso", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/login")
        .send({ email: "email1@teste.com", password: "123456" });
    });

    it("retorna status 200 - OK", () => {
      expect(response.status).toBe(200);
    });

    it("retorna um objeto", () => {
      expect(typeof response.body).toBe("object");
    });

    it("objeto possui token", () => {
      expect(response.body).toHaveProperty("token");
    });

    it("objeto possui id", () => {
      expect(response.body).toHaveProperty("id");
    });

    it("objeto possui nome", () => {
      expect(response.body).toHaveProperty("name");
    });

    it("objeto possui isAdmin", () => {
      expect(response.body).toHaveProperty("isAdmin");
    });
  });

  describe("Quando o usuário insere dados inválidos", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/login")
        .send({ email: "admin@deliveryapp.com", password: "--adm2@21!!--" });
    });

    it("retorna status 401 - Unauthorized", () => {
      expect(response.status).toBe(401);
    });

    it('espera mensagem: "Email ou senha inválido!"', () => {
      expect(response.body.message).toBe("Email ou senha inválido!");
    });
  });

  describe("Quando o usuário não insere email", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/login")
        .send({ password: "--adm2@21!!--" });
    });

    it("retorna status 400 - Bad Request", () => {
      expect(response.status).toBe(400);
    });

    it('espera mensagem: "email" is required', () => {
      expect(response.body.message).toBe('"email" is required');
    });
  });

  describe("Quando o usuário não insere senha", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/login")
        .send({ email: "adm@deliveryapp.com" });
    });

    it("retorna status 400 - Bad Request", () => {
      expect(response.status).toBe(400);
    });

    it('espera a mensagem: "password" is required', () => {
      expect(response.body.message).toBe('"password" is required');
    });
  });
});
