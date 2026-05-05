import "dotenv/config";
import express from "express";
import cors from "cors";
import salaryRoutes from "./routes/salaryRoutes.js";
import { connectDb } from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", salaryRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

connectDb(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed", error);
    process.exit(1);
  });
