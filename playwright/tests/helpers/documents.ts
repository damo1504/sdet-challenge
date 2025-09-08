import * as fs from 'fs';
import * as path from 'path';
import { APIRequestContext, Page, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8000';

export async function uploadDocumentAPI(request: APIRequestContext, fileName: string, mimeType = 'text/plain') {
    const filePath = path.resolve(__dirname, '../../fixtures', fileName);
    const uploadRes = await request.post(`${BASE_URL}/documents/upload/`, {
        multipart: {
            file: {
                name: fileName,
                mimeType,
                buffer: fs.readFileSync(filePath),
            },
        },
    });
    expect(uploadRes.ok()).toBeTruthy();
    const uploadBody = await uploadRes.json();
    return uploadBody.id;
}

export async function processDocumentAPI(request: APIRequestContext, docId: string) {
    const processRes = await request.post(`${BASE_URL}/documents/process/${docId}`);
    expect(processRes.ok()).toBeTruthy();
}

export async function pollProcessedStatusAPI(request: APIRequestContext, docId: string, maxTries = 10, interval = 2000) {
    for (let i = 0; i < maxTries; i++) {
        const statusRes = await request.get(`${BASE_URL}/documents/`);
        const statusDocs = await statusRes.json();
        const doc = statusDocs.find((d: any) => d.id === docId);
        if (doc && doc.processed) return true;
        await new Promise(r => setTimeout(r, interval));
    }
    return false;
}

export async function askQuestionWithRetry(request: APIRequestContext, question: string, maxTries = 20, interval = 3000) {
    for (let i = 0; i < maxTries; i++) {
        const res = await request.post(`${BASE_URL}/qna/`, {
            data: { message: question },
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(`QnA Try #${i + 1} → Status: ${res.status()}`);

        if (res.ok()) {
            const body = await res.json();
            if (body.answer && body.answer.trim() !== '') return body;
        }

        console.log('No answer yet, retrying...');
        await new Promise(r => setTimeout(r, interval));
    }
    throw new Error(`No answer received after ${maxTries} attempts for question: "${question}"`);
}

export async function uploadDocumentUI(page: Page, fileName: string) {
    const filePath = path.resolve(__dirname, '../../fixtures', fileName);
    await page.setInputFiles('input[type="file"]', filePath);
    const uploadBtn = page.locator('button:has(svg.lucide-upload)');
    await expect(uploadBtn).toBeEnabled();
    await uploadBtn.click();
}

export async function waitForProcessedUI(page: Page, fileName: string) {
    const row = page.locator('div.flex.items-center.justify-between', { hasText: fileName });
    await expect(row).toBeVisible();

    await expect(row.locator('div.inline-flex:has-text("Unprocessed")')).toBeVisible();

    let playBtn = row.locator('button[aria-label="Process file"]:not([disabled])');
    await playBtn.click();

    playBtn = row.locator('button[aria-label="Process file"]');
    await expect(playBtn).toBeDisabled({ timeout: 60000 });

    await expect(row.locator('div.inline-flex:has-text("Processed")')).toBeVisible();
}