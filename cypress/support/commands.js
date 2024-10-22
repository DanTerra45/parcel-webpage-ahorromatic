// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('add_fee', (description, amount, date, category) => {
    cy.get('#fee-description').type(description);
    cy.get('#fee-amount').type(amount);
    cy.get('#fee-date').type(date);
    cy.get('#fee-category').select(category);
    cy.get('#fee-form button').click();
});
Cypress.Commands.add('add_income', (description, amount, date) => {
    cy.get('#income-description').type(description);
    cy.get('#income-amount').type(amount);
    cy.get('#income-date').type(date);
    cy.get('#income-form button').click();
});