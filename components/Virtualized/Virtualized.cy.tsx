import Virtualized from '.'
import 'bootstrap/dist/css/bootstrap.min.css'

const data = [
  {
    title: 'Okay Bear #1917',
    price: 124,
    img: 'https://arweave.net/rO6eLwXD5dTQNWngf5Jx7rPIuuUdHw_KXbrWP5rL1z0'
  },
  {
    title: 'Okay Bear #114',
    price: 420,
    img: 'https://arweave.net/lvX28kAjjh0-uLTAQwuzMx541Nn8Nbry6rPYvZfc4ow'
  },
  {
    title: 'Okay Bear #1305',
    price: 50,
    img: 'https://arweave.net/Y4xNnZh0EObwpGR_KzqpUejdm3yVQFOx0uc-P0EaMPg'
  },
  {
    title: 'Okay Bear #6137',
    price: 120,
    img: 'https://arweave.net/S-X_Z577GDpjoPrSfdg9ZOUyog9Mlb3NZNL2MTcDaz8'
  }
]

describe('Virtualized', () => {
  it('should render the Virtualized', () => {
    cy.mount(
      <Virtualized nftData={data} searchTerm="" onScrollFunc={() => {}} />
    )
    cy.get('[data-cy=virtualize-main]').should('have.length', 1)
    cy.get('[data-cy=card-container]').should('have.length', 3)
    cy.get('[data-cy=card-title]')
      .first()
      .should('have.length', 1)
      .contains('Okay Bear #1917')
    cy.get('[data-cy=card-price]')
      .first()
      .should('have.length', 1)
      .contains(124)
    cy.get('[data-cy=card-img]')
      .first()
      .should('have.length', 1)
      .should(
        'have.attr',
        'src',
        'https://arweave.net/rO6eLwXD5dTQNWngf5Jx7rPIuuUdHw_KXbrWP5rL1z0'
      )
  })
})
