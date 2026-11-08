Cypress.Commands.add("fillLoginForm", (email, password) => {
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/auth/login");
  cy.fillLoginForm(email, password);
});

Cypress.Commands.add("addProductToCart", () => {
  cy.visit("/");
  cy.get('[data-test="product-name"]').should("have.length.greaterThan", 0);
  cy.get('a.card').first().click();
  cy.get('[data-test="add-to-cart"]').click();
});

Cypress.Commands.add("goToCart", () => {
  cy.get('[data-test="nav-cart"]').click();
  cy.url().should("include", "/checkout");
});

Cypress.Commands.add("fillContactForm", (data) => {
  cy.get('[data-test="first-name"]').type(data.nombre);
  cy.get('[data-test="last-name"]').type(data.apellido);
  cy.get('[data-test="email"]').type(data.email);
  cy.get('[data-test="subject"]').select(data.asunto);
  cy.get('[data-test="message"]').type(data.mensaje);
});

Cypress.Commands.add("fillPayment", (pago) => {
  cy.get('[data-test="payment-method"]').select(pago.metodo);
  cy.get('[data-test="credit-card-number"]').type(pago.tarjeta);
  cy.get('[data-test="expiration-date"]').type(pago.vencimiento);
  cy.get('[data-test="cvv"]').type(pago.cvv);
  cy.get('[data-test="card-holder-name"]').type(pago.titular);
});

Cypress.Commands.add("fillRegisterForm", (data, email) => {
  cy.get('[data-test="first-name"]').clear().type(data.nombre);
  cy.get('[data-test="last-name"]').clear().type(data.apellido);
  cy.get('[data-test="dob"]').clear().type(data.fechaNacimiento);
  cy.get('[data-test="street"]').clear().type(data.direccion);
  cy.get('[data-test="postal_code"]').clear().type(data.codigoPostal);
  cy.get('[data-test="city"]').clear().type(data.ciudad);
  cy.get('[data-test="state"]').clear().type(data.estado);
  cy.get('[data-test="country"]').select(data.pais);
  cy.get('[data-test="phone"]').clear().type(data.telefono);
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(data.password);
});

Cypress.Commands.add("fillBillingAddress", (dir) => {
  cy.get('[data-test="address"]').clear().type(dir.calle);
  cy.get('[data-test="city"]').clear().type(dir.ciudad);
  cy.get('[data-test="state"]').clear().type(dir.estado);
  cy.get('[data-test="country"]').clear().type(dir.pais);
  cy.get('[data-test="postcode"]').clear().type(dir.codigoPostal);
});
Cypress.Commands.add("checkoutAsUser", (user) => {
  cy.get('[data-test="proceed-1"]').click();
  cy.fillLoginForm(user.email, user.password);
  cy.get('[data-test="proceed-2"]').click();
});