import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    company: { type: String, required: true, index: true },
    role: { type: String, required: true, index: true },
    level: { type: String, required: true, enum: ["L3", "L4", "L5"], index: true },
    location: { type: String, required: true, index: true },
    experience_years: { type: Number, required: true, min: 0, max: 50 },
    base_salary: { type: Number, required: true, min: 0 },
    bonus: { type: Number, required: true, default: 0, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    total_compensation: { type: Number, required: true, min: 0, index: true },
    confidence_score: { type: Number, required: true, min: 0, max: 1 }
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

salarySchema.index(
  {
    company: 1,
    role: 1,
    level: 1,
    location: 1,
    experience_years: 1,
    base_salary: 1,
    bonus: 1,
    stock: 1
  },
  { unique: true }
);

export const Salary = mongoose.model("Salary", salarySchema);
