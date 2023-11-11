export class SignupFormPage {
  get lastNameField() {
    return cy.get('#lastName');
  }

  get lastNameInput() {
    return this.lastNameField.find('input');
  }

  get firstNameField() {
    return cy.get('#firstName');
  }

  get firstNameInput() {
    return this.firstNameField.find('input');
  }

  get emailField() {
    return cy.get('#email');
  }

  get emailInput() {
    return this.emailField.find('input');
  }

  get passwordField() {
    return cy.get('#password');
  }

  get passwordInput() {
    return this.passwordField.find('input');
  }

  get passwordErrorContainer() {
    return this.passwordField.find('.mat-mdc-form-field-error');
  }

  get signUpButton() {
    return cy.get('.sign-up-form__container button');
  }

  get errorContainer() {
    return cy.get('.mat-mdc-form-field-error');
  }
}
