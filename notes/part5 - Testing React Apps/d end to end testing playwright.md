# [End to end testing: Playwright](https://fullstackopen.com/en/part5/end_to_end_testing_playwright)

- Will test the system as a whole
  - Called End to End (E2E) testing
- Will use Playwright

### Playwright

- Playwright runs in the Node process, which is connected to browser via programming interface
- Supports all browsers

### Initializing tests

- Unlike backend tests and unit tests, dont E2E tests dont  need to be in same npm project as code
- Make separate project (directory) for E2E tests, cd into it
- Then install Playwright:

```bash
npm init playwright@latest
```

- Make npm script in `package.json`:

```json
{
  // ...
  "scripts": {
  "test": "playwright test",
  "test:report": "playwright show-report"
  },
  // ...
}
```

- During install, console has following which are locations for example tests:

```bash
And check out the following files:
  - .\tests\example.spec.js - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.js - Demo Todo App end-to-end tests
  - .\playwright.config.js - Playwright Test configuration
```

- Run test:

```bash
$ npm test

> notes-e2e@1.0.0 test
> playwright test


Running 6 tests using 5 workers
  6 passed (3.9s)

To open last HTML report run:

  npx playwright show-report
```

- Tests passed
- More detailed report with command:

```bash
npm run test:report
```

- Create graphical UI for tests:

```bash
npm run test -- --ui
```

### Testing our own code

- Remove sample tests
- Playwright tests assume system under test is running
  - Unlike backend test which start the system in testing
- Make npm script for backend 
  - Starts in testing mode using *NODE_ENV*:

```json
{
  // ...
  "scripts": {
  // ...
  "start:test": "cross-env NODE_ENV=test node --watch index.js"
  },
  // ...
}
```

- Start backend and front end 
  - Run `npm run start:test` for backend and `npm run dev` for frontend
- Create first test file for app `tests/notes_app.spec.js` in playwright folder:

```js
const { test, expect } = require('@playwright/test')

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const locator = page.getByText('Notes')
  await expect(locator).toBeVisible()
  await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
})
```

- First, test open page with `page.goto`
- Then, uses `getByText` to find element that has text 'Notes'
- `toBeVisible` ensures element is visible at page
- Next check uses auxiliary variable (doesn't define variable)
  - Causes error since wrong year in test (2024, not 2025)
  - Error shows its in all three browsers
- A report gets opened:

![alt text](/images/playwrightReport.png)

- Clicking on report gives more info 
