const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa GET /api/v1/sales", () => {
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
      products: [{ id: productId, quantity: 2 }],
    };

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
    });

    it("Seller tem as propriedades esperadas", () => {
      const seller = response.body[0].seller;

      expect(seller).toHaveProperty("id");
      expect(seller).toHaveProperty("name");
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
        expect(product).toHaveProperty("sellerId");
        expect(product).toHaveProperty("orderInfo");
        expect(product.orderInfo).toHaveProperty("quantity");
      });
    });
  });
});
