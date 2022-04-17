/// <reference types="cypress" />

describe("AUTH API check",()=>{

    it("test login",()=>{
        cy.request("POST","/api/auth/login",{
            email : "iam.ahmadhisyam@gmail.com",
            password: "hisyam123"
        }).then(
            (response) => {
                expect(response.body).to.have.property("status","success")
            }
        )
    })
    
})