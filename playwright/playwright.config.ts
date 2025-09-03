import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  workers: 1,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000',
    headless: true,
  },
  reporter: [
    ['list'],
    ['allure-playwright'],
  ],
});
