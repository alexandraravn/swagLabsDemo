import { test, expect, selectors } from "@playwright/test";
import SaucelabsLoginPage from "../page-objects/saucelabs-login.page";
import SaucelabsHomePage from "../page-objects/saucelabs-homePage.page";
import SaucelabsCheckout from "../page-objects/saucelabs-checkOut.page";
import constants from "../data/constants.json";

test.describe("Login Page Scenarios", () => {
  const userName = constants.USERNAME;
  const password = constants.PASSWORD;

  test("TC01: Login Page validation @SmokeTest @Regression", async ({page}) => {
    const loginPage = new SaucelabsLoginPage(page);
    await loginPage.goToSaucelabUrl();
    await loginPage.isLoginPageLabelValid();
    await loginPage.addUserName(userName);
    await loginPage.addPasssword(password);
    await loginPage.clickLogin();
    await loginPage.page.waitForTimeout(1000);
    await loginPage.page.close();
  });

  test("TC02 Login and add to cart test @Regression", async ({ page}) => {
    const loginPage = new SaucelabsLoginPage(page);
    const homePage = new SaucelabsHomePage(page);
    await loginPage.goToSaucelabUrl();
    await loginPage.isLoginPageLabelValid();
    await loginPage.addUserName(userName);
    await loginPage.addPasssword(password);
    await loginPage.clickLogin();
    await homePage.isHompageLabelVisible();
    await homePage.clickOnRandomItem();
    await homePage.isCheckOutVisible();
    await homePage.clickOnCart();
    await homePage.page.waitForTimeout(1000);
    await homePage.page.close();
  });

  test("TC03 Login, Add to cart and checkout Test @SmokeTest @Regression", async ({ page}) => {
    const loginPage = new SaucelabsLoginPage(page);
    const homePage = new SaucelabsHomePage(page);
    const checkoutPage = new SaucelabsCheckout(page);
    await loginPage.goToSaucelabUrl();
    await loginPage.isLoginPageLabelValid();
    await loginPage.addUserName(userName);
    await loginPage.addPasssword(password);
    await loginPage.clickLogin();
    await homePage.isHompageLabelVisible();
    await homePage.clickOnRandomItem();
    await homePage.isCheckOutVisible();
    await homePage.clickOnCart();
    await checkoutPage.validateButtons();
    await checkoutPage.validateCheckout();
    await checkoutPage.validateItemsSelected(await homePage.selectedItem());
    await homePage.page.waitForTimeout(1000);
    await checkoutPage.page.close();
  });
});
