const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa PUT /api/v1/sales/:id", () => {
  let response;
  let getSale;
  let createdSaleId;
  let token;

  const newSale = {
    sellerId: 11,
    totalPrice: 30.0,
    deliveryAddress: "Rua Xablau",
    deliveryNumber: "237",
    status: "Pendente",
    products: [
      { id: 2, quantity: 2 },
      { id: 15, quantity: 2 },
    ],
  };

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = loginResponse.body.token;

    const createdResponse = await request(app)
      .post("/api/v1/sales")
      .send(newSale)
      .set("Authorization", `Bearer ${token}`);

    createdSaleId = createdResponse.body.id;

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
    await request(app)
      .delete(`/api/v1/sales/${createdSaleId}`)
      .set("Authorization", `Bearer ${token}`);
  });

  it("Atualiza sale no banco e volta com status 204", () => {
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("Sale atualizada tem o novo status", () => {
    expect(getSale).toHaveProperty("status", "Preparando");
  });
});
