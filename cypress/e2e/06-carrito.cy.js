describe("3.6 Eliminar producto del carrito", () => {
  it("deja el carrito vacío tras eliminar el producto", () => {
    cy.addProductToCart();
    cy.goToCart();
    cy.get('[data-test="product-title"]').should("have.length", 1);

    cy.get("tbody tr").first().find("a.btn-danger, .btn-danger").click();

    cy.get('[data-test="product-title"]').should("not.exist");
    cy.contains("The cart is empty").should("be.visible");
  });
  it("no acepta cantidad 0 en el carrito", () => {
  cy.addProductToCart();
  cy.goToCart();
  cy.get('[data-test="product-quantity"]').clear().type("0").blur();
  cy.get('[data-test="product-quantity"]').should("not.have.value", "0");
});

it("maneja una cantidad muy alta (999)", () => {
  cy.addProductToCart();
  cy.goToCart();
  cy.get('[data-test="product-quantity"]').clear().type("999").blur();
  cy.get('[data-test="cart-total"]').should("be.visible");
});
});