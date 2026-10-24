# Methodology

**Rule for this project:** every question comes from a published, research-validated instrument, used with its
official wording, order, response scale and scoring. Nothing is invented. New tests are added only when their
items and licence have been obtained from the official source.

## 1. Instruments in use

| Test | Instrument | Items | Source and licence |
|------|-----------|------:|--------------------|
| Interests | **O\*NET Interest Profiler Short Form** | 60 (10 per RIASEC area) | National Center for O\*NET Development, U.S. Department of Labor. Free under the O\*NET Career Exploration Tools licence. Rounds, Su, Lewis & Rivkin (2010), *O\*NET Interest Profiler Short Form Psychometric Characteristics*. |
| Personality | **Mini-IPIP** (Big Five) | 20 (4 per trait) | Donnellan, Oswald, Baird & Lucas (2006), *Psychological Assessment, 18*(2), 192–203. International Personality Item Pool, public domain. |

**Removed** in scoring version 2.0 because their questions were written for this app and not validated: the
aptitude test, the work-values questionnaire, the school-subject ratings and the attention-check items.

## 2. Scoring

**Interest Profiler (official scoring).** Strongly dislike = 0, Dislike = 1, Unsure = 2, Like = 3, Strongly like = 4.
Each RIASEC area's raw score is the sum of its 10 items (0–40). The interest code is the three highest areas.
Differentiation (highest minus lowest, on a 0–100 scale) below 15 is reported as "interests still forming".

**Mini-IPIP (official keying).** Very inaccurate = 1 … Very accurate = 5. Reverse-keyed items (6, 7, 8, 9, 10,
15, 16, 17, 18, 19, 20) are scored 6 − x. A trait score is the mean of its 4 items, shown on a 0–100 scale.
Neuroticism is shown reversed as *Emotional stability*. Personality is reported to help self-understanding. It is
**not** used for career matching, because personality–occupation links are much weaker than interest–occupation
links.

**Career fit (0–100).** Interest congruence between the student's RIASEC profile and each career's O\*NET
interest code: 60% × profile-shape correlation (the career code weighted 1, 0.6 and 0.3 for its three letters) +
40% × the student's interest level in those three areas. Interest congruence is the best-established
predictor of career satisfaction and persistence (Nye, Su, Rounds & Drasgow, 2012).

**Stream fit.** The mean fit of the three best-matching careers that the stream leads to.

**Response quality.** These rules come from no single published source; they are common screening practice
and should be calibrated in the pilot.

| Check | Rule |
|-------|------|
| Straight-lining | ≥ 80% identical answers in a test |
| Speeding | Median response time under 0.8 s in a test |
| Incomplete | A test not finished |

Result: **Good**, **Caution** (one flag, or a missing test) or **Retake** (two or more flags).

## 3. Open items to verify

1. **Interest Profiler wording.** The 60 item texts were entered from the official Short Form, but this build
   environment could not download the official files to compare them. Check every item against
   <https://www.onetcenter.org/dl_tools/ipsf/Interest_Profiler.pdf> once. Item 23 differs between versions
   ("Install software across computers on a large network" in newer releases, "Load computer software into a
   large computer network" in older ones).
2. **Career interest codes.** Replace the three-letter codes in `assets/js/data/careers.js` with exact values
   from the O\*NET database file `Interests.txt` (CC BY 4.0), mapping each career to its O\*NET-SOC code.
3. **Licence.** Read the O\*NET Career Exploration Tools licence (<https://www.onetcenter.org/license_tools.html>)
   for translation and attribution requirements.
4. **Malayalam translation.** Translations are written as complete, simple sentences for Class 8–10 readers.
   Interest items are phrased as questions ("Do you like to …?"), which matches the like/dislike scale.
   Before use with students, follow the ITC translation guidelines: an independent back-translation into
   English, review by a bilingual psychologist, and a small cognitive pre-test with students.
5. **Age group.** Both instruments were developed mainly with adults and older adolescents. The pilot must
   check reliability (Cronbach's α) for Class 8–10 students in English and Malayalam.

## 4. Planned additions (only from published sources)

- **Aptitude.** International Cognitive Ability Resource (ICAR, icar-project.org): verbal reasoning, letter-number
  series, matrix reasoning and 3D rotation items, available free after registration. Check its licence for
  commercial use.
- **Work values.** O\*NET Work Importance Profiler, so careers can also be matched on O\*NET occupational
  work-value profiles.

## 5. Roadmap to Kerala norms

1. Expert review of the Malayalam translation (see 3.4).
2. Pilot with 300–500 students: reliability, item statistics, English–Malayalam equivalence.
3. Norms from about 2,000 students, stratified by class, gender, district and school type. Report percentiles.
4. Follow students into Plus Two to check whether stream recommendations predict satisfaction and performance.
