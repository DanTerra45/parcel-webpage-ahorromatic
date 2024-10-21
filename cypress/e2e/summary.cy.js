describe('Summary', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/');
    });

    it('should show initial empty summary', () => {
        cy.get('.income-card').should('contain', '0.00 Bs');
        cy.get('.fee-card').should('contain', '0.00 Bs');
        cy.get('.balance-card').should('contain', '0.00 Bs');
    });

    it('should update summary when adding income', () => {
        cy.get('a[router_link="/incomes"]').click();
        cy.add_income('Salario', '2000', '2024-10-23');
        cy.get('a[router_link="/"]').click();

        cy.get('.income-card').should('contain', '2000.00 Bs');
        cy.get('.balance-card').should('contain', '2000.00 Bs');
    });

    it('should update summary when adding fee', () => {
        cy.get('a[router_link="/fees"]').click();
        cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
        cy.get('a[router_link="/"]').click();

        cy.get('.fee-card').should('contain', '800.00 Bs');
        cy.get('.balance-card').should('contain', '-800.00 Bs');
    });

    it('should calculate correct balance with multiple transactions', () => {
        // Agregar ingresos
        cy.get('a[router_link="/incomes"]').click();
        cy.add_income('Salario', '2000', '2024-10-23');
        cy.add_income('Extra', '500', '2024-10-23');

        // Agregar gastos
        cy.get('a[router_link="/fees"]').click();
        cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');
        cy.add_fee('Comida', '300', '2024-10-23', 'comida');

        // Verificar resumen
        cy.get('a[router_link="/"]').click();
        cy.get('.income-card').should('contain', '2500.00 Bs');
        cy.get('.fee-card').should('contain', '1100.00 Bs');
        cy.get('.balance-card').should('contain', '1400.00 Bs');
    });

    it('should persist summary after page reload', () => {
        // Agregar transacciones
        cy.get('a[router_link="/incomes"]').click();
        cy.add_income('Salario', '2000', '2024-10-23');
        cy.get('a[router_link="/fees"]').click();
        cy.add_fee('Alquiler', '800', '2024-10-23', 'servicios');

        // Recargar y verificar
        cy.reload();
        cy.get('a[router_link="/"]').click();
        cy.get('.income-card').should('contain', '2000.00 Bs');
        cy.get('.fee-card').should('contain', '800.00 Bs');
        cy.get('.balance-card').should('contain', '1200.00 Bs');
    });
});