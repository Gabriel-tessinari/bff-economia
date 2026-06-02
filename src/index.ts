import cors from "cors";
import "dotenv/config";
import express from "express";
import rootRouter from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/bff", rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BFF-economia rodando na porta ${PORT}`);
});
