import type { Request, Response } from "express";
import { DividaGateway } from "../gateways/DividaGateway.js";
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

  static async criar(req: Request, res: Response): Promise<void> {
    try {
      const novaDivida = await DividaGateway.criar(req.body);
      res.status(201).json(novaDivida);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Criar Dívida");
    }
  }

  static async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(String(req.params.id));

      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido." });
        return;
      }

      const dividaAtualizada = await DividaGateway.atualizar(id, req.body);
      res.status(200).json(dividaAtualizada);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Atualizar Dívida");
    }
  }
}
