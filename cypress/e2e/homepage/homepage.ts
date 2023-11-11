import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { HomepagePage } from './homepage.page';

const page = new HomepagePage();

When('I visit homepage', () => {
  cy.visit('/');
});

Then('I should see login bar', () => {
  page.loginBar.should('be.visible');
});

Then('not the signup form', () => {
  page.signupForm.should('not.exist');
});
