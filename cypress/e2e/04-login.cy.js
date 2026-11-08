describe("Login con datos incorrectos", () => {
  beforeEach(function () {
    cy.fixture("users").as("users");
  });

  it("muestra error con contraseña equivocada", function () {
    const { email, password } = this.users.passwordIncorrecta;
    cy.login(email, password);
    cy.get('[data-test="login-error"]').should("be.visible");
    cy.url().should("include", "/auth/login");
  });
});