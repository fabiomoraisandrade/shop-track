const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa POST /api/v1/sales", () => {
  let token;
  let createdSellerUserId;
  let productId;
  let sale;
  let createdSaleId;
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
        .field("name", "Weissbier 1l")
        .field("price", "23.70")
        .field("sellerId", createdSellerUserId)
        .attach("file", imagePath);

      productId = createProductResponse.body.id;

      sale = {
        deliveryAddress: "Rua Xablau",
        deliveryNumber: "237",
        status: "Pendente",
        products: [
          { id: productId, quantity: 2 },
        ],
      }
  });

  afterAll(async () => {
    if (createdSaleId) {
      await request(app)
      .delete(`/api/v1/sales/${createdSaleId}`)
      .set("Authorization", `Bearer ${token}`);
    }

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

  describe("Quando as entradas são inválidas", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/sales")
        .set("Authorization", `Bearer ${token}`)
        .send({
          ...sale,
          deliveryAddress: "",
        });
    });

    it("Retorna status 400", () => {
      expect(response.status).toBe(400);
    });

    it("Retorna a mensagem de erro correta", () => {
      expect(response.body.message).toBe(
        '"deliveryAddress" is not allowed to be empty',
      );
    });
  });

  describe("Quando é criada com sucesso", () => {
    let createSaleResponse;

    beforeAll(async () => {
      createSaleResponse = await request(app)
        .post("/api/v1/sales")
        .set("Authorization", `Bearer ${token}`)
        .send(sale);

      createdSaleId = createSaleResponse.body.id;
    });

    it("Retorna status 201", () => {
      expect(createSaleResponse.status).toBe(201);
    });

    it("Retorna as propriedades corretas", () => {
      expect(createSaleResponse.body[0]).toHaveProperty("id");
      expect(createSaleResponse.body[0]).toHaveProperty("userId");
      expect(createSaleResponse.body[0]).toHaveProperty("sellerId", createdSellerUserId);
      expect(createSaleResponse.body[0]).toHaveProperty("totalPrice");
      expect(createSaleResponse.body[0]).toHaveProperty("deliveryAddress", sale.deliveryAddress);
      expect(createSaleResponse.body[0]).toHaveProperty("deliveryNumber", sale.deliveryNumber);
      expect(createSaleResponse.body[0]).toHaveProperty("saleDate");
      expect(createSaleResponse.body[0]).toHaveProperty("status", sale.status);
    });
  });
});
