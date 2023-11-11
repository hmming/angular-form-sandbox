export class ThankYouPage {
  get successSnackbar() {
    return cy.get('.snackbar--success');
  }

  get failureSnackbar() {
    return cy.get('.snackbar--failure');
  }

  get thankYouHeading() {
    return cy.get('.thank-you-component h1');
  }
}
