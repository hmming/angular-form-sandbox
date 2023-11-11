Feature: Thank you page
  Background:
    Given signup form is correctly filled in

  Scenario: failure
    When I 'unsuccessfully' submit the form
    Then I should see the following elements
      | element         | visibility |
      | successSnackbar | not.exist  |
      | failureSnackbar | exist      |
      | thankYouHeading | not.exist  |
    And the login bar is 'available'

  Scenario: Success
    When I 'successfully' submit the form
    Then I should see the following elements
      | element         | visibility |
      | successSnackbar | exist      |
      | failureSnackbar | not.exist  |
      | thankYouHeading | exist      |
    And the login bar is 'available'
