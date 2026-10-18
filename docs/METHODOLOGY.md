# Methodology

This document explains how the tests are scored and what has to happen before the results can be called
fully *standardised* (normed and validated on Kerala students).

## 1. Scales

**Interests (RIASEC).** 8 items per type: Realistic, Investigative, Artistic, Social, Enterprising, Conventional.
Students rate each on a 1–5 like/dislike scale. Each type's score is `(mean − 1) / 4 × 100`. The top three
types form the interest code, e.g. `ISR`. *Differentiation* (highest score minus lowest) below 15 points is
reported as "interests still forming", which is common at this age.

**Aptitude.** Four timed sections of 10 items each (6–7 min per section). The score is percent correct. Verbal
items test reasoning with meanings (analogies, odd-one-out, inference), not English vocabulary, so the Malayalam
version measures the same thing. Until norms exist, bands are criterion-based: ≥80 very strong, 60–79 strong,
40–59 average, <40 developing.

**Personality.** Mini-IPIP, 20 items with 4 per Big Five trait, half of them reverse-keyed. Neuroticism is
reported reversed as *Emotional stability*. Bands: >65 high, 40–65 mid, <40 low.

**Work values.** 3 items for each of the six O*NET work values (Achievement, Independence, Recognition,
Relationships, Support, Working conditions). The top three are reported.

**Subjects.** Liking for 11 school subjects, used only in the stream score.

## 2. Career fit (0–100)

Each career in `assets/js/data/careers.js` has a Holland code, aptitude importance weights (0–3), the work
values it satisfies, helpful traits and the streams that lead to it.

| Component | Weight | Calculation |
|-----------|-------:|-------------|
| Interest | 50% | 60% × Pearson correlation between the student's RIASEC profile and the career's code vector (1, 0.6, 0.3 for its three letters), plus 40% × the student's interest level in those letters |
| Aptitude | 25% | Mean of the student's section scores, weighted by the career's importance weights |
| Values | 15% | Mean score on the career's values |
| Personality | 10% | Mean score on the career's helpful traits |

Interests carry the most weight because they are the best-established predictor of career satisfaction and
persistence. Missing components (an unfinished test) are left out and the remaining weights are renormalised.
The report explains each match ("Matches your Investigative interest", "Uses your strength in numerical
ability") and points out any critical aptitude scoring below 40.

## 3. Stream fit

For each stream (Science–Biology, Science–CS/Maths, Commerce, Humanities, Vocational/Technical):
50% × the mean fit of its top 3 careers, 30% × liking for its core subjects, 20% × its aptitude profile.

## 4. Response-quality checks

| Check | Rule |
|-------|------|
| Attention items | 2 embedded "please choose X" items |
| Straight-lining | ≥80% identical answers in a Likert test |
| Speeding | Median response time < 0.8 s on a Likert test |
| Aptitude guessing | Median time < 2.5 s together with mean score ≤ 35% |
| Incomplete | Any of the five tests not finished |

Result: **Good**, **Caution** (any flag or a missing test) or **Retake** (both attention checks failed, or 3+ flags).

## 5. Roadmap to full standardisation

The item content and scoring are a **pilot edition**. To produce highly accurate, standardised reports:

1. **Expert review.** Career counsellors and teachers review items for clarity and age-fit. Native speakers
   review the Malayalam with back-translation (Malayalam → English by a second translator).
2. **Pilot (n ≈ 300–500).** Run in a few schools, then compute item difficulty and discrimination (aptitude) and
   item–total correlations. Drop or rewrite weak items.
3. **Reliability.** Target Cronbach's α ≥ 0.75 for each interest scale and ≥ 0.70 for each aptitude section. Run a
   test–retest after 4 weeks on a subsample. Lengthen any scale that misses its target.
4. **Validity.** Check the RIASEC structure (the hexagon correlation pattern), correlate aptitude with school
   marks, and check that English and Malayalam versions are equivalent (measurement invariance).
5. **Norms (n ≥ 2,000).** Stratify by class, gender, district and school type. Replace aptitude bands with
   percentiles and add norm-referenced interest scores.
6. **Outcome validation.** Follow students into Plus Two and check whether stream recommendations predict
   satisfaction and performance. Recalibrate the fit weights from that data.
7. **Spatial reasoning.** Add a figure-based spatial section (important for engineering, architecture and design).
