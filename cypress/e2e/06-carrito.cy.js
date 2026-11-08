describe("3.6 Eliminar producto del carrito", () => {
  it("deja el carrito vacío tras eliminar el producto", () => {
    cy.addProductToCart();
    cy.goToCart();
    cy.get('[data-test="product-title"]').should("have.length", 1);

    cy.get("tbody tr").first().find("a.btn-danger, .btn-danger").click();

    cy.get('[data-test="product-title"]').should("not.exist");
    cy.contains("The cart is empty").should("be.visible");
  });
});