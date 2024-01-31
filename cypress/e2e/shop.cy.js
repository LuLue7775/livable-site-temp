describe('/shop', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('localhost:3000/shop')
  })

  it('should render DOM elements', () => {
    cy.get("[data-testid='shop-desc']").should('be.visible')
    cy.get("[data-testid='shop-sort']").should('be.visible')
    cy.get("[data-testid='shop-list']").should('be.visible')
    cy.get("[data-testid='shop-categories']").should('be.visible')
  })

  it('Click and view single product', () => {
    cy.get("[data-testid='product']").first().click()
    cy.url().should('include', '/shop')
  })

  // it('should load more when scrolled to button', () => {
  // })

  /** @TODO this is a component test */
  // it('should filter with METAL (main category) button ', () => {
  //   cy.get("[data-testid='shop-sort-date']").click()

  //   cy.get("[data-testid='product']")
  //     .getAttributes('data-test-category')
  //     .then((category) => {
  //       // expect if there is any product, the category should only be METAL
  //     })
  // })
  // it('should filter with flower vessel (sub category) button ', () => {
  //   cy.get("[data-testid='shop-desc']").should('exist')
  // })
})

describe('Sorting price', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('localhost:3000/shop')
  })

  it('Sort price button ', () => {
    // at first the price is asc. user clicks it to be desc
    cy.get("[data-testid='shop-sort-price']").should('be.visible').click()
    cy.get("[data-testid='product-price']")
      .then(($prices) => {
        const productsArr = Array.from($prices)
        return Cypress._.map(productsArr, (el) => el.innerText)
      })
      .should('be.an', 'array')
      .then((prices) => {
        let parsedPrices = prices.map((price) => Number(price.replace(/\D/g, '')))
        // if not from max-min should return false
        expect(parsedPrices).to.deep.equal([...parsedPrices].sort((a, b) => b - a))
      })
  })
})

describe('Sorting date', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('localhost:3000/shop')
  })

  it('should sort with date button ', async () => {
    // at first the date is desc. user clicks it to be asc
    cy.get("[data-testid='shop-sort-date']").click()

    cy.get("[data-testid='product']")
      .getAttributes('data-test-date')
      .then((dates) => {
        expect(dates).to.deep.equal([...dates].sort((a, b) => a - b))
      })
  })
})
