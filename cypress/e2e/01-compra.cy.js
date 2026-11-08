describe("3.1 Flujo de compra", () => {
  beforeEach(function () {
    cy.fixture("users").as("users");
    cy.fixture("pago").as("pago");
    cy.fixture("direccion").as("direccion");

    cy.addProductToCart();
    cy.goToCart();
  });

  it("compra exitosa de principio a fin", function () {
    cy.get('[data-test="product-title"]').should("have.length", 1);

    cy.checkoutAsUser(this.users.valido);
    cy.fillBillingAddress(this.direccion);
    cy.get('[data-test="proceed-3"]').click();
    cy.fillPayment(this.pago);
    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="payment-success-message"]').should("be.visible");
  });

  it("no avanza si el login del checkout usa contraseña incorrecta", function () {
    cy.get('[data-test="proceed-1"]').click();
    cy.fillLoginForm(this.users.passwordIncorrecta.email, this.users.passwordIncorrecta.password);

    cy.get('[data-test="login-error"]').should("be.visible");
    cy.get('[data-test="proceed-2"]').should("not.exist");
  });

  it("no deja continuar con la dirección de facturación vacía", function () {
    cy.checkoutAsUser(this.users.valido);
    cy.get('[data-test="street"]').clear();

    cy.get('[data-test="proceed-3"]').should("be.disabled");
  });

  it("no confirma la compra con los datos de pago vacíos", function () {
    cy.checkoutAsUser(this.users.valido);
    cy.fillBillingAddress(this.direccion);
    cy.get('[data-test="proceed-3"]').click();
    cy.get('[data-test="finish"]').click({ force: true });

    cy.get('[data-test="payment-success-message"]').should("not.exist");
  });

  it("no acepta cantidad 0 en el carrito", function () {
    cy.get('[data-test="product-quantity"]').clear().type("0").blur();

    cy.get('[data-test="product-quantity"]').should("not.have.value", "0");
  });

  it("maneja una cantidad muy alta (999)", function () {
    cy.get('[data-test="product-quantity"]').clear().type("999").blur();

    cy.get('[data-test="cart-total"]').should("be.visible");
  });
});