# Challenge final: Testing automatizado con Cypress

Pruebas automatizadas end-to-end y de API sobre el sitio de práctica **Toolshop (versión con bugs)**:
https://with-bugs.practicesoftwaretesting.com/

## Enlaces

| Entregable | Link |
|---|---|
| Plan de casos de prueba (Google Sheets) | https://docs.google.com/spreadsheets/d/1vtjkfnq8cG6aCQO7jaIOrLG6pOAJMoBU7h77cAL2HKg/edit?gid=1611920195#gid=1611920195
| Tablero de bugs (Trello) | [COMPLETAR: link del Trello] |

## Requisitos

- Node.js (versión LTS)
- Google Chrome (recomendado)

## Instalación y ejecución

```bash
npm install
npx cypress run          # corre todos los tests en consola
npx cypress open         # modo visual: E2E Testing > Chrome > elegir el archivo
```

Para correr un solo archivo:

```bash
npx cypress run --spec cypress/e2e/04-login.cy.js
```

## Estructura del proyecto

```
cypress/
├── e2e/
│   ├── 01-compra.cy.js      # 3.1 Flujo de compra (positivo, negativos y bordes)
│   ├── 02-registro.cy.js    # 3.2 Validaciones del registro
│   ├── 03-contacto.cy.js    # 3.3 Formulario de contacto
│   ├── 04-login.cy.js       # 3.4 Login (correcto e incorrecto)
│   ├── 05-busqueda.cy.js    # 3.5 Búsqueda de productos
│   ├── 06-carrito.cy.js     # 3.6 Eliminar producto del carrito
│   └── 07-api.cy.js         # 3.7 Pruebas de API con cy.request
├── fixtures/                # datos de prueba (usuarios, contacto, dirección, pago, etc.)
└── support/
    ├── commands.js          # custom commands reutilizables
    └── e2e.js               # carga commands.js
cypress.config.js            # baseUrl y viewport
```

## Flujos cubiertos

| Flujo | Archivo | Escenarios |
|---|---|---|
| 3.1 Compra | `01-compra.cy.js` | Compra exitosa, login incorrecto en checkout, dirección vacía, pago vacío, cantidad 0 y cantidad 999 |
| 3.2 Registro | `02-registro.cy.js` | Formulario vacío, datos válidos, email sin formato, un solo carácter en el nombre |
| 3.3 Contacto | `03-contacto.cy.js` | Envío válido, sin mensaje, mensaje muy largo |
| 3.4 Login | `04-login.cy.js` | Contraseña incorrecta, datos correctos, email sin formato |
| 3.5 Búsqueda | `05-busqueda.cy.js` | Término existente, inexistente y búsqueda vacía |
| 3.6 Carrito | `06-carrito.cy.js` | Eliminar producto, cantidad 0 y cantidad 999 |
| 3.7 API | `07-api.cy.js` | Listado de productos y login por API (válido e inválido) |

## Custom commands

Definidos en `cypress/support/commands.js`:

- `cy.login(email, password)`
- `cy.fillLoginForm(email, password)`
- `cy.addProductToCart()`
- `cy.goToCart()`
- `cy.checkoutAsUser(user)`
- `cy.fillBillingAddress(direccion)`
- `cy.fillPayment(pago)`
- `cy.fillContactForm(data)`
- `cy.fillRegisterForm(data, email)`

## Criterios de diseño

- **Tests independientes:** cada `it` arranca por su cuenta (con `beforeEach` o commands) y no depende de otro.
- **Sin datos hardcodeados:** los datos de prueba salen de `cypress/fixtures/`.
- **Selectores estables:** se usan atributos `data-test` del sitio.
- **Sin esperas fijas:** se usan aserciones con reintento automático, no `cy.wait()`.
- **Registro único:** el email del registro se genera con la fecha (`user<timestamp>@test.com`).

## Nota sobre los bugs

El sitio probado es una versión **con errores intencionales**. Si un test falla porque el sitio se comporta mal (y no por un problema del test), la aserción se deja con el resultado correcto esperado y el fallo se reporta como bug en Trello, con su caso asociado en el plan de pruebas (columna "Trello tkt N°").

## Datos de prueba

Todos los datos usados son ficticios. No se cargan datos personales reales, porque la base de datos del sitio es compartida.



