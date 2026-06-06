import { DividaGateway } from "../gateways/DividaGateway.js";
import { PagamentoGateway } from "../gateways/PagamentoGateway.js";
import type { PagamentoDivida } from "../models/PagamentoDivida.js";

export class PagamentoDividaService {
  static async buscarPagamentoDivida(
    dividaId: number
  ): Promise<PagamentoDivida> {
    const [divida, pagamentos] = await Promise.all([
      DividaGateway.buscarPorId(dividaId),
      PagamentoGateway.listarPorDividaId(dividaId),
    ]);

    const totalPago = pagamentos.reduce(
      (acumulado, p) => acumulado + p.valor,
      0
    );

    return {
      totalPago,
      divida,
      pagamentos,
    };
  }
}
