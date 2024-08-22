import { expect, Locator, Page, selectors } from "@playwright/test";

class SaucelabsCheckout {
  readonly page: Page;
  readonly shoppingcart: Locator;
  readonly itemName: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingbutton: Locator;
  readonly yourCartLabel: Locator;

  constructor(page: Page) {
    selectors.setTestIdAttribute("data-test");
    this.page = page;
    this.shoppingcart = page.getByTestId("shopping-cart-link");
    this.itemName = page.getByTestId("inventory-item-name");
    this.removeButton = page.getByText("Remove");
    this.checkoutButton = page.getByText("Checkout");
    this.continueShoppingbutton = page.getByTestId("continue-shopping");
    this.yourCartLabel = page.getByTestId("title");
  }

  async validateCheckout(): Promise<void> {
    await expect(this.yourCartLabel).toBeVisible();
    await expect(this.yourCartLabel).toHaveText("Your Cart");
  }

  async validateItemsSelected(element: string): Promise<void> {
    console.log("item on check page" + this.itemName.textContent());
    expect(await this.itemName.textContent()).toEqual(element);
  }

  async validateButtons(): Promise<void> {
    await expect(this.checkoutButton).toBeVisible();
    await expect(this.removeButton).toBeVisible();
    await expect(this.continueShoppingbutton).toBeVisible();
  }
}

export default SaucelabsCheckout;
