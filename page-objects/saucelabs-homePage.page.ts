import { expect, type Locator, type Page, selectors } from "@playwright/test";
import * as fs from "fs";

class SaucelabsHomePage {
  readonly page: Page;
  readonly shoppingcart: Locator;
  readonly shoppingcartBadge: Locator;
  readonly productsLabel: Locator;
  readonly hamburguerMenu: Locator;
  readonly itemSelectedName: Locator;
  readonly itemsList: Locator;
  private storageFile: string = "selectedItem.txt";

  constructor(page: Page) {
    selectors.setTestIdAttribute("data-test");
    this.page = page;
    this.shoppingcart = page.getByTestId("shopping-cart-link");
    this.shoppingcartBadge = page.getByTestId("shopping-cart-badge");
    this.itemsList = page
      .getByTestId("inventory-list")
      .getByTestId("inventory-item");
    this.productsLabel = page.getByText("Products");
    this.hamburguerMenu = page.locator('//button[@id="react-burger-menu-btn"]');
    this.itemSelectedName = page.getByTestId("inventory-item-name");
  }

  async isCheckOutVisible(): Promise<void> {
    await expect(this.shoppingcart).toBeVisible();
    await expect(this.shoppingcartBadge).toHaveText("1");
  }

  async clickOnRandomItem(): Promise<void> {
    const itemCount = await this.itemsList.count();
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * itemCount);
    // Select the random item
    const randomItem = this.itemsList.nth(randomIndex);
    //Locate the add and remove button from the selected item
    const itemButtonAdd = randomItem
      .getByRole("button")
      .filter({ hasText: "Add to cart" });
    const itemButtonRemove = randomItem
      .getByRole("button")
      .filter({ hasText: "Remove" });
    // Click on the random item add button
    await itemButtonAdd.click();
    //Validate that remove button is visible
    await expect(itemButtonRemove).toBeVisible();
    //Get the Text from the random item selected
    const selecteditemText = (await randomItem
      .getByTestId("inventory-item-name")
      .textContent())!;
    // Save the selected item text to a file
    fs.writeFileSync(this.storageFile, selecteditemText.trim());
  }

  async selectedItem(): Promise<string> {
    const itemSelected = fs.readFileSync(this.storageFile, "utf-8").trim();
    return itemSelected;
  }

  async isHamburguerMenuVisible(): Promise<void> {
    await expect(this.hamburguerMenu).toBeVisible();
  }

  async isHompageLabelVisible(): Promise<void> {
    await expect(this.productsLabel).toBeVisible();
  }

  async clickOnCart(): Promise<void> {
    this.shoppingcart.click();
  }
}

export default SaucelabsHomePage;
