describe('Navigation', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('/');
    });

    it('should display summary page by default', () => {
        cy.get('.dashboard').should('be.visible');
        cy.get('#summary').should('exist');
    });

    it('should navigate to incomes page', () => {
        cy.get('a[router_link="/incomes"]').click();
        cy.get('.incomes').should('be.visible');
        cy.get('#income-form').should('exist');
    });

    it('should navigate to fees page', () => {
        cy.get('a[router_link="/fees"]').click();
        cy.get('.fees').should('be.visible');
        cy.get('#fee-form').should('exist');
    });

    it('should navigate to reports page', () => {
        cy.get('a[router_link="/reports"]').click();
        cy.get('.reports').should('be.visible');
    });

    it('should navigate to settings page', () => {
        cy.get('a[router_link="/settings"]').click();
        cy.get('.settings').should('be.visible');
    });

    it('should navigate to login page', () => {
        cy.get('a[router_link="/login"]').click();
        cy.get('.login').should('be.visible');
        cy.get('#login_form').should('exist');
    });

    it('should navigate to register page', () => {
        cy.get('a[router_link="/register"]').click();
        cy.get('.register').should('be.visible');
        cy.get('#register_form').should('exist');
    });

    it('should show active state for current route', () => {
        cy.get('a[router_link="/incomes"]').click();
        cy.get('a[router_link="/incomes"]').should('have.class', 'active');
        cy.get('a[router_link="/fees"]').click();
        cy.get('a[router_link="/fees"]').should('have.class', 'active');
    });
});