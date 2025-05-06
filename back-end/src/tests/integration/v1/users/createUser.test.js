const request = require("supertest");
const app = require("../../../../api/app");

describe("Testa criação de usuário", () => {
  // let token;

  // beforeAll(async () => {
  //   const res = await request(app)
  //     .post("/login")
  //     .send({ email: "adm@deliveryapp.com", password: "--adm2@21!!--" });

  //   token = res.body.token;
  // });

  describe("Testa rota sem enviar nome", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/users")
        // .set("authorization", token)
        .send({
          email: "emailteste007@email.com",
          password: "244466666",
          role: "administrator",
        });
    });

    it("Retorna status 400", () => {
      expect(response.status).toBe(400);
    });

    it('Retorna mensagem: "name" is required', () => {
      expect(response.body).toBe('"name" is required');
    });
  });

  describe("Testa rota sem enviar email", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/users")
        // .set("authorization", token)
        .send({
          name: "John Doe Foo Bar",
          password: "244466666",
          role: "administrator",
        });
    });

    it("Retorna status 400", () => {
      expect(response.status).toBe(400);
    });

    it('Retorna mensagem: "email" is required', () => {
      expect(response.body).toBe('"email" is required');
    });
  });

  describe("Testa rota sem enviar password", () => {
    let response;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/users")
        // .set("authorization", token)
        .send({
          name: "John Doe Foo Bar",
          email: "emailteste007@email.com",
          role: "administrator",
        });
    });

    it("Retorna status 400", () => {
      expect(response.status).toBe(400);
    });

    it('Retorna mensagem: "password" is required', () => {
      expect(response.body).toBe('"password" is required');
    });
  });

  // describe("Testa criação com email duplicado", () => {
  //   let response;

  //   beforeAll(async () => {
  //     response = await request(app)
  //       .post("/users")
  //       .set("authorization", token)
  //       .send({
  //         name: "John Doe Foo Bar",
  //         email: "adm@deliveryapp.com",
  //         password: "244466666",
  //         role: "administrator",
  //       });
  //   });

  //   it("Retorna status 409", () => {
  //     expect(response.status).toBe(409);
  //   });

  //   it("Retorna mensagem: Email already registered", () => {
  //     expect(response.body).toBe("Email already registered");
  //   });
  // });

  describe("Testa criação com sucesso", () => {
    let response;
    let userId;

    beforeAll(async () => {
      response = await request(app)
        .post("/api/v1/users")
        // .set("authorization", token)
        .send({
          name: "John Doe Foo Bar",
          email: "emailteste007@email.com",
          password: "244466666",
          role: "administrator",
        });

      userId = response.body.id;
    });

    // afterAll(async () => {
    //   if (userId) {
    //     await request(app)
    //       .delete(`/users/${userId}`)
    //       .set("authorization", token);
    //   }
    // });

    it("Retorna status 201", () => {
      expect(response.status).toBe(201);
    });

    it("Confere chaves id, name, email, role", () => {
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
          role: expect.any(String),
        }),
      );
    });
  });
});
