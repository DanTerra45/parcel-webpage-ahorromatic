// Custom commands for handling financial transactions

/**
 * Add a new fee entry
 * @param {string} description - Description of the fee
 * @param {string} amount - Amount of the fee
 * @param {string} date - Date of the fee
 * @param {string} category - Category of the fee
 */
Cypress.Commands.add('add_fee', (description, amount, date, category) => {
    cy.get('#fee_description').type(description);
    cy.get('#fee_amount').type(amount);
    cy.get('#fee_date').type(date);
    cy.get('#fee_category').select(category);
    cy.get('#fee-form button').click();
});

/**
 * Add a new income entry
 * @param {string} description - Description of the income
 * @param {string} amount - Amount of the income
 * @param {string} date - Date of the income
 */
Cypress.Commands.add('add_income', (description, amount, date) => {
    cy.get('#income_description').type(description);
    cy.get('#income_amount').type(amount);
    cy.get('#income_date').type(date);
    cy.get('#income-form button').click();
});

/**
 * Clear all financial data from storage
 */
Cypress.Commands.add('clear_financial_data', () => {
    cy.clearLocalStorage('ahorromatic_data');
});

/**
 * Verify summary card values
 * @param {Object} expected - Expected values for summary cards
 * @param {string} expected.incomes - Expected total incomes
 * @param {string} expected.fees - Expected total fees
 * @param {string} expected.balance - Expected balance
 */
Cypress.Commands.add('verify_summary_cards', ({ incomes, fees, balance }) => {
    // Wait for summary to be rendered
    cy.get('#summary').should('exist');
    if (incomes) cy.get('.income-card').should('contain', `${incomes} Bs`);
    if (fees) cy.get('.fee-card').should('contain', `${fees} Bs`);
    if (balance) cy.get('.balance-card').should('contain', `${balance} Bs`);
});

/**
 * Navigate to a route and wait for content to load
 * @param {string} route - Route to navigate to
 */
Cypress.Commands.add('navigate_to', (route) => {
    cy.get(`a[router_link="${route}"]`).click();
    // Wait for main content to load
    cy.get('main').should('not.be.empty');
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
    // Return false to prevent Cypress from failing the test
    return false;
});