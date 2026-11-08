describe("3.1 Compra exitosa", () => {
  beforeEach(function () {
    cy.fixture("users").as("users");
    cy.fixture("pago").as("pago");
  });

  it("compra un producto de principio a fin", function () {
    cy.visit("/");
    cy.get('[data-test="product-name"]').should("have.length.greaterThan", 0);

    cy.get("a.card").first().click();
    cy.get('[data-test="product-name"]').invoke("text").then((nombre) => {
      cy.get('[data-test="add-to-cart"]').click();
      cy.goToCart();
      cy.get('[data-test="product-title"]').should("contain", nombre.trim());
    });

    cy.get('[data-test="proceed-1"]').click();
    cy.fillLoginForm(this.users.valido.email, this.users.valido.password);

    cy.get('[data-test="proceed-2"]').click();
    cy.get('[data-test="proceed-3"]').click();

    cy.fillPayment(this.pago);
    cy.get('[data-test="finish"]').click();

    cy.get('[data-test="payment-success-message"]').should("be.visible");
  });
});