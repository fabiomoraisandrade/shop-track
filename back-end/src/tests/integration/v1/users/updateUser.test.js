const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa PUT /api/v1/users/:id", () => {
  let response;
  let getUser;
  let createdUserId;
  let token;

  const newUser = {
    name: "John Wick da Silva",
    email: "jhonwicksilva@continental.com",
    password: "parabellum",
    role: "seller",
  };

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/v1/login")
      .send({ email: "email1@teste.com", password: "123456" });

    token = loginResponse.body.token;

    const createdResponse = await request(app)
      .post("/api/v1/users")
      .send({
        name: "John Doe Foo Bar",
        email: "newemailtest@email.com",
        password: "abcdefgh",
        role: "customer",
      })
      .set("Authorization", `Bearer ${token}`);

    createdUserId = createdResponse.body.id;

    response = await request(app)
      .put(`/api/v1/users/${createdUserId}`)
      .send(newUser)
      .set("Authorization", `Bearer ${token}`);

    const getResponse = await request(app)
      .get(`/api/v1/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`);

    getUser = getResponse.body;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/v1/users/${createdUserId}`)
      .set("Authorization", `Bearer ${token}`);
  });

  it("Atualiza usuário no banco", () => {
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("Usuário atualizado tem os novos dados (exceto senha)", () => {
    expect(getUser.name).toBe(newUser.name);
    expect(getUser.email).toBe(newUser.email);
    expect(getUser.role).toBe(newUser.role);
    expect(getUser).not.toHaveProperty("password");
  });
});
