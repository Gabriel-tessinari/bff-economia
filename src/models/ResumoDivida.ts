import type { Pessoa } from "./Pessoa.js";

export interface ResumoDivida {
  totalReceber: number;
  totalRecebido: number;
  saldoReceber: number;
  totalPagar: number;
  totalPago: number;
  saldoPagar: number;
  pessoa: Pessoa;
}
