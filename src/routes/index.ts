import { Router } from "express";
import resumoRoutes from "./ResumoDividaRoutes.js";

const rootRouter = Router();

rootRouter.use(resumoRoutes);

export default rootRouter;
