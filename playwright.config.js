// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 120000,
  expect: {
    timeout: 15000,
  },
  reporter: [
    ["line"],
    ["allure-playwright", { outputFolder: "allure-results" }]
  ],
  use: {
    navigationTimeout: 90000,
    actionTimeout: 30000,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    viewport: { width: 1366, height: 768 },
    launchOptions: {
      args: ["--disable-blink-features=AutomationControlled"],
    },
  },
});
