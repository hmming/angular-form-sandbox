/// <reference types="cypress" />
import { HomepagePage } from '../e2e/homepage/homepage.page';
import { SignupFormPage } from '../e2e/signup-form/signup-form.page';

const homePage = new HomepagePage();
const signUpPage = new SignupFormPage();
Cypress.Commands.add('navigateToSignupForm', () => {
  cy.visit('/');
  homePage.signupButton.click();
});

Cypress.Commands.add('fillInSignupForm', () => {
  cy.navigateToSignupForm();
  signUpPage.firstNameInput.type('john');
  signUpPage.lastNameInput.type('doe');
  signUpPage.emailInput.type('john@doe.com');
  signUpPage.passwordInput.type('goodbyeWorld');
});
