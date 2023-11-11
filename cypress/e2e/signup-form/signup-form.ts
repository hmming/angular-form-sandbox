import {
  DataTable,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';
import { SignupFormPage } from './signup-form.page';

const signUpPage = new SignupFormPage();

Given('I navigated to the signup form', () => {
  cy.navigateToSignupForm();
});

When('I leave all fields empty', () => {
  signUpPage.errorContainer.should('not.exist');

  const inputFields = [
    signUpPage.firstNameField,
    signUpPage.lastNameField,
    signUpPage.emailField,
    signUpPage.passwordField,
  ];

  inputFields.forEach((formField) => {
    formField.find('.mat-mdc-input-element').focus().blur();
  });
});

Then('I should see {int} required validation message', (amount: number) => {
  signUpPage.errorContainer.should('have.length', amount);
});

Then('Submit button is {string}', (buttonState: string) => {
  const buttonStateMap: { [key: string]: string } = {
    disabled: 'be.disabled',
    enabled: 'not.be.disabled',
  };
  signUpPage.signUpButton.should(buttonStateMap[buttonState]);
});

Then(
  'the following values triggers the email validation message causing submit button to be disabled',
  (dataTable: DataTable) => {
    dataTable
      .raw()
      .flat()
      .forEach((email) => {
        signUpPage.emailInput.focus().clear().type(email).blur();
        signUpPage.errorContainer.should('have.length', 1);
      });
  }
);

Then('this {string} is valid', (validEmail: string) => {
  signUpPage.emailInput.focus().clear().type(validEmail).blur();
  signUpPage.errorContainer.should('have.length', 0);
});

When('I fill in the following fields', (dataTable: DataTable) => {
  dataTable.hashes().forEach((dataItem) => {
    signUpPage[dataItem.fieldName].type(dataItem.value);
  });
});

Then(
  'the password have at least 8 characters without values from any names field',
  (dataTable: DataTable) => {
    const validityMap: { [key: string]: string } = {
      valid: 'not.exist',
      invalid: 'exist',
    };

    dataTable.hashes().forEach((dataItem) => {
      signUpPage.passwordInput.focus().clear().type(dataItem.password).blur();
      signUpPage.passwordErrorContainer.should(validityMap[dataItem.validity]);
    });
  }
);
