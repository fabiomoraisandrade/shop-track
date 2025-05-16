const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/users", () => {
  describe("Testa retorno de todos usuários com sucesso", () => {
    let response;

    beforeAll(async () => {
      const loginResponse = await request(app)
        .post("/api/v1/login")
        .send({ email: "email1@teste.com", password: "123456" });

      const token = loginResponse.body.token;

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
      expect(response.body[0]).toHaveProperty("role");
    });

    it("Verifica inexistência de password", () => {
      expect(response.body[0]).not.toHaveProperty("password");
    });
  });
});
