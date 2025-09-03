import { test } from '@playwright/test';
import { uploadDocumentUI, waitForProcessedUI } from '../helpers/documents';

test('Upload resume pdf via UI and verify progress', async ({ page }) => {
    await page.goto('/');
    await uploadDocumentUI(page, 'Damodharan_Resume_2025.pdf');
    await waitForProcessedUI(page, 'Damodharan_Resume_2025.pdf');
});