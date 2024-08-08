import { expect, selectors, type Locator, type Page } from "@playwright/test";

class SaucelabsLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly swagLabsLabel: Locator;
  readonly saucelabUrl: string;

  constructor(page: Page) {
    selectors.setTestIdAttribute("data-test");
    this.page = page;
    this.usernameInput = page.locator("id=user-name");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByTestId("login-button");
    this.swagLabsLabel = page.getByText("Swag Labs");
    this.saucelabUrl = "/";
  }
  //Functions
  //Url Navigation function
  async goToSaucelabUrl(): Promise<void> {
    await this.page.goto(this.saucelabUrl);
  }

  //Add user name function
  async addUserName(userName: string): Promise<void> {
    expect(this.usernameInput).toBeVisible();
    await this.usernameInput.fill(userName);
  }

  //Add password function
  async addPasssword(password: string): Promise<void> {
    expect(this.passwordInput).toBeVisible();
    await this.passwordInput.fill(password);
  }

  //login click function
  async clickLogin(): Promise<void> {
    expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }

  //Login page validation
  async isLoginPageLabelValid(): Promise<void> {
    expect(this.swagLabsLabel).toContainText("Swag Labs");
  }
}

export default SaucelabsLoginPage;
