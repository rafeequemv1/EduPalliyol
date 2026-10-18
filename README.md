# EduPalliyol Career Compass

A set of standardised career-guidance tests for **Class 8–10 students** in Kerala, in **English and Malayalam**.
Students take five short tests and get a detailed report covering their interests, aptitudes, personality and
work values, with stream recommendations (after Class 10) and matched careers.

It is a plain HTML/JS app with no build step, server or sign-up. Open `index.html` in any browser.

## The tests

| # | Test | Items | Time | Based on |
|---|------|------:|-----:|----------|
| 1 | Interests (RIASEC) | 48 + 1 check | ~8 min | Holland's RIASEC model / O*NET Interest Profiler structure |
| 2 | Aptitude: verbal, numerical, logical, mechanical | 40 | 26 min (timed) | Original reasoning items |
| 3 | Personality (Big Five) | 20 + 1 check | ~4 min | Mini-IPIP (Donnellan et al., 2006, public domain) |
| 4 | Work values | 18 | ~3 min | Six O*NET work values |
| 5 | School subjects | 11 | ~2 min | Subject liking, for stream fit |

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
tests/run.js            item-bank and scoring tests: `node tests/run.js`
```

## Running

Open `index.html` directly, or serve the folder (for example `npx serve .`) and host it on any static host
(GitHub Pages, Netlify, Vercel).
