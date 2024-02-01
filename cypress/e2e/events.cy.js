describe('/shop', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
    cy.visit('localhost:3000/events')
  })

  it('should render DOM elements', () => {
    cy.get("[data-testid='event-filter']").should('be.visible')
    cy.get("[data-testid='event-desc']").should('be.visible')
    cy.get("[data-testid='event-list']").should('be.visible')
  })

  it('should expand when click [more] and render content ', () => {
    cy.get("[data-testid='event-title']").should('be.visible')
    cy.get("[data-testid='event-date']").should('be.visible')
    cy.get("[data-testid='event-expand']").should('be.visible').click()
    cy.wait(1500)
    cy.get("[data-testid='event-signup']").should('be.visible').click()
    cy.url().should('include', '/events')
  })

  it('should close when click [x] ', () => {
    cy.get("[data-testid='event-expand']").should('be.visible').click().click()
    cy.get("[data-testid='event-signup']").should('be.not.visible').click()
  })
})
