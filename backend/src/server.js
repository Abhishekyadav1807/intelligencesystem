import "dotenv/config";
import express from "express";
import cors from "cors";
import salaryRoutes from "./routes/salaryRoutes.js";
import { prisma } from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", salaryRoutes);

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

bootstrap();
