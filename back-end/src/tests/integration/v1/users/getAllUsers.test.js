const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/users", () => {
  let token;
  let userId;
  let response;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = loginResponse.body.token;

    const createUserResponse = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuário Teste",
        email: "usuario.teste@getid.com",
        password: "teste123",
        isAdmin: false,
      });

    userId = createUserResponse.body.id;
  });

  afterAll(async () => {
    if (userId) {
      await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);
    }
  });

  describe("Testa retorno de todos usuários com sucesso", () => {
    beforeAll(async () => {
      response = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 200", () => {
      expect(response.status).toBe(200);
    });

    it("Retorna array de usuários", () => {
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("Retorna com chaves esperadas", () => {
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("email");
      expect(response.body[0]).toHaveProperty("isAdmin");
    });

    it("Verifica inexistência de password", () => {
      expect(response.body[0]).not.toHaveProperty("password");
    });
  });
});
