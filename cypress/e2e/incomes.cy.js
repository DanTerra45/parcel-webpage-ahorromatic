describe('Income Management', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.get('a[router_link="/incomes"]').click();
  });
  it('should add a new income', () => {
    cy.add_income('Salario', '2000', '2024-10-23');
    cy.get('.income-item').should('have.length', 1);
    cy.get('.income-item').should('contain', 'Salario');
    cy.get('.income-item').should('contain', '2000.00 Bs');
  });
  it('should delete an income', () => {
    cy.add_income('Salario', '2000', '2024-10-23');
    cy.get('.income-item button').click();
    cy.get('.income-item').should('not.exist');
  });
  it('should validate income form', () => {
    cy.get('#income_amount').type('2000');
    cy.get('#income_date').type('2024-10-23');
    cy.get('#income-form button').click();
    cy.get('.income-item').should('not.exist');
    cy.get('#income_description').type('Test');
    cy.get('#income_amount').clear().type('-100');
    cy.get('#income-form button').click();
    cy.get('.income-item').should('not.exist');
  });
  it('should persist incomes after page reload', () => {
    cy.add_income('Salario', '2000', '2024-10-23');
    cy.reload();
    cy.get('.income-item').should('have.length', 1);
    cy.get('.income-item').should('contain', 'Salario');
  });
});