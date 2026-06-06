import type { Divida } from "./Divida.js";
import type { Pagamento } from "./Pagamento.js";

export interface PagamentoDivida {
  totalPago: number;
  divida: Divida;
  pagamentos: Pagamento[];
}
