const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/products", () => {
  let token;
  let createdSellerUserId;
  let productId;
  let response;
  const imagePath = path.resolve(__dirname, "../../../files/test-image.jpg");

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = loginResponse.body.token;

    const createSellerUserResponse = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Usuário Teste",
        email: "usuario.teste@getid.com",
        password: "teste123",
        isAdmin: false,
    });

    createdSellerUserId = createSellerUserResponse.body.id;

    const createProductResponse = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Weissbier 1l teste")
      .field("price", "23.70")
      .field("sellerId", createdSellerUserId)
      .attach("file", imagePath);

    productId = createProductResponse.body.id;
  });

  afterAll(async () => {
    if (productId) {
      await request(app)
        .delete(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);
    }

    if (createdSellerUserId) {
      await request(app)
        .delete(`/api/v1/users/${createdSellerUserId}`)
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
      expect(response.body[0]).toHaveProperty("sellerId");
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
      expect(response.body[0]).toHaveProperty("sellerId");
    });
  });
});
