# Finacplus Automation Framework

JavaScript + Playwright automation for **UI** (DemoQA Books Store) and **API** (ReqRes.in).

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
npx playwright install
```

### UI tests – create a user first

1. Open [https://demoqa.com/](https://demoqa.com/)
2. Go to **Book Store Application** → **Login** → **New User**
3. Register a new user (e.g. username, password)
4. Create a `.env` file (copy from `.env.example`) and set:

```env
DEMOQA_USERNAME=your_username
DEMOQA_PASSWORD=your_password
```

Or set env vars in the shell before running:

```bash
set DEMOQA_USERNAME=your_username
set DEMOQA_PASSWORD=your_password
npm run test:ui
```

**ReqRes.in API:** If API tests return 403, get a free key at [app.reqres.in](https://app.reqres.in/) and set `REQRES_API_KEY=your_key` in `.env`.

## Run tests

| Command               | Description               |
| --------------------- | ------------------------- |
| `npm test`            | Run all tests (UI + API)  |
| `npm run test:ui`     | Run only DemoQA UI tests  |
| `npm run test:api`    | Run only ReqRes API tests |
| `npm run test:headed` | Run with browser visible  |
| `npm run report`      | Open last HTML report     |

## What’s automated

### UI (DemoQA)

- Navigate to https://demoqa.com/
- Open **Book Store Application** → **Login**
- Log in with credentials from `.env`
- Check that username and **Log out** button are visible
- Open **Book Store**, search for **"Learning JavaScript Design Patterns"**
- Check that the book appears in results
- Write **Title**, **Author**, **Publisher** to `output/book-details.txt`
- Click **Log out**

### API (ReqRes.in)

- **Create user** – POST, assert status 201, save `userId`
- **Get user** – GET by id, validate response
- **Update user** – PUT name, validate updated data

## Output

- UI: book details → `output/book-details.txt`
- Reports: `playwright-report/` and `test-results/`
