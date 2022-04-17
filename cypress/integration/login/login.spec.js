/// <reference types="cypress" />


describe("try login", () => {
    it("go to login and put credentials", () => {

        cy.visit('/login')
        cy.get("#email").type("iam.ahmadhisyam@gmail.com")
        cy.get("#password").type("hisyam123")
        cy.get("#login-form").submit()
        cy.get('title').contains("Dashboard")

    })

})