import SearchBar from '.'
import 'bootstrap/dist/css/bootstrap.min.css'

describe('SearchBar', () => {
  it('should render the Loader', () => {
    cy.mount(<SearchBar debouncedResults={() => {}} />)
    cy.get('[data-cy=search-row]').should('have.length', 1)
    cy.get('[data-cy=search-col]').should('have.length', 1)
    cy.get('[data-cy=search-form]').should('have.length', 1)
    cy.get('[data-cy=search-bar]')
      .should('have.length', 1)
      .type('Okay Bear')
      .clear()
  })
})
