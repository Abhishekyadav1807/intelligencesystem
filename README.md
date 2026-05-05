# Compensation Intelligence System (MERN, JavaScript Only)

## Stack
- MongoDB + Mongoose
- Express.js
- React + Vite + Tailwind CSS
- Node.js

## Local Run
### Backend
1. `cd backend`
2. Copy `.env.example` -> `.env`
3. Set `MONGODB_URI`
4. `npm install`
5. `npm run dev`

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
  "location": "Bengaluru",
  "experience_years": 4,
  "base_salary": 3200000,
  "bonus": 400000,
  "stock": 1200000,
  "confidence": 0.92
}
```

## Rules Implemented
- Company normalization (`trim().toLowerCase()`)
- Level strictness (`L3 | L4 | L5`)
- Missing `bonus`/`stock` -> `0`
- `total_compensation = base + bonus + stock`
- Invalid numeric payload rejection
- Duplicate prevention via unique compound index

## Reverse Engineering Deliverables
- `docs/phase1-analysis.md`
- `docs/feature-mapping.csv`

## Deployment (Submission Ready)
### Backend on Render
- `render.yaml` is included at repo root
- Create a new Render Web Service from this repo
- Set environment variable `MONGODB_URI`
- Start command: `npm start`

### Frontend on Vercel
- `frontend/vercel.json` is included
- Import `frontend` as project root in Vercel
- Set `VITE_API_BASE_URL` to your Render backend URL + `/api`

## Quick Publish Commands
```bash
git add .
git commit -m "Build compensation intelligence system (MERN JS)"
git remote add origin <your-repo-url>
git push -u origin main
```
