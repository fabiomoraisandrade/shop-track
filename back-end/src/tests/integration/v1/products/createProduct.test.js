const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa POST /api/v1/products", () => {
  let token;
  let createdProduct;
  const imagePath = path.resolve(__dirname, "../../../files/test-image.jpg");

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = res.body.token;

    response = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Weissbier 1l")
      .field("price", "23.70")
      .attach("file", imagePath);

    createdProduct = response.body;
  });

  afterAll(async () => {
    if (createdProduct.id) {
      await request(app)
        .delete(`/api/v1/products/${createdProduct.id}`)
        .set("Authorization", `Bearer ${token}`);
    }
  });

  describe("Quando não há token de autenticação", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/products")
        .field("name", "Weissbier 1l")
        .field("price", "23.70")
        .attach("file", imagePath);
    });

    it("Retorna status 401", () => {
      expect(response.status).toBe(401);
    });

    it("Retorna a mensagem de erro correta", () => {
      expect(response.body.message).toBe("Token not found");
    });
  });

  describe("Quando as entradas são inválidas", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Weissbier 1l")
        .field("price", "23.70")
        .attach("file", "");
    });

    it("Retorna status 400", () => {
      expect(response.status).toBe(400);
    });

    it("Retorna a mensagem de erro correta", () => {
      expect(response.body.message).toBe("image file is required");
    });
  });

  describe("Quando o produto já existe", () => {
    let response;
    let products;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Weissbier 1l")
        .field("price", "23.70")
        .attach("file", imagePath);

      const getRes = await request(app)
        .get("/api/v1/products")
        .set("Authorization", `Bearer ${token}`);

      products = getRes.body;
    });

    it("Retorna status 409", () => {
      expect(response.status).toBe(409);
    });

    it("Retorna a mensagem de erro correta", () => {
      expect(response.body.message).toBe("Product already exists");
    });

    it("Não cria produto duplicado no banco", () => {
      const duplicates = products.filter((p) => p.name === "Produto Teste");
      expect(duplicates.length).toBe(1);
    });
  });

  describe("Quando é criado com sucesso", () => {
    it("Cria produto no banco", () => {
      expect(createdProduct).not.toBeNull();
    });

    it("Retorna status 201", () => {
      expect(response.status).toBe(201);
    });

    it("Retorna com chaves esperadas", () => {
      expect(createdProduct).toHaveProperty("id");
      expect(createdProduct).toHaveProperty("name");
      expect(createdProduct).toHaveProperty("price");
      expect(createdProduct).toHaveProperty("urlImage");
    });
  });
});
