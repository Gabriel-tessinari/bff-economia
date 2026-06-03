import { DividaGateway } from "../gateways/DividaGateway.js";
import { PagamentoGateway } from "../gateways/PagamentoGateway.js";
import { PessoaGateway } from "../gateways/PessoaGateway.js";
import type { DetalheDivida } from "../models/DetalheDivida.js";

export class DetalheDividaService {
  static async buscaDetalheDivida(pessoaId: number): Promise<DetalheDivida> {
    const [pessoa, dividas] = await Promise.all([
      PessoaGateway.buscarPorId(pessoaId),
      DividaGateway.listarPorPessoaId(pessoaId),
    ]);

    const idsDividas = dividas
      .map((d) => d.id!)
      .filter((id) => id !== undefined && id !== null);

    const pagamentos = await PagamentoGateway.listarPorDividaIds(idsDividas);

    let totalReceber = 0;
    let totalRecebido = 0;
    let totalPagar = 0;
    let totalPago = 0;

    dividas.forEach((d) => {
      if (d.tipo === "RECEBER") {
        totalReceber += d.valor;
      } else if (d.tipo === "PAGAR") {
        totalPagar += d.valor;
      }
    });

    pagamentos.forEach((p) => {
      const dividaCorrespondente = dividas.find((d) => d.id === p.dividaId);

      if (dividaCorrespondente) {
        if (dividaCorrespondente.tipo === "RECEBER") {
          totalRecebido += p.valor;
        } else if (dividaCorrespondente.tipo === "PAGAR") {
          totalPago += p.valor;
        }
      }
    });

    const saldoReceber = totalReceber - totalRecebido;
    const saldoPagar = totalPagar - totalPago;

    return {
      totalReceber,
      totalRecebido,
      saldoReceber,
      totalPagar,
      totalPago,
      saldoPagar,
      pessoa,
      dividas,
    };
  }
}
