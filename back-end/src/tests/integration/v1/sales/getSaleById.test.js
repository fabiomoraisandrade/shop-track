const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/sales/:id", () => {
  let token;
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
    const res = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = res.body.token;
  });

  describe("Testa GET /api/v1/sales/:id com sucesso", () => {
    let saleId;
    let response;

    beforeAll(async () => {
      const createSaleResponse = await request(app)
        .post("/api/v1/sales")
        .set("Authorization", `Bearer ${token}`)
        .send(sale);

      saleId = createSaleResponse.body.id;

      response = await request(app)
        .get(`/api/v1/sales/${saleId}`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 200", () => {
      expect(response.status).toBe(200);
    });

    it("Retorna o sale com chaves esperadas", () => {
      expect(response.body).toHaveProperty("id", saleId);
      expect(response.body).toHaveProperty("totalPrice");
      expect(response.body).toHaveProperty("deliveryAddress");
      expect(response.body).toHaveProperty("deliveryNumber");
      expect(response.body).toHaveProperty("saleDate");
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("userId");
      expect(response.body).toHaveProperty("sellerId");
      expect(response.body).toHaveProperty("customer");
      expect(response.body).toHaveProperty("seller");
      expect(response.body).toHaveProperty("products");
    });

    it("Customer tem as propriedades esperadas", () => {
      const customer = response.body.customer;

      expect(customer).toHaveProperty("id");
      expect(customer).toHaveProperty("name");
      expect(customer).toHaveProperty("email");
      expect(customer).toHaveProperty("role");
      expect(customer).toHaveProperty("createdAt");
      expect(customer).toHaveProperty("updatedAt");
    });

    it("Seller tem as propriedades esperadas", () => {
      const seller = response.body.seller;

      expect(seller).toHaveProperty("id");
      expect(seller).toHaveProperty("name");
      expect(seller).toHaveProperty("email");
      expect(seller).toHaveProperty("role");
      expect(seller).toHaveProperty("createdAt");
      expect(seller).toHaveProperty("updatedAt");
    });

    it("Products têm a estrutura esperada", () => {
      const products = response.body.products;

      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);

      products.forEach((product) => {
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("urlImage");
        expect(product).toHaveProperty("orderInfo");
        expect(product.orderInfo).toHaveProperty("quantity");
      });
    });

    // afterAll(async () => {
    //   if (saleId) {
    //     await request(app)
    //       .delete(`/api/v1/sales/${saleId}`)
    //       .set("Authorization", `Bearer ${token}`);
    //   }
    // });
  });

  describe("Testa GET /api/v1/sales/id com erro", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .get(`/api/v1/sales/1000`)
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 404", () => {
      expect(response.status).toBe(404);
    });
  });
});
