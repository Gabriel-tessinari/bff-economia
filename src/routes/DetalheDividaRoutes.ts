import { Router } from "express";
import { DetalheDividaController } from "../controllers/DetalheDividaController.js";

const detalheRoutes = Router();

detalheRoutes.get(
  "/detalhe-dividas",
  DetalheDividaController.buscarDetalheDivida
);

export default detalheRoutes;
