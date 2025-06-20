import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { config } from '../config/env';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToLoginPage() {
    await this.page.goto(config.baseUrl);
  }

  async closeCookieNotice() {
    await this.closeCookies();
  }

  async clickLoginButtonOnMenu() {
    await this.safeClick(this.page.getByText("Giriş Yap")); 
  }

  async fillLoginForm(mobileNumber: string, password: string) {    
    await this.safeFill('#yourPhoneNumber', mobileNumber);
    await this.safeFill('#password', password);
  }

  async submitLogin() {
    await this.safeClick('button[type="submit"]');
  }

  async getErrorMessage(): Promise<string> {
    const selector = 'p.mb-2.f-title-small.t-text-primary';
    await this.expectToBeVisible(selector);  
    return this.getText(selector);
    }
}
