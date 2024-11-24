describe('Summary', () => {
    beforeEach(() => {
        cy.clear_financial_data();
        cy.visit('/');
    });
    it('should calculate correct balance with multiple transactions', () => {
        cy.navigate_to('/incomes');
        cy.add_income('Salario', '3000', '2024-10-23');
        cy.add_income('Bono', '500', '2024-10-23');
        cy.navigate_to('/fees');
        cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
        cy.add_fee('Internet', '200', '2024-10-23', 'servicios');
        cy.navigate_to('/');
        cy.verify_summary_cards({
            incomes: '3500.00',
            fees: '1000.00',
            balance: '2500.00'
        });
    });
    it('should persist summary after page reload', () => {
        cy.navigate_to('/incomes');
        cy.add_income('Salario', '3000', '2024-10-23');
        cy.navigate_to('/fees');
        cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
        cy.navigate_to('/');
        cy.verify_summary_cards({
            incomes: '3000.00',
            fees: '800.00',
            balance: '2200.00'
        });
        cy.reload();
        cy.verify_summary_cards({
            incomes: '3000.00',
            fees: '800.00',
            balance: '2200.00'
        });
    });
    it('should show zero totals initially', () => {
        cy.verify_summary_cards({
            incomes: '0.00',
            fees: '0.00',
            balance: '0.00'
        });
    });
    it('should update balance when deleting transactions', () => {
        cy.navigate_to('/incomes');
        cy.add_income('Salario', '3000', '2024-10-23');
        cy.navigate_to('/fees');
        cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
        cy.navigate_to('/');
        cy.verify_summary_cards({
            incomes: '3000.00',
            fees: '800.00',
            balance: '2200.00'
        });
        cy.navigate_to('/fees');
        cy.get('.fee-item button').click();
        cy.navigate_to('/');
        cy.verify_summary_cards({
            incomes: '3000.00',
            fees: '0.00',
            balance: '3000.00'
        });
        cy.navigate_to('/incomes');
        cy.get('.income-item button').click();
        cy.navigate_to('/');
        cy.verify_summary_cards({
            incomes: '0.00',
            fees: '0.00',
            balance: '0.00'
        });
    });
});