import { test, expect } from '@playwright/test';
import { uploadDocumentAPI, processDocumentAPI, pollProcessedStatusAPI } from '../helpers/documents';

test('Upload and process SmartHome_Hub.txt via API', async ({ request }) => {
    const docId = await uploadDocumentAPI(request, 'SmartHome_Hub.txt');
    await processDocumentAPI(request, docId);
    const processed = await pollProcessedStatusAPI(request, docId);
    expect(processed).toBeTruthy();
});