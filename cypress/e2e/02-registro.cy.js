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
});