describe("3.2 Validaciones del registro", () => {
  it("muestra errores al enviar el formulario vacío", () => {
    cy.visit("/auth/register");
    cy.get('[data-test="register-submit"]').click();

    cy.get('[data-test="first-name-error"]').should("be.visible");
    cy.get('[data-test="last-name-error"]').should("be.visible");
    cy.get('[data-test="email-error"]').should("be.visible");
    cy.get('[data-test="password-error"]').should("be.visible");

    cy.url().should("include", "/auth/register");
    
  });

  beforeEach(function () {
  cy.fixture("registro").as("registro");
  cy.visit("/");
  cy.get('[data-test="nav-sign-in"]').click();
  cy.get('[data-test="register-link"]').click();
});

it("registra una cuenta con datos válidos y email único", function () {
  cy.fillRegisterForm(this.registro, `user${Date.now()}@test.com`);
  cy.get('[data-test="register-submit"]').click();
  cy.url().should("include", "/auth/login");
});

it("rechaza un email sin formato válido", function () {
  cy.fillRegisterForm(this.registro, "correo-sin-arroba");
  cy.get('[data-test="register-submit"]').click();
  cy.get('[data-test="email-error"]').should("be.visible");
  cy.url().should("include", "/auth/register");
});

it("maneja un solo carácter en el nombre", function () {
  cy.fillRegisterForm({ ...this.registro, nombre: "A" }, `user${Date.now()}@test.com`);
  cy.get('[data-test="register-submit"]').click();
  cy.get("body").should("be.visible");
});
});

