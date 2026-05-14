/// <reference types="cypress" />

import { loginModule } from "../modules/login"

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress
describe('Dashboard', () => {
  beforeEach(() => {
    // cy.login() // using custom command with cy.session
    loginModule.loginAndVerify()
  })

  it('should show dashboard widgets', () => {
    cy.visit('/dashboard/index')
  })
})
