const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa POST /api/v1/products", () => {
  let token;
  let createdSellerUserId;
  let createdProduct;
  let createdProductStatus;
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

    createProductresponse = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Weissbier 1l")
      .field("price", "23.70")
      .field("sellerId", createdSellerUserId)
      .attach("file", imagePath);

    createdProduct = createProductresponse.body;
    createdProductStatus = createProductresponse.status;
  });

  afterAll(async () => {
    if (createdProduct.id) {
      await request(app)
        .delete(`/api/v1/products/${createdProduct.id}`)
        .set("Authorization", `Bearer ${token}`);
    }

    if (createdSellerUserId) {
      await request(app)
        .delete(`/api/v1/users/${createdSellerUserId}`)
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
        .field("sellerId", createdSellerUserId)
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
    it("Retorna 400 quando não envia imagem", async () => {
      const response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Produto Sem Imagem")
        .field("price", "12.00")
        .field("sellerId", createdSellerUserId);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("image file is required");
    });

    it("Retorna 400 quando não envia price", async () => {
      const response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Produto Sem Preço")
        .field("sellerId", createdSellerUserId)
        .attach("file", imagePath);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("price is required");
    });

    it("Retorna 400 quando não envia sellerId", async () => {
      const response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Produto Sem SellerId")
        .field("price", "23.70")
        .attach("file", imagePath);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("sellerId is required");
    });

    it("Retorna 400 quando sellerId não é um inteiro positivo", async () => {
      const response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Produto SellerId Inválido")
        .field("price", "23.70")
        .field("sellerId", "-1")
        .attach("file", imagePath);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("sellerId must be a valid positive integer");
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
        .field("sellerId", createdSellerUserId)
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

  });

  describe("Quando é criado com sucesso", () => {
    it("Cria produto no banco", () => {
      expect(createdProduct).not.toBeNull();
    });

    it("Retorna status 201", () => {
      expect(createdProductStatus).toBe(201);
    });

    it("Retorna com chaves esperadas", () => {
      expect(createdProduct).toHaveProperty("id");
      expect(createdProduct).toHaveProperty("name");
      expect(createdProduct).toHaveProperty("price");
      expect(createdProduct).toHaveProperty("urlImage");
      expect(createdProduct).toHaveProperty("sellerId");
    });
  });
});
