Cypress.Commands.add("login", (email, password) => {
  cy.visit("/auth/login");
  cy.get('[data-test="email"]').type(email);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add("addProductToCart", () => {
  cy.visit("/");
  cy.get('[data-test^="product-"]').first().click();
  cy.get('[data-test="add-to-cart"]').click();
});

Cypress.Commands.add("fillContactForm", (data) => {
  cy.get('[data-test="first-name"]').type(data.nombre);
  cy.get('[data-test="last-name"]').type(data.apellido);
  cy.get('[data-test="email"]').type(data.email);
  cy.get('[data-test="subject"]').select(data.asunto);
  cy.get('[data-test="message"]').type(data.mensaje);
});