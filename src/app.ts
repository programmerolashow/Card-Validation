import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardRoutes from "./routes/card.routes";
import { requestLogger } from "./middlewares/logger.middleware";
import { globalErrorHandler } from "./middlewares/error.middleware";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api", cardRoutes);

// Global Error Handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});