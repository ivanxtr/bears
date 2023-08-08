import { NFTS_URL } from '@/constants'

describe('App', () => {
  it('renders the app page', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://api-mainnet.magiceden.io/idxv2/**'
      },
      {
        results: [
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
      }
    ).as('getNFTs')
    cy.visit('/')
    cy.wait('@getNFTs')
    cy.get('[data-cy=card-container]').should('have.length', 4)
    cy.get('[data-cy=card-title]').should('have.length', 4)
    cy.get('[data-cy=card-price]').should('have.length', 4)
    cy.get('[data-cy=card-img]').should('have.length', 4)
    cy.get('[data-cy=search-bar]').should('exist')
    cy.get('[data-cy=search-bar]').type('Okay Bear #1917')
    cy.get('[data-cy=card-container]').should('have.length', 1)
    cy.get('[data-cy=card-title]').should('have.length', 1)
    cy.get('[data-cy=card-price]').should('have.length', 1)
    cy.get('[data-cy=card-img]').should('have.length', 1)
    cy.get('[data-cy=search-bar]').clear()
    cy.get('.ReactVirtualized__Grid').scrollTo('bottom')
    cy.get('[data-cy=card-container]').should('have.length', 8)
    cy.get('[data-cy=card-title]').should('have.length', 8)
    cy.get('[data-cy=card-price]').should('have.length', 8)
    cy.get('[data-cy=card-img]').should('have.length', 8)
    cy.get('[data-cy=search-bar]').should('exist')
    cy.get('[data-cy=search-bar]').type('Okay Bear #1917')
    cy.get('[data-cy=search-bar]').clear()
  })
})
