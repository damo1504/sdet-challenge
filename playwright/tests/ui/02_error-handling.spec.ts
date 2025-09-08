import { test, expect } from '@playwright/test';
import * as path from 'path';

test('Show alert for unsupported file type upload', async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Failed to upload file. Please try again.');
        await dialog.accept();
    });

    const filePath = path.resolve(__dirname, '../../fixtures/OperaSetup.zip');
    await page.setInputFiles('input[type="file"]', filePath);

    await expect(page.locator('span.text-sm.truncate', { hasText: 'OperaSetup.zip' })).not.toBeVisible();
});