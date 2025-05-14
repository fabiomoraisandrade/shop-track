const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/products/:id", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = res.body.token;
  });

  describe("Testa GET /api/v1/products/:id com sucesso", () => {
    let productId;
    let response;

    beforeAll(async () => {
      const createProductResponse = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Teste",
          price: "15",
          urlImage: "http://localhost:3001/images/teste.jpg",
        });

      productId = createProductResponse.body.id;

      response = await request(app)
        .get(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 200", () => {
      expect(response.status).toBe(200);
    });

    it("Retorna o produto com chaves esperadas", () => {
      expect(response.body).toHaveProperty("id", productId);
      expect(response.body).toHaveProperty("name", "Teste");
      expect(response.body).toHaveProperty("price", "15.00");
      expect(response.body).toHaveProperty(
        "urlImage",
        "http://localhost:3001/images/teste.jpg",
      );
    });

    afterAll(async () => {
      if (productId) {
        await request(app)
          .delete(`/api/v1/products/${productId}`)
          .set("Authorization", `Bearer ${token}`);
      }
    });
  });

  describe("Testa GET /api/v1/products/id com erro", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .get(`/api/v1/products/1000`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 404", () => {
      expect(response.status).toBe(404);
    });
  });
});
