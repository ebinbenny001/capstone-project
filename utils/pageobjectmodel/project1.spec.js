const { test, expect } = require("@playwright/test");

test("OrangeHRM - Search Verification", async ({ page }) => {
    // Increase test timeout to accommodate slow responses from the public demo site
    test.setTimeout(60000);

    // 1. Open OrangeHRM
    await page.goto("https://opensource-demo.orangehrmlive.com/");

    // 2. Login
    await page.locator('input[name="username"]').fill("Admin");
    await page.locator('input[name="password"]').fill("admin123");
    await page.locator('button[type="submit"]').click();

    // 3. Verify dashboard (allow up to 15s for redirection under slow network)
    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });

    // 4. Open PIM module
    await page.getByRole("link", { name: "PIM" }).click();
    await expect(page).toHaveURL(/pim/, { timeout: 15000 });

    // Wait for the initial employee table to load so we can fetch a valid, active employee
    const tableRow = page.locator(".oxd-table-body .oxd-table-row, .oxd-table-card").first();
    await tableRow.waitFor({ state: "visible", timeout: 15000 });

    // Get an existing employee's first name from the table to guarantee search matches an active record
    const existingFirstName = (await tableRow.locator(".oxd-table-cell").nth(2).textContent())?.trim();
    const searchTerm = existingFirstName ? existingFirstName.slice(0, 3) : "a";

    // 5. Target Employee Name input (use .first() to avoid strict mode violation with Supervisor Name)
    const employeeNameInput = page.getByPlaceholder("Type for hints...").first();

    // 6. Type search character to trigger autocomplete suggestions
    // pressSequentially fires realistic key events needed for OrangeHRM's debounced search
    await employeeNameInput.fill("");
    await employeeNameInput.pressSequentially(searchTerm, { delay: 100 });

    // 7. Wait for autocomplete dropdown and select the first valid suggestion
    // Crucial: Filter out the temporary "Searching..." loading state and "No Records Found"
    const dropdown = page.locator(".oxd-autocomplete-dropdown");
    await dropdown.waitFor({ state: "visible", timeout: 10000 });

    const suggestion = dropdown
        .locator(".oxd-autocomplete-option")
        .filter({ hasNotText: "Searching..." })
        .filter({ hasNotText: "No Records Found" })
        .first();

    await suggestion.waitFor({ state: "visible", timeout: 10000 });
    const selectedName = (await suggestion.textContent())?.trim();
    await suggestion.click();

    // 8. Click Search and wait for the API response and loader
    await Promise.all([
        page.waitForResponse(response => response.url().includes("/pim/employees") && response.status() === 200),
        page.getByRole("button", { name: "Search" }).click()
    ]);
    await page.locator(".oxd-loading-spinner").waitFor({ state: "detached", timeout: 15000 }).catch(() => {});

    // 9. Verify search results contain at least one result row and match the searched employee
    // Using both .oxd-table-row and .oxd-table-card ensures compatibility across desktop and mobile layouts
    const firstRow = page.locator(".oxd-table-body .oxd-table-row, .oxd-table-card").first();
    await expect(firstRow).toBeVisible({ timeout: 15000 });

    if (selectedName) {
        const firstName = selectedName.split(" ")[0];
        await expect(firstRow).toContainText(firstName);
    }
});