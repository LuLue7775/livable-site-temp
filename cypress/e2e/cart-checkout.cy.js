import { mockAddToCartEvent, mockAddToCartProduct } from '../fixtures/mock-data'

/**
 * @TODO
 * checkout page render and fill in
 * click checkout to go to /payment, need to validate cookie too
 */
describe('/shop', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('localhost:3000/shop/test-product')
    cy.clearAllLocalStorage()
    cy.get("[data-testid='product-details']").should('be.visible')
  })

  it('should be able to select and add the right quatity to cart', () => {
    cy.get('select').then(($selects) => {
      let getOptions = {}
      if (!$selects.length) return
      cy.wrap($selects)
        .each(($select) => {
          const secondOption = $select.find('option:eq(1)')
          const secondOptionText = secondOption.text()
          const secondOptionValue = secondOption.val()
          cy.wrap(secondOptionValue).should('exist')
          cy.wrap($select).select(secondOptionValue)
          getOptions[secondOptionText] = secondOptionValue
        })
        .then(() => {
          expect(getOptions).to.deep.equal({
            '#7': '#7',
            '15吋': '15吋',
          })
          cy.get("[data-testid='quantity-buttons'] Button:last-child").click()
          cy.get("[data-testid='quantity-display']").should('have.text', 2)
        })
        .then(() => {
          let productMap = {}
          cy.get("[data-testid='add-to-cart-button']")
            .click()
            .then(() => {
              cy.getAllLocalStorage().then((storageMap) => {
                productMap = storageMap['http://localhost:3000']['product-items']
                expect(productMap).to.deep.equal(JSON.stringify(mockAddToCartProduct))
              })
            })
        })
    })
  })

  it('should show cart drawer when add to cart', () => {
    cy.get("[data-testid='add-to-cart-button']")
      .click()
      .then(() => {
        cy.get("[data-testid='cart-drawer']").should('be.visible')
      })
  })
})

describe('/booking-form', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit(
      'localhost:3000/booking-form?time=2024-01-31T13:00&eventEn=test-event&eventZh=%E8%80%83%E5%8F%A4%E5%AD%B8%E5%AE%B6%E7%9A%84%E7%A5%95%E9%AD%AF%E9%A4%90%E6%A1%8C',
    )
    cy.clearAllLocalStorage()
  })

  it.only('should be able to checkout on /booking-form', () => {
    cy.contains('label', 'Name').next('input').type('John Doe')
    cy.contains('label', 'Email').next('input').type('john@example.com')
    cy.contains('label', 'Phone').next('input').type('1234567890')
    cy.get('form').submit()
    cy.wait(2000)

    let eventMap = {}
    cy.getAllLocalStorage().then((storageMap) => {
      eventMap = JSON.parse(storageMap['http://localhost:3000']['event-items'])
      const { uuid: uuidExcluded, ...withUuidExcluded } = eventMap['test-event']['2024-01-31T13:00'][0]
      const { uuid: uuidExcludedExpected, ...withUuidExcludedExpected } =
        mockAddToCartEvent['test-event']['2024-01-31T13:00'][0]
      expect(JSON.stringify(withUuidExcluded)).to.deep.equal(JSON.stringify(withUuidExcludedExpected))
    })
  })
})
