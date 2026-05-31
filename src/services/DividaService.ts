import { DividaGateway } from "../gateways/DividaGateway.js";
import { PagamentoGateway } from "../gateways/PagamentoGateway.js";
import { PessoaGateway } from "../gateways/PessoaGateway.js";
import type { Divida } from "../models/Divida.js";
import type { Pagamento } from "../models/Pagamento.js";
import type { Pessoa } from "../models/Pessoa.js";
import type { ResumoDivida } from "../models/ResumoDivida.js";

export class DividaService {
  static async listaResumoDivida(): Promise<ResumoDivida[]> {
    const [pessoas, dividas, pagamentos]: [Pessoa[], Divida[], Pagamento[]] =
      await Promise.all([
        PessoaGateway.listarTodas(),
        DividaGateway.listarTodas(),
        PagamentoGateway.listarTodos(),
      ]);

    return pessoas.map((pessoa: Pessoa): ResumoDivida => {
      const dividasPessoa = dividas.filter(
        (divida) => divida.pessoaId === pessoa.id
      );

      const idsReceber = new Set(
        dividasPessoa.filter((d) => d.tipo === "RECEBER").map((d) => d.id)
      );

      const idsPagar = new Set(
        dividasPessoa.filter((d) => d.tipo === "PAGAR").map((d) => d.id)
      );

      const totalReceber = dividasPessoa
        .filter((d) => d.tipo === "RECEBER")
        .reduce((acumulado, d) => acumulado + d.valor, 0);

      const totalRecebido = pagamentos
        .filter((p) => idsReceber.has(p.dividaId))
        .reduce((acumulado, p) => acumulado + p.valor, 0);

      const totalPagar = dividasPessoa
        .filter((d) => d.tipo === "PAGAR")
        .reduce((acumulado, d) => acumulado + d.valor, 0);

      const totalPago = pagamentos
        .filter((p) => idsPagar.has(p.dividaId))
        .reduce((acumulado, p) => acumulado + p.valor, 0);

      return {
        id: pessoa.id,
        nome: pessoa.nome,
        totalReceber: totalReceber,
        totalRecebido: totalRecebido,
        saldoReceber: totalReceber - totalRecebido,
        totalPagar: totalPagar,
        totalPago: totalPago,
        saldoPagar: totalPagar - totalPago,
      };
    });
  }
}
