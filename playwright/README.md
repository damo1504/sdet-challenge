# Playwright RAG Tests

This repository contains end-to-end tests for the `rag` application using Playwright. Tests cover functional, api checks, with Docker integration for easy setup and execution.

---

## Prerequisites

Before running the tests, make sure you have:

- Docker installed
- Docker Compose installed
- Node.js (if running locally without Docker)
- A `.env` file in the project root containing environment variables:

```env
OPENAI_API_KEY=your_openai_api_key
```

Do not commit the `.env` file to version control.

---

## Quick Start

Run all tests using Docker:

```bash
git clone https://github.com/damo1504/sdet-challenge.git
cd sdet-challenge/playwright
docker-compose build
docker-compose up
docker-compose run playwright-tests
cd playwright
npm run report:allure
```

Run tests locally without Docker:

```bash
cd playwright
npm install
npm run test:install-pw
npm run test:ci
npm run report:allure
```

---

## Folder Structure

```
/playwright
|
├─ tests/            # Playwright test files
├─ playwright.config.ts          # Playwright config files
├─ fixtures/         # Test fixtures if any
├─ allure-results/   # Test reports output
└─ package.json      # Node dependencies and scripts
```

---

## Running Tests

### Using Docker

1. Build and start services:

```bash
docker-compose build
docker-compose up
```

2. Run Playwright tests:

```bash
docker-compose run playwright-tests
```

### Running Locally (without Docker)

1. Install dependencies:

```bash
npm install
npx playwright install --with-deps
```

2. Run all tests:

```bash
npx playwright test
```

3. Run a specific test file:

```bash
npx playwright test tests/my-test.spec.ts
```

---

## Test Reports

- Test results are saved in `playwright/allure-results`.
- Generate and view Allure reports:

```bash
npx allure generate ./playwright/allure-results --clean -o ./playwright/allure-report
npx allure open ./playwright/allure-report
```

---

## Adding New Tests

1. Add a new `.spec.ts` or `.spec.js` file in `playwright/tests/`.
2. Use Playwright’s `page` and `expect` objects.
3. Update any fixtures or configuration in `playwright/configs` if necessary.

---

## Notes

- Ensure the app service is running before starting tests.
- Use `npx wait-on http://app:8000` to ensure the API is ready.
- Only mount the `allure-results` folder to avoid overwriting `node_modules`.
- Keep secrets safe in the `.env` file.

---

## References

- Playwright Documentation
- Playwright Test Runner
- Docker Compose