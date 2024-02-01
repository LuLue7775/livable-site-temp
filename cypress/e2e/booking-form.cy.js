describe('/shop', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit(
      'localhost:3000/booking-form?time=2024-01-25T13:00&eventEn=test-event&eventZh=%E8%80%83%E5%8F%A4%E5%AD%B8%E5%AE%B6%E7%9A%84%E7%A5%95%E9%AD%AF%E9%A4%90%E6%A1%8C',
    )
    cy.clearAllLocalStorage()
  })

  it('should render DOM elements', () => {
    cy.get("[data-testid='booking-title']").should('be.visible').should('have.length', 2)
    cy.get("[data-testid='booking-date']").should('be.visible')
    cy.get("[data-testid='booking-form']").should('be.visible')
    cy.get("[data-testid='menu-toggle']").should('be.visible')
  })

  it('should be able to return previous', () => {
    cy.get("[data-testid='booking-return']").should('be.visible').click()
    cy.url().should('include', '/events')
  })

  it('should be able to fill in form', () => {
    cy.contains('label', 'Name').next('input').type('John Doe')
    cy.contains('label', 'Email').next('input').type('john@example.com')
    cy.contains('label', 'Phone').next('input').type('1234567890')
    cy.get('form').submit()

    cy.get('form[data-testid="booking-form"]').within(() => {
      cy.contains('label', 'Name').next('input').should('have.value', '')
      cy.contains('label', 'Email').next('input').should('have.value', '')
      cy.contains('label', 'Phone').next('input').should('have.value', '')
      cy.get("button:contains('CHECKOUT')").should('be.visible')
    })
  })
})
