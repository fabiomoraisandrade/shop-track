const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa CreateProduct", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = res.body.token;
  });

  describe("Quando não há token de autenticação", () => {
    let response;

    beforeAll(async () => {
      response = await request(app).post("/api/v1/products").send({
        name: "Weissbier 1l",
        price: 23.7,
        urlImage: "http://localhost:3001/images/weissbier.jpg",
      });
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
    // let products;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "",
          price: 23.7,
          urlImage: "http://localhost:3001/images/weissbier.jpg",
        });

      // const getRes = await request(app)
      //   .get('/products')
      //   .set('authorization', token);

      // products = getRes.body;
    });

    it("Retorna status 400", () => {
      expect(response.status).toBe(400);
    });

    it("Retorna a mensagem de erro correta", () => {
      expect(response.body.message).toBe('"name" is not allowed to be empty');
    });

    // it('Não cria produto no banco', () => {
    //   const wasCreated = products.some((product) => product.name === 'Weissbier 1l');
    //   expect(wasCreated).toBe(false);
    // });
  });

  describe("Quando o produto já existe", () => {
    let response;
    // let products;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Produto Teste",
          price: 2.2,
          urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
        });

      // const getRes = await request(app)
      //   .get('/products')
      //   .set('authorization', token);

      // products = getRes.body;
    });

    it("Retorna status 409", () => {
      expect(response.status).toBe(409);
    });

    it("Retorna a mensagem de erro correta", () => {
      expect(response.body.message).toBe("Product already exists");
    });

    // it('Não cria produto duplicado no banco', () => {
    //   const duplicates = products.filter(p => p.name === 'Skol Lata 250ml');
    //   expect(duplicates.length).toBe(1);
    // });
  });

  describe("Quando é criado com sucesso", () => {
    let response;
    // let createdProduct;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Weissbier 1l",
          price: 23.7,
          urlImage: "http://localhost:3001/images/weissbier.jpg",
        });

      // const productId = response.body.id;

      // const getRes = await request(app)
      //   .get(`/products/${productId}`)
      //   .set('authorization', token);

      // createdProduct = getRes.body;
    });

    // afterAll(async () => {
    //   if (response.body.id) {
    //     await request(app)
    //       .delete(`/products/${response.body.id}`)
    //       .set('authorization', token);
    //   }
    // });

    // it('Cria produto no banco', () => {
    //   expect(createdProduct).not.toBeNull();
    // });

    it("Retorna status 201", () => {
      expect(response.status).toBe(201);
    });

    it("Retorna as propriedades corretas", () => {
      expect(response.body).toEqual(
        expect.objectContaining({
          name: "Weissbier 1l",
          price: "23.70",
          urlImage: "http://localhost:3001/images/weissbier.jpg",
        }),
      );
    });
  });
});
