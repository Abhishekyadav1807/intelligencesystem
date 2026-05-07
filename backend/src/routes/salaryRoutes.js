import express from "express";
import { z } from "zod";
import { prisma } from "../config/db.js";
import { ingestSchema } from "../validators/salary.js";
import { normalizeCompany, normalizeLevel } from "../utils/normalize.js";

const router = express.Router();

router.post("/ingest-salary", async (req, res) => {
  const parsed = ingestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", errors: parsed.error.issues });
  }

  const payload = parsed.data;
  const company = normalizeCompany(payload.company);
  const level = normalizeLevel(payload.level_standardized);

  if (!["L3", "L4", "L5"].includes(level)) {
    return res.status(400).json({ message: "level_standardized must be one of L3/L4/L5" });
  }

  const total_compensation = payload.base_salary + (payload.bonus ?? 0) + (payload.stock ?? 0);

  try {
    const created = await prisma.salary.create({
      data: {
        company,
        role: payload.role.trim(),
        level,
        location: payload.location.trim(),
        experience_years: payload.experience_years,
        base_salary: payload.base_salary,
        bonus: payload.bonus ?? 0,
        stock: payload.stock ?? 0,
        total_compensation,
        confidence_score: payload.confidence
      }
    });

    return res.status(201).json(created);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Duplicate salary entry" });
    }
    return res.status(500).json({ message: "Failed to ingest salary" });
  }
});

router.get("/salaries", async (req, res) => {
  const where = {};
  if (req.query.company) where.company = normalizeCompany(String(req.query.company));
  if (req.query.role) where.role = String(req.query.role).trim();
  if (req.query.level) where.level = normalizeLevel(String(req.query.level));
  if (req.query.location) where.location = String(req.query.location).trim();

  const orderBy = { total_compensation: req.query.sort === "asc" ? "asc" : "desc" };
  const rows = await prisma.salary.findMany({ where, orderBy });
  res.json(rows);
});

router.get("/company/:company", async (req, res) => {
  const company = normalizeCompany(req.params.company);
  const salaries = await prisma.salary.findMany({
    where: { company },
    orderBy: { total_compensation: "desc" }
  });

  if (!salaries.length) {
    return res.status(404).json({ message: "Company not found" });
  }

  const totals = salaries.map((s) => s.total_compensation).sort((a, b) => a - b);
  const median =
    totals.length % 2 === 1
      ? totals[Math.floor(totals.length / 2)]
      : (totals[totals.length / 2 - 1] + totals[totals.length / 2]) / 2;

  const level_distribution = salaries.reduce((acc, row) => {
    acc[row.level] = (acc[row.level] || 0) + 1;
    return acc;
  }, {});

  res.json({ company, salaries, median_total_compensation: median, level_distribution });
});

router.get("/compare", async (req, res) => {
  const compareSchema = z.object({ salaryId1: z.string().min(1), salaryId2: z.string().min(1) });
  const parsed = compareSchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ message: "salaryId1 and salaryId2 are required" });
  }

  const { salaryId1, salaryId2 } = parsed.data;
  const [s1, s2] = await Promise.all([
    prisma.salary.findUnique({ where: { id: salaryId1 } }),
    prisma.salary.findUnique({ where: { id: salaryId2 } })
  ]);

  if (!s1 || !s2) {
    return res.status(404).json({ message: "One or both salary records not found" });
  }

  res.json({
    salary_1: {
      id: s1.id,
      base: s1.base_salary,
      bonus: s1.bonus,
      stock: s1.stock,
      total: s1.total_compensation,
      level: s1.level
    },
    salary_2: {
      id: s2.id,
      base: s2.base_salary,
      bonus: s2.bonus,
      stock: s2.stock,
      total: s2.total_compensation,
      level: s2.level
    },
    level_difference: `${s1.level} vs ${s2.level}`
  });
});

export default router;
