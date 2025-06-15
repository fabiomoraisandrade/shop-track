const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/sales/:id", () => {
  let token;
  let createdSellerUserId;
  let productId;
  let sale;
  let saleId;
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
    if (saleId) {
      await request(app)
      .delete(`/api/v1/sales/${saleId}`)
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

  describe("Testa retorno da sale com sucesso", () => {
    beforeAll(async () => {
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
    });

    it("Seller tem as propriedades esperadas", () => {
      const seller = response.body.seller;

      expect(seller).toHaveProperty("id");
      expect(seller).toHaveProperty("name");
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
        expect(product).toHaveProperty("sellerId");
        expect(product).toHaveProperty("orderInfo");
        expect(product.orderInfo).toHaveProperty("quantity");
      });
    });
  });

  describe("Testa retorno da sale com erro", () => {
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
