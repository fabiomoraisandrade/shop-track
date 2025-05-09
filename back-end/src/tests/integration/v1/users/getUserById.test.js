const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/users/:id", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = res.body.token;
  });

  describe("Testa GET /api/v1/users/:id com sucesso", () => {
    let userId;
    let response;

    beforeAll(async () => {
      const createUserResponse = await request(app)
        .post("/api/v1/users")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Usuário Teste",
          email: "usuario.teste@getid.com",
          password: "teste123",
          role: "customer",
        });

      userId = createUserResponse.body.id;

      response = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 200", () => {
      expect(response.status).toBe(200);
    });

    it("Retorna o usuário com chaves esperadas", () => {
      expect(response.body).toHaveProperty("id", userId);
      expect(response.body).toHaveProperty("name", "Usuário Teste");
      expect(response.body).toHaveProperty("email", "usuario.teste@getid.com");
      expect(response.body).toHaveProperty("role", "customer");
    });

    it("Não retorna o campo password", () => {
      expect(response.body).not.toHaveProperty("password");
    });

    afterAll(async () => {
      if (userId) {
        await request(app)
          .delete(`/api/v1/users/${userId}`)
          .set("Authorization", `Bearer ${token}`);
      }
    });
  });

  describe("Testa GET /api/v1/users/id com erro", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .get(`/api/v1/users/1000`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 400", () => {
      expect(response.status).toBe(400);
    });
  });
});
