import { Router } from "express";
import { ResumoDividaController } from "../controllers/ResumoDividaController.js";

const resumoRoutes = Router();

resumoRoutes.get("/resumo-dividas", ResumoDividaController.listarResumoDivida);
resumoRoutes.post("/pessoas", ResumoDividaController.criarPessoa);
resumoRoutes.put("/pessoas/:id", ResumoDividaController.atualizarPessoa);

export default resumoRoutes;
