describe('Fee Management', () => {
  beforeEach(() => {
    cy.clear_financial_data();
    cy.visit('/');
    cy.navigate_to('/fees');
  });
  it('should add a new fee', () => {
    cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
    cy.get('.fee-item').should('have.length', 1);
    cy.get('.fee-item').should('contain', 'Alquiler');
    cy.get('.fee-item').should('contain', '800.00 Bs');
    cy.get('.fee-item').should('contain', 'servicios');
    cy.navigate_to('/');
    cy.verify_summary_cards({
      fees: '800.00'
    });
  });
  it('should delete a fee', () => {
    cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
    cy.get('.fee-item button').click();
    cy.get('.fee-item').should('not.exist');
    cy.navigate_to('/');
    cy.verify_summary_cards({
      fees: '0.00'
    });
  });
  it('should validate fee form', () => {
    cy.get('#fee-form button').click();
    cy.get('.fee-item').should('not.exist');
    cy.get('#fee_description').clear().type('Test');
    cy.get('#fee_amount').clear().type('100');
    cy.get('#fee_date').clear().type('2024-10-23');
    cy.get('#fee-form button').click();
    cy.get('.fee-item').should('not.exist');
    cy.add_fee('Test Fee', '100', '2024-10-23', 'servicios');
    cy.get('.fee-item').should('exist');
    cy.get('.fee-item').should('contain', 'Test Fee');
  });
  it('should persist fees after page reload', () => {
    cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
    cy.reload();
    cy.navigate_to('/fees');
    cy.get('.fee-item').should('have.length', 1);
    cy.get('.fee-item').should('contain', 'Alquiler');
    cy.get('.fee-item').should('contain', '800.00 Bs');
    cy.get('.fee-item').should('contain', 'servicios');
    cy.navigate_to('/');
    cy.verify_summary_cards({
      fees: '800.00'
    });
  });
  it('should update summary when adding multiple fees', () => {
    cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
    cy.add_fee('Internet', '200', '2024-10-23', 'servicios');
    cy.get('.fee-item').should('have.length', 2);
    cy.navigate_to('/');
    cy.verify_summary_cards({
      fees: '1000.00'
    });
  });
});