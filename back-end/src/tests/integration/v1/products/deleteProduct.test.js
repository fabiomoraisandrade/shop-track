const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa DELETE /api/v1/products/:id", () => {
  describe("Quando a deleção do produto é bem-sucedida", () => {
    let token;
    let productId;
    let deleteResponse;
    let fetchDeletedProductResponse;

    beforeAll(async () => {
      const loginResponse = await request(app)
        .post("/api/v1/login")
        .send({ email: "email1@teste.com", password: "123456" });

      token = loginResponse.body.token;

      const createProductResponse = await request(app)
        .post("/api/v1/products")
        .send({
          name: "Weissbier 1l",
          price: 23.7,
          urlImage: "http://localhost:3001/images/weissbier.jpg",
        })
        .set("Authorization", `Bearer ${token}`);

      productId = createProductResponse.body.id;

      deleteResponse = await request(app)
        .delete(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);

      fetchDeletedProductResponse = await request(app)
        .get(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 204 - No Content", () => {
      expect(deleteResponse.status).toBe(204);
      expect(deleteResponse.body).toEqual({});
    });

    it("Produto deletado não é encontrado (status 404)", () => {
      expect(fetchDeletedProductResponse.status).toBe(404);
      expect(fetchDeletedProductResponse.body.message).toBe(
        "Product does not exist",
      );
    });
  });
});
