describe("3.4 Login", () => {
  beforeEach(function () {
    cy.fixture("users").as("users");
  });

  it("muestra error con contraseña equivocada", function () {
    const { email, password } = this.users.passwordIncorrecta;
    cy.login(email, password);
    cy.get('[data-test="login-error"]').should("be.visible");
    cy.url().should("include", "/auth/login");
  });

  it("inicia sesión con datos correctos", function () {
    const { email, password } = this.users.valido;
    cy.login(email, password);
   cy.get('[data-test="nav-user-menu"]').should("be.visible");
cy.get('[data-test="page-title"]').should("contain", "My account");
  });

  it("rechaza un email sin formato válido", function () {
    const { email, password } = this.users.emailInvalido;
    cy.login(email, password);
cy.get('[data-test="login-error"]').should("be.visible");
cy.url().should("include", "/auth/login");
  });
});