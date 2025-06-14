const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa DELETE /api/v1/users/:id", () => {
  describe("Quando a deleção do usuário é bem-sucedida", () => {
    let token;
    let userId;
    let deleteResponse;
    let fetchDeletedUserResponse;

    beforeAll(async () => {
      const loginResponse = await request(app)
        .post("/api/v1/login")
        .send({ email: "email1@teste.com", password: "123456" });

      token = loginResponse.body.token;

      const createUserResponse = await request(app).post("/api/v1/users").send({
        name: "John Doe Foo Bar",
        email: "emailteste007@email.com",
        password: "32165487",
        isAdmin: false,
      });

      userId = createUserResponse.body.id;

      deleteResponse = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      fetchDeletedUserResponse = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 204 - No Content", () => {
      expect(deleteResponse.status).toBe(204);
      expect(deleteResponse.body).toEqual({});
    });

    it("Usuário deletado não é encontrado (status 404)", () => {
      expect(fetchDeletedUserResponse.status).toBe(404);
      expect(fetchDeletedUserResponse.body.message).toBe("User not found");
    });
  });
});
