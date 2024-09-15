
const file = "/Users/memorytao/development/automate/cypress/e2e/App Sheet - Sheet1.csv"

describe('template spec', () => {
  it('passes', () => {
    
    cy.readFile(file).then( (data) => {

      const lines = data.split("\n")

      lines.forEach(element => {
        // cy.log(element)

        const info = element.split(',')

        cy.log(info[1])

      });

    })

  })
})