import cors from "cors";
import "dotenv/config";
import express from "express";
import { DividaController } from "./controllers/DividaController.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/bff/dividas-resumo", DividaController.listarResumoDivida);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BFF-economia rodando na porta ${PORT}`);
});
