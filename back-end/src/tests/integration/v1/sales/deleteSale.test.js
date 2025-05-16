const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa DELETE /api/v1/sales/:id", () => {
  describe("Quando a deleção da sale é bem-sucedida", () => {
    let token;
    let saleId;
    let deleteResponse;
    let fetchDeletedSaleResponse;
    const sale = {
      sellerId: 11,
      totalPrice: 30,
      deliveryAddress: "Rua Xablau Teste",
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

      const createSaleResponse = await request(app)
        .post("/api/v1/sales")
        .send(sale)
        .set("Authorization", `Bearer ${token}`);

      saleId = createSaleResponse.body.id;

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
