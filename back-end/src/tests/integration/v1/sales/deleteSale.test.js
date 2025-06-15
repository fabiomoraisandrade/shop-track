const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa DELETE /api/v1/sales/:id", () => {
  let token;
  let createdSellerUserId;
  let productId;
  let sale;
  let saleId;
  let deleteResponse;
  let fetchDeletedSaleResponse;
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

    const createSaleResponse = await request(app)
      .post("/api/v1/sales")
      .send(sale)
      .set("Authorization", `Bearer ${token}`);

    saleId = createSaleResponse.body[0].id;
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

  describe("Quando a deleção da sale é bem-sucedida", () => {
    beforeAll(async () => {
      deleteResponse = await request(app)
      .delete(`/api/v1/sales/${saleId}`)
      .set("Authorization", `Bearer ${token}`);

      fetchDeletedSaleResponse = await request(app)
        .get(`/api/v1/sales/${saleId}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 204 - No Content", () => {
      expect(deleteResponse.status).toBe(204);
      expect(deleteResponse.body).toEqual({});
    });

    it("Sale deletada não é encontrada (status 404)", () => {
      expect(fetchDeletedSaleResponse.status).toBe(404);
      expect(fetchDeletedSaleResponse.body.message).toBe("not found");
    });
  });
});
