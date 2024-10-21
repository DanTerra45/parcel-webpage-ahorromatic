describe('Fee Management', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('a[router_link="/fees"]').click();
  });

  it('should add a new fee', () => {
    cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
    cy.get('.fee-item').should('have.length', 1);
    cy.get('.fee-item').should('contain', 'Alquiler');
    cy.get('.fee-item').should('contain', '800.00 Bs');
    cy.get('.fee-item').should('contain', 'servicios');
  });

  it('should delete a fee', () => {
    cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
    cy.get('.fee-item button').click();
    cy.get('.fee-item').should('not.exist');
  });

  it('should validate fee form', () => {
    cy.get('#fee-description').type('Test');
    cy.get('#fee-amount').clear().type('800');
    cy.get('#fee-form button').click();
    cy.get('.fee-item').should('not.exist');
  });
});