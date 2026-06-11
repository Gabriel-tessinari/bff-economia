import type { Request, Response } from "express";
import { PagamentoGateway } from "../gateways/PagamentoGateway.js";
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

  static async criar(req: Request, res: Response): Promise<void> {
    try {
      const novoPagamento = await PagamentoGateway.criar(req.body);
      res.status(201).json(novoPagamento);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Criar Pagamento");
    }
  }

  static async atualizar(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(String(req.params.id));
      const pagamentoAtualizado = await PagamentoGateway.atualizar(
        id,
        req.body
      );
      res.status(200).json(pagamentoAtualizado);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Atualizar Pagamento");
    }
  }
}
