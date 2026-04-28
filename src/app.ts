import express from "express";
import cardRoutes from "./routes/card.routes";

const app = express();

app.use(express.json());
app.use("/api", cardRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});