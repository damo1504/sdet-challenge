import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const qaPath = path.resolve(__dirname, '../../fixtures/resume_qa.json');
const questionsAndAnswers = JSON.parse(fs.readFileSync(qaPath, 'utf-8'));

test('Q&A for uploaded document via UI', async ({ page, baseURL }) => {
    await page.goto(baseURL!);

    for (const { question, phrases } of questionsAndAnswers) {
        await page.fill('textarea[placeholder*="Ask a question"]', question);
        const askBtn = page.locator('button:has-text("Ask Question")');
        await expect(askBtn).toBeEnabled();
        await askBtn.click();

        await expect(askBtn).toBeEnabled({ timeout: 60000 });

        const answerLocator = page.locator('.p-4.bg-secondary.rounded-md > p');
        for (const phrase of phrases) {
            await expect(answerLocator).toContainText(phrase, { timeout: 20000 });
        }
    }
});