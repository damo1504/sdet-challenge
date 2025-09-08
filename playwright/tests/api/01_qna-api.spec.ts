import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { askQuestionWithRetry } from '../helpers/documents';

const qaPath = path.resolve(__dirname, '../../fixtures/smarthome_qa.json');
const questionsAndAnswers = JSON.parse(fs.readFileSync(qaPath, 'utf-8'));

test('Q&A for uploaded document via API', async ({ request }) => {
    for (const [index, { question, phrases }] of questionsAndAnswers.entries()) {
        console.log(`Q${index + 1}: "${question}"`);
        const body = await askQuestionWithRetry(request, question, 5, 3000);
        for (const phrase of phrases) {
            expect(body.answer.toLowerCase()).toContain(phrase.toLowerCase());
        }
    }
});