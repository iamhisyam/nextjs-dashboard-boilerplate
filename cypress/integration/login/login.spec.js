/// <reference types="cypress" />


describe("try login", () => {
    it("go to login and put credentials", () => {

        cy.visit('/login')
        cy.get("#username").type("iam.ahmadhisyam@gmail.com")
        cy.get("#password").type("12345678")
        cy.get("#login-form").submit()

    })





})