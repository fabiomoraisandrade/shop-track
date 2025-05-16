const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/products", () => {
  let token;
  let productId;
  let response;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = loginResponse.body.token;

    const createProductResponse = await request(app)
      .post("/api/v1/products")
      .send({
        name: "Weissbier 1l teste",
        price: 23.7,
        urlImage: "http://localhost:3001/images/weissbier.jpg",
      });

    productId = createProductResponse.body.id;
  });

  afterAll(async () => {
    if (productId) {
      await request(app)
        .delete(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);
    }
  });

  describe("Quando não há busca por termo", () => {
    beforeAll(async () => {
      response = await request(app)
        .get("/api/v1/products")
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 200", () => {
      expect(response.status).toBe(200);
    });

    it("Retorna array de produtos", () => {
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("Retorna com chaves esperadas", () => {
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("urlImage");
    });
  });

  describe("Quando há busca por termo", () => {
    beforeAll(async () => {
      response = await request(app)
        .get("/api/v1/products?q=teste")
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 200", () => {
      expect(response.status).toBe(200);
    });

    it("Retorna array de produtos", () => {
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("Retorna com chaves esperadas", () => {
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("urlImage");
    });
  });
});
