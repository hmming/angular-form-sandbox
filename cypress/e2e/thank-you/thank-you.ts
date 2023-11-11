import {
  DataTable,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';
import { ThankYouPage } from './thank-you.page';
import { HomepagePage } from '../homepage/homepage.page';
import { SignupFormPage } from '../signup-form/signup-form.page';

const thankYouPage = new ThankYouPage();
const homePage = new HomepagePage();
const signUpPage = new SignupFormPage();

Given('signup form is correctly filled in', () => {
  cy.fillInSignupForm();
});

When('I {string} submit the form', (submitStatus: string) => {
  const submitStatusMap: { [key: string]: number } = {
    successfully: 200,
    unsuccessfully: 500,
  };
  cy.intercept('**/users', { statusCode: submitStatusMap[submitStatus] });
  signUpPage.signUpButton.click();
});

Then('I should see the following elements', (dataTable: DataTable) => {
  cy.url().should('contain', '/thank-you'); // since this have a default retry, added this to make sure route change has happened
  dataTable.hashes().forEach((dataItem) => {
    thankYouPage[dataItem['element'] as keyof ThankYouPage].should(dataItem['visibility']);
  });
});

Then('the login bar is {string}', (visibility) => {
  const visibleOnPage = visibility === 'available' ? 'exist' : 'not.exist';
  homePage.loginBar.should(visibleOnPage);
});
