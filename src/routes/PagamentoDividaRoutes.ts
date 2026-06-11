import { Router } from "express";
import { PagamentoDividaController } from "../controllers/PagamentoDividaController.js";
import { validarIdParam } from "../middlewares/ValidarId.js";

const pagamentoRoutes = Router();

pagamentoRoutes.get(
  "/pagamento-dividas/divida/:id",
  validarIdParam,
  PagamentoDividaController.buscarDetalhes
);
pagamentoRoutes.post("/pagamentos", PagamentoDividaController.criar);
pagamentoRoutes.put(
  "/pagamentos/:id",
  validarIdParam,
  PagamentoDividaController.atualizar
);

export default pagamentoRoutes;
