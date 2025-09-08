import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  workers: 1,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000',
    ignoreHTTPSErrors: true,
    headless: true,
  },
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});
