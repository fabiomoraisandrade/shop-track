const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/products/:id", () => {
  let token;
  let createdSellerUserId;
  let productId;
  let response;
  const imagePath = path.resolve(__dirname, "../../../files/test-image.jpg");

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = res.body.token;

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
        .field("name", "Teste")
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

  describe("Testa retorno do produto com sucesso", () => {
    beforeAll(async () => {
      response = await request(app)
        .get(`/api/v1/products/${productId}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 200", () => {
      expect(response.status).toBe(200);
    });

    it("Retorna o produto com chaves esperadas", () => {
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("price");
      expect(response.body).toHaveProperty("urlImage");
      expect(response.body).toHaveProperty("sellerId");
    });
  });

  describe("Testa retorno do produto com erro", () => {
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
