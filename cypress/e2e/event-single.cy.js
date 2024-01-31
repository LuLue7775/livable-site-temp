describe('/event-single', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('localhost:3000/events/test-event')
  })

  it('should render DOM elements', () => {
    cy.get("[data-testid='event-single-title']").should('be.visible')
    cy.get("[data-testid='event-single-date']").should('be.visible').should('have.length', 1)
    cy.get("[data-testid='event-detail']").should('be.visible')
    cy.get("[data-testid='event-images-wrap']").should('exist').children().should('have.length.greaterThan', 0)
  })

  it('should be able to click open lightbox', () => {
    cy.get("[data-testid='event-image']").eq(1).click()
    cy.get("[data-testid='lightbox']").should('be.visible')
    cy.get("[data-testid='lightbox-close']").click()
    cy.get("[data-testid='lightbox']").should('not.be.visible')
  })
})
