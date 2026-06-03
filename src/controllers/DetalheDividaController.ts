import type { Request, Response } from "express";
import { DetalheDividaService } from "../services/DetalheDividaService.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export class DetalheDividaController {
  static async buscarDetalheDivida(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(String(req.params.id));

      if (isNaN(id)) {
        res.status(400).json({ error: "ID de pessoa inválido." });
        return;
      }

      const detalhe = await DetalheDividaService.buscaDetalheDivida(id);
      res.status(200).json(detalhe);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Buscar Detalhe Dívida");
    }
  }
}
