const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa PUT /api/v1/sales/:id", () => {
  let token;
  let createdSellerUserId;
  let productId;
  let sale;
  let getSale;
  let createdSaleId;
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

    const createdResponse = await request(app)
      .post("/api/v1/sales")
      .send(sale)
      .set("Authorization", `Bearer ${token}`);

    createdSaleId = createdResponse.body[0].id;

    response = await request(app)
      .put(`/api/v1/sales/${createdSaleId}`)
      .send({
        status: "Preparando",
      })
      .set("Authorization", `Bearer ${token}`);

    const getResponse = await request(app)
      .get(`/api/v1/sales/${createdSaleId}`)
      .set("Authorization", `Bearer ${token}`);

    getSale = getResponse.body;
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

  it("Atualiza sale no banco e volta com status 204", () => {
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("Sale atualizada tem o novo status", () => {
    expect(getSale).toHaveProperty("status", "Preparando");
  });
});
