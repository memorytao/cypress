describe('template spec', () => {
  it('passes', () => {
    // cy.visit('https://example.cypress.io')
    cy.visit('https://google.com')
    cy.get('.gLFyf').type('cypress')
    cy.get('form').submit()
    cy.get('.q0vns').parent().should('contain','Cypress')
  })
})