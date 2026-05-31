import cors from "cors";
import "dotenv/config";
import express from "express";
import { DevedorController } from "./controllers/DevedorController.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/bff/devedores-resumo", DevedorController.listarResumoDevedor);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BFF-economia rodando na porta ${PORT}`);
});
