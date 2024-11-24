describe('Income Management', () => {
  beforeEach(() => {
    cy.clear_financial_data();
    cy.visit('/');
    cy.navigate_to('/incomes');
  });
  it('should add a new income', () => {
    cy.add_income('Salario', '3000', '2024-10-23');
    cy.get('.income-item').should('have.length', 1);
    cy.get('.income-item').should('contain', 'Salario');
    cy.get('.income-item').should('contain', '3000.00 Bs');
    cy.navigate_to('/');
    cy.verify_summary_cards({
      incomes: '3000.00'
    });
  });
  it('should delete an income', () => {
    cy.add_income('Salario', '3000', '2024-10-23');
    cy.get('.income-item button').click();
    cy.get('.income-item').should('not.exist');
    cy.navigate_to('/');
    cy.verify_summary_cards({
      incomes: '0.00'
    });
  });
  it('should validate income form', () => {
    cy.get('#income-form button').click();
    cy.get('.income-item').should('not.exist');
    cy.get('#income_description').clear().type('Test');
    cy.get('#income_amount').clear().type('100');
    cy.get('#income-form button').click();
    cy.get('.income-item').should('not.exist');
    cy.add_income('Test Income', '100', '2024-10-23');
    cy.get('.income-item').should('exist');
    cy.get('.income-item').should('contain', 'Test Income');
  });
  it('should persist incomes after page reload', () => {
    cy.add_income('Salario', '3000', '2024-10-23');
    cy.reload();
    cy.navigate_to('/incomes');
    cy.get('.income-item').should('have.length', 1);
    cy.get('.income-item').should('contain', 'Salario');
    cy.get('.income-item').should('contain', '3000.00 Bs');
    cy.navigate_to('/');
    cy.verify_summary_cards({
      incomes: '3000.00'
    });
  });
  it('should update summary when adding multiple incomes', () => {
    cy.add_income('Salario', '3000', '2024-10-23');
    cy.add_income('Bono', '500', '2024-10-23');
    cy.get('.income-item').should('have.length', 2);
    cy.navigate_to('/');
    cy.verify_summary_cards({
      incomes: '3500.00'
    });
  });
});