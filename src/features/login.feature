Feature: Paribu Login Validation

  Scenario: Login attempt with invalid credentials shows error message
    Given I am on the login page   
    When I click the Login button in the menu
    And I fill in the login form with invalid data
      | Mobile Number | Password  |
      | 5553188940    | wrongPass |
    And I click the Login button
    Then I should see an error message with text "Girdiğiniz bilgileri kontrol edin"
