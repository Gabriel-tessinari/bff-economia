import { DevedorGateway } from "../gateways/DevedorGateway.js";
import { DividaGateway } from "../gateways/DividaGateway.js";
import { PagamentoGateway } from "../gateways/PagamentoGateway.js";
import type { Devedor } from "../models/Devedor.js";
import type { Divida } from "../models/Divida.js";
import type { Pagamento } from "../models/Pagamento.js";
import type { ResumoDevedor } from "../models/ResumoDevedor.js";

export class DevedorService {
  static async listaResumoDevedor(): Promise<ResumoDevedor[]> {
    const [devedores, dividas, pagamentos]: [Devedor[], Divida[], Pagamento[]] =
      await Promise.all([
        DevedorGateway.listarTodos(),
        DividaGateway.listarTodas(),
        PagamentoGateway.listarTodos(),
      ]);

    return devedores.map((devedor: Devedor): ResumoDevedor => {
      const dividasDevedor = dividas.filter(
        (divida) => divida.devedorId === devedor.id
      );
      const totalDevido = dividasDevedor.reduce(
        (acumulado, divida) => acumulado + divida.valor,
        0
      );
      const idsDividas = new Set(dividasDevedor.map((divida) => divida.id));

      const totalPago = pagamentos
        .filter((p) => idsDividas.has(p.dividaId))
        .reduce((acumulado, p) => acumulado + p.valor, 0);

      return {
        id: devedor.id,
        nome: devedor.nome,
        totalDevido: totalDevido,
        totalPago: totalPago,
        saldo: totalDevido - totalPago,
      };
    });
  }
}
