import { DividaGateway } from "../gateways/DividaGateway.js";
import { PagamentoGateway } from "../gateways/PagamentoGateway.js";
import { PessoaGateway } from "../gateways/PessoaGateway.js";
import type { Divida } from "../models/Divida.js";
import type { Pagamento } from "../models/Pagamento.js";
import type { Pessoa } from "../models/Pessoa.js";
import type { ResumoDivida } from "../models/ResumoDivida.js";

export class DividaService {
  static async listaResumoDivida(): Promise<ResumoDivida[]> {
    const [devedores, dividas, pagamentos]: [Pessoa[], Divida[], Pagamento[]] =
      await Promise.all([
        PessoaGateway.listarTodos(),
        DividaGateway.listarTodas(),
        PagamentoGateway.listarTodos(),
      ]);

    return devedores.map((devedor: Pessoa): ResumoDivida => {
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
