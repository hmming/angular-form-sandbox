Feature: Home page
  Scenario: verify only login bar is present
    When I visit homepage
    Then I should see login bar
    But not the signup form
