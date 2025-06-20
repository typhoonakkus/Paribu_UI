import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/LoginPage';

let loginPage: LoginPage;

Given('I am on the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.goToLoginPage();
});

When('I click the Login button in the menu', async function () {
  await loginPage.clickLoginButtonOnMenu();
});

When('I fill in the login form with invalid data', async function (dataTable) {
  const data = dataTable.hashes()[0]; 
  console.log('Parsed data:', data);
  await loginPage.fillLoginForm(data['Mobile Number'], data['Password']);
});

When('I click the Login button', async function () {
  await loginPage.submitLogin();
});

Then('I should see an error message with text {string}', async function (expectedText: string) {
  const actualMessage = await loginPage.getErrorMessage();
  await loginPage.assertEquals(actualMessage, expectedText);
});
