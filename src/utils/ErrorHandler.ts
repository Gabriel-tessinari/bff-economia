import type { Response } from "express";

export class ErrorHandler {
  static lidarComErroAxios(error: any, res: Response, contexto: string): void {
    if (error.response) {
      const statusServico = error.response.status;
      const mensagemServico = error.response.data;

      console.error(
        `Erro no Java [${contexto}] [${statusServico}]:`,
        mensagemServico
      );

      res.status(statusServico).json(mensagemServico);
      return;
    }

    if (error.request) {
      console.error(`Serviço indisponível ou erro de rede [${contexto}].`);
      res.status(503).json({
        error: "Serviço Dívida indisponível ou erro de rede.",
      });
      return;
    }

    console.error(`Erro interno no BFF [${contexto}]:`, error.message);
    res.status(500).json({ error: error.message });
  }
}
