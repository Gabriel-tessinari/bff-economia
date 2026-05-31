import type { Request, Response } from "express";
import { DevedorService } from "../services/DevedorService.js";

export class DevedorController {
  static async listarResumoDevedor(req: Request, res: Response): Promise<void> {
    try {
      const resumos = await DevedorService.listaResumoDevedor();
      res.status(200).json(resumos);
    } catch (error: any) {
      if (error.response) {
        const statusServico = error.response.status;
        const mensagemServico = error.response.data;

        console.error(`Erro no Java [${statusServico}]:`, mensagemServico);

        res.status(statusServico).json(mensagemServico);
        return;
      }

      if (error.request) {
        res.status(503).json({
          error: "Serviço Devedor indisponível ou erro de rede.",
        });
        return;
      }

      res.status(500).json({ error: error.message });
    }
  }
}
