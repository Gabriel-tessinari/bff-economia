import type { Request, Response } from "express";
import { PessoaGateway } from "../gateways/PessoaGateway.js";
import { ResumoDividaService } from "../services/ResumoDividaService.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export class ResumoDividaController {
  static async listarResumoDivida(req: Request, res: Response): Promise<void> {
    try {
      const resumos = await ResumoDividaService.listaResumoDivida();
      res.status(200).json(resumos);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Listar Resumo");
    }
  }

  static async criarPessoa(req: Request, res: Response): Promise<void> {
    try {
      const novaPessoa = await PessoaGateway.criar(req.body);
      res.status(201).json(novaPessoa);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Criar Pessoa");
    }
  }

  static async atualizarPessoa(req: Request, res: Response): Promise<void> {
    try {
      const idParam = String(req.params.id);
      const id = parseInt(idParam);

      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido." });
        return;
      }

      const pessoaAtualizada = await PessoaGateway.atualizar(id, {
        id,
        nome: req.body.nome,
      });
      res.status(200).json(pessoaAtualizada);
    } catch (error) {
      ErrorHandler.lidarComErroAxios(error, res, "Atualizar Pessoa");
    }
  }
}
