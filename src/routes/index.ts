import { Router } from "express";
import detalheRoutes from "./DetalheDividaRoutes.js";
import pagamentoRoutes from "./PagamentoDividaRoutes.js";
import resumoRoutes from "./ResumoDividaRoutes.js";

const rootRouter = Router();

rootRouter.use(resumoRoutes);
rootRouter.use(detalheRoutes);
rootRouter.use(pagamentoRoutes);

export default rootRouter;
