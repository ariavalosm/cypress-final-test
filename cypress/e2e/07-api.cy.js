describe("3.7 Prueba de API", () => {
  beforeEach(function () {
    cy.fixture("users").as("users");
  });

  it("lista productos y hace login por API", function () {
    const api = Cypress.env("apiUrl");

    cy.request(`${api}/products`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data).to.have.length.greaterThan(0);
    });

    cy.request("POST", `${api}/users/login`, {
      email: this.users.valido.email,
      password: this.users.valido.password,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("access_token");
    });
  });
});