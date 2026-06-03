import { Router } from "express";
import detalheRoutes from "./DetalheDividaRoutes.js";
import resumoRoutes from "./ResumoDividaRoutes.js";

const rootRouter = Router();

rootRouter.use(resumoRoutes);
rootRouter.use(detalheRoutes);

export default rootRouter;
