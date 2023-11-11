export class HomepagePage {
  get loginBar() {
    return cy.get('#login-bar');
  }

  get signupForm() {
    return cy.get('.sign-up-form');
  }

  get signupButton() {
    return cy.get('#login-bar button');
  }
}
