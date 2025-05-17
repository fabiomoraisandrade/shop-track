const path = require("path");
const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa PUT /api/v1/products/:id", () => {
  let response;
  let getProduct;
  let createdProductId;
  let token;
  const imagePath = path.resolve(__dirname, "../../../files/test-image.jpg");

  const newProduct = {
    name: "Teste Produto",
    price: 7.69,
    urlImage: "http://localhost:3001/images/image-teste.jpg",
  };

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = loginResponse.body.token;

    const createdResponse = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Produto SuperTeste")
      .field("price", "23.70")
      .attach("file", imagePath);

    createdProductId = createdResponse.body.id;

    response = await request(app)
      .put(`/api/v1/products/${createdProductId}`)
      .send(newProduct)
      .set("Authorization", `Bearer ${token}`);

    const getResponse = await request(app)
      .get(`/api/v1/products/${createdProductId}`)
      .set("Authorization", `Bearer ${token}`);

    getProduct = getResponse.body;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/v1/products/${createdProductId}`)
      .set("Authorization", `Bearer ${token}`);
  });

  it("Atualiza produto no banco e volta com status 204", () => {
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("Produto atualizado tem os novos dados", () => {
    expect(getProduct.name).toBe(newProduct.name);
    expect(getProduct.price).toBe(newProduct.price.toString());
    expect(getProduct.urlImage).toBe(newProduct.urlImage);
  });
});
