Cypress.Commands.add(
  'getAttributes',
  {
    prevSubject: true,
  },
  (subject, attr) => {
    const attrList = []
    cy.wrap(subject).each(($el) => {
      cy.wrap($el)
        .invoke('attr', attr)
        .then((lid) => {
          attrList.push(lid)
        })
    })
    return cy.wrap(attrList)
  },
)
