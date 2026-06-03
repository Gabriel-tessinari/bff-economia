import type { Divida } from "./Divida.js";
import type { Pessoa } from "./Pessoa.js";

export interface DetalheDivida {
  totalReceber: number;
  totalRecebido: number;
  saldoReceber: number;
  totalPagar: number;
  totalPago: number;
  saldoPagar: number;
  pessoa: Pessoa;
  dividas: Divida[];
}
