# EduPalliyol Career Compass

A set of standardised career-guidance tests for **Class 8–10 students** in Kerala, in **English and Malayalam**.
Students take two standardised tests and get a report covering their interests and personality, with stream
recommendations (after Class 10) and careers matched to their interest profile.

It is a plain HTML/JS app with no build step, server or sign-up. Open `index.html` in any browser.

## The tests

Only published, research-validated instruments are used, with their official questions and scoring.

| # | Test | Items | Time | Instrument |
|---|------|------:|-----:|------------|
| 1 | Interests (RIASEC) | 60 | ~10 min | O*NET Interest Profiler Short Form (U.S. Department of Labor) |
| 2 | Personality (Big Five) | 20 | ~4 min | Mini-IPIP (Donnellan et al., 2006; public domain) |

Total: 80 questions, about 15 minutes. See `docs/METHODOLOGY.md` for sources, scoring and items still to verify.

## Who uses it

- **Students** take the tests (answers are saved on the device, so they can pause) and get the report. They can print it or save it as a PDF.
- **Parents** get a plain-language "For parents" section in the report.
- **Schools / counsellors** open `counsellor.html` and load the result files students download (`.json`), to
  see a class list, open any report and export a CSV. Everything stays in the browser; nothing is uploaded.

## Project layout

```
index.html              student app
counsellor.html         counsellor dashboard
assets/js/data/         item banks (bilingual) and the career/stream database
assets/js/scoring.js    scoring engine (pure functions)
assets/js/report.js     report rendering
assets/js/app.js        test-taking flow, timers, saving
assets/js/counsellor.js dashboard
docs/METHODOLOGY.md     how scoring works, quality checks, validation roadmap
assets/js/sheet.js      compact two-page report (print/PDF) and the demo report
assets/pdf/             demo report PDFs (English, Malayalam)
tests/run.js            item-bank and scoring tests: `node tests/run.js`
```

## Running

Open `index.html` directly, or serve the folder (for example `npx serve .`) and host it on any static host
(GitHub Pages, Netlify, Vercel).
