import { Router } from "express";
import { DetalheDividaController } from "../controllers/DetalheDividaController.js";

const detalheRoutes = Router();

detalheRoutes.get(
  "/detalhe-dividas/pessoa/:id",
  DetalheDividaController.buscarDetalheDivida
);
detalheRoutes.post("/dividas", DetalheDividaController.criarDivida);
detalheRoutes.put("/dividas/:id", DetalheDividaController.atualizarDivida);

export default detalheRoutes;
