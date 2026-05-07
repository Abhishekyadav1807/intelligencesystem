# Compensation Intelligence System (MERN Frontend + Prisma/PostgreSQL Backend)

## Stack
- PostgreSQL + Prisma
- Express.js
- React + Vite + Tailwind CSS
- Node.js

## Local Run
### Backend
1. `cd backend`
2. Copy `.env.example` -> `.env`
3. Set `DATABASE_URL`
4. `npm install`
5. `npm run prisma:generate`
6. `npm run prisma:migrate`
7. `npm run dev`

### Frontend
1. `cd frontend`
2. Copy `.env.example` -> `.env`
3. Set `VITE_API_BASE_URL`
4. `npm install`
5. `npm run dev`

## API Endpoints
- `POST /api/ingest-salary`
- `GET /api/salaries?company=&role=&level=&location=&sort=asc|desc`
- `GET /api/company/:company`
- `GET /api/compare?salaryId1=<id>&salaryId2=<id>`

## Ingest Contract
```json
{
  "company": "Google ",
  "role": "Software Engineer",
  "level_standardized": "L4",
  "base_salary": 3200000,
  "bonus": 400000,
  "stock": 1200000,
  "confidence": 0.92
}
```

Notes:
- `location` and `experience_years` are accepted as optional fields.
- If omitted, defaults are `location="unknown"` and `experience_years=0`.

## Rules Implemented
- Company normalization (`trim().toLowerCase()`)
- Level strictness (`L3 | L4 | L5`)
- Missing `bonus`/`stock` -> `0`
- `total_compensation = base + bonus + stock`
- Invalid numeric payload rejection
- Duplicate prevention via unique composite constraint

## Reverse Engineering Deliverables
- `docs/phase1-analysis.md`
- `docs/feature-mapping.csv`

## Deployment (Submission Ready)
### Backend on Render
- `render.yaml` included at repo root
- Set `DATABASE_URL` in Render env vars

### Frontend on Vercel
- `frontend/vercel.json` included
- Set `VITE_API_BASE_URL` to Render backend URL + `/api`
