// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

import { loginModule } from "../e2e/modules/login"

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.env(['USERNAME', 'PASSWORD']).then(({ USERNAME, PASSWORD }) => {
        cy.session([USERNAME, PASSWORD], () => {
            loginModule.visit().login(USERNAME, PASSWORD)
    
            // Verify successful login
            cy.url().should('include', '/dashboard/index')
        })
    })
})