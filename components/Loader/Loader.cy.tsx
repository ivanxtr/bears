import Loader from '.'
import 'bootstrap/dist/css/bootstrap.min.css'

describe('Loader', () => {
  it('should render the Loader', () => {
    cy.mount(<Loader />)
    cy.get('[data-cy=loader-container]').should('have.length', 1)
    cy.get('[data-cy=loader-spinner]').should('have.length', 1)
  })
})
