# Phase 1 Reverse Engineering (as of May 5, 2026)

## 1) Salary Listing Page

### Levels.fyi
- Good: Strong level-first framing, multiple entry points (By Company/Location/Title), explicit total compensation orientation.
- Good: Encourages structured submissions and verification pathways.
- Missing: Public table details are sometimes hidden behind navigation depth and dynamic UX.

### 6figr
- Good: Visible split of base/stock/bonus/TC and level-like labels in listings.
- Good: Emphasis on "verified profiles" messaging.
- Weak: Level semantics are inconsistent across companies (e.g., "Level 6" can mean different scope).

### AmbitionBox
- Good: Massive volume, role and experience discoverability.
- Weak: Mostly title + range orientation, weak standardized level mapping.
- Weak: Heavy aggregation without comparable level normalization.

### Glassdoor
- Good: Shows base vs additional pay and recency.
- Good: Includes confidence signals and data freshness cues.
- Weak: Level normalization is weak or not central for comparison.

### IndiaTechSalaries
- Public indexing was limited during this analysis window; product appears focused on India tech salary exploration.
- Inference: Useful market context, but level-system maturity appears less explicit than Levels.fyi.

## 2) Company Page
- Levels.fyi: company-level exploration is comp-forward and level-aware.
- 6figr: strong compensation slices but level definitions vary by employer.
- AmbitionBox/Glassdoor: rich company context but usually title/experience-centric first.
- Decision: Our build prioritizes company median TC + level distribution + raw salary rows.

## 3) Salary Submission Flow
- Levels.fyi: supports document upload and manual flow; trust layer emphasized.
- 6figr: verification/trust language is prominent.
- AmbitionBox/Glassdoor: traditional crowd-reporting model with varying structure.
- Decision: strict backend schema validation, normalize company name, reject invalid numbers, default bonus/stock=0, duplicate protection.

## 4) Comparison Flow
- Levels.fyi/6figr both reinforce compensation breakdowns.
- Decision: implement `/compare` on exact salary IDs with base/bonus/stock/total + level difference.

## Key Product Differences (Opinionated)
- Biggest winner pattern: standardized leveling + structured compensation components.
- Biggest loser pattern: title-only salary ranges without level normalization.
- Required design principle: structured -> queryable -> comparable -> decision-ready.

## What We Build vs Skip
- Build: core ingestion + normalized level model + filterable salary table + company intelligence + 2-record comparison.
- Skip: auth, reviews, chat, AI assistants, decorative product surfaces.
