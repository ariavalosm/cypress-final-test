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
  it("rechaza el login por API con contraseña incorrecta", function () {
  cy.request({
    method: "POST",
    url: "https://api-with-bugs.practicesoftwaretesting.com/users/login",
    body: this.users.passwordApi,
    failOnStatusCode: false,
  }).then((res) => {
    expect(res.status).to.eq(401);
    expect(res.body).to.not.have.property("access_token");
  });
});
});