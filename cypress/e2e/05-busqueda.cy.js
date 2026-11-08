describe("3.5 Búsqueda de productos", () => {
  beforeEach(function () {
    cy.fixture("producto").as("producto");
  });

  it("encuentra productos que contienen el término buscado", function () {
    cy.visit("/");
    cy.get('[data-test="search-query"]').type(this.producto.busqueda);
    cy.get('[data-test="search-submit"]').click();

    cy.get('[data-test="product-name"]').should("have.length.greaterThan", 0);
    cy.get('[data-test="product-name"]')
      .first()
      .invoke("text")
      .should("match", new RegExp(this.producto.busqueda, "i"));
  });
  it("muestra 'sin resultados' para un término inexistente", function () {
  cy.visit("/");
  cy.get('[data-test="search-query"]').type(this.producto.inexistente);
  cy.get('[data-test="search-submit"]').click();
  cy.get('[data-test="no-results"]').should("be.visible");
});

it("no se rompe con la búsqueda vacía", function () {
  cy.visit("/");
  cy.get('[data-test="search-submit"]').click();
  cy.get('[data-test="product-name"]').should("have.length.greaterThan", 0);
});
});