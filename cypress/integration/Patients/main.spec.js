/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress
import * as data from ".././../MOCK_DATA.json";

describe('Case Clinical 2', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    // cy.visit('https://case-clinical-underwriting.azurewebsites.net/#/sign-in')
  })

  it('User should be able to login with valid credentials', () => {
    LoginUser(cy);
  })
  it('User should be able to create patient', () => {
    cy.visit('http://localhost:4200/#/queues/patients/create');

    const index = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

    TypeTextInput(cy, '[id^=formly_36_input_name_0]', data[index].first_name);
    TypeTextInput(cy, '[id^=formly_36_input_firstName_1]', data[index].last_name);
    TypeTextInput(cy, '[id^=formly_36_input_middleName_2]', data[index].last_name);
    TypeTextInput(cy, '[id^=formly_36_input_lastName_3]', data[index].last_name);
    TypeTextInput(cy, '[id^=formly_36_input_primaryEmailAddress_18]', data[index].email);

    Click(cy, '[id^=save]');
    Click(cy, '[id^=save]');
  })
})
function LoginUser(cy) {
  cy.visit('http://localhost:4200/#/sign-in');
  TypeTextInput(cy, '[id^=email]', 'admin@nxpm.dev');
  TypeTextInput(cy, '[id^=password]', 'nxpm-dot-dev!');
  Click(cy, '[id^=sign-in]');
}

function Wait(cy, ms) {
  console.log(`Waiting for ${ms} ms`);
  cy.wait(ms);
}

function TypeTextInput(cy, selector, value) {
  console.log(`Input data => ${selector} , ${value}`);
  cy.get(selector, { timeout: 20000 })
    .should('be.visible')
    .clear()
    .type(value);
}
function Click(cy, selector) {
  console.log(`Click => ${selector}`);
  cy.get(selector)
    .should('be.visible', { timeout: 100000 })
    .click();
}


