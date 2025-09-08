FROM mcr.microsoft.com/playwright:v1.47.0-jammy

WORKDIR /tests

COPY playwright/package*.json ./

RUN npm install

COPY playwright/ .

RUN npx playwright install --with-deps

CMD ["sh", "-c", "npx wait-on http://app:8000 && npm run test:ci"]
