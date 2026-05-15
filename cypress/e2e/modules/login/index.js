import { loginLocators } from "../../locators"

export const loginModule = {
    visit() {
        cy.visit('/auth/login');
        return this; // for chaining
    },

    login(username, password) {
        const user = username || Cypress.env('USERNAME')
        const pass = password || Cypress.env('PASSWORD')
        cy.get(loginLocators.username).clear().type(user)
        cy.get(loginLocators.password).clear().type(pass)
        cy.get(loginLocators.submit).click()
        return this
    },

    loginAndVerify() {
        this.visit().login()
        cy.url().should('include', '/dashboard')
        cy.get(loginLocators.dashboard).should('be.visible')
        return this
    }
}