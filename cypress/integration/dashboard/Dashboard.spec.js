/// <reference types="cypress" />

describe('Dashboard page', () =>{
    beforeEach(()=>{
        cy.visit("/dashboard")
    })

    it("display title page Dashboard",()=>{
        cy.get('title').contains("Dashboard")
    })

})


