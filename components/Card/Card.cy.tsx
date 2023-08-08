import Card from '.'
import 'bootstrap/dist/css/bootstrap.min.css'

const data = [
  {
    title: 'Okay Bear #1917',
    price: 124,
    img: 'https://arweave.net/rO6eLwXD5dTQNWngf5Jx7rPIuuUdHw_KXbrWP5rL1z0'
  }
]

describe('Card', () => {
  it('should render the Card', () => {
    cy.mount(<Card index={0} style={{}} nft={data} />)
    cy.get('[data-cy=card-container]').should('have.length', 1)
    cy.get('[data-cy=card-title]')
      .should('have.length', 1)
      .contains('Okay Bear #1917')
    cy.get('[data-cy=card-price]').should('have.length', 1).contains(124)
    cy.get('[data-cy=card-img]')
      .should('have.length', 1)
      .should(
        'have.attr',
        'src',
        'https://arweave.net/rO6eLwXD5dTQNWngf5Jx7rPIuuUdHw_KXbrWP5rL1z0'
      )
  })
})
