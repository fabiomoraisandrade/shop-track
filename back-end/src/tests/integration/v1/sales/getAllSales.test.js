const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/sales", () => {
  let response;
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = res.body.token;
  });

  describe("Testa retorno de todas as sales com sucesso", () => {
    beforeAll(async () => {
      response = await request(app)
        .get("/api/v1/sales")
        .set("Authorization", `Bearer ${token}`);
    });

    it("Retorna status 200", () => {
      expect(response.status).toBe(200);
    });

    it("Retorna array de sales", () => {
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("Retorna com chaves esperadas", () => {
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("totalPrice");
      expect(response.body[0]).toHaveProperty("deliveryAddress");
      expect(response.body[0]).toHaveProperty("deliveryNumber");
      expect(response.body[0]).toHaveProperty("saleDate");
      expect(response.body[0]).toHaveProperty("status");
      expect(response.body[0]).toHaveProperty("userId");
      expect(response.body[0]).toHaveProperty("sellerId");
      expect(response.body[0]).toHaveProperty("customer");
      expect(response.body[0]).toHaveProperty("seller");
      expect(response.body[0]).toHaveProperty("products");
    });

    it("Customer tem as propriedades esperadas", () => {
      const customer = response.body[0].customer;

      expect(customer).toHaveProperty("id");
      expect(customer).toHaveProperty("name");
      expect(customer).toHaveProperty("email");
      expect(customer).toHaveProperty("role");
      expect(customer).toHaveProperty("createdAt");
      expect(customer).toHaveProperty("updatedAt");
    });

    it("Seller tem as propriedades esperadas", () => {
      const seller = response.body[0].seller;

      expect(seller).toHaveProperty("id");
      expect(seller).toHaveProperty("name");
      expect(seller).toHaveProperty("email");
      expect(seller).toHaveProperty("role");
      expect(seller).toHaveProperty("createdAt");
      expect(seller).toHaveProperty("updatedAt");
    });

    it("Products têm a estrutura esperada", () => {
      const products = response.body[0].products;

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
  });
});
