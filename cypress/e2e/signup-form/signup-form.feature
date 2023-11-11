Feature: Signup Form

  Background:
    Given I navigated to the signup form

  Scenario: Required validation
    When I leave all fields empty
    Then I should see 4 required validation message
    And Submit button is 'disabled'

  Scenario: Email validation
    Then the following values triggers the email validation message causing submit button to be disabled
      | not-an-email   |
      | noAtSign.com   |
      | no@domain      |
      | @incorrect.com |
    But this 'correct@email.com' is valid

  Scenario: Password validation
    When I fill in the following fields
      | fieldName      | value        |
      | firstNameInput | John William |
      | lastNameInput  | Doe          |
    Then the password have at least 8 characters without values from any names field
      | password           | validity |
      | all_lower_case     | invalid  |
      | ALL_UPPER_CASE     | invalid  |
      | hasNameWilliam     | invalid  |
      | hasNameJohn        | invalid  |
      | hasNameDoe         | invalid  |
      | somOtherValues1234 | valid    |



