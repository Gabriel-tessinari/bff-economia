import type { Request, Response } from "express";
import { PagamentoDividaService } from "../services/PagamentoDividaService.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export class PagamentoDividaController {
  static async buscarDetalhes(req: Request, res: Response): Promise<void> {
    try {
      const dividaId = parseInt(String(req.params.id));
      const dossie = await PagamentoDividaService.buscarPagamentoDivida(
        dividaId
      );
      res.status(200).json(dossie);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Listar Pagamento Dívida");
    }
  }
}
