const request = require("supertest");
const app = require("../../../../api/app");

const sale = {
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

describe("Testa POST /api/v1/sales", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = res.body.token;
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
    let response;
    let newSale;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/sales")
        .set("Authorization", `Bearer ${token}`)
        .send(sale);

      const { id } = response.body;

      const getRes = await request(app)
        .get(`/api/v1/sales/${id}`)
        .set("Authorization", `Bearer ${token}`);

      newSale = getRes.body;
    });

    afterAll(async () => {
      const { id } = response.body;
      await request(app)
        .delete(`/api/v1/sales/${id}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Cria venda no banco", () => {
      expect(newSale).not.toBeNull();
    });

    it("Retorna status 201", () => {
      expect(response.status).toBe(201);
    });

    it("Retorna as propriedades corretas", () => {
      expect(response.body).toHaveProperty("userId", 1);
      expect(response.body).toHaveProperty("sellerId", 11);
      expect(response.body).toHaveProperty("totalPrice", "30.00");
    });
  });
});
