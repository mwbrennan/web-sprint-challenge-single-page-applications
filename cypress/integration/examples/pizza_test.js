describe("pizza shop", () => {
    beforeEach(() => {
      // arbitrary code you want running before your tests start
      cy.visit("http://localhost:3000/");
    });



    it('Proper elements adding to boxes', () => {
        cy
            .get('input[name="name"]')
            .type('Frank')
            .should('have.value', 'Frank')
        cy  
            .get('select[name="size"]')
            .select('Large')
            .should('have.value', 'Large')
        cy
            .get('select[name="sauce"]')
            .select('Original Red')
            .should('have.value', 'Original Red')
        cy
            .get('button'[name="submit"])
            .click()
            .should('have.value', '')
    })

    it('elect multiple toppings', () => {
        cy
            .get('button[name="sausage"]')
            .click()
        .cy 
            .get('button[name="onions"]')
            .click()
    })

    it('able to submit form ', () => {
        cy
            .get('input[name="name"]')
            .type('Frank')
            .should('have.value', 'Frank')
        cy  
            .get('select[name="size"]')
            .select('Large')
            .should('have.value', 'Large')
        cy
            .get('select[name="sauce"]')
            .select('Original Red')
            .should('have.value', 'Original Red')
        cy
            .get('button'[name="submit"])
            .click()
            .should('have.value', '')
            .get('buton[name="submit"]')
            .click()
    })




}