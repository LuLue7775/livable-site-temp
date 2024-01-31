describe('/shop/single-product', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('localhost:3000/shop')
    cy.get('[data-testid="product"]').eq(2).click() // Click on a random product
  })

  it('should render dom elemnts', () => {
    cy.get("[data-testid='product-title-zh']").should('be.visible')
    cy.get("[data-testid='product-title-en']").should('be.visible')
    cy.get("[data-testid='product-details']").should('be.visible')
  })

  it('should be able to select variation if there is any', () => {
    cy.get('select').then(($selects) => {
      if (!$selects.length) return
      cy.wrap($selects).each(($select) => {
        const secondOption = $select.find('option:eq(1)')
        const secondOptionValue = secondOption.val()
        cy.wrap(secondOptionValue).should('exist')
      })
    })
  })
})
