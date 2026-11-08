const resultados = {};

const capturar = (nombre) => {
  cy.document().then((doc) => {
    const ids = [...doc.querySelectorAll("[data-test]")]
      .map((e) => e.getAttribute("data-test"))
      .filter((v, i, a) => v && a.indexOf(v) === i);
    const textos = [...doc.querySelectorAll('[data-test*="error"], [data-test="page-title"], .alert')]
      .map((e) => (e.getAttribute("data-test") || e.className) + " => " + e.innerText.trim());
    resultados[nombre] = { ids, textos };
  });
};

describe("Descubrir selectores (archivo temporal)", () => {
  after(() => {
    cy.writeFile("cypress/descubrimiento.json", resultados);
  });

  it("home y producto", () => {
    cy.visit("/");
    capturar("home");
    cy.get("a.card").first().click();
    capturar("producto");
  });

  it("login y error de email", () => {
    cy.visit("/");
    cy.get('[data-test="nav-sign-in"]').click();
    capturar("login");
    cy.get('[data-test="email"]').type("correo-invalido");
    cy.get('[data-test="password"]').type("welcome01");
    cy.get('[data-test="login-submit"]').click();
    capturar("login_email_invalido");
  });

  it("registro vacio", () => {
    cy.visit("/");
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="register-link"]').click();
    capturar("registro");
    cy.get("form").find('button[type="submit"], input[type="submit"]').first().click();
    capturar("registro_enviado_vacio");
  });

  it("contacto", () => {
    cy.visit("/");
    cy.get('[data-test="nav-contact"]').click();
    capturar("contacto");
    cy.get("form").find('button[type="submit"], input[type="submit"]').first().click();
    capturar("contacto_enviado_vacio");
  });

  it("carrito y checkout", () => {
    cy.fixture("users").then((users) => {
      cy.fixture("direccion").then((dir) => {
        cy.addProductToCart();
        cy.goToCart();
        capturar("carrito");
        cy.get("tbody tr").first().then(($fila) => {
          resultados.html_fila_carrito = $fila[0].outerHTML;
        });

        cy.get('[data-test="proceed-1"]').click();
        capturar("checkout_login");
        cy.fillLoginForm(users.valido.email, users.valido.password);
        cy.get('[data-test="proceed-2"]').click();
        capturar("checkout_direccion");

        cy.fillBillingAddress(dir);
        cy.get('[data-test="proceed-3"]').click();
        capturar("checkout_pago");

        cy.get('[data-test="payment-method"] option').then(($opts) => {
          resultados.opciones_pago = [...$opts].map((o) => o.value + " | " + o.text);
          [...$opts].map((o) => o.value).filter(Boolean).forEach((v) => {
            cy.get('[data-test="payment-method"]').select(v);
            capturar("pago_" + v);
          });
        });
      });
    });
  });
});