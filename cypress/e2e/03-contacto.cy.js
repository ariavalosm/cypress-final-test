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
  
  it("no envía el formulario sin mensaje", function () {
  cy.visit("/");
  cy.get('[data-test="nav-contact"]').click();
  cy.fillContactForm({ ...this.contacto, mensaje: "x" });
  cy.get('[data-test="message"]').clear();
  cy.get('[data-test="contact-submit"]').click();
  cy.get('[data-test="message-error"]').should("be.visible");
  cy.get(".alert-success").should("not.exist");
});

it("maneja un mensaje larguísimo", function () {
  cy.visit("/");
  cy.get('[data-test="nav-contact"]').click();
  cy.fillContactForm({ ...this.contacto, mensaje: "a".repeat(5000) });
  cy.get('[data-test="contact-submit"]').click();
  cy.get(".alert-success, .alert-danger").should("be.visible");
});
});