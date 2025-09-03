import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const qaPath = path.resolve(__dirname, '../../fixtures/smarthome_qa.json');
const questionsAndAnswers = JSON.parse(fs.readFileSync(qaPath, 'utf-8'));

test('Q&A for uploaded document via API', async ({ request }) => {
    for (const { question, phrases } of questionsAndAnswers) {
        const res = await request.post('/qna/', {
            data: { message: question },
            headers: { 'Content-Type': 'application/json' }
        });
        expect(res.ok()).toBeTruthy();
        const body = await res.json();
        for (const phrase of phrases) {
            expect(body.answer.toLowerCase()).toContain(phrase);
        }
    }
});