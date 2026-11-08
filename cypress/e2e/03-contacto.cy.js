describe("3.3 Formulario de contacto", () => {
  beforeEach(function () {
    cy.fixture("contacto").as("contacto");
  });

  it("envía el mensaje y muestra confirmación", function () {
    cy.visit("/contact");
    cy.fillContactForm(this.contacto);
    cy.get('[data-test="contact-submit"]').click();
    cy.get(".alert-success").should("be.visible");
  });
});